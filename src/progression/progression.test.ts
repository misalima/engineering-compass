import { describe, expect, it } from "vitest";
import { STANDARD_V1_1 as standard } from "@/standard";
import type { RequiredLevel } from "@/standard/schema";
import { depthGateRule, progression, type Assessments, type Status } from ".";

const competencies = standard.domains.flatMap((d) => d.competencies);

function assessments(opts: { upTo?: RequiredLevel; coreExperiences?: boolean; allExperiences?: boolean; gates?: string[]; deployed?: boolean } = {}): Assessments {
  const order = ["L1", "L2", "L3", "L4"];
  const max = opts.upTo ? order.indexOf(opts.upTo) : -1;
  return {
    competencies: Object.fromEntries(competencies.filter((c) => order.indexOf(c.requiredLevel) <= max).map((c) => [c.code, "mastered" as Status])),
    experiences: Object.fromEntries(
      standard.experiences.filter((e) => opts.allExperiences || (opts.coreExperiences && e.tier === "core")).map((e) => [e.code, "mastered" as Status]),
    ),
    depthCriteria: Object.fromEntries(
      standard.depthGates.filter((g) => opts.gates?.includes(g.code)).flatMap((g) => g.criteria.map((c) => [c.code, "mastered" as Status])),
    ),
    deployedIntegratedApp: opts.deployed ?? false,
  };
}

const L4_GATES = ["depth.go", "depth.database-engineering", "depth.ai-engineering", "depth.security", "depth.performance"];

describe("level derivation", () => {
  it("starts at L0 with nothing mastered", () => {
    const p = progression(standard, assessments());
    expect(p.level).toBe("L0");
    expect(p.nextLevel).toBe("L1");
    expect(p.missingForNext).toHaveLength(71);
  });

  it("reaches L1 with every L1 competency mastered", () => {
    expect(progression(standard, assessments({ upTo: "L1" })).level).toBe("L1");
  });

  it("requires the deployed integrated application for L2", () => {
    const without = progression(standard, assessments({ upTo: "L2" }));
    expect(without.level).toBe("L1");
    expect(without.missingForNext).toEqual([expect.objectContaining({ kind: "milestone" })]);
    expect(progression(standard, assessments({ upTo: "L2", deployed: true })).level).toBe("L2");
  });

  it("requires experiences 1–15 for L3 and does not need L4 competencies", () => {
    expect(progression(standard, assessments({ upTo: "L3", deployed: true })).level).toBe("L2");
    const p = progression(standard, assessments({ upTo: "L3", deployed: true, coreExperiences: true }));
    expect(p.level).toBe("L3");
    expect(p.missingForNext.some((b) => b.kind === "depth_gate")).toBe(true);
  });

  it("reaches L4 with L4 competencies, all experiences, and the depth rule (not 8/8)", () => {
    const p = progression(standard, assessments({ upTo: "L4", deployed: true, allExperiences: true, gates: L4_GATES }));
    expect(p.level).toBe("L4");
    expect(p.nextLevel).toBeNull();
    expect(p.metrics.depth).toMatchObject({ ruleSatisfied: true, completedGates: 5, fullDepth: false });
  });

  it("does not skip a level when a higher one is satisfied but a lower one is not", () => {
    const a = assessments({ upTo: "L4", deployed: true, allExperiences: true, gates: L4_GATES });
    a.competencies[competencies.find((c) => c.requiredLevel === "L1")!.code] = "in_progress";
    expect(progression(standard, a).level).toBe("L0");
  });

  it("regresses when a mastered competency moves to Review required", () => {
    const a = assessments({ upTo: "L2", deployed: true });
    const l2 = competencies.find((c) => c.requiredLevel === "L2")!;
    a.competencies[l2.code] = "review_required";
    const p = progression(standard, a);
    expect(p.level).toBe("L1");
    expect(p.reviewRequired.map((c) => c.code)).toEqual([l2.code]);
  });

  it("removes Not applicable competencies from the denominator and the requirements", () => {
    const a = assessments({ upTo: "L1" });
    const l1 = competencies.find((c) => c.requiredLevel === "L1")!;
    a.competencies[l1.code] = "not_applicable";
    const p = progression(standard, a);
    expect(p.level).toBe("L1");
    expect(p.metrics.competencyCoverage).toEqual({ mastered: 70, total: 454 });
  });
});

describe("domain status", () => {
  const domain = standard.domains.find((d) => d.code === "domain.ai-engineering")!;
  const statusOf = (a: Assessments) => progression(standard, a).domains.find((d) => d.code === domain.code)!;
  const mark = (filter: (level: RequiredLevel) => boolean, status: Status): Assessments => ({
    ...assessments(),
    competencies: Object.fromEntries(domain.competencies.filter((c) => filter(c.requiredLevel)).map((c) => [c.code, status])),
  });

  it("is Not started, In progress, then Advanced in progress, then Mid-level complete", () => {
    expect(statusOf(assessments()).status).toBe("not_started");
    expect(statusOf({ ...assessments(), competencies: { [domain.competencies[0].code]: "in_progress" } }).status).toBe("in_progress");
    const mid = statusOf(mark((l) => l !== "L4", "mastered"));
    expect(mid.status).toBe("advanced_in_progress");
    expect(mid.midComplete).toBe(true);
    expect(statusOf(mark(() => true, "mastered")).status).toBe("mid_level_complete");
  });

  it("shows Review required ahead of everything else", () => {
    const a = mark(() => true, "mastered");
    a.competencies[domain.competencies[0].code] = "review_required";
    const d = statusOf(a);
    expect(d.status).toBe("review_required");
    expect(d.midComplete).toBe(false);
  });

  it("counts mid-level and advanced items separately", () => {
    const d = statusOf(mark((l) => l !== "L4", "mastered"));
    expect(d.midLevel.mastered).toBe(d.midLevel.total);
    expect(d.advanced.mastered).toBe(0);
    expect(d.nextRequiredLevel).toBe("L4");
  });
});

describe("experience and depth gates", () => {
  it("counts core and total experiences", () => {
    const p = progression(standard, assessments({ coreExperiences: true }));
    expect(p.metrics.coreExperiences).toEqual({ completed: 15, total: 15 });
    expect(p.metrics.experiences).toEqual({ completed: 15, total: 27 });
  });

  it("completes a gate only when every criterion is mastered", () => {
    const a = assessments({ gates: ["depth.go"] });
    expect(progression(standard, a).completedGates.has("depth.go")).toBe(true);
    a.depthCriteria[standard.depthGates[0].criteria[0].code] = "in_progress";
    expect(progression(standard, a).completedGates.has("depth.go")).toBe(false);
  });

  it("applies the Part IV depth rule", () => {
    const rule = (gates: string[]) => depthGateRule(new Set(gates));
    expect(rule(L4_GATES)).toBe(true);
    expect(rule(["depth.go", "depth.database-engineering", "depth.distributed-systems", "depth.reliability-operations", "depth.ai-engineering"])).toBe(true);
    expect(rule(["depth.go", "depth.database-engineering", "depth.security", "depth.performance", "depth.architecture"])).toBe(false);
    expect(rule(["depth.go", "depth.ai-engineering", "depth.security", "depth.performance", "depth.architecture"])).toBe(false);
    expect(rule(["depth.go", "depth.database-engineering", "depth.ai-engineering", "depth.security"])).toBe(false);
  });

  it("marks the Full Depth badge only at 8/8", () => {
    const p = progression(standard, assessments({ gates: standard.depthGates.map((g) => g.code) }));
    expect(p.metrics.depth.fullDepth).toBe(true);
  });
});
