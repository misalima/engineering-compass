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

/** Competencies group by domain; the other requirement kinds each form one group. */
export type Requirement = {
  kind: "competency" | "experience" | "depth_gate" | "milestone";
  code: string;
  label: string;
  status: Status;
  group: { code: string; title: string };
};
const met = (r: Requirement) => r.status === "mastered";

export function groupRequirements(requirements: Requirement[]) {
  const groups = new Map<string, { code: string; title: string; requirements: Requirement[]; done: number }>();
  for (const r of requirements) {
    const g = groups.get(r.group.code) ?? { ...r.group, requirements: [], done: 0 };
    g.requirements.push(r);
    if (met(r)) g.done++;
    groups.set(r.group.code, g);
  }
  return [...groups.values()];
}

export type Recommendation = {
  requirement: Requirement;
  reason: "review" | "started" | "closest" | "start";
  group: ReturnType<typeof groupRequirements>[number];
};

/** Momentum: Review required, then In progress, then the group closest to done, then Standard order. */
export function recommend(requirements: Requirement[]): Recommendation | null {
  const groups = groupRequirements(requirements);
  const groupOf = (r: Requirement) => groups.find((g) => g.code === r.group.code)!;
  const share = (r: Requirement) => groupOf(r).done / groupOf(r).requirements.length;
  const closest = (list: Requirement[]) => [...list].sort((x, y) => share(y) - share(x))[0];
  const make = (requirement: Requirement, reason: Recommendation["reason"]) => ({ requirement, reason, group: groupOf(requirement) });

  const remaining = requirements.filter((r) => !met(r));
  if (!remaining.length) return null;
  const review = remaining.filter((r) => r.status === "review_required");
  if (review.length) return make(closest(review), "review");
  const started = remaining.filter((r) => r.status === "in_progress");
  if (started.length) return make(closest(started), "started");
  const best = closest(remaining);
  return share(best) > 0 ? make(best, "closest") : make(remaining[0], "start");
}

const EXPERIENCES_GROUP = { code: "experiences", title: "Engineering experiences" };
const DEPTH_GROUP = { code: "depth-gates", title: "Depth Gates" };

export function progression(standard: Standard, a: Assessments) {
  const competencies = standard.domains.flatMap((d) =>
    d.competencies.map((c) => ({ ...c, domainCode: d.code, domainTitle: d.title, status: statusOf(a.competencies, c.code) })),
  );
  const experiences = standard.experiences.map((e) => ({ ...e, status: statusOf(a.experiences, e.code) }));
  const completedGates = new Set(standard.depthGates.filter((g) => gateComplete(g, a)).map((g) => g.code));
  const depthRule = depthGateRule(completedGates);

  const requirementsFor = (level: RequiredLevel): Requirement[] => {
    const requirements: Requirement[] = competencies
      .filter((c) => c.requiredLevel === level && applicable(c.status))
      .map((c) => ({ kind: "competency", code: c.code, label: c.statement, status: c.status, group: { code: c.domainCode, title: c.domainTitle } }));
    if (level === "L2") {
      requirements.push({
        kind: "milestone",
        code: INTEGRATED_APP.slug,
        label: INTEGRATED_APP.title,
        status: a.deployedIntegratedApp ? "mastered" : "not_started",
        group: { code: INTEGRATED_APP.slug, title: INTEGRATED_APP.title },
      });
    }
    const tier = level === "L3" ? "core" : level === "L4" ? "strong" : null;
    requirements.push(
      ...experiences
        .filter((e) => e.tier === tier && applicable(e.status))
        .map((e): Requirement => ({ kind: "experience", code: e.code, label: `${e.number}. ${e.title}`, status: e.status, group: EXPERIENCES_GROUP })),
    );
    if (level === "L4") {
      requirements.push({
        kind: "depth_gate",
        code: "depth.rule",
        label: "Depth Gate rule: Go + Database + one of {Distributed, Reliability, AI} + two more gates",
        status: depthRule ? "mastered" : completedGates.size ? "in_progress" : "not_started",
        group: DEPTH_GROUP,
      });
    }
    return requirements;
  };

  const levels: RequiredLevel[] = ["L1", "L2", "L3", "L4"];
  const ladder = levels.map((level) => {
    const requirements = requirementsFor(level);
    return { level, requirements, done: requirements.filter(met).length, total: requirements.length };
  });
  let current: Level = "L0";
  for (const rung of ladder) {
    if (rung.done < rung.total) break;
    current = rung.level;
  }
  const next = levels[levels.indexOf(current as RequiredLevel) + 1] ?? null;
  const missingForNext = next ? ladder.find((r) => r.level === next)!.requirements.filter((r) => !met(r)) : [];

  const domains = standard.domains.map((d) => ({ code: d.code, title: d.title, ...domainProgress(d, a) }));
  const applicableCompetencies = competencies.filter((c) => applicable(c.status));
  const applicableExperiences = experiences.filter((e) => applicable(e.status));

  return {
    level: current,
    nextLevel: next,
    ladder,
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
