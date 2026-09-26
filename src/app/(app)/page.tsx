import Link from "next/link";
import type { ReactNode } from "react";
import { describeEvent, formatDateTime } from "@/components/assessment/assessment-history";
import { FirstRun } from "@/components/first-run";
import { LevelLadder } from "@/components/level-ladder";
import { NextUp } from "@/components/next-up";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { LevelName } from "@/components/ui/level-badge";
import { PageHeader } from "@/components/ui/page-header";
import { getRecentEvents } from "@/data/assessments";
import { getOverview } from "@/data/standard";
import { domainHref, itemHref } from "@/lib/links";
import { DOMAIN_STATUS_LABEL, LEVEL_NAME } from "@/progression";
import { itemLabels } from "@/standard/schema";

export default async function DashboardPage() {
  const [{ standard, progress: p, details }, recent] = await Promise.all([getOverview(), getRecentEvents(8)]);
  const labels = itemLabels(standard);
  const firstRun = !details.competencies.size && !details.experiences.size && !details.depthCriteria.size && !details.deployedIntegratedApp;
  const inProgress = p.domains.filter((d) => d.status === "in_progress" || d.status === "review_required" || d.status === "advanced_in_progress");
  const left = p.missingForNext.length;

  return (
    <MainContentContainer>
      <PageHeader
        title={LEVEL_NAME[p.level]}
        description={
          p.nextLevel ? (
            <>
              Your current level. {left} requirement{left === 1 ? "" : "s"} left for <LevelName level={p.nextLevel} />.
            </>
          ) : (
            "Your current level. Every tracked level is complete."
          )
        }
      />

      <LevelLadder current={p.level} next={p.nextLevel} rungs={p.ladder} />

      <div className="grid gap-x-10 gap-y-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
        {firstRun ? <FirstRun progress={p} /> : <NextUp progress={p} />}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-1">
          {p.reviewRequired.length ? (
            <Aside title="Review required" aside={<span className="font-mono text-xs text-warning">{p.reviewRequired.length}</span>}>
              <ul className="grid gap-3">
                {p.reviewRequired.map((c) => (
                  <li key={c.code}><Link href={itemHref("competency", c.code)} className="text-sm leading-relaxed text-ink-secondary hover:text-accent">{c.statement}</Link></li>
                ))}
              </ul>
            </Aside>
          ) : null}

          <Aside title="Recent activity" aside={<Link href="/history" className="text-xs text-accent hover:text-accent-strong">All history</Link>}>
            {recent.length ? (
              <ul className="grid gap-3">
                {recent.map((e) => (
                  <li key={e.id} className="grid gap-1">
                    <Link href={itemHref(e.itemKind, e.itemCode)} className="line-clamp-2 text-sm leading-relaxed text-ink-secondary hover:text-accent">{labels.get(e.itemCode) ?? e.itemCode}</Link>
                    <span className="text-xs text-ink-faint">{describeEvent(e)} · <time dateTime={e.createdAt.toISOString()}>{formatDateTime(e.createdAt)}</time></span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-relaxed text-ink-muted">Every assessment you save lands here, with what changed and when.</p>
            )}
          </Aside>

          <Aside title="Domains in progress">
            {inProgress.length ? (
              <ul className="grid gap-3">
                {inProgress.map((d) => {
                  const count = d.status === "advanced_in_progress" ? d.advanced : d.midLevel;
                  return (
                    <li key={d.code} className="grid gap-1">
                      <Link href={domainHref(d.code)} className="text-sm text-ink-secondary hover:text-accent">{d.title}</Link>
                      <span className="text-xs text-ink-faint">{DOMAIN_STATUS_LABEL[d.status]} · {count.mastered} of {count.total} mastered</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm leading-relaxed text-ink-muted">No domain in progress yet. <Link className="text-accent hover:text-accent-strong" href="/domains">Browse domains</Link> to start one.</p>
            )}
          </Aside>
        </div>
      </div>
    </MainContentContainer>
  );
}

function Aside({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <section className="grid content-start gap-4 border-t border-line pt-5">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-sm font-semibold text-ink">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}
