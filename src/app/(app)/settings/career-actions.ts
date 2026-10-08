"use server";
import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { saveCareerProfile } from "@/data/growth";
import { invalidateOwnerViews } from "@/data/invalidate";
import type { ActionState } from "@/app/(app)/actions";

export async function saveCareerAction(
  _previous: ActionState,
  data: FormData,
): Promise<ActionState> {
  try {
    await saveCareerProfile({
      goal: data.get("goal"),
      primaryStack: data.get("primaryStack"),
      stackTools: data.getAll("stackTools"),
      targetMilestone: data.get("targetMilestone"),
    });
    invalidateOwnerViews();
    return {
      ok: true,
      message:
        "Career path updated. Your study and assessment history is preserved.",
    };
  } catch (error) {
    unstable_rethrow(error);
    return {
      ok: false,
      message:
        error instanceof z.ZodError
          ? "Choose a goal, stack and milestone from the available options."
          : "Could not save your preferences. Please try again.",
    };
  }
}
