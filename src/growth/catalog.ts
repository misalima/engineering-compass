import raw from "./catalog-v2.json";
import type { Catalog } from "./model";

// Validated against the frozen competency Standard by catalog.test.ts.
export const GROWTH_CATALOG = raw as Catalog;
export const TOPIC_BY_CODE = new Map(
  GROWTH_CATALOG.topics.map((topic) => [topic.code, topic]),
);
export { topicHref } from "./links";
