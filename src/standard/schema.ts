import { z } from "zod";

export const LEVELS = ["L1", "L2", "L3", "L4"] as const;
export type RequiredLevel = (typeof LEVELS)[number];

/** The three kinds of item that can be assessed. */
export const ITEM_KINDS = ["competency", "experience", "depth_criterion"] as const;
export type ItemKind = (typeof ITEM_KINDS)[number];

const code = z.string().regex(/^[a-z]+(\.[a-z0-9-]+)+$/);

export const competencySchema = z.object({
  code,
  order: z.number().int().positive(),
  requiredLevel: z.enum(LEVELS),
  statement: z.string().min(1),
  masteryCriteria: z.array(z.string().min(1)).optional(),
});

export const domainSchema = z.object({
  code,
  order: z.number().int().positive(),
  title: z.string().min(1),
  knowledge: z.array(z.string().min(1)),
  competencies: z.array(competencySchema).min(1),
});

export const experienceSchema = z.object({
  code,
  number: z.number().int().min(1).max(27),
  title: z.string().min(1),
  statement: z.string().min(1),
  tier: z.enum(["core", "strong"]),
});

export const depthGateSchema = z.object({
  code,
  order: z.number().int().positive(),
  title: z.string().min(1),
  criteria: z.array(z.object({ code, order: z.number().int().positive(), statement: z.string().min(1) })).min(1),
});

export const standardSchema = z.object({
  version: z.string(),
  track: z.string(),
  domains: z.array(domainSchema),
  experiences: z.array(experienceSchema),
  depthGates: z.array(depthGateSchema),
});

export type Standard = z.infer<typeof standardSchema>;
export type StandardDomain = Standard["domains"][number];
export type StandardCompetency = StandardDomain["competencies"][number];
export type StandardExperience = Standard["experiences"][number];
export type StandardDepthGate = Standard["depthGates"][number];
