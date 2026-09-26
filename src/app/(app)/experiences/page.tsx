import type { Metadata } from "next";
import Link from "next/link";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { LevelName } from "@/components/ui/level-badge";
import { PageHeader, Section } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getOverview } from "@/data/standard";
import { integratedAppHref, itemHref } from "@/lib/links";
import { INTEGRATED_APP } from "@/progression";

export const metadata: Metadata = { title: "Experience Matrix" };

export default async function ExperiencesPage() {
  const { standard, details, progress } = await getOverview();
  const tiers = [
    { tier: "core", title: "Core", level: "L3", metric: progress.metrics.coreExperiences },
    { tier: "strong", title: "Strong", level: "L4", metric: null },
  ] as const;

  return (
    <MainContentContainer>
      <PageHeader
        title="Experience Matrix"
        description="Integrated practice in a real system. Complete an experience only when you personally did the work and can explain it."
        aside={<span className="font-mono text-sm text-ink-secondary">{progress.metrics.experiences.completed}/{progress.metrics.experiences.total}</span>}
      />
      <Section title={<>Entry, required for <LevelName level="L2" /></>}>
        <Link href={integratedAppHref} className="flex items-start justify-between gap-6 rounded-[var(--radius-sm)] px-3 py-3 hover:bg-surface-raised">
          <span className="grid gap-1">
            <span className="text-sm text-ink"><span className="mr-2 font-mono text-xs text-ink-faint">0.</span>{INTEGRATED_APP.title}</span>
            <span className="text-sm leading-relaxed text-ink-muted">{INTEGRATED_APP.statement}</span>
          </span>
          <StatusBadge status={details.deployedIntegratedApp ? "mastered" : "not_started"} label={details.deployedIntegratedApp ? "Completed" : undefined} />
        </Link>
      </Section>
      {tiers.map(({ tier, title, level, metric }) => (
        <Section key={tier} title={<>{title}, required for <LevelName level={level} /></>} aside={metric ? <span className="font-mono text-xs text-ink-faint">{metric.completed}/{metric.total}</span> : null}>
          <ul className="grid gap-1">
            {standard.experiences.filter((e) => e.tier === tier).map((e) => (
              <li key={e.code}>
                <Link href={itemHref("experience", e.code)} className="flex items-start justify-between gap-6 rounded-[var(--radius-sm)] px-3 py-3 hover:bg-surface-raised">
                  <span className="grid gap-1">
                    <span className="text-sm text-ink"><span className="mr-2 font-mono text-xs text-ink-faint">{e.number}.</span>{e.title}</span>
                    <span className="text-sm leading-relaxed text-ink-muted">{e.statement}</span>
                  </span>
                  <StatusBadge status={details.experiences.get(e.code)?.status ?? "not_started"} label={details.experiences.get(e.code)?.status === "mastered" ? "Completed" : undefined} />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </MainContentContainer>
  );
}
