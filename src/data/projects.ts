import "server-only";
import * as repo from "@/db/projects";
import { ownerDb } from "./auth";

export type { ProjectInput } from "@/db/projects";

export async function listProjects() {
  return repo.listProjects(await ownerDb());
}

export async function getProjectWithExperiences(id: number) {
  const db = await ownerDb();
  const project = await repo.getProject(db, id);
  return project ? { project, experiences: await repo.linkedExperiences(db, id) } : null;
}

export async function createProject(input: repo.ProjectInput) {
  return repo.createProject(await ownerDb(), input);
}

export async function updateProject(id: number, input: repo.ProjectInput) {
  await repo.updateProject(await ownerDb(), id, input);
}

export async function deleteProject(id: number) {
  await repo.deleteProject(await ownerDb(), id);
}
