import { and, asc, count, desc, eq } from "drizzle-orm";
import type { Assessments, Status } from "@/progression";
import { ACTIVE_STANDARD_VERSION } from "@/standard";
import type { ItemKind, Standard } from "@/standard/schema";
import * as t from "./schema";
import type { Db } from "./types";

export async function getActiveVersion(db: Db) {
  const [row] = await db.select().from(t.standardVersions).where(eq(t.standardVersions.version, ACTIVE_STANDARD_VERSION));
  if (!row) throw new Error(`Standard v${ACTIVE_STANDARD_VERSION} is not seeded. Run pnpm db:seed.`);
  return row;
}

/** Rebuilds the published Standard from the database in seed shape. */
export async function loadStandard(db: Db, versionId: number): Promise<Standard> {
  const [version] = await db.select().from(t.standardVersions).where(eq(t.standardVersions.id, versionId));
  const [domainRows, topicRows, competencyRows, experienceRows, gateRows, criterionRows] = await Promise.all([
    db.select().from(t.domains).where(eq(t.domains.standardVersionId, versionId)).orderBy(asc(t.domains.order)),
    db.select({ domainId: t.knowledgeTopics.domainId, label: t.knowledgeTopics.label }).from(t.knowledgeTopics).innerJoin(t.domains, eq(t.domains.id, t.knowledgeTopics.domainId)).where(eq(t.domains.standardVersionId, versionId)).orderBy(asc(t.knowledgeTopics.order)),
    db.select().from(t.competencies).where(eq(t.competencies.standardVersionId, versionId)).orderBy(asc(t.competencies.order)),
    db.select().from(t.experiences).where(eq(t.experiences.standardVersionId, versionId)).orderBy(asc(t.experiences.number)),
    db.select().from(t.depthGates).where(eq(t.depthGates.standardVersionId, versionId)).orderBy(asc(t.depthGates.order)),
    db.select().from(t.depthCriteria).where(eq(t.depthCriteria.standardVersionId, versionId)).orderBy(asc(t.depthCriteria.order)),
  ]);

  return {
    version: version.version,
    track: version.track,
    domains: domainRows.map((d) => ({
      code: d.code,
      order: d.order,
      title: d.title,
      knowledge: topicRows.filter((k) => k.domainId === d.id).map((k) => k.label),
      competencies: competencyRows
        .filter((c) => c.domainId === d.id)
        .map((c) => ({ code: c.code, order: c.order, requiredLevel: c.requiredLevel, statement: c.statement, ...(c.masteryCriteria ? { masteryCriteria: c.masteryCriteria } : {}) })),
    })),
    experiences: experienceRows.map((e) => ({ code: e.code, number: e.number, title: e.title, statement: e.statement, tier: e.tier })),
    depthGates: gateRows.map((g) => ({
      code: g.code,
      order: g.order,
      title: g.title,
      criteria: criterionRows.filter((c) => c.depthGateId === g.id).map((c) => ({ code: c.code, order: c.order, statement: c.statement })),
    })),
  };
}

export type AssessmentDetail = {
  status: Status;
  confidence: number | null;
  notesMarkdown: string | null;
  evidenceMarkdown: string | null;
  lastReviewedAt: Date | null;
  reviewDueAt: Date | null;
  updatedAt: Date;
  projectId?: number | null;
};

export async function loadAssessmentDetails(db: Db, versionId: number) {
  const [c, e, d, [settings]] = await Promise.all([
    db.select({ code: t.competencies.code, a: t.competencyAssessments }).from(t.competencyAssessments).innerJoin(t.competencies, eq(t.competencies.id, t.competencyAssessments.competencyId)).where(eq(t.competencies.standardVersionId, versionId)),
    db.select({ code: t.experiences.code, a: t.experienceAssessments }).from(t.experienceAssessments).innerJoin(t.experiences, eq(t.experiences.id, t.experienceAssessments.experienceId)).where(eq(t.experiences.standardVersionId, versionId)),
    db.select({ code: t.depthCriteria.code, a: t.depthCriterionAssessments }).from(t.depthCriterionAssessments).innerJoin(t.depthCriteria, eq(t.depthCriteria.id, t.depthCriterionAssessments.depthCriterionId)).where(eq(t.depthCriteria.standardVersionId, versionId)),
    db.select().from(t.profileSettings).where(eq(t.profileSettings.id, 1)),
  ]);
  const byCode = (rows: { code: string; a: AssessmentDetail }[]) => new Map(rows.map((r) => [r.code, r.a]));
  return { competencies: byCode(c), experiences: byCode(e), depthCriteria: byCode(d), deployedIntegratedApp: settings?.deployedIntegratedApp ?? false };
}

export type AssessmentDetails = Awaited<ReturnType<typeof loadAssessmentDetails>>;

export function toAssessments(details: AssessmentDetails): Assessments {
  const statuses = (m: Map<string, AssessmentDetail>) => Object.fromEntries([...m].map(([code, a]) => [code, a.status]));
  return {
    competencies: statuses(details.competencies),
    experiences: statuses(details.experiences),
    depthCriteria: statuses(details.depthCriteria),
    deployedIntegratedApp: details.deployedIntegratedApp,
  };
}

export type SaveAssessmentInput = {
  kind: ItemKind;
  code: string;
  status: Status;
  notesMarkdown: string | null;
  evidenceMarkdown: string | null;
  confidence: number | null;
  reviewDueAt: Date | null;
  reason: string | null;
  projectId?: number | null;
};

const itemTables = {
  competency: { items: t.competencies, assessments: t.competencyAssessments, fk: "competencyId" },
  experience: { items: t.experiences, assessments: t.experienceAssessments, fk: "experienceId" },
  depth_criterion: { items: t.depthCriteria, assessments: t.depthCriterionAssessments, fk: "depthCriterionId" },
} as const;

/** Upserts the current assessment and appends an event in one transaction. Returns null when nothing changed. */
export async function saveAssessment(db: Db, versionId: number, input: SaveAssessmentInput) {
  const { items, assessments, fk } = itemTables[input.kind];
  return db.transaction(async (tx) => {
    const [item] = await tx.select({ id: items.id }).from(items).where(and(eq(items.standardVersionId, versionId), eq(items.code, input.code)));
    if (!item) throw new Error(`Unknown ${input.kind}: ${input.code}`);

    const fkColumn = (assessments as typeof t.competencyAssessments)[fk as "competencyId"];
    const [previous] = await tx.select().from(assessments).where(eq(fkColumn, item.id)).for("update");
    const fromStatus: Status = previous?.status ?? "not_started";
    const notesChanged = (previous?.notesMarkdown ?? null) !== input.notesMarkdown;
    const evidenceChanged = (previous?.evidenceMarkdown ?? null) !== input.evidenceMarkdown;
    const statusChanged = fromStatus !== input.status;
    const now = new Date();

    const values = {
      status: input.status,
      notesMarkdown: input.notesMarkdown,
      evidenceMarkdown: input.evidenceMarkdown,
      confidence: input.confidence,
      reviewDueAt: input.reviewDueAt,
      lastReviewedAt: statusChanged ? now : (previous?.lastReviewedAt ?? null),
      updatedAt: now,
      ...(input.kind === "experience" ? { projectId: input.projectId ?? null } : {}),
    };
    await tx
      .insert(assessments)
      .values({ [fk]: item.id, ...values } as typeof t.competencyAssessments.$inferInsert)
      .onConflictDoUpdate({ target: fkColumn, set: values });

    if (!statusChanged && !notesChanged && !evidenceChanged) return null;
    const [event] = await tx
      .insert(t.assessmentEvents)
      .values({ standardVersionId: versionId, itemKind: input.kind, itemCode: input.code, fromStatus, toStatus: input.status, notesChanged, evidenceChanged, reason: input.reason })
      .returning();
    return event;
  });
}

export async function listEvents(db: Db, opts: { limit: number; offset?: number; kind?: ItemKind; code?: string }) {
  const where = and(opts.kind ? eq(t.assessmentEvents.itemKind, opts.kind) : undefined, opts.code ? eq(t.assessmentEvents.itemCode, opts.code) : undefined);
  const [rows, [{ total }]] = await Promise.all([
    db.select().from(t.assessmentEvents).where(where).orderBy(desc(t.assessmentEvents.createdAt), desc(t.assessmentEvents.id)).limit(opts.limit).offset(opts.offset ?? 0),
    db.select({ total: count() }).from(t.assessmentEvents).where(where),
  ]);
  return { rows, total };
}

export const listAllEvents = (db: Db) => db.select().from(t.assessmentEvents).orderBy(asc(t.assessmentEvents.createdAt), asc(t.assessmentEvents.id));

export async function setDeployedIntegratedApp(db: Db, value: boolean) {
  await db
    .insert(t.profileSettings)
    .values({ id: 1, deployedIntegratedApp: value })
    .onConflictDoUpdate({ target: t.profileSettings.id, set: { deployedIntegratedApp: value, updatedAt: new Date() } });
}
