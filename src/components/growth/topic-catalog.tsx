"use client";
import { IconArrow } from "@/components/icons";
import { DomainBadge } from "./domain-badge";
import Link from "next/link";
import { useMemo, useState } from "react";
import { topicHref } from "@/growth/links";

export type TopicCard = {
  code: string;
  title: string;
  scope: string;
  domainCode: string;
  domainTitle: string;
  state: string;
  inTarget: boolean;
  requirementLabel: string;
  done: number;
  total: number;
  studyCount: number;
};
export function TopicCatalog({
  topics,
  targetTitle,
}: {
  topics: TopicCard[];
  targetTitle: string;
}) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("");
  const [scope, setScope] = useState("all");
  const [view, setView] = useState<"cards" | "list">("cards");
  const domains = [
    ...new Map(topics.map((t) => [t.domainCode, t.domainTitle])).entries(),
  ];
  const matching = useMemo(
    () =>
      topics.filter(
        (t) =>
          (!domain || t.domainCode === domain) &&
          (!query.trim() ||
            `${t.title} ${t.scope} ${t.domainTitle}`
              .toLowerCase()
              .includes(query.trim().toLowerCase())),
      ),
    [topics, query, domain],
  );
  const visible = useMemo(
    () => matching.filter((t) => scope === "all" || t.inTarget),
    [matching, scope],
  );
  const hiddenByMilestone = matching.length - visible.length;
  const control =
    "mt-2 min-h-11 w-full rounded-[var(--radius-sm)] border border-line-strong bg-surface-panel px-3 text-sm";
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
        <label className="text-xs text-ink-secondary">
          Search topics
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Transactions, API contracts, evaluation…"
            className={control}
          />
        </label>
        <label className="text-xs text-ink-secondary">
          Domain
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className={control}
          >
            <option value="">All domains</option>
            {domains.map(([code, title]) => (
              <option key={code} value={code}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-ink-secondary">
          Show
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className={control}
          >
            <option value="all">Full catalog</option>
            <option value="target">{targetTitle} requirements</option>
          </select>
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p aria-live="polite" className="text-xs text-ink-faint">
          Showing {visible.length} of {matching.length} topics matching your
          search and domain.
          {scope === "target"
            ? ` Filtered to ${targetTitle}.`
            : " Full catalog, showing all milestones and languages."}
        </p>
        <div
          role="group"
          aria-label="Topic view"
          className="flex shrink-0 rounded-[var(--radius-sm)] border border-line bg-surface-panel p-1"
        >
          {(["cards", "list"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={view === mode}
              onClick={() => setView(mode)}
              className={`min-h-10 cursor-pointer rounded-[var(--radius-sm)] px-4 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-accent ${view === mode ? "bg-surface-raised font-semibold text-accent" : "text-ink-muted hover:text-ink"}`}
            >
              {mode === "cards" ? "Cards" : "List"}
            </button>
          ))}
        </div>
      </div>
      {hiddenByMilestone > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-sm)] bg-surface-panel px-4 py-3 text-sm">
          <p className="text-ink-secondary">
            {hiddenByMilestone} topics are outside your current milestone or
            selected career path.
          </p>
          <button
            type="button"
            onClick={() => setScope("all")}
            className="min-h-10 cursor-pointer text-accent hover:underline"
          >
            Show all matching topics{" "}
            <IconArrow className="ml-1 inline-block size-3.5 shrink-0 align-middle" />
          </button>
        </div>
      ) : null}
      {view === "list" ? (
        <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-panel">
          {visible.map((t) => (
            <li key={t.code}>
              <Link
                href={topicHref(t.code)}
                className="group grid gap-3 px-4 py-4 transition-colors hover:bg-surface-raised focus-visible:bg-surface-raised focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-5"
              >
                <div className="min-w-0">
                  <h2 className="font-display text-sm font-semibold group-hover:text-accent">
                    {t.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <DomainBadge
                      domainCode={t.domainCode}
                      title={t.domainTitle}
                    />
                    <span className="text-xs text-ink-muted">{t.state}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-secondary">
                  <span>
                    {t.studyCount} {t.studyCount === 1 ? "study" : "studies"}
                  </span>
                  <span>
                    {t.done}/{t.total} independent{" "}
                    <IconArrow className="ml-1 inline-block size-3.5 shrink-0 align-middle" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((t) => (
            <Link
              key={t.code}
              href={topicHref(t.code)}
              className="group flex flex-col rounded-[var(--radius-lg)] border border-line bg-surface-panel p-5 transition-colors hover:border-accent/50"
            >
              <div>
                <DomainBadge domainCode={t.domainCode} title={t.domainTitle} />
              </div>
              <h2 className="mt-3 font-display text-lg font-semibold group-hover:text-accent">
                {t.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-secondary">
                {t.scope}
              </p>
              <p className="mt-5 text-xs text-ink-muted">
                {t.requirementLabel}
              </p>
              <p className="mt-2 text-xs text-ink-muted">{t.state}</p>
              <div className="mt-3 flex justify-between gap-3 border-t border-line pt-3 text-xs">
                <span>{t.studyCount} studies</span>
                <span>
                  {t.done}/{t.total} independent{" "}
                  <IconArrow className="ml-1 inline-block size-3.5 shrink-0 align-middle" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
      {!visible.length ? (
        <p className="rounded-[var(--radius-lg)] bg-surface-panel p-6 text-sm text-ink-muted">
          {hiddenByMilestone > 0
            ? `Matching topics exist, but none meet ${targetTitle} requirements. Use “Show all matching topics” to explore them.`
            : "No topics match this search and domain. Try a different search or select all domains."}
        </p>
      ) : null}
    </div>
  );
}
