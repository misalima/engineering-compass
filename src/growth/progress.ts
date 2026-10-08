import {
  MILESTONES,
  MILESTONE_INFO,
  type CareerProfile,
  type Catalog,
  type CompetencyState,
  type MilestoneId,
  type StudySummary,
  type Topic,
} from "./model";

const rank = (id: MilestoneId) => MILESTONES.indexOf(id);
const languages: Record<string, CareerProfile["primaryStack"]> = {
  "domain.go": "go",
  "domain.typescript-node-js": "typescript",
  "domain.python": "python",
};

/** Select requirements explicitly; a changed stack never rewrites assessment history. */
export function requiredMilestone(
  topic: Topic,
  profile: CareerProfile,
): MilestoneId | null {
  const language = languages[topic.domainCode];
  if (language && language !== profile.primaryStack) {
    // Python remains a supporting skill for AI integration; other languages stay explorable.
    return language === "python" && profile.goal === "backend_ai"
      ? "mid"
      : null;
  }
  if (
    topic.domainCode === "domain.ai-engineering" &&
    profile.goal !== "backend_ai"
  )
    return null;
  return topic.milestone;
}

const toolTopics: Record<string, string[]> = {
  PostgreSQL: ["domain.databases-sql"],
  Redis: [
    "topic.storage-choice",
    "topic.performance-improvements",
    "topic.scaling",
  ],
  Docker: ["topic.containers", "topic.continuous-delivery"],
  React: ["domain.frontend-literacy"],
  OpenTelemetry: ["domain.observability-reliability"],
};

export function buildGrowth(
  catalog: Catalog,
  profile: CareerProfile,
  assessments: CompetencyState[],
  studies: StudySummary[],
) {
  const byCode = new Map(assessments.map((a) => [a.code, a]));
  const studyByTopic = new Map(studies.map((s) => [s.topicCode, s]));
  const topics = catalog.topics.map((topic) => {
    const requirements = topic.competencyCodes.map((code) => ({
      code,
      status: byCode.get(code)?.status ?? "not_started",
      hasEvidence: byCode.get(code)?.hasEvidence ?? false,
    }));
    // N/A never silently removes a career requirement: the published path selects requirements.
    const done = requirements.filter((r) => r.status === "mastered").length;
    const study = studyByTopic.get(topic.code);
    const requiredAt = requiredMilestone(topic, profile);
    const inTarget =
      requiredAt !== null && rank(requiredAt) <= rank(profile.targetMilestone);
    const state =
      done === requirements.length
        ? "Self-assessed as independent"
        : requirements.some((r) => r.status === "review_required")
          ? "Needs reassessment"
          : study
            ? "Studied · capability still to assess"
            : requirements.some((r) => r.status === "in_progress")
              ? "Practicing with help"
              : "No study recorded";
    return {
      ...topic,
      requirements,
      done,
      total: requirements.length,
      studyCount: study?.count ?? 0,
      lastStudiedOn: study?.lastStudiedOn ?? null,
      requiredAt,
      inTarget,
      state,
    };
  });
  const milestones = MILESTONES.map((id) => {
    const requiredTopics = topics.filter(
      (t) => t.requiredAt && rank(t.requiredAt) <= rank(id),
    );
    const requirements = [
      ...new Map(
        requiredTopics.flatMap((t) => t.requirements).map((r) => [r.code, r]),
      ).values(),
    ];
    const done = requirements.filter((r) => r.status === "mastered").length;
    return {
      id,
      ...MILESTONE_INFO[id],
      total: requirements.length,
      done,
      evidenced: requirements.filter(
        (r) => r.status === "mastered" && r.hasEvidence,
      ).length,
      complete: requirements.length > 0 && done === requirements.length,
      topics: requiredTopics,
    };
  });
  const current = [...milestones].reverse().find((m) => m.complete) ?? null;
  const target = milestones.find((m) => m.id === profile.targetMilestone)!;
  const weight = (t: (typeof topics)[number]) => {
    const stack = languages[t.domainCode] === profile.primaryStack ? 10 : 0;
    const tools = profile.stackTools.some((tool) =>
      toolTopics[tool]?.some((key) => key === t.domainCode || key === t.code),
    )
      ? 8
      : 0;
    const backend = /databases|distributed|networking|observability/.test(
      t.domainCode,
    )
      ? 6
      : 0;
    const ai =
      profile.goal === "backend_ai" && t.domainCode === "domain.ai-engineering"
        ? 6
        : 0;
    return stack + tools + backend + ai;
  };
  // Close earlier milestone gaps first. Within that stage: reassessment, momentum, stack/focus, catalog order.
  const candidates = topics
    .filter((t) => t.inTarget && t.done < t.total)
    .sort(
      (a, b) =>
        rank(a.requiredAt!) - rank(b.requiredAt!) ||
        Number(b.requirements.some((r) => r.status === "review_required")) -
          Number(a.requirements.some((r) => r.status === "review_required")) ||
        Number(
          b.studyCount > 0 ||
            b.done > 0 ||
            b.requirements.some((r) => r.status === "in_progress"),
        ) -
          Number(
            a.studyCount > 0 ||
              a.done > 0 ||
              a.requirements.some((r) => r.status === "in_progress"),
          ) ||
        weight(b) - weight(a),
    );
  const focus = candidates[0] ?? null;
  const reason = focus
    ? `${focus.total - focus.done} capability gap${focus.total - focus.done === 1 ? "" : "s"} required by ${MILESTONE_INFO[focus.requiredAt!].title}. ${focus.requiredAt !== profile.targetMilestone ? "Earlier milestone gaps come first. " : ""}${focus.state}. Prioritized by reassessment, existing progress, then your goal and stack.`
    : null;
  return {
    topics,
    milestones,
    current,
    target,
    focus,
    reason,
    alternatives: candidates.slice(1, 4),
  };
}
export type GrowthProgress = ReturnType<typeof buildGrowth>;
