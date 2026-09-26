CREATE TYPE "public"."assessment_status" AS ENUM('not_started', 'in_progress', 'mastered', 'review_required', 'not_applicable');--> statement-breakpoint
CREATE TYPE "public"."experience_tier" AS ENUM('core', 'strong');--> statement-breakpoint
CREATE TYPE "public"."item_kind" AS ENUM('competency', 'experience', 'depth_criterion');--> statement-breakpoint
CREATE TYPE "public"."required_level" AS ENUM('L1', 'L2', 'L3', 'L4');--> statement-breakpoint
CREATE TYPE "public"."visibility" AS ENUM('private', 'anonymized', 'public');--> statement-breakpoint
CREATE TABLE "assessment_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"standard_version_id" integer NOT NULL,
	"item_kind" "item_kind" NOT NULL,
	"item_code" text NOT NULL,
	"from_status" "assessment_status" NOT NULL,
	"to_status" "assessment_status" NOT NULL,
	"notes_changed" boolean DEFAULT false NOT NULL,
	"evidence_changed" boolean DEFAULT false NOT NULL,
	"reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "competencies" (
	"id" serial PRIMARY KEY NOT NULL,
	"standard_version_id" integer NOT NULL,
	"domain_id" integer NOT NULL,
	"code" text NOT NULL,
	"order" integer NOT NULL,
	"required_level" "required_level" NOT NULL,
	"statement" text NOT NULL,
	"mastery_criteria" text[],
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "competencies_standard_version_id_code_unique" UNIQUE("standard_version_id","code")
);
--> statement-breakpoint
CREATE TABLE "competency_assessments" (
	"competency_id" integer PRIMARY KEY NOT NULL,
	"status" "assessment_status" DEFAULT 'not_started' NOT NULL,
	"confidence" smallint,
	"notes_markdown" text,
	"evidence_markdown" text,
	"last_reviewed_at" timestamp with time zone,
	"review_due_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "competency_assessments_confidence" CHECK (confidence IS NULL OR confidence BETWEEN 1 AND 5)
);
--> statement-breakpoint
CREATE TABLE "depth_criteria" (
	"id" serial PRIMARY KEY NOT NULL,
	"standard_version_id" integer NOT NULL,
	"depth_gate_id" integer NOT NULL,
	"code" text NOT NULL,
	"order" integer NOT NULL,
	"statement" text NOT NULL,
	CONSTRAINT "depth_criteria_standard_version_id_code_unique" UNIQUE("standard_version_id","code")
);
--> statement-breakpoint
CREATE TABLE "depth_criterion_assessments" (
	"depth_criterion_id" integer PRIMARY KEY NOT NULL,
	"status" "assessment_status" DEFAULT 'not_started' NOT NULL,
	"confidence" smallint,
	"notes_markdown" text,
	"evidence_markdown" text,
	"last_reviewed_at" timestamp with time zone,
	"review_due_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "depth_criterion_assessments_confidence" CHECK (confidence IS NULL OR confidence BETWEEN 1 AND 5)
);
--> statement-breakpoint
CREATE TABLE "depth_gates" (
	"id" serial PRIMARY KEY NOT NULL,
	"standard_version_id" integer NOT NULL,
	"code" text NOT NULL,
	"order" integer NOT NULL,
	"title" text NOT NULL,
	CONSTRAINT "depth_gates_standard_version_id_code_unique" UNIQUE("standard_version_id","code")
);
--> statement-breakpoint
CREATE TABLE "domains" (
	"id" serial PRIMARY KEY NOT NULL,
	"standard_version_id" integer NOT NULL,
	"code" text NOT NULL,
	"order" integer NOT NULL,
	"title" text NOT NULL,
	CONSTRAINT "domains_standard_version_id_code_unique" UNIQUE("standard_version_id","code")
);
--> statement-breakpoint
CREATE TABLE "experience_assessments" (
	"experience_id" integer PRIMARY KEY NOT NULL,
	"project_id" integer,
	"status" "assessment_status" DEFAULT 'not_started' NOT NULL,
	"confidence" smallint,
	"notes_markdown" text,
	"evidence_markdown" text,
	"last_reviewed_at" timestamp with time zone,
	"review_due_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "experience_assessments_confidence" CHECK (confidence IS NULL OR confidence BETWEEN 1 AND 5)
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"standard_version_id" integer NOT NULL,
	"code" text NOT NULL,
	"number" integer NOT NULL,
	"title" text NOT NULL,
	"statement" text NOT NULL,
	"tier" "experience_tier" NOT NULL,
	CONSTRAINT "experiences_standard_version_id_code_unique" UNIQUE("standard_version_id","code")
);
--> statement-breakpoint
CREATE TABLE "knowledge_topics" (
	"id" serial PRIMARY KEY NOT NULL,
	"domain_id" integer NOT NULL,
	"order" integer NOT NULL,
	"label" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profile_settings" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"deployed_integrated_app" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profile_settings_singleton" CHECK (id = 1)
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"role" text,
	"period" text,
	"stack" text[] DEFAULT '{}'::text[] NOT NULL,
	"environment" text,
	"visibility" "visibility" DEFAULT 'private' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "standard_versions" (
	"id" serial PRIMARY KEY NOT NULL,
	"version" text NOT NULL,
	"track" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "standard_versions_version_unique" UNIQUE("version")
);
--> statement-breakpoint
ALTER TABLE "assessment_events" ADD CONSTRAINT "assessment_events_standard_version_id_standard_versions_id_fk" FOREIGN KEY ("standard_version_id") REFERENCES "public"."standard_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "competencies" ADD CONSTRAINT "competencies_standard_version_id_standard_versions_id_fk" FOREIGN KEY ("standard_version_id") REFERENCES "public"."standard_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "competencies" ADD CONSTRAINT "competencies_domain_id_domains_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."domains"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "competency_assessments" ADD CONSTRAINT "competency_assessments_competency_id_competencies_id_fk" FOREIGN KEY ("competency_id") REFERENCES "public"."competencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "depth_criteria" ADD CONSTRAINT "depth_criteria_standard_version_id_standard_versions_id_fk" FOREIGN KEY ("standard_version_id") REFERENCES "public"."standard_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "depth_criteria" ADD CONSTRAINT "depth_criteria_depth_gate_id_depth_gates_id_fk" FOREIGN KEY ("depth_gate_id") REFERENCES "public"."depth_gates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "depth_criterion_assessments" ADD CONSTRAINT "depth_criterion_assessments_depth_criterion_id_depth_criteria_id_fk" FOREIGN KEY ("depth_criterion_id") REFERENCES "public"."depth_criteria"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "depth_gates" ADD CONSTRAINT "depth_gates_standard_version_id_standard_versions_id_fk" FOREIGN KEY ("standard_version_id") REFERENCES "public"."standard_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "domains" ADD CONSTRAINT "domains_standard_version_id_standard_versions_id_fk" FOREIGN KEY ("standard_version_id") REFERENCES "public"."standard_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_assessments" ADD CONSTRAINT "experience_assessments_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_assessments" ADD CONSTRAINT "experience_assessments_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_standard_version_id_standard_versions_id_fk" FOREIGN KEY ("standard_version_id") REFERENCES "public"."standard_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "knowledge_topics" ADD CONSTRAINT "knowledge_topics_domain_id_domains_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."domains"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "assessment_events_created_at_index" ON "assessment_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "assessment_events_item_kind_item_code_index" ON "assessment_events" USING btree ("item_kind","item_code");--> statement-breakpoint
CREATE INDEX "competencies_domain_id_index" ON "competencies" USING btree ("domain_id");