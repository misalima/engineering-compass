import { eq } from "drizzle-orm";
import type { Standard } from "@/standard/schema";
import * as t from "./schema";
import type { Db } from "./types";

/** Inserts a Standard version once. Re-running is a no-op; an existing version is never modified. */
export async function seedStandard(db: Db, standard: Standard) {
  return db.transaction(async (tx) => {
    const [existing] = await tx.select().from(t.standardVersions).where(eq(t.standardVersions.version, standard.version));
    if (existing) return { versionId: existing.id, inserted: false };

    const [version] = await tx.insert(t.standardVersions).values({ version: standard.version, track: standard.track }).returning();

    for (const d of standard.domains) {
      const [domain] = await tx.insert(t.domains).values({ standardVersionId: version.id, code: d.code, order: d.order, title: d.title }).returning();
      if (d.knowledge.length) await tx.insert(t.knowledgeTopics).values(d.knowledge.map((label, i) => ({ domainId: domain.id, order: i + 1, label })));
      await tx.insert(t.competencies).values(
        d.competencies.map((c) => ({
          standardVersionId: version.id,
          domainId: domain.id,
          code: c.code,
          order: c.order,
          requiredLevel: c.requiredLevel,
          statement: c.statement,
          masteryCriteria: c.masteryCriteria ?? null,
        })),
      );
    }

    await tx.insert(t.experiences).values(standard.experiences.map((e) => ({ standardVersionId: version.id, ...e })));

    for (const g of standard.depthGates) {
      const [gate] = await tx.insert(t.depthGates).values({ standardVersionId: version.id, code: g.code, order: g.order, title: g.title }).returning();
      await tx.insert(t.depthCriteria).values(g.criteria.map((c) => ({ standardVersionId: version.id, depthGateId: gate.id, ...c })));
    }

    await tx.insert(t.profileSettings).values({ id: 1 }).onConflictDoNothing();
    return { versionId: version.id, inserted: true };
  });
}