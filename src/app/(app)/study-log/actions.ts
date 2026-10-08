"use server";

import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { deleteStudy, saveStudy } from "@/data/growth";
import { invalidateOwnerViews } from "@/data/invalidate";
import type { ActionState } from "@/app/(app)/actions";

export async function saveStudyAction(
  _previous: ActionState,
  data: FormData,
): Promise<ActionState> {
  const id = data.get("id");
  const parsedId = id ? z.coerce.number().int().positive().safeParse(id) : null;
  if (parsedId && !parsedId.success)
    return { ok: false, message: "Invalid study entry." };
  try {
    await saveStudy(
      {
        topicCode: data.get("topicCode"),
        studiedOn: data.get("studiedOn"),
        notes: data.get("notes") ?? "",
        link: data.get("link") ?? "",
      },
      parsedId?.data,
    );
    invalidateOwnerViews();
    return {
      ok: true,
      message: "Study saved. Competency assessments stay separate.",
    };
  } catch (error) {
    unstable_rethrow(error);
    return {
      ok: false,
      message:
        error instanceof z.ZodError
          ? "Check the topic, date and link (http or https). Notes can contain up to 5,000 characters."
          : "Could not save. Your text is still here; please try again.",
    };
  }
}
export async function deleteStudyAction(
  _previous: ActionState,
  data: FormData,
): Promise<ActionState> {
  const parsed = z.coerce.number().int().positive().safeParse(data.get("id"));
  if (!parsed.success) return { ok: false, message: "Invalid entry." };
  try {
    await deleteStudy(parsed.data);
    invalidateOwnerViews();
    return { ok: true, message: "Study deleted." };
  } catch (error) {
    unstable_rethrow(error);
    return {
      ok: false,
      message: "Could not delete this study. Please try again.",
    };
  }
}
