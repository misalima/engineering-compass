import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { LevelName } from "@/components/ui/level-badge";
import { Meter } from "@/components/ui/meter";
import { PageHeader, Section } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getOverview } from "@/data/standard";
import { itemHref } from "@/lib/links";
import { DOMAIN_STATUS_LABEL, LEVEL_NAME } from "@/progression";
import { LEVELS } from "@/standard/schema";

export async function generateMetadata({ params }: PageProps<"/domains/[code]">): Promise<Metadata> {
  const code = decodeURIComponent((await params).code);
  const { standard } = await getOverview();
  return { title: standard.domains.find((d) => d.code === code)?.title ?? "Domain" };
}

export default async function DomainPage({ params }: PageProps<"/domains/[code]">) {
  const { code } = await params;
  const { standard, details, progress } = await getOverview();
  const domain = standard.domains.find((d) => d.code === decodeURIComponent(code));
  if (!domain) notFound();
  const summary = progress.domains.find((d) => d.code === domain.code)!;

  return (
    <MainContentContainer>
      <PageHeader
        eyebrow={<Link href="/domains" className="hover:text-accent">Domains</Link>}
        title={domain.title}
        aside={<span className="text-sm text-ink-secondary">{DOMAIN_STATUS_LABEL[summary.status]}</span>}
      />

      <section className="grid gap-4 rounded-[var(--radius-lg)] bg-surface-panel p-6 sm:grid-cols-2 sm:p-8">
        <Meter label={`Up to ${LEVEL_NAME.L3}`} value={summary.midLevel.mastered} total={summary.midLevel.total} />
        {summary.advanced.total ? <Meter label={LEVEL_NAME.L4} value={summary.advanced.mastered} total={summary.advanced.total} /> : null}
      </section>

      {domain.knowledge.length ? (
        <Section title="Knowledge" aside={<span className="text-xs text-ink-faint">Map of what to know. Not a checklist.</span>}>
          <ul className="flex flex-wrap gap-2">
            {domain.knowledge.map((k) => <li key={k} className="rounded-full bg-surface-raised px-3 py-1.5 text-xs text-ink-secondary">{k}</li>)}
          </ul>
        </Section>
      ) : null}

      {LEVELS.map((level) => {
        const items = domain.competencies.filter((c) => c.requiredLevel === level);
        if (!items.length) return null;
        return (
          <Section key={level} title={<>Required for <LevelName level={level} /></>}>
            <ul className="-mx-5 grid gap-1">
              {items.map((c) => (
                <li key={c.code}>
                  <Link href={itemHref("competency", c.code)} className="flex items-start justify-between gap-6 rounded-[var(--radius-sm)] px-5 py-3 hover:bg-surface-raised">
                    <span className="text-sm leading-relaxed text-ink-secondary">{c.statement}</span>
                    <StatusBadge status={details.competencies.get(c.code)?.status ?? "not_started"} />
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        );
      })}
    </MainContentContainer>
  );
}
