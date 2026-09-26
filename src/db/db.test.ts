import { beforeAll, describe, expect, it } from "vitest";
import { progression } from "@/progression";
import { STANDARD_V1_1 } from "@/standard";
import { createTestDb } from "@/test/db";
import { listEvents, loadAssessmentDetails, loadStandard, saveAssessment, setDeployedIntegratedApp, toAssessments, type SaveAssessmentInput } from "./queries";
import { createProject, deleteProject, linkedExperiences } from "./projects";
import { seedStandard } from "./seed";
import type { Db } from "./types";

let db: Db;
let versionId: number;
const first = STANDARD_V1_1.domains[0].competencies[0];

const input = (over: Partial<SaveAssessmentInput> = {}): SaveAssessmentInput => ({
  kind: "competency",
  code: first.code,
  status: "in_progress",
  notesMarkdown: null,
  evidenceMarkdown: null,
  confidence: null,
  reviewDueAt: null,
  reason: null,
  ...over,
});

beforeAll(async () => {
  ({ db, versionId } = await createTestDb());
});

describe("seed", () => {
  it("round-trips the Standard exactly and is idempotent", async () => {
    expect(await loadStandard(db, versionId)).toEqual(STANDARD_V1_1);
    const again = await seedStandard(db, STANDARD_V1_1);
    expect(again).toEqual({ versionId, inserted: false });
  });
});

describe("assessments", () => {
  it("persists status plus an event, and context-only edits do not change status", async () => {
    const e1 = await saveAssessment(db, versionId, input());
    expect(e1).toMatchObject({ fromStatus: "not_started", toStatus: "in_progress", notesChanged: false });

    const e2 = await saveAssessment(db, versionId, input({ notesMarkdown: "Read [the docs](https://example.com)", evidenceMarkdown: "PR link" }));
    expect(e2).toMatchObject({ fromStatus: "in_progress", toStatus: "in_progress", notesChanged: true, evidenceChanged: true });

    const details = await loadAssessmentDetails(db, versionId);
    expect(details.competencies.get(first.code)).toMatchObject({ status: "in_progress", notesMarkdown: "Read [the docs](https://example.com)" });
  });

  it("does not write an event when nothing changed", async () => {
    const before = (await listEvents(db, { limit: 100 })).total;
    const noop = await saveAssessment(db, versionId, input({ notesMarkdown: "Read [the docs](https://example.com)", evidenceMarkdown: "PR link" }));
    expect(noop).toBeNull();
    expect((await listEvents(db, { limit: 100 })).total).toBe(before);
  });

  it("keeps notes on regression and records the reason", async () => {
    await saveAssessment(db, versionId, input({ status: "mastered", notesMarkdown: "kept", evidenceMarkdown: null }));
    const regress = await saveAssessment(db, versionId, input({ status: "review_required", notesMarkdown: "kept", reason: "Could not reproduce it" }));
    expect(regress).toMatchObject({ fromStatus: "mastered", toStatus: "review_required", reason: "Could not reproduce it", notesChanged: false });
    const history = await listEvents(db, { limit: 10, kind: "competency", code: first.code });
    expect(history.rows[0].toStatus).toBe("review_required");
    expect(history.rows.map((r) => r.toStatus)).toContain("mastered");
  });

  it("rejects unknown codes and rolls back", async () => {
    await expect(saveAssessment(db, versionId, input({ code: "competency.nope.nope" }))).rejects.toThrow(/Unknown competency/);
  });

  it("feeds progression from the database", async () => {
    await Promise.all(
      STANDARD_V1_1.domains.flatMap((d) => d.competencies).filter((c) => c.requiredLevel === "L1").map((c) => saveAssessment(db, versionId, input({ code: c.code, status: "mastered" }))),
    );
    const standard = await loadStandard(db, versionId);
    expect(progression(standard, toAssessments(await loadAssessmentDetails(db, versionId))).level).toBe("L1");

    await setDeployedIntegratedApp(db, true);
    expect((await loadAssessmentDetails(db, versionId)).deployedIntegratedApp).toBe(true);
  });

  it("tracks experiences and depth criteria the same way", async () => {
    const exp = STANDARD_V1_1.experiences[0];
    const crit = STANDARD_V1_1.depthGates[0].criteria[0];
    await saveAssessment(db, versionId, input({ kind: "experience", code: exp.code, status: "mastered" }));
    await saveAssessment(db, versionId, input({ kind: "depth_criterion", code: crit.code, status: "in_progress" }));
    const details = await loadAssessmentDetails(db, versionId);
    expect(details.experiences.get(exp.code)?.status).toBe("mastered");
    expect(details.depthCriteria.get(crit.code)?.status).toBe("in_progress");
  });
});

describe("projects", () => {
  it("links to experiences and deleting a project keeps the assessment", async () => {
    const exp = STANDARD_V1_1.experiences[1];
    const id = await createProject(db, { name: "Compass", stack: ["Go"] });
    await saveAssessment(db, versionId, input({ kind: "experience", code: exp.code, status: "in_progress", projectId: id }));
    expect(await linkedExperiences(db, id)).toEqual([{ code: exp.code, number: exp.number, title: exp.title, status: "in_progress" }]);

    await deleteProject(db, id);
    const details = await loadAssessmentDetails(db, versionId);
    expect(details.experiences.get(exp.code)).toMatchObject({ status: "in_progress", projectId: null });
  });
});
