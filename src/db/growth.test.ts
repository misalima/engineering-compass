import { beforeAll, describe, expect, it } from "vitest";
import { count, eq } from "drizzle-orm";
import { createTestDb } from "@/test/db";
import { DEFAULT_PROFILE } from "@/growth/model";
import { GROWTH_CATALOG } from "@/growth/catalog";
import { loadAssessmentDetails, saveAssessment } from "./queries";
import { seedGrowth } from "./seed-growth";
import {
  growthAssessments,
  deleteStudy,
  listStudies,
  loadCareerProfile,
  saveCareerProfile,
  saveStudy,
  studySummaries,
} from "./growth";
import * as t from "./schema";
import type { Db } from "./types";

let db: Db;
let versionId: number;
beforeAll(async () => {
  ({ db, versionId } = await createTestDb());
  await seedGrowth(db, versionId);
});

describe("study persistence using the real Postgres migrations", () => {
  it("seeds topics and links idempotently without modifying the old Standard", async () => {
    await seedGrowth(db, versionId);
    expect(
      (await db.select({ count: count() }).from(t.studyTopics))[0].count,
    ).toBe(GROWTH_CATALOG.topics.length);
    expect(
      (await db.select({ count: count() }).from(t.topicCompetencies))[0].count,
    ).toBe(455);
  });
  it("records, edits, paginates and deletes date-only studies without creating assessments", async () => {
    const input = {
      topicCode: "topic.transactions",
      studiedOn: "2026-10-05",
      notes: "Read isolation docs",
      link: "https://www.postgresql.org/docs/current/transaction-iso.html",
    };
    await saveStudy(db, input);
    await saveStudy(db, {
      ...input,
      studiedOn: "2026-10-04",
      notes: null,
      link: null,
    });
    const page = await listStudies(db, { pageSize: 1 });
    expect(page.total).toBe(2);
    expect(page.pages).toBe(2);
    expect(page.rows[0].studiedOn).toBe(input.studiedOn);
    expect((await studySummaries(db))[0]).toMatchObject({
      topicCode: input.topicCode,
      count: 2,
      lastStudiedOn: "2026-10-05",
    });
    expect((await loadAssessmentDetails(db, versionId)).competencies.size).toBe(
      0,
    );
    await saveStudy(
      db,
      { ...input, notes: "Updated notes", studiedOn: "2026-10-03" },
      page.rows[0].id,
    );
    const filtered = await listStudies(db, { topicCode: input.topicCode });
    expect(filtered.rows[0].studiedOn).toBe("2026-10-04");
    expect(filtered.rows[1].notes).toBe("Updated notes");
    await deleteStudy(db, page.rows[0].id);
    expect((await listStudies(db)).total).toBe(1);
    expect((await studySummaries(db))[0].lastStudiedOn).toBe("2026-10-04");
    expect(
      (await listStudies(db, { topicCode: "topic.collections" })).total,
    ).toBe(0);
    await expect(saveStudy(db, input, 999999)).rejects.toThrow("not found");
  });
  it("enforces references and validates constraints at the database boundary", async () => {
    await expect(
      saveStudy(db, {
        topicCode: "topic.missing",
        studiedOn: "2026-10-05",
        notes: null,
        link: null,
      }),
    ).rejects.toThrow();
    await expect(
      saveStudy(db, {
        topicCode: "topic.transactions",
        studiedOn: "2026-10-05",
        notes: null,
        link: "javascript:alert(1)",
      }),
    ).rejects.toThrow();
  });
  it("updates career preferences independently of legacy settings and existing records", async () => {
    expect(await loadCareerProfile(db)).toMatchObject(DEFAULT_PROFILE);
    await db
      .update(t.profileSettings)
      .set({ deployedIntegratedApp: true })
      .where(eq(t.profileSettings.id, 1));
    await saveCareerProfile(db, {
      ...DEFAULT_PROFILE,
      primaryStack: "typescript",
      targetMilestone: "mid",
    });
    expect(await loadCareerProfile(db)).toMatchObject({
      primaryStack: "typescript",
      targetMilestone: "mid",
    });
    await seedGrowth(db, versionId);
    expect(
      (await loadAssessmentDetails(db, versionId)).deployedIntegratedApp,
    ).toBe(true);
    expect((await listStudies(db)).total).toBe(1);
    expect((await loadCareerProfile(db)).primaryStack).toBe("typescript");
  });
  it("projects evidence presence without loading private note bodies into career views", async () => {
    const code = GROWTH_CATALOG.topics[0].competencyCodes[0];
    const input = { kind: "competency" as const, code, status: "mastered" as const, notesMarkdown: "Private context", evidenceMarkdown: "   ", confidence: null, reviewDueAt: null, reason: null };
    await saveAssessment(db, versionId, input);
    expect(await growthAssessments(db, versionId)).toEqual([{ code, status: "mastered", hasEvidence: false }]);
    await saveAssessment(db, versionId, { ...input, evidenceMarkdown: "A reproducible demonstration" });
    expect(await growthAssessments(db, versionId)).toEqual([{ code, status: "mastered", hasEvidence: true }]);
  });

});
