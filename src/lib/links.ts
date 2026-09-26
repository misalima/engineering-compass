import type { Level, Requirement } from "@/progression";
import type { ItemKind } from "@/standard/schema";

const base: Record<ItemKind, string> = { competency: "/competencies", experience: "/experiences", depth_criterion: "/depth-criteria" };

export const itemHref = (kind: ItemKind, code: string) => `${base[kind]}/${code}`;
export const integratedAppHref = "/experiences/integrated-application";
export const domainHref = (code: string) => `/domains/${code}`;
export const gateHref = (code: string) => `/depth-gates/${code}`;
export const levelHref = (level: Level) => `/levels/${level}`;

export const requirementHref = (r: Requirement) =>
  ({ competency: itemHref("competency", r.code), experience: itemHref("experience", r.code), milestone: integratedAppHref, depth_gate: "/depth-gates" })[r.kind];

export const requirementGroupHref = (r: Requirement) =>
  ({ competency: domainHref(r.group.code), experience: "/experiences", milestone: integratedAppHref, depth_gate: "/depth-gates" })[r.kind];
