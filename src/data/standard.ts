import "server-only";
import { cache } from "react";
import { getActiveVersion, loadAssessmentDetails, toAssessments } from "@/db/queries";
import { STANDARD_V1_1 } from "@/standard";
import { progression } from "@/progression";
import type { Standard } from "@/standard/schema";
import { ownerDb } from "./auth";

type ActiveStandard = { versionId: number; standard: Standard };

/** A published Standard is immutable, so it is loaded once per server process instead of on every request. */
let activeStandard: Promise<ActiveStandard> | undefined;

export const getActiveStandard = cache(async () => {
  const db = await ownerDb();
  activeStandard ??= (async () => {
    const version = await getActiveVersion(db);
    return { versionId: version.id, standard: STANDARD_V1_1 };
  })().catch((error) => {
    activeStandard = undefined;
    throw error;
  });
  return activeStandard;
});

/** Standard + your assessments + derived progression. Most pages need exactly this. */
export const getOverview = cache(async () => {
  const db = await ownerDb();
  const { versionId, standard } = await getActiveStandard();
  const details = await loadAssessmentDetails(db, versionId);
  return { versionId, standard, details, progress: progression(standard, toAssessments(details)) };
});
