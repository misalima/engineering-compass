import { asc, eq } from "drizzle-orm";
import * as t from "./schema";
import type { Db } from "./types";

export type ProjectInput = Omit<typeof t.projects.$inferInsert, "id" | "createdAt" | "updatedAt">;

export const listProjects = (db: Db) => db.select().from(t.projects).orderBy(asc(t.projects.name));

export async function getProject(db: Db, id: number) {
  const [row] = await db.select().from(t.projects).where(eq(t.projects.id, id));
  return row ?? null;
}

export async function createProject(db: Db, input: ProjectInput) {
  const [row] = await db.insert(t.projects).values(input).returning({ id: t.projects.id });
  return row.id;
}

export const updateProject = (db: Db, id: number, input: ProjectInput) =>
  db.update(t.projects).set({ ...input, updatedAt: new Date() }).where(eq(t.projects.id, id));

export const deleteProject = (db: Db, id: number) => db.delete(t.projects).where(eq(t.projects.id, id));

/** Experiences whose current assessment points at this project. */
export const linkedExperiences = (db: Db, projectId: number) =>
  db
    .select({ code: t.experiences.code, number: t.experiences.number, title: t.experiences.title, status: t.experienceAssessments.status })
    .from(t.experienceAssessments)
    .innerJoin(t.experiences, eq(t.experiences.id, t.experienceAssessments.experienceId))
    .where(eq(t.experienceAssessments.projectId, projectId))
    .orderBy(asc(t.experiences.number));
