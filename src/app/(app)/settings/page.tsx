import type { Metadata } from "next";
import { cookies } from "next/headers";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { ThemeSelect } from "@/components/theme-select";
import { PageHeader, Section } from "@/components/ui/page-header";
import { getCareerProfile } from "@/data/growth";
import { CareerForm } from "@/components/growth/forms";
import { getActiveStandard } from "@/data/standard";
import { parseTheme } from "@/lib/theme";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const [{ standard }, cookieStore, profile] = await Promise.all([getActiveStandard(), cookies(), getCareerProfile()]);
  const theme = parseTheme(cookieStore.get("theme")?.value);

  return (
    <MainContentContainer>
      <PageHeader title="Settings" description={`Tracking ${standard.track}, Standard v${standard.version}.`} />
      <Section title="Your career path"><CareerForm profile={profile} /></Section>
      <Section title="Appearance">
        <ThemeSelect initial={theme} />
      </Section>
      <Section title="Export">
        <p className="mb-4 max-w-[60ch] text-sm text-ink-secondary">Download everything you recorded: career preferences, study history, assessments, notes, evidence, and projects.</p>
        <div className="flex flex-wrap gap-3">
          <a href="/export/json" download className="inline-flex min-h-11 items-center rounded-[var(--radius-sm)] border border-line-strong px-4 text-sm font-semibold text-ink hover:bg-surface-active">JSON</a>
          <a href="/export/markdown" download className="inline-flex min-h-11 items-center rounded-[var(--radius-sm)] border border-line-strong px-4 text-sm font-semibold text-ink hover:bg-surface-active">Markdown</a>
        </div>
      </Section>
    </MainContentContainer>
  );
}
