import type { Metadata } from "next";
import Link from "next/link";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { Button } from "@/components/ui/button";
import { LevelBadge } from "@/components/ui/level-badge";
import { Section } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getOverview } from "@/data/standard";
import { INTEGRATED_APP } from "@/progression";
import { setDeployedIntegratedAppAction } from "./actions";

export const metadata: Metadata = { title: INTEGRATED_APP.title };

export default async function IntegratedApplicationPage() {
  const { details } = await getOverview();
  const done = details.deployedIntegratedApp;

  return (
    <MainContentContainer>
      <div className="grid gap-4">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-faint">
          <Link href="/experiences" className="hover:text-accent">Experience Matrix</Link>
        </nav>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-surface-active px-2.5 py-1 text-ink">Entry</span>
          <LevelBadge level="L2" />
        </div>
        <h1 className="font-display text-[clamp(1.5rem,2vw,2rem)] font-medium">0. {INTEGRATED_APP.title}</h1>
        <p className="max-w-[70ch] text-base leading-relaxed text-ink-secondary">{INTEGRATED_APP.statement}</p>
      </div>
      <Section title="Assessment" aside={<StatusBadge status={done ? "mastered" : "not_started"} label={done ? "Completed" : undefined} />}>
        <form action={setDeployedIntegratedAppAction} className="grid gap-5">
          <input type="hidden" name="value" value={String(!done)} />
          <p className="max-w-[65ch] text-sm text-ink-muted">Any stack and any host count, as long as the pieces work together in a deployed environment.</p>
          <div>
            <Button type="submit" variant={done ? "secondary" : "primary"}>{done ? "Mark as not completed" : "Mark as completed"}</Button>
          </div>
        </form>
      </Section>
    </MainContentContainer>
  );
}
