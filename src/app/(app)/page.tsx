import Link from "next/link";
import { describeEvent, formatDateTime } from "@/components/assessment/assessment-history";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { LevelBars, LevelName } from "@/components/ui/level-badge";
import { Meter } from "@/components/ui/meter";
import { PageHeader, Section } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getRecentEvents } from "@/data/assessments";
import { getOverview } from "@/data/standard";
import { domainHref, integratedAppHref, itemHref } from "@/lib/links";
import { DOMAIN_STATUS_LABEL, LEVEL_NAME, type Blocker } from "@/progression";

const blockerHref = (b: Blocker) =>
  b.kind === "competency" ? itemHref("competency", b.code) : b.kind === "experience" ? itemHref("experience", b.code) : b.kind === "depth_gate" ? "/depth-gates" : integratedAppHref;

export default async function DashboardPage() {
  const { progress: p } = await getOverview();
  const recent = await getRecentEvents(8);
  const m = p.metrics;
  const inProgress = p.domains.filter((d) => d.status === "in_progress" || d.status === "review_required");

  return (
    <MainContentContainer>
      <PageHeader
        eyebrow={<span className="inline-flex items-center gap-2"><span className="text-accent"><LevelBars level={p.level} /></span>Current level</span>}
        title={LEVEL_NAME[p.level]}
        description={
          p.nextLevel ? (
            <>
              Next: <LevelName level={p.nextLevel} />. {p.missingForNext.length} requirement{p.missingForNext.length === 1 ? "" : "s"} left.
            </>
          ) : (
            "Every tracked level is complete. Senior/Exceptional Engineer is a narrative reference, not a checklist."
          )
        }
      />

      <section className="grid gap-4 rounded-[var(--radius-lg)] bg-surface-panel p-6 sm:grid-cols-2 sm:p-8 xl:grid-cols-4" aria-label="Metrics">
        <Meter label="Competency coverage" value={m.competencyCoverage.mastered} total={m.competencyCoverage.total} />
        <Meter label="Mid-level domains" value={m.midLevelDomains.complete} total={m.midLevelDomains.total} />
        <Meter label={`Engineering experiences (core ${m.coreExperiences.completed}/${m.coreExperiences.total})`} value={m.experiences.completed} total={m.experiences.total} />
        <Meter label={`Depth gates${m.depth.ruleSatisfied ? " · rule met" : ""}${m.depth.fullDepth ? " · Full Depth" : ""}`} value={m.depth.completedGates} total={m.depth.totalGates} />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title={p.nextLevel ? <>Missing for <LevelName level={p.nextLevel} /></> : "Missing requirements"} aside={p.missingForNext.length > 8 ? <span className="text-xs text-ink-faint">first 8 of {p.missingForNext.length}</span> : null}>
          {p.missingForNext.length ? (
            <ul className="grid gap-3">
              {p.missingForNext.slice(0, 8).map((b) => (
                <li key={b.code} className="flex items-start justify-between gap-4">
                  <Link href={blockerHref(b)} className="text-sm text-ink-secondary hover:text-accent">{b.label}</Link>
                  {b.status ? <StatusBadge status={b.status} /> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-muted">Nothing left for the automated levels.</p>
          )}
        </Section>

        <Section title="Requires review">
          {p.reviewRequired.length ? (
            <ul className="grid gap-3">
              {p.reviewRequired.map((c) => (
                <li key={c.code}><Link href={itemHref("competency", c.code)} className="text-sm text-ink-secondary hover:text-accent">{c.statement}</Link></li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-muted">No competencies are marked Review required.</p>
          )}
        </Section>

        <Section title="Domains in progress">
          {inProgress.length ? (
            <ul className="grid gap-3">
              {inProgress.map((d) => (
                <li key={d.code} className="flex items-center justify-between gap-4">
                  <Link href={domainHref(d.code)} className="text-sm text-ink-secondary hover:text-accent">{d.title}</Link>
                  <span className="text-xs text-ink-faint">{DOMAIN_STATUS_LABEL[d.status]} · {d.midLevel.mastered}/{d.midLevel.total}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-muted">No domain is in progress yet. Start with <Link className="text-accent" href="/domains">Domains</Link>.</p>
          )}
        </Section>

        <Section title="Recent activity" aside={<Link href="/history" className="text-xs text-accent">All history</Link>}>
          {recent.length ? (
            <ul className="grid gap-3">
              {recent.map((e) => (
                <li key={e.id} className="grid gap-0.5">
                  <Link href={itemHref(e.itemKind, e.itemCode)} className="truncate font-mono text-xs text-ink-muted hover:text-accent">{e.itemCode}</Link>
                  <span className="text-sm text-ink-secondary">{describeEvent(e)} · <time className="text-ink-faint" dateTime={e.createdAt.toISOString()}>{formatDateTime(e.createdAt)}</time></span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-muted">No assessments yet.</p>
          )}
        </Section>
      </div>
    </MainContentContainer>
  );
}
