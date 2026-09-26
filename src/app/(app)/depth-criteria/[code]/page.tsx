import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssessmentPanel } from "@/components/assessment/assessment-panel";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { getOverview } from "@/data/standard";
import { gateHref } from "@/lib/links";

export const metadata: Metadata = { title: "Depth criterion" };

export default async function DepthCriterionPage({ params }: PageProps<"/depth-criteria/[code]">) {
  const code = decodeURIComponent((await params).code);
  const { standard, details } = await getOverview();
  const gate = standard.depthGates.find((g) => g.criteria.some((c) => c.code === code));
  const criterion = gate?.criteria.find((c) => c.code === code);
  if (!gate || !criterion) notFound();

  return (
    <MainContentContainer>
      <div className="grid gap-4">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-faint">
          <Link href="/depth-gates" className="hover:text-accent">Depth Gates</Link> / <Link href={gateHref(gate.code)} className="hover:text-accent">{gate.title}</Link>
        </nav>
        <span className="font-mono text-xs text-ink-faint">{criterion.code}</span>
        <h1 className="max-w-[70ch] font-display text-[clamp(1.25rem,1.8vw,1.75rem)] font-medium leading-snug">{criterion.statement}</h1>
      </div>
      <AssessmentPanel kind="depth_criterion" code={criterion.code} detail={details.depthCriteria.get(criterion.code)} />
    </MainContentContainer>
  );
}
