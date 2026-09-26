import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parseStandard } from "../../scripts/parse-standard";
import { STANDARD_V1_1 as s } from ".";

const competencies = s.domains.flatMap((d) => d.competencies);

describe("Standard v1.1 seed", () => {
  it("matches the counts declared in the spec", () => {
    expect(s.domains).toHaveLength(24);
    expect(competencies).toHaveLength(455);
    const byLevel = Object.groupBy(competencies, (c) => c.requiredLevel);
    expect(Object.fromEntries(Object.entries(byLevel).map(([k, v]) => [k, v?.length]))).toEqual({ L1: 71, L2: 171, L3: 188, L4: 25 });
    expect(s.experiences).toHaveLength(27);
    expect(s.experiences.filter((e) => e.tier === "core")).toHaveLength(15);
    expect(s.depthGates).toHaveLength(8);
    expect(s.depthGates.flatMap((g) => g.criteria)).toHaveLength(42);
  });

  it("has globally unique stable codes", () => {
    const codes = [
      ...s.domains.map((d) => d.code),
      ...competencies.map((c) => c.code),
      ...s.experiences.map((e) => e.code),
      ...s.depthGates.flatMap((g) => [g.code, ...g.criteria.map((c) => c.code)]),
    ];
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("still reflects the frozen spec text", () => {
    const reparsed = parseStandard(readFileSync("docs/standard/standard-v1.1.md", "utf8"));
    expect(reparsed).toEqual(s);
  });
});
