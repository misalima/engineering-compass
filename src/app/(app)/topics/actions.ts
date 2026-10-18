"use server";

import { unstable_rethrow } from "next/navigation";
import { setSubtopicStudied } from "@/data/growth";
import { invalidateOwnerViews } from "@/data/invalidate";

export async function setSubtopicStudiedAction(input: unknown) {
  try {
    await setSubtopicStudied(input);
    invalidateOwnerViews();
    return { ok: true, message: "Study checklist saved." };
  } catch (error) {
    unstable_rethrow(error);
    return {
      ok: false,
      message: "Could not save this item. Please try again.",
    };
  }
}
