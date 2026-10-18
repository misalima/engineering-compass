import { and, count, desc, eq, max, sql } from "drizzle-orm";
import { DEFAULT_PROFILE, type CareerProfile } from "@/growth/model";
import type { z } from "zod";
import type { studyInput, subtopicInput } from "@/growth/validation";
import * as t from "./schema";
import type { Db } from "./types";

export async function loadCareerProfile(db: Db): Promise<CareerProfile> {
  const [row] = await db
    .select()
    .from(t.careerProfiles)
    .where(eq(t.careerProfiles.id, 1));
  return (
    row ?? { ...DEFAULT_PROFILE, stackTools: [...DEFAULT_PROFILE.stackTools] }
  );
}
export async function saveCareerProfile(db: Db, input: CareerProfile) {
  await db
    .insert(t.careerProfiles)
    .values({ id: 1, ...input })
    .onConflictDoUpdate({
      target: t.careerProfiles.id,
      set: { ...input, updatedAt: new Date() },
    });
}
export function studySummaries(db: Db) {
  return db
    .select({
      topicCode: t.studyEntries.topicCode,
      count: count(),
      lastStudiedOn: max(t.studyEntries.studiedOn),
    })
    .from(t.studyEntries)
    .groupBy(t.studyEntries.topicCode);
}
export async function listStudies(
  db: Db,
  {
    topicCode,
    page = 1,
    pageSize = 20,
  }: { topicCode?: string; page?: number; pageSize?: number } = {},
) {
  const where = topicCode ? eq(t.studyEntries.topicCode, topicCode) : undefined;
  const [rows, [{ total }]] = await Promise.all([
    db
      .select()
      .from(t.studyEntries)
      .where(where)
      .orderBy(desc(t.studyEntries.studiedOn), desc(t.studyEntries.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize),
    db.select({ total: count() }).from(t.studyEntries).where(where),
  ]);
  return { rows, total, pages: Math.max(1, Math.ceil(total / pageSize)) };
}
export async function saveStudy(
  db: Db,
  input: z.infer<typeof studyInput>,
  id?: number,
) {
  if (id !== undefined) {
    const rows = await db
      .update(t.studyEntries)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(t.studyEntries.id, id))
      .returning({ id: t.studyEntries.id });
    if (!rows.length) throw new Error("Study entry not found");
  } else {
    await db.insert(t.studyEntries).values(input);
  }
}
export async function deleteStudy(db: Db, id: number) {
  await db.delete(t.studyEntries).where(eq(t.studyEntries.id, id));
}
export const allStudies = (db: Db) =>
  db
    .select()
    .from(t.studyEntries)
    .orderBy(desc(t.studyEntries.studiedOn), desc(t.studyEntries.id));

export async function growthAssessments(db: Db, versionId: number) {
  const rows = await db
    .select({
      code: t.competencies.code,
      status: t.competencyAssessments.status,
      hasEvidence: sql<boolean>`length(trim(coalesce(${t.competencyAssessments.evidenceMarkdown}, ''))) > 0`,
    })
    .from(t.competencyAssessments)
    .innerJoin(
      t.competencies,
      eq(t.competencies.id, t.competencyAssessments.competencyId),
    )
    .where(eq(t.competencies.standardVersionId, versionId));
  return rows;
}

export function listSubtopicCompletions(db: Db, topicCode?: string) {
  return db
    .select({
      subtopicCode: t.subtopicCompletions.subtopicCode,
      studiedOn: t.subtopicCompletions.studiedOn,
    })
    .from(t.subtopicCompletions)
    .innerJoin(
      t.studySubtopics,
      eq(t.studySubtopics.code, t.subtopicCompletions.subtopicCode),
    )
    .where(topicCode ? eq(t.studySubtopics.topicCode, topicCode) : undefined);
}

export async function setSubtopicStudied(
  db: Db,
  input: z.infer<typeof subtopicInput>,
) {
  return db.transaction(async (tx) => {
    const [subtopic] = await tx
      .select()
      .from(t.studySubtopics)
      .where(
        and(
          eq(t.studySubtopics.code, input.subtopicCode),
          eq(t.studySubtopics.topicCode, input.topicCode),
        ),
      );
    if (!subtopic) throw new Error("Unknown subtopic for this topic");
    if (!input.checked) {
      // Unchecking changes coverage while preserving the historical study entry.
      await tx
        .delete(t.subtopicCompletions)
        .where(eq(t.subtopicCompletions.subtopicCode, input.subtopicCode));
      return;
    }
    const inserted = await tx
      .insert(t.subtopicCompletions)
      .values({ subtopicCode: input.subtopicCode, studiedOn: input.studiedOn })
      .onConflictDoNothing()
      .returning();
    // Repeated submissions are idempotent; progress and history commit together.
    if (inserted.length)
      await tx.insert(t.studyEntries).values({
        topicCode: input.topicCode,
        studiedOn: input.studiedOn,
        notes: `Studied subtopic: ${subtopic.title}`,
      });
  });
}

export function subtopicStudyCounts(db: Db) {
  return db
    .select({ topicCode: t.studySubtopics.topicCode, count: count() })
    .from(t.subtopicCompletions)
    .innerJoin(
      t.studySubtopics,
      eq(t.studySubtopics.code, t.subtopicCompletions.subtopicCode),
    )
    .groupBy(t.studySubtopics.topicCode);
}
