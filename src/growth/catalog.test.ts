import { describe, expect, it } from "vitest";
import { STANDARD_V1_1 } from "@/standard";
import { GROWTH_CATALOG } from "./catalog";
import { MILESTONES } from "./model";

describe("published path v2", () => {
  it("maps every frozen competency exactly once, in the right domain, with usable sources", () => {
    const catalog = GROWTH_CATALOG;
    expect(catalog.competencyStandardVersion).toBe(STANDARD_V1_1.version);
    const sources = new Set(catalog.sources.map((s) => s.id));
    for (const source of catalog.sources)
      expect(new URL(source.url).protocol).toBe("https:");
    const expected = STANDARD_V1_1.domains
      .flatMap((d) => d.competencies.map((c) => c.code))
      .sort();
    const actual = catalog.topics.flatMap((t) => t.competencyCodes).sort();
    expect(actual).toEqual(expected);
    expect(new Set(catalog.topics.map((t) => t.code)).size).toBe(
      catalog.topics.length,
    );
    for (const topic of catalog.topics) {
      expect(MILESTONES).toContain(topic.milestone);
      expect(topic.scope.length).toBeGreaterThan(20);
      expect(topic.competencyCodes.length).toBeGreaterThan(0);
      expect(topic.competencyCodes.length).toBeLessThanOrEqual(10);
      const domain = STANDARD_V1_1.domains.find(
        (d) => d.code === topic.domainCode,
      )!;
      expect(domain).toBeDefined();
      for (const code of topic.competencyCodes)
        expect(domain.competencies.some((c) => c.code === code)).toBe(true);
      expect(topic.sourceIds.length).toBeGreaterThan(0);
      for (const id of topic.sourceIds) expect(sources.has(id)).toBe(true);
    }
  });
});
