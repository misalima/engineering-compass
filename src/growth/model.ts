import type { Status } from "@/progression";

export const MILESTONES = ["foundations", "junior", "mid", "strong"] as const;
export type MilestoneId = (typeof MILESTONES)[number];
export const GOALS = {
  backend_ai: "Backend + AI Software Engineer",
  backend: "Backend Software Engineer",
} as const;
export const STACKS = {
  go: "Go",
  typescript: "TypeScript / Node.js",
  python: "Python",
} as const;
export const STACK_TOOLS = [
  "PostgreSQL",
  "Redis",
  "Docker",
  "React",
  "OpenTelemetry",
] as const;
export type CareerProfile = {
  goal: keyof typeof GOALS;
  primaryStack: keyof typeof STACKS;
  stackTools: string[];
  targetMilestone: MilestoneId;
};
export const DEFAULT_PROFILE: CareerProfile = {
  goal: "backend_ai",
  primaryStack: "go",
  stackTools: ["PostgreSQL", "Docker"],
  targetMilestone: "junior",
};
export const MILESTONE_INFO: Record<
  MilestoneId,
  { title: string; description: string }
> = {
  foundations: {
    title: "Programming foundations",
    description:
      "Explain and debug small programs, use core language tools and make reviewable changes.",
  },
  junior: {
    title: "Junior Software Engineer",
    description:
      "Implement well-scoped changes with review and guidance; validate inputs, test behavior, handle data safely and communicate blockers.",
  },
  mid: {
    title: "Mid-level Software Engineer",
    description:
      "Own a feature with normal team review, make local design decisions, diagnose failures and handle production data and integrations.",
  },
  strong: {
    title: "Strong Software Engineer",
    description:
      "Reason about cross-system failures, performance and operational trade-offs; communicate decisions and help others develop.",
  },
};
export type Topic = {
  code: string;
  domainCode: string;
  title: string;
  scope: string;
  milestone: MilestoneId;
  competencyCodes: string[];
  sourceIds: string[];
};
export type Catalog = {
  version: string;
  competencyStandardVersion: string;
  reviewedAt: string;
  sources: { id: string; title: string; url: string }[];
  topics: Topic[];
};
export type CompetencyState = {
  code: string;
  status: Status;
  hasEvidence: boolean;
};
export type StudySummary = {
  topicCode: string;
  count: number;
  lastStudiedOn: string;
};
export type StudyEntry = {
  id: number;
  topicCode: string;
  studiedOn: string;
  notes: string | null;
  link: string | null;
  createdAt: Date;
};
export const ABILITY_LABEL: Record<Status, string> = {
  not_started: "Not assessed yet",
  in_progress: "Can do with help",
  mastered: "Can do independently",
  review_required: "Needs reassessment",
  not_applicable: "Not applicable",
};
