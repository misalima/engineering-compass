import Link from "next/link";
import { IconArrow } from "@/components/icons";
import { LevelName } from "@/components/ui/level-badge";
import { ProgressBar } from "@/components/ui/meter";
import { StatusBadge } from "@/components/ui/status-badge";
import { levelHref, requirementGroupHref, requirementHref } from "@/lib/links";
import { LEVEL_NAME, groupRequirements, recommend, type Progression, type Recommendation, type Requirement } from "@/progression";

const MORE_LIMIT = 8;
const ACTION: Record<Requirement["kind"], string> = { competency: "Assess it", experience: "Assess it", milestone: "Update it", depth_gate: "View Depth Gates" };

export function NextUp({ progress: p }: { progress: Progression }) {
  if (!p.nextLevel) {
    return (
      <section className="grid gap-3 rounded-[var(--radius-lg)] bg-surface-panel p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold">Top of the ladder</h2>
        <p className="max-w-[65ch] text-sm leading-relaxed text-ink-secondary">
          Every tracked level is complete. Senior/Exceptional Engineer is a narrative reference, not a checklist: keep your evidence current and revisit anything marked Review required.
        </p>
      </section>
    );
  }

  const rung = p.ladder.find((r) => r.level === p.nextLevel)!;
  const pick = recommend(rung.requirements);
  const more = p.missingForNext.filter((r) => r.code !== pick?.requirement.code);
  const leftIn = (groupCode: string) => p.missingForNext.filter((r) => r.group.code === groupCode).length;

  return (
    <section aria-labelledby="next-level" className="grid gap-8 rounded-[var(--radius-lg)] bg-surface-panel p-6 sm:p-8">
      <div className="grid gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 id="next-level" className="font-display text-xl font-semibold">Next: <LevelName level={p.nextLevel} /></h2>
          <span className="font-mono text-sm text-ink-secondary">
            {rung.done}/{rung.total}<span className="sr-only"> requirements met</span>
          </span>
        </div>
        <ProgressBar value={rung.done} total={rung.total} label={`${LEVEL_NAME[p.nextLevel]} requirements`} className="h-2" />
      </div>

      {pick ? <Recommended pick={pick} /> : null}

      {more.length ? (
        <div className="grid gap-6">
          {groupRequirements(more.slice(0, MORE_LIMIT)).map((g) => (
            <div key={g.code} className="grid gap-1">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
                <h3 className="text-sm font-semibold text-ink">
                  <Link href={requirementGroupHref(g.requirements[0])} className="hover:text-accent">{g.title}</Link>
                </h3>
                <span className="shrink-0 font-mono text-xs text-ink-faint">{leftIn(g.code)} left</span>
              </div>
              <ul className="grid">
                {g.requirements.map((r) => (
                  <li key={r.code}>
                    <Link href={requirementHref(r)} className="-mx-3 flex items-start justify-between gap-6 rounded-[var(--radius-sm)] px-3 py-2.5 hover:bg-surface-raised">
                      <span className="text-sm leading-relaxed text-ink-secondary">{r.label}</span>
                      {r.status !== "not_started" ? <StatusBadge status={r.status} /> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}

      <Link href={levelHref(p.nextLevel)} className="inline-flex min-h-11 items-center gap-2 justify-self-start text-sm font-semibold text-accent hover:text-accent-strong">
        See all {p.missingForNext.length} open requirements
        <IconArrow className="size-4" />
      </Link>
    </section>
  );
}

function Recommended({ pick }: { pick: Recommendation }) {
  const { requirement: r, group: g } = pick;
  const copy: Record<Recommendation["reason"], { title: string; meta: string }> = {
    review: { title: "Re-check this one", meta: g.title },
    started: { title: "Pick up where you left off", meta: g.title },
    closest: { title: `${g.title} is closest to done`, meta: `${g.done} of ${g.requirements.length} met for this level` },
    start: { title: "Start here", meta: `${g.title} · first on the list` },
  };

  return (
    <div className="grid gap-4 rounded-[var(--radius-md)] bg-surface-raised p-5 sm:p-6">
      <div className="grid gap-1">
        <h3 className="font-display text-base font-semibold text-ink">{copy[pick.reason].title}</h3>
        <p className="text-xs text-ink-faint">{copy[pick.reason].meta}</p>
      </div>
      <p className="max-w-[65ch] text-base leading-relaxed text-ink">{r.label}</p>
      <div className="flex flex-wrap items-center justify-between gap-4">
        {r.status !== "not_started" ? <StatusBadge status={r.status} /> : null}
        <Link href={requirementHref(r)} className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-sm)] bg-accent px-4 text-sm font-bold text-accent-ink transition-colors hover:bg-accent-strong">
          {ACTION[r.kind]}
          <IconArrow className="size-4" />
        </Link>
      </div>
    </div>
  );
}
