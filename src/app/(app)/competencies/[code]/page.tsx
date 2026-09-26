import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssessmentPanel } from "@/components/assessment/assessment-panel";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { LevelBadge } from "@/components/ui/level-badge";
import { getOverview } from "@/data/standard";
import { domainHref } from "@/lib/links";

export const metadata: Metadata = { title: "Competency" };

export default async function CompetencyPage({ params }: PageProps<"/competencies/[code]">) {
  const code = decodeURIComponent((await params).code);
  const { standard, details } = await getOverview();
  const domain = standard.domains.find((d) => d.competencies.some((c) => c.code === code));
  const competency = domain?.competencies.find((c) => c.code === code);
  if (!domain || !competency) notFound();

  return (
    <MainContentContainer>
      <div className="grid gap-4">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-faint">
          <Link href="/domains" className="hover:text-accent">Domains</Link> / <Link href={domainHref(domain.code)} className="hover:text-accent">{domain.title}</Link>
        </nav>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <LevelBadge level={competency.requiredLevel} />
          <span className="font-mono text-ink-faint">{competency.code}</span>
          <span className="text-ink-faint">Standard v{standard.version}</span>
        </div>
        <h1 className="max-w-[70ch] font-display text-[clamp(1.25rem,1.8vw,1.75rem)] font-medium leading-snug">{competency.statement}</h1>
        {competency.masteryCriteria?.length ? (
          <div>
            <h2 className="text-xs font-semibold text-ink-secondary">Mastery criteria</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-ink-secondary">{competency.masteryCriteria.map((m) => <li key={m}>{m}</li>)}</ul>
          </div>
        ) : null}
      </div>
      <AssessmentPanel kind="competency" code={competency.code} detail={details.competencies.get(competency.code)} />
    </MainContentContainer>
  );
}
