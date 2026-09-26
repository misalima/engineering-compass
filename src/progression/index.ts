import type { RequiredLevel, Standard } from "@/standard/schema";

export const STATUSES = ["not_started", "in_progress", "mastered", "review_required", "not_applicable"] as const;
export type Status = (typeof STATUSES)[number];

export const STATUS_LABEL: Record<Status, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  mastered: "Mastered",
  review_required: "Review required",
  not_applicable: "Not applicable",
};

export type Level = "L0" | RequiredLevel;
export const LEVEL_NAME: Record<Level, string> = {
  L0: "Not yet leveled",
  L1: "Programmer",
  L2: "Junior Software Engineer",
  L3: "Software Engineer / Mid-level",
  L4: "Strong Software Engineer",
};

/** Current statuses keyed by stable code. Missing codes are Not started. */
export type Assessments = {
  competencies: Record<string, Status>;
  experiences: Record<string, Status>;
  depthCriteria: Record<string, Status>;
  deployedIntegratedApp: boolean;
};

export type DomainStatus = "not_started" | "in_progress" | "review_required" | "mid_level_complete" | "advanced_in_progress";
export const DOMAIN_STATUS_LABEL: Record<DomainStatus, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  review_required: "Review required",
  mid_level_complete: "Mid-level complete",
  advanced_in_progress: "Advanced in progress",
};

const statusOf = (map: Record<string, Status>, code: string): Status => map[code] ?? "not_started";
const applicable = (s: Status) => s !== "not_applicable";
const open = (s: Status) => applicable(s) && s !== "mastered";

export function domainProgress(domain: Standard["domains"][number], a: Assessments) {
  const items = domain.competencies.map((c) => ({ ...c, status: statusOf(a.competencies, c.code) })).filter((c) => applicable(c.status));
  const mid = items.filter((c) => c.requiredLevel !== "L4");
  const adv = items.filter((c) => c.requiredLevel === "L4");
  const count = (list: typeof items) => ({ mastered: list.filter((c) => c.status === "mastered").length, total: list.length });
  const midComplete = mid.every((c) => c.status === "mastered");
  const reviewRequired = items.filter((c) => c.status === "review_required");
  const nextOpen = mid.find((c) => open(c.status)) ?? adv.find((c) => open(c.status));

  let status: DomainStatus;
  if (reviewRequired.length) status = "review_required";
  else if (midComplete) status = adv.some((c) => open(c.status)) ? "advanced_in_progress" : "mid_level_complete";
  else if (items.every((c) => c.status === "not_started")) status = "not_started";
  else status = "in_progress";

  return { status, midLevel: count(mid), advanced: count(adv), midComplete, reviewRequired: reviewRequired.length, nextRequiredLevel: nextOpen?.requiredLevel ?? null };
}

export function gateComplete(gate: Standard["depthGates"][number], a: Assessments) {
  const criteria = gate.criteria.map((c) => statusOf(a.depthCriteria, c.code)).filter(applicable);
  return criteria.every((s) => s === "mastered");
}

const REQUIRED_GATES = ["depth.go", "depth.database-engineering"];
const PICK_ONE_GATES = ["depth.distributed-systems", "depth.reliability-operations", "depth.ai-engineering"];

/** Part IV: Go + Database + one of {Distributed, Reliability, AI} + any two of the remaining five. */
export function depthGateRule(completed: ReadonlySet<string>) {
  if (!REQUIRED_GATES.every((g) => completed.has(g))) return false;
  const others = [...completed].filter((g) => !REQUIRED_GATES.includes(g));
  return others.some((g) => PICK_ONE_GATES.includes(g)) && others.length >= 3;
}

/**
 * Spec Part III, L2 requirement. Shown as the entry of the Experience Matrix, but it is not an item of the
 * frozen Standard, so it is a single done flag rather than an assessed experience.
 */
export const INTEGRATED_APP = {
  slug: "integrated-application",
  title: "Integrated application",
  statement: "I built and deployed at least one application where frontend, backend, and database work together, rather than completing only isolated exercises.",
} as const;

export type Blocker = { kind: "competency" | "experience" | "depth_gate" | "milestone"; code: string; label: string; status?: Status };

export function progression(standard: Standard, a: Assessments) {
  const competencies = standard.domains.flatMap((d) => d.competencies.map((c) => ({ ...c, domainCode: d.code, status: statusOf(a.competencies, c.code) })));
  const experiences = standard.experiences.map((e) => ({ ...e, status: statusOf(a.experiences, e.code) }));
  const completedGates = new Set(standard.depthGates.filter((g) => gateComplete(g, a)).map((g) => g.code));
  const depthRule = depthGateRule(completedGates);

  const blockersFor = (level: RequiredLevel): Blocker[] => {
    const blockers: Blocker[] = competencies
      .filter((c) => c.requiredLevel === level && open(c.status))
      .map((c) => ({ kind: "competency", code: c.code, label: c.statement, status: c.status }));
    if (level === "L2" && !a.deployedIntegratedApp) blockers.push({ kind: "milestone", code: INTEGRATED_APP.slug, label: `0. ${INTEGRATED_APP.title}` });
    const expRange = level === "L3" ? experiences.filter((e) => e.tier === "core") : level === "L4" ? experiences.filter((e) => e.tier === "strong") : [];
    blockers.push(...expRange.filter((e) => open(e.status)).map((e): Blocker => ({ kind: "experience", code: e.code, label: `${e.number}. ${e.title}`, status: e.status })));
    if (level === "L4" && !depthRule) blockers.push({ kind: "depth_gate", code: "depth.rule", label: "Depth Gate rule: Go + Database + one of {Distributed, Reliability, AI} + two more gates" });
    return blockers;
  };

  const levels: RequiredLevel[] = ["L1", "L2", "L3", "L4"];
  let current: Level = "L0";
  for (const level of levels) {
    if (blockersFor(level).length) break;
    current = level;
  }
  const next = levels[levels.indexOf(current as RequiredLevel) + 1] ?? null;
  const missingForNext = next ? blockersFor(next) : [];

  const domains = standard.domains.map((d) => ({ code: d.code, title: d.title, ...domainProgress(d, a) }));
  const applicableCompetencies = competencies.filter((c) => applicable(c.status));
  const applicableExperiences = experiences.filter((e) => applicable(e.status));

  return {
    level: current,
    nextLevel: next,
    missingForNext,
    domains,
    completedGates,
    metrics: {
      competencyCoverage: { mastered: applicableCompetencies.filter((c) => c.status === "mastered").length, total: applicableCompetencies.length },
      midLevelDomains: { complete: domains.filter((d) => d.midComplete).length, total: domains.length },
      experiences: { completed: applicableExperiences.filter((e) => e.status === "mastered").length, total: applicableExperiences.length },
      coreExperiences: {
        completed: applicableExperiences.filter((e) => e.tier === "core" && e.status === "mastered").length,
        total: applicableExperiences.filter((e) => e.tier === "core").length,
      },
      depth: { ruleSatisfied: depthRule, completedGates: completedGates.size, totalGates: standard.depthGates.length, fullDepth: completedGates.size === standard.depthGates.length },
    },
    reviewRequired: competencies.filter((c) => c.status === "review_required"),
  };
}

export type Progression = ReturnType<typeof progression>;
