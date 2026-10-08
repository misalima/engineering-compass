"use server";

import { invalidateOwnerViews } from "@/data/invalidate";
import { redirect, unstable_rethrow } from "next/navigation";
import type { ActionState } from "@/app/(app)/actions";
import { createProject, deleteProject, updateProject } from "@/data/projects";
import { parseProjectForm } from "@/lib/validation";

const isId = (id: unknown): id is number => Number.isSafeInteger(id) && (id as number) > 0;

export async function saveProjectAction(id: number | null, _prev: ActionState, formData: FormData): Promise<ActionState> {
  if (id !== null && !isId(id)) return { ok: false, message: "Unknown project." };
  const parsed = parseProjectForm(formData);
  if (!parsed.success) return { ok: false, message: "A name is required and fields must be within their length limits." };

  let createdId: number;
  try {
    if (id !== null) {
      await updateProject(id, parsed.data);
      invalidateOwnerViews();
      return { ok: true, message: "Saved." };
    }
    createdId = await createProject(parsed.data);
  } catch (error) {
    unstable_rethrow(error);
    console.error("saveProject failed", { id, error: (error as Error).message });
    return { ok: false, message: "Could not save the project. Try again." };
  }
  invalidateOwnerViews();
  redirect(`/projects/${createdId}`);
}

export async function deleteProjectAction(id: number) {
  if (isId(id)) await deleteProject(id);
  invalidateOwnerViews();
  redirect("/projects");
}
