CREATE TYPE "public"."career_goal" AS ENUM('backend_ai', 'backend');--> statement-breakpoint
CREATE TYPE "public"."career_milestone" AS ENUM('foundations', 'junior', 'mid', 'strong');--> statement-breakpoint
CREATE TYPE "public"."primary_stack" AS ENUM('go', 'typescript', 'python');--> statement-breakpoint
CREATE TABLE "career_profiles" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"goal" "career_goal" DEFAULT 'backend_ai' NOT NULL,
	"primary_stack" "primary_stack" DEFAULT 'go' NOT NULL,
	"stack_tools" text[] DEFAULT '{"PostgreSQL","Docker"}'::text[] NOT NULL,
	"target_milestone" "career_milestone" DEFAULT 'junior' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "career_profiles_singleton" CHECK (id = 1)
);
--> statement-breakpoint
CREATE TABLE "study_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"topic_code" text NOT NULL,
	"studied_on" date NOT NULL,
	"notes" text,
	"link" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "study_entries_notes_length" CHECK (notes IS NULL OR length(notes) <= 5000),
	CONSTRAINT "study_entries_link_http" CHECK (link IS NULL OR link ~ '^https?://')
);
--> statement-breakpoint
CREATE TABLE "study_topics" (
	"code" text PRIMARY KEY NOT NULL,
	"catalog_version" text NOT NULL,
	"domain_id" integer NOT NULL,
	"title" text NOT NULL,
	"scope" text NOT NULL,
	"first_milestone" "career_milestone" NOT NULL,
	"source_ids" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "topic_competencies" (
	"topic_code" text NOT NULL,
	"competency_id" integer NOT NULL,
	CONSTRAINT "topic_competencies_topic_code_competency_id_pk" PRIMARY KEY("topic_code","competency_id")
);
--> statement-breakpoint
ALTER TABLE "study_entries" ADD CONSTRAINT "study_entries_topic_code_study_topics_code_fk" FOREIGN KEY ("topic_code") REFERENCES "public"."study_topics"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "study_topics" ADD CONSTRAINT "study_topics_domain_id_domains_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."domains"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topic_competencies" ADD CONSTRAINT "topic_competencies_topic_code_study_topics_code_fk" FOREIGN KEY ("topic_code") REFERENCES "public"."study_topics"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topic_competencies" ADD CONSTRAINT "topic_competencies_competency_id_competencies_id_fk" FOREIGN KEY ("competency_id") REFERENCES "public"."competencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "study_entries_topic_code_studied_on_index" ON "study_entries" USING btree ("topic_code","studied_on");--> statement-breakpoint
CREATE INDEX "study_entries_studied_on_id_index" ON "study_entries" USING btree ("studied_on","id");--> statement-breakpoint
CREATE INDEX "study_topics_domain_id_index" ON "study_topics" USING btree ("domain_id");--> statement-breakpoint
CREATE INDEX "topic_competencies_competency_id_index" ON "topic_competencies" USING btree ("competency_id");