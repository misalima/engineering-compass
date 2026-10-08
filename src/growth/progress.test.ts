import { describe, expect, it } from "vitest";
import { GROWTH_CATALOG as catalog } from "./catalog";
import {
  DEFAULT_PROFILE,
  MILESTONES,
  type CareerProfile,
  type CompetencyState,
} from "./model";
import { buildGrowth } from "./progress";

const profile: CareerProfile = { ...DEFAULT_PROFILE, targetMilestone: "mid" };
const run = (
  assessments: CompetencyState[] = [],
  studies: Parameters<typeof buildGrowth>[3] = [],
  p = profile,
) => buildGrowth(catalog, p, assessments, studies);
const mastered = (code: string, hasEvidence = false): CompetencyState => ({
  code,
  status: "mastered",
  hasEvidence,
});

describe("career progression", () => {
  it("never promotes study activity into capability or evidence", () => {
    const noStudy = run();
    const studied = run(
      [],
      catalog.topics.map((t) => ({
        topicCode: t.code,
        count: 10,
        lastStudiedOn: "2026-10-05",
      })),
    );
    expect(studied.current).toBeNull();
    expect(studied.target.done).toBe(noStudy.target.done);
    expect(studied.target.evidenced).toBe(0);
    expect(studied.focus?.studyCount).toBe(10);
  });
  it("selects the primary language and supporting Python for AI; unrelated language gaps do not block", () => {
    const p = { ...profile, primaryStack: "typescript" as const };
    const result = run([], [], p);
    expect(result.target.topics.some((t) => t.domainCode === "domain.go")).toBe(
      false,
    );
    expect(
      result.target.topics.some((t) => t.domainCode === "domain.python"),
    ).toBe(true);
    expect(
      result.milestones[0].topics.some(
        (t) => t.domainCode === "domain.typescript-node-js",
      ),
    ).toBe(true);
    const backend = run([], [], { ...p, goal: "backend" });
    expect(
      backend.target.topics.some(
        (t) =>
          t.domainCode === "domain.ai-engineering" ||
          t.domainCode === "domain.python",
      ),
    ).toBe(false);
  });
  it("requires earlier milestones cumulatively and regresses when a capability needs review", () => {
    const junior = run([], [], {
      ...profile,
      targetMilestone: "junior",
    }).target;
    const assessments = junior.topics.flatMap((t) =>
      t.competencyCodes.map((code) => mastered(code, true)),
    );
    const complete = run(assessments);
    expect(complete.current?.id).toBe("junior");
    expect(complete.milestones[1].evidenced).toBe(junior.total);
    assessments[0] = { ...assessments[0], status: "review_required" };
    expect(run(assessments).current).toBeNull();
    expect(run(assessments).focus?.competencyCodes).toContain(
      assessments[0].code,
    );
  });
  it("does not satisfy a published requirement with not_applicable", () => {
    const all = catalog.topics.flatMap((t) =>
      t.competencyCodes.map(
        (code): CompetencyState => ({
          code,
          status: "not_applicable",
          hasEvidence: false,
        }),
      ),
    );
    expect(run(all).current).toBeNull();
    expect(run(all).target.total).toBe(run().target.total);
  });
  it("prioritizes earlier gaps, then reassessment, momentum, and stack tools deterministically", () => {
    const base = run();
    const first = base.focus!;
    expect(first.requiredAt).toBe("foundations");
    const other = base.topics.find(
      (t) => t.requiredAt === "foundations" && t.code !== first.code,
    )!;
    const studied = run(
      [],
      [{ topicCode: other.code, count: 1, lastStudiedOn: "2026-10-05" }],
    );
    expect(studied.focus?.code).toBe(other.code);
    const assessed = [
      {
        code: first.competencyCodes[0],
        status: "review_required" as const,
        hasEvidence: false,
      },
    ];
    expect(
      run(assessed, [
        { topicCode: other.code, count: 1, lastStudiedOn: "2026-10-05" },
      ]).focus?.code,
    ).toBe(first.code);
    expect(run().focus).toEqual(base.focus);
    const foundations = base.milestones[0].topics.flatMap((t) =>
      t.competencyCodes.map((c) => mastered(c)),
    );
    const noTools = run(foundations, [], { ...profile, stackTools: [] });
    // Completing language topics exposes same-stage differences driven by selected tools.
    const language = base.topics
      .filter((t) => t.domainCode === "domain.go")
      .flatMap((t) => t.competencyCodes.map((c) => mastered(c)));
    const withDocker = run([...foundations, ...language], [], {
      ...profile,
      stackTools: ["Docker"],
    });
    expect(withDocker.focus?.code).toBe("topic.containers");
    expect(noTools.focus?.requiredAt).toBe("junior");
  });
  it("finishes cleanly without an empty-path promotion or phantom recommendation", () => {
    const all = catalog.topics.flatMap((t) =>
      t.competencyCodes.map((c) => mastered(c)),
    );
    for (const targetMilestone of MILESTONES)
      expect(run(all, [], { ...profile, targetMilestone }).focus).toBeNull();
    expect(run(all).current?.id).toBe("strong");
    expect(
      buildGrowth({ ...catalog, topics: [] }, profile, [], []).current,
    ).toBeNull();
  });
});
