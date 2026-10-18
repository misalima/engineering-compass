import "server-only";
import { cache } from "react";
import * as repo from "@/db/growth";
import { GROWTH_CATALOG, TOPIC_BY_CODE } from "@/growth/catalog";
import { buildGrowth } from "@/growth/progress";
import { profileInput, studyInput, subtopicInput } from "@/growth/validation";
import { ownerDb } from "./auth";
import { getActiveStandard } from "./standard";

export const getCareerProfile = cache(async () =>
  repo.loadCareerProfile(await ownerDb()),
);
export const getGrowth = cache(async () => {
  const db = await ownerDb();
  const { versionId } = await getActiveStandard();
  const [profile, assessments, summaries] = await Promise.all([
    getCareerProfile(),
    repo.growthAssessments(db, versionId),
    repo.studySummaries(db),
  ]);
  const studies = summaries.map((s) => ({
    ...s,
    lastStudiedOn: s.lastStudiedOn!,
  }));
  return {
    profile,
    ...buildGrowth(GROWTH_CATALOG, profile, assessments, studies),
  };
});
export async function getStudies(
  options: Parameters<typeof repo.listStudies>[1] = {},
) {
  return repo.listStudies(await ownerDb(), options);
}
export async function saveCareerProfile(input: unknown) {
  const db = await ownerDb();
  await repo.saveCareerProfile(db, profileInput.parse(input));
}
export async function saveStudy(input: unknown, id?: number) {
  const db = await ownerDb();
  const parsed = studyInput.parse(input);
  if (!TOPIC_BY_CODE.has(parsed.topicCode)) throw new Error("Unknown topic");
  // The input schema's output is already normalized; repository receives it directly.
  await repo.saveStudy(db, parsed, id);
}
export async function deleteStudy(id: number) {
  await repo.deleteStudy(await ownerDb(), id);
}

export async function getSubtopicCompletions(topicCode: string) {
  return repo.listSubtopicCompletions(await ownerDb(), topicCode);
}
export async function setSubtopicStudied(input: unknown) {
  const db = await ownerDb();
  const parsed = subtopicInput.parse(input);
  const topic = TOPIC_BY_CODE.get(parsed.topicCode);
  if (!topic?.subtopics.some((s) => s.code === parsed.subtopicCode))
    throw new Error("Unknown subtopic");
  await repo.setSubtopicStudied(db, parsed);
}

export async function getSubtopicStudyCounts() {
  return repo.subtopicStudyCounts(await ownerDb());
}
