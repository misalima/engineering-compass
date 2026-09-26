import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { LevelName } from "@/components/ui/level-badge";
import { ProgressBar } from "@/components/ui/meter";
import { PageHeader, Section } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getOverview } from "@/data/standard";
import { requirementGroupHref, requirementHref } from "@/lib/links";
import { LEVEL_NAME, groupRequirements, type Level } from "@/progression";
import { LEVELS, type RequiredLevel } from "@/standard/schema";

const isLevel = (value: string): value is RequiredLevel => (LEVELS as readonly string[]).includes(value);
const RANK: Level[] = ["L0", ...LEVELS];

export async function generateMetadata({ params }: PageProps<"/levels/[level]">): Promise<Metadata> {
  const { level } = await params;
  return { title: isLevel(level) ? LEVEL_NAME[level] : "Level" };
}

export default async function LevelPage({ params }: PageProps<"/levels/[level]">) {
  const { level } = await params;
  if (!isLevel(level)) notFound();
  const { progress: p } = await getOverview();
  const rung = p.ladder.find((r) => r.level === level)!;
  const left = rung.total - rung.done;
  const previous = RANK[RANK.indexOf(level) - 1];

  const description =
    RANK.indexOf(level) <= RANK.indexOf(p.level) ? (
      "Complete. Every requirement for this level is met."
    ) : level === p.nextLevel ? (
      <>Your next level. {left} requirement{left === 1 ? "" : "s"} left.</>
    ) : (
      <>
        {left} requirement{left === 1 ? "" : "s"} left. This level counts once you reach <LevelName level={previous} />.
      </>
    );

  const groups = groupRequirements(rung.requirements).sort(
    (a, b) => Number(a.done === a.requirements.length) - Number(b.done === b.requirements.length),
  );

  return (
    <MainContentContainer>
      <PageHeader title={LEVEL_NAME[level]} description={description} />

      <section className="grid gap-3 rounded-[var(--radius-lg)] bg-surface-panel p-6 sm:p-8" aria-label="Level progress">
        <div className="flex items-baseline justify-between gap-6 text-sm">
          <span className="text-ink-secondary">Requirements met</span>
          <span className="font-mono text-ink">{rung.done}/{rung.total}</span>
        </div>
        <ProgressBar value={rung.done} total={rung.total} label={`${LEVEL_NAME[level]} requirements`} className="h-2" />
      </section>

      {groups.map((g) => (
        <Section
          key={g.code}
          title={<Link href={requirementGroupHref(g.requirements[0])} className="hover:text-accent">{g.title}</Link>}
          aside={<span className="shrink-0 font-mono text-xs text-ink-faint">{g.done}/{g.requirements.length}</span>}
        >
          <ul className="-mx-5 grid gap-1">
            {g.requirements.map((r) => (
              <li key={r.code}>
                <Link href={requirementHref(r)} className="flex items-start justify-between gap-6 rounded-[var(--radius-sm)] px-5 py-3 hover:bg-surface-raised">
                  <span className="text-sm leading-relaxed text-ink-secondary">{r.label}</span>
                  <StatusBadge status={r.status} />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </MainContentContainer>
  );
}
