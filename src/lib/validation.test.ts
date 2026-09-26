import { describe, expect, it } from "vitest";
import { parseAssessmentForm, parseProjectForm } from "./validation";

const form = (entries: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(entries)) f.set(k, v);
  return f;
};

const base = { kind: "competency", code: "competency.testing.write-tests", status: "mastered" };

describe("parseAssessmentForm", () => {
  it("accepts a status with no notes or evidence", () => {
    const r = parseAssessmentForm(form(base));
    expect(r.success && r.data).toMatchObject({ status: "mastered", notesMarkdown: null, evidenceMarkdown: null, confidence: null, reviewDueAt: null });
  });

  it("clears whitespace-only context to null and keeps real text", () => {
    const r = parseAssessmentForm(form({ ...base, notesMarkdown: "   ", evidenceMarkdown: "[PR](https://github.com)" }));
    expect(r.success && r.data).toMatchObject({ notesMarkdown: null, evidenceMarkdown: "[PR](https://github.com)" });
  });

  it("rejects Not applicable and unknown statuses", () => {
    expect(parseAssessmentForm(form({ ...base, status: "not_applicable" })).success).toBe(false);
    expect(parseAssessmentForm(form({ ...base, status: "done" })).success).toBe(false);
  });

  it("rejects malformed codes, out-of-range confidence, and bad dates", () => {
    expect(parseAssessmentForm(form({ ...base, code: "../etc" })).success).toBe(false);
    expect(parseAssessmentForm(form({ ...base, confidence: "9" })).success).toBe(false);
    expect(parseAssessmentForm(form({ ...base, reviewDueAt: "tomorrow" })).success).toBe(false);
  });

  it("parses optional confidence, review date, and project", () => {
    const r = parseAssessmentForm(form({ ...base, confidence: "4", reviewDueAt: "2026-10-01", projectId: "3" }));
    expect(r.success && r.data).toMatchObject({ confidence: 4, projectId: 3 });
    expect(r.success && r.data.reviewDueAt?.toISOString()).toBe("2026-10-01T00:00:00.000Z");
  });
});

describe("parseProjectForm", () => {
  it("requires a name, dedupes the stack, and defaults to private", () => {
    expect(parseProjectForm(form({ name: "  " })).success).toBe(false);
    const r = parseProjectForm(form({ name: "Compass", stack: "Go, PostgreSQL, ,Go" }));
    expect(r.success && r.data).toMatchObject({ name: "Compass", stack: ["Go", "PostgreSQL"], visibility: "private", role: null });
  });

  it("rejects unknown visibility", () => {
    expect(parseProjectForm(form({ name: "x", visibility: "everyone" })).success).toBe(false);
  });
});
