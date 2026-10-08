import { sql } from "drizzle-orm";
import { boolean, check, date, index, integer, primaryKey, pgEnum, pgTable, serial, smallint, text, timestamp, unique } from "drizzle-orm/pg-core";
import { ITEM_KINDS } from "../standard/schema";

export const requiredLevel = pgEnum("required_level", ["L1", "L2", "L3", "L4"]);
export const assessmentStatus = pgEnum("assessment_status", ["not_started", "in_progress", "mastered", "review_required", "not_applicable"]);
export const experienceTier = pgEnum("experience_tier", ["core", "strong"]);
export const itemKind = pgEnum("item_kind", ITEM_KINDS);
export const visibility = pgEnum("visibility", ["private", "anonymized", "public"]);

const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
const updatedAt = () => timestamp("updated_at", { withTimezone: true }).notNull().defaultNow();

// Standard (immutable once seeded)

export const standardVersions = pgTable("standard_versions", {
  id: serial("id").primaryKey(),
  version: text("version").notNull().unique(),
  track: text("track").notNull(),
  createdAt: createdAt(),
});

export const domains = pgTable(
  "domains",
  {
    id: serial("id").primaryKey(),
    standardVersionId: integer("standard_version_id").notNull().references(() => standardVersions.id),
    code: text("code").notNull(),
    order: integer("order").notNull(),
    title: text("title").notNull(),
  },
  (t) => [unique().on(t.standardVersionId, t.code)],
);

export const knowledgeTopics = pgTable("knowledge_topics", {
  id: serial("id").primaryKey(),
  domainId: integer("domain_id").notNull().references(() => domains.id),
  order: integer("order").notNull(),
  label: text("label").notNull(),
});

export const competencies = pgTable(
  "competencies",
  {
    id: serial("id").primaryKey(),
    standardVersionId: integer("standard_version_id").notNull().references(() => standardVersions.id),
    domainId: integer("domain_id").notNull().references(() => domains.id),
    code: text("code").notNull(),
    order: integer("order").notNull(),
    requiredLevel: requiredLevel("required_level").notNull(),
    statement: text("statement").notNull(),
    masteryCriteria: text("mastery_criteria").array(),
    createdAt: createdAt(),
  },
  (t) => [unique().on(t.standardVersionId, t.code), index().on(t.domainId)],
);

export const experiences = pgTable(
  "experiences",
  {
    id: serial("id").primaryKey(),
    standardVersionId: integer("standard_version_id").notNull().references(() => standardVersions.id),
    code: text("code").notNull(),
    number: integer("number").notNull(),
    title: text("title").notNull(),
    statement: text("statement").notNull(),
    tier: experienceTier("tier").notNull(),
  },
  (t) => [unique().on(t.standardVersionId, t.code)],
);

export const depthGates = pgTable(
  "depth_gates",
  {
    id: serial("id").primaryKey(),
    standardVersionId: integer("standard_version_id").notNull().references(() => standardVersions.id),
    code: text("code").notNull(),
    order: integer("order").notNull(),
    title: text("title").notNull(),
  },
  (t) => [unique().on(t.standardVersionId, t.code)],
);

export const depthCriteria = pgTable(
  "depth_criteria",
  {
    id: serial("id").primaryKey(),
    standardVersionId: integer("standard_version_id").notNull().references(() => standardVersions.id),
    depthGateId: integer("depth_gate_id").notNull().references(() => depthGates.id),
    code: text("code").notNull(),
    order: integer("order").notNull(),
    statement: text("statement").notNull(),
  },
  (t) => [unique().on(t.standardVersionId, t.code)],
);

// Owner data (single-user MVP: no user_id columns)

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  role: text("role"),
  period: text("period"),
  stack: text("stack").array().notNull().default(sql`'{}'::text[]`),
  environment: text("environment"),
  visibility: visibility("visibility").notNull().default("private"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

const assessmentColumns = () => ({
  status: assessmentStatus("status").notNull().default("not_started"),
  confidence: smallint("confidence"),
  notesMarkdown: text("notes_markdown"),
  evidenceMarkdown: text("evidence_markdown"),
  lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }),
  reviewDueAt: timestamp("review_due_at", { withTimezone: true }),
  updatedAt: updatedAt(),
});

const confidenceRange = (name: string) => check(name, sql`confidence IS NULL OR confidence BETWEEN 1 AND 5`);

export const competencyAssessments = pgTable(
  "competency_assessments",
  { competencyId: integer("competency_id").primaryKey().references(() => competencies.id), ...assessmentColumns() },
  () => [confidenceRange("competency_assessments_confidence")],
);

export const experienceAssessments = pgTable(
  "experience_assessments",
  {
    experienceId: integer("experience_id").primaryKey().references(() => experiences.id),
    projectId: integer("project_id").references(() => projects.id, { onDelete: "set null" }),
    ...assessmentColumns(),
  },
  () => [confidenceRange("experience_assessments_confidence")],
);

export const depthCriterionAssessments = pgTable(
  "depth_criterion_assessments",
  { depthCriterionId: integer("depth_criterion_id").primaryKey().references(() => depthCriteria.id), ...assessmentColumns() },
  () => [confidenceRange("depth_criterion_assessments_confidence")],
);

/** Append-only history. `fromStatus`/`toStatus` are equal for context-only edits. */
export const assessmentEvents = pgTable(
  "assessment_events",
  {
    id: serial("id").primaryKey(),
    standardVersionId: integer("standard_version_id").notNull().references(() => standardVersions.id),
    itemKind: itemKind("item_kind").notNull(),
    itemCode: text("item_code").notNull(),
    fromStatus: assessmentStatus("from_status").notNull(),
    toStatus: assessmentStatus("to_status").notNull(),
    notesChanged: boolean("notes_changed").notNull().default(false),
    evidenceChanged: boolean("evidence_changed").notNull().default(false),
    reason: text("reason"),
    createdAt: createdAt(),
  },
  (t) => [index().on(t.createdAt), index().on(t.itemKind, t.itemCode)],
);

export const profileSettings = pgTable(
  "profile_settings",
  {
    id: integer("id").primaryKey().default(1),
    deployedIntegratedApp: boolean("deployed_integrated_app").notNull().default(false),
    updatedAt: updatedAt(),
  },
  () => [check("profile_settings_singleton", sql`id = 1`)],
);

// Career path v2 extends the immutable v1.1 competency identities.
export const careerGoal = pgEnum("career_goal", ["backend_ai", "backend"]);
export const primaryStack = pgEnum("primary_stack", ["go", "typescript", "python"]);
export const careerMilestone = pgEnum("career_milestone", ["foundations", "junior", "mid", "strong"]);

export const careerProfiles = pgTable("career_profiles", {
  id: integer("id").primaryKey().default(1),
  goal: careerGoal("goal").notNull().default("backend_ai"),
  primaryStack: primaryStack("primary_stack").notNull().default("go"),
  stackTools: text("stack_tools").array().notNull().default(sql`'{"PostgreSQL","Docker"}'::text[]`),
  targetMilestone: careerMilestone("target_milestone").notNull().default("junior"),
  updatedAt: updatedAt(),
}, () => [check("career_profiles_singleton", sql`id = 1`)]);

export const studyTopics = pgTable("study_topics", {
  code: text("code").primaryKey(),
  catalogVersion: text("catalog_version").notNull(),
  domainId: integer("domain_id").notNull().references(() => domains.id),
  title: text("title").notNull(),
  scope: text("scope").notNull(),
  firstMilestone: careerMilestone("first_milestone").notNull(),
  sourceIds: text("source_ids").array().notNull(),
}, (t) => [index().on(t.domainId)]);

export const topicCompetencies = pgTable("topic_competencies", {
  topicCode: text("topic_code").notNull().references(() => studyTopics.code),
  competencyId: integer("competency_id").notNull().references(() => competencies.id),
}, (t) => [primaryKey({ columns: [t.topicCode, t.competencyId] }), index().on(t.competencyId)]);

export const studyEntries = pgTable("study_entries", {
  id: serial("id").primaryKey(),
  topicCode: text("topic_code").notNull().references(() => studyTopics.code),
  studiedOn: date("studied_on").notNull(),
  notes: text("notes"),
  link: text("link"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (t) => [index().on(t.topicCode, t.studiedOn), index().on(t.studiedOn, t.id),
  check("study_entries_notes_length", sql`notes IS NULL OR length(notes) <= 5000`),
  check("study_entries_link_http", sql`link IS NULL OR link ~ '^https?://'`),
]);
