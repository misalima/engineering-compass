import { z } from "zod";
import { MILESTONES, STACK_TOOLS } from "./model";

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => v || null);
export const studyInput = z.object({
  topicCode: z
    .string()
    .regex(/^topic\.[a-z0-9-]+$/)
    .max(150),
  studiedOn: z.iso.date(),
  notes: optional(5000),
  link: z
    .union([z.literal(""), z.url({ protocol: /^https?$/ }).max(2000)])
    .transform((v) => v || null),
});
export const profileInput = z.object({
  goal: z.enum(["backend_ai", "backend"]),
  primaryStack: z.enum(["go", "typescript", "python"]),
  stackTools: z
    .array(z.enum(STACK_TOOLS))
    .max(STACK_TOOLS.length)
    .transform((a) => [...new Set(a)]),
  targetMilestone: z.enum(MILESTONES),
});
