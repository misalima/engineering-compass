import { z } from "zod";
import { ITEM_KINDS } from "@/standard/schema";

/** Not applicable is excluded: it only comes from a versioned track change (spec §4.1). */
export const SELECTABLE_STATUSES = ["not_started", "in_progress", "mastered", "review_required"] as const;

const optionalText = (max: number) =>
  z
    .string()
    .max(max)
    .transform((s) => (s.trim() ? s : null))
    .nullable()
    .default(null);

export const assessmentInput = z.object({
  kind: z.enum(ITEM_KINDS),
  code: z.string().regex(/^[a-z]+(\.[a-z0-9-]+)+$/).max(200),
  status: z.enum(SELECTABLE_STATUSES),
  notesMarkdown: optionalText(20_000),
  evidenceMarkdown: optionalText(20_000),
  reason: optionalText(1_000),
  confidence: z
    .union([z.literal(""), z.coerce.number().int().min(1).max(5)])
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .default(null),
  reviewDueAt: z
    .union([z.literal(""), z.iso.date()])
    .transform((v) => (v ? new Date(`${v}T00:00:00Z`) : null))
    .nullable()
    .default(null),
  projectId: z
    .union([z.literal(""), z.coerce.number().int().positive()])
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .default(null),
});

const formGetter = (formData: FormData) => (k: string) => {
  const v = formData.get(k);
  return typeof v === "string" ? v : undefined;
};

export const projectInput = z.object({
  name: z.string().trim().min(1).max(200),
  description: optionalText(5_000),
  role: optionalText(200),
  period: optionalText(100),
  stack: z
    .string()
    .max(1_000)
    .default("")
    .transform((s) => [...new Set(s.split(",").map((x) => x.trim()).filter(Boolean))]),
  environment: optionalText(200),
  visibility: z.enum(["private", "anonymized", "public"]).default("private"),
});

export function parseProjectForm(formData: FormData) {
  const get = formGetter(formData);
  return projectInput.safeParse({
    name: get("name"),
    description: get("description") ?? null,
    role: get("role") ?? null,
    period: get("period") ?? null,
    stack: get("stack"),
    environment: get("environment") ?? null,
    visibility: get("visibility"),
  });
}

export function parseAssessmentForm(formData: FormData) {
  const get = formGetter(formData);
  return assessmentInput.safeParse({
    kind: get("kind"),
    code: get("code"),
    status: get("status"),
    notesMarkdown: get("notesMarkdown") ?? null,
    evidenceMarkdown: get("evidenceMarkdown") ?? null,
    reason: get("reason") ?? null,
    confidence: get("confidence") ?? null,
    reviewDueAt: get("reviewDueAt") ?? null,
    projectId: get("projectId") ?? null,
  });
}
