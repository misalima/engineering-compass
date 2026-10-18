CREATE TABLE "study_subtopics" (
	"code" text PRIMARY KEY NOT NULL,
	"topic_code" text NOT NULL,
	"title" text NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subtopic_completions" (
	"subtopic_code" text PRIMARY KEY NOT NULL,
	"studied_on" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "study_subtopics" ADD CONSTRAINT "study_subtopics_topic_code_study_topics_code_fk" FOREIGN KEY ("topic_code") REFERENCES "public"."study_topics"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtopic_completions" ADD CONSTRAINT "subtopic_completions_subtopic_code_study_subtopics_code_fk" FOREIGN KEY ("subtopic_code") REFERENCES "public"."study_subtopics"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "study_subtopics_topic_code_index" ON "study_subtopics" USING btree ("topic_code");