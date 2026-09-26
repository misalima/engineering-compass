import type { Metadata } from "next";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { PageHeader, Section } from "@/components/ui/page-header";
import { getActiveStandard } from "@/data/standard";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const { standard } = await getActiveStandard();

  return (
    <MainContentContainer>
      <PageHeader title="Settings" description={`Tracking ${standard.track}, Standard v${standard.version}.`} />
      <Section title="Export">
        <p className="mb-4 max-w-[60ch] text-sm text-ink-secondary">Download everything you recorded: assessments, notes, evidence, projects, and full history.</p>
        <div className="flex flex-wrap gap-3">
          <a href="/export/json" download className="inline-flex min-h-11 items-center rounded-[var(--radius-sm)] border border-line-strong px-4 text-sm font-semibold text-ink hover:bg-surface-active">JSON</a>
          <a href="/export/markdown" download className="inline-flex min-h-11 items-center rounded-[var(--radius-sm)] border border-line-strong px-4 text-sm font-semibold text-ink hover:bg-surface-active">Markdown</a>
        </div>
      </Section>
    </MainContentContainer>
  );
}
