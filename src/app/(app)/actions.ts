"use server";

import { invalidateOwnerViews } from "@/data/invalidate";
import { unstable_rethrow } from "next/navigation";
import { saveAssessment } from "@/data/assessments";
import { parseAssessmentForm } from "@/lib/validation";

export type ActionState = { ok: boolean; message: string } | null;

export async function saveAssessmentAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = parseAssessmentForm(formData);
  if (!parsed.success) return { ok: false, message: "Some fields are invalid. Check the values and try again." };

  try {
    const { changed } = await saveAssessment(parsed.data);
    invalidateOwnerViews();
    return { ok: true, message: changed ? "Saved." : "No changes to save." };
  } catch (error) {
    unstable_rethrow(error);
    console.error("saveAssessment failed", { kind: parsed.data.kind, code: parsed.data.code, error: (error as Error).message });
    return { ok: false, message: "Could not save. Your text is still in the form; try again." };
  }
}
