import { eq, sql } from "drizzle-orm";
import { GROWTH_CATALOG } from "@/growth/catalog";
import * as t from "./schema";
import type { Db } from "./types";

/** Additive and idempotent. Never touches assessments or existing study history. */
export async function seedGrowth(db: Db, versionId: number) {
  return db.transaction(async (tx) => {
    const [domains, competencies] = await Promise.all([
      tx
        .select()
        .from(t.domains)
        .where(eq(t.domains.standardVersionId, versionId)),
      tx
        .select()
        .from(t.competencies)
        .where(eq(t.competencies.standardVersionId, versionId)),
    ]);
    const domainIds = new Map(domains.map((d) => [d.code, d.id]));
    const competencyIds = new Map(competencies.map((c) => [c.code, c.id]));
    const topics = GROWTH_CATALOG.topics.map((topic) => {
      const domainId = domainIds.get(topic.domainCode);
      if (!domainId) throw new Error(`Missing domain ${topic.domainCode}`);
      return {
        code: topic.code,
        catalogVersion: GROWTH_CATALOG.version,
        domainId,
        title: topic.title,
        scope: topic.scope,
        firstMilestone: topic.milestone,
        sourceIds: topic.sourceIds,
      };
    });
    const links = GROWTH_CATALOG.topics.flatMap((topic) =>
      topic.competencyCodes.map((code) => {
        const competencyId = competencyIds.get(code);
        if (!competencyId) throw new Error(`Missing competency ${code}`);
        return { topicCode: topic.code, competencyId };
      }),
    );
    await tx
      .insert(t.studyTopics)
      .values(topics)
      .onConflictDoUpdate({
        target: t.studyTopics.code,
        // Bibliography can improve without changing topic meaning, milestone or competency identity.
        set: { sourceIds: sql`excluded.source_ids` },
        setWhere: eq(t.studyTopics.catalogVersion, GROWTH_CATALOG.version),
      });
    await tx.insert(t.topicCompetencies).values(links).onConflictDoNothing();
  });
}
