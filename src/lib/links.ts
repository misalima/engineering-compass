import type { ItemKind } from "@/standard/schema";

const base: Record<ItemKind, string> = { competency: "/competencies", experience: "/experiences", depth_criterion: "/depth-criteria" };

export const itemHref = (kind: ItemKind, code: string) => `${base[kind]}/${code}`;
export const integratedAppHref = "/experiences/integrated-application";
export const domainHref = (code: string) => `/domains/${code}`;
export const gateHref = (code: string) => `/depth-gates/${code}`;
