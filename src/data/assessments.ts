import "server-only";
import * as repo from "@/db/queries";
import type { ItemKind } from "@/standard/schema";
import { ownerDb } from "./auth";
import { getActiveStandard } from "./standard";

export type { AssessmentDetail, SaveAssessmentInput } from "@/db/queries";
export type HistoryEvent = Awaited<ReturnType<typeof repo.listEvents>>["rows"][number];

export async function getItemHistory(kind: ItemKind, code: string) {
  return (await repo.listEvents(await ownerDb(), { limit: 50, kind, code })).rows;
}

export async function getRecentEvents(limit: number) {
  return (await repo.listEvents(await ownerDb(), { limit })).rows;
}

export async function getHistoryPage({ page, pageSize, kind }: { page: number; pageSize: number; kind?: ItemKind }) {
  const { rows, total } = await repo.listEvents(await ownerDb(), { limit: pageSize, offset: (page - 1) * pageSize, kind });
  return { rows, pages: Math.max(1, Math.ceil(total / pageSize)) };
}

/** Returns whether anything changed (and so whether an event was written). */
export async function saveAssessment(input: repo.SaveAssessmentInput) {
  const db = await ownerDb();
  const { versionId } = await getActiveStandard();
  return { changed: (await repo.saveAssessment(db, versionId, input)) !== null };
}

export async function setDeployedIntegratedApp(value: boolean) {
  await repo.setDeployedIntegratedApp(await ownerDb(), value);
}
