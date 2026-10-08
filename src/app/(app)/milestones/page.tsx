import { IconArrow } from "@/components/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { PageHeader, Section } from "@/components/ui/page-header";
import { ProgressBar } from "@/components/ui/meter";
import { getGrowth } from "@/data/growth";
import { topicHref } from "@/growth/catalog";
import { GOALS, STACKS } from "@/growth/model";

export const metadata: Metadata = { title: "Career milestones" };
export default async function MilestonesPage() {
  const growth = await getGrowth();
  return (
    <MainContentContainer>
      <PageHeader
        title="A path you can explain."
        description={`${GOALS[growth.profile.goal]} · ${STACKS[growth.profile.primaryStack]}. Each milestone includes the requirements of the earlier ones.`}
        aside={
          <Link href="/settings" className="text-sm text-accent">
            Change target{" "}
            <IconArrow className="ml-1 inline-block size-3.5 shrink-0 align-middle" />
          </Link>
        }
      />
      <p className="max-w-4xl text-sm leading-relaxed text-ink-secondary">
        Use these milestones to discuss your capabilities and development needs.
        Completion reflects your self-assessment against this path; role titles
        also depend on autonomy, scope, sustained delivery and your
        organization. Notes and evidence help ground that conversation.
      </p>
      {growth.milestones.map((m, index) => (
        <Section
          key={m.id}
          id={m.id}
          title={
            <span>
              <span className="mr-3 font-mono text-sm text-ink-faint">
                0{index + 1}
              </span>
              {m.title}
            </span>
          }
          aside={
            <span className="text-xs text-accent">
              {m.complete
                ? "Requirements met"
                : m.id === growth.profile.targetMilestone
                  ? "Current target"
                  : `${m.total - m.done} gaps`}
            </span>
          }
        >
          <p className="mb-5 max-w-3xl text-sm leading-relaxed text-ink-secondary">
            {m.description}
          </p>
          <div className="mb-3 flex justify-between gap-4 text-sm">
            <span>
              {m.done} of {m.total} capabilities independent
            </span>
            <span className="text-xs text-ink-muted">
              {m.evidenced} with evidence
            </span>
          </div>
          <ProgressBar
            value={m.done}
            total={m.total}
            label={`${m.title} capabilities`}
          />
          <details
            className="mt-5"
            open={m.id === growth.profile.targetMilestone}
          >
            <summary className="min-h-10 cursor-pointer text-sm text-ink-secondary">
              Explore requirements by topic
            </summary>
            <ul className="mt-3 grid gap-x-6 md:grid-cols-2">
              {[...m.topics]
                .sort(
                  (a, b) =>
                    Number(a.done === a.total) - Number(b.done === b.total),
                )
                .map((t) => (
                  <li key={t.code}>
                    <Link
                      href={topicHref(t.code)}
                      className="flex items-baseline justify-between gap-3 rounded-[var(--radius-sm)] border-t border-line px-4 py-3 text-sm transition-colors hover:bg-surface-raised hover:text-accent focus-visible:bg-surface-raised"
                    >
                      <span>
                        {t.done === t.total ? "✓ " : ""}
                        {t.title}
                      </span>
                      <span className="shrink-0 font-mono text-xs text-ink-muted">
                        {t.done}/{t.total}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </details>
        </Section>
      ))}
      <p className="text-xs text-ink-muted">
        Path v2 groups existing competencies into explicit, cumulative
        milestones. Older Standard level rules remain available in the reference
        section.
      </p>
    </MainContentContainer>
  );
}
