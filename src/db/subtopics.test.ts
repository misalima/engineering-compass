import { beforeAll, expect, it } from "vitest";
import { count } from "drizzle-orm";
import { createTestDb } from "@/test/db";
import { GROWTH_CATALOG } from "@/growth/catalog";
import {
  listStudies,
  listSubtopicCompletions,
  setSubtopicStudied,
} from "./growth";
import { seedGrowth } from "./seed-growth";
import { loadAssessmentDetails } from "./queries";
import * as t from "./schema";
import type { Db } from "./types";

let db: Db;
let versionId: number;
const topic = GROWTH_CATALOG.topics.find(
  (t) => t.code === "topic.collections",
)!;
const input = {
  topicCode: topic.code,
  subtopicCode: topic.subtopics[0].code,
  checked: true,
  studiedOn: "2026-10-18",
};
beforeAll(async () => {
  ({ db, versionId } = await createTestDb());
  await seedGrowth(db, versionId);
});

it("persists checks and their study history atomically and idempotently, independently of ability", async () => {
  await setSubtopicStudied(db, input);
  await setSubtopicStudied(db, input);
  expect(await listSubtopicCompletions(db, topic.code)).toEqual([
    { subtopicCode: input.subtopicCode, studiedOn: input.studiedOn },
  ]);
  const studies = await listStudies(db, { topicCode: topic.code });
  expect(studies.total).toBe(1);
  expect(studies.rows[0]).toMatchObject({
    studiedOn: input.studiedOn,
    notes: `Studied subtopic: ${topic.subtopics[0].title}`,
  });
  expect((await loadAssessmentDetails(db, versionId)).competencies.size).toBe(
    0,
  );
  await seedGrowth(db, versionId);
  expect((await listSubtopicCompletions(db, topic.code)).length).toBe(1);
  expect(
    (await db.select({ count: count() }).from(t.studySubtopics))[0].count,
  ).toBe(GROWTH_CATALOG.topics.reduce((sum, t) => sum + t.subtopics.length, 0));
  await setSubtopicStudied(db, { ...input, checked: false });
  expect(await listSubtopicCompletions(db, topic.code)).toEqual([]);
  expect((await listStudies(db, { topicCode: topic.code })).total).toBe(1);
});
it("rejects mismatched topics and unknown items without writing progress or history", async () => {
  await expect(
    setSubtopicStudied(db, { ...input, topicCode: "topic.transactions" }),
  ).rejects.toThrow("Unknown subtopic");
  await expect(
    setSubtopicStudied(db, {
      ...input,
      subtopicCode: "topic.collections.missing",
    }),
  ).rejects.toThrow("Unknown subtopic");
  expect(await listSubtopicCompletions(db)).toEqual([]);
  expect((await listStudies(db)).total).toBe(1);
});
