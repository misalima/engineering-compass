import Link from "next/link";
import { IconArrow } from "@/components/icons";
import { LevelName } from "@/components/ui/level-badge";
import { requirementGroupHref, requirementHref } from "@/lib/links";
import { groupRequirements, type Progression } from "@/progression";

const HOW_IT_WORKS = [
  { term: "You assess", detail: "Open a competency and mark it In progress or Mastered. Notes and evidence are optional." },
  { term: "The level follows", detail: "A level is reached when all of its requirements, and every level below it, are met. You never set it by hand." },
  { term: "Depth comes later", detail: "Engineering experiences join at Mid-level; Depth Gates at Strong Software Engineer." },
];

/** Replaces the next-level panel until the first assessment is saved. */
export function FirstRun({ progress: p }: { progress: Progression }) {
  const rung = p.ladder[0];
  const first = rung.requirements[0];
  const domains = groupRequirements(rung.requirements);

  return (
    <section aria-labelledby="first-run" className="grid gap-8 rounded-[var(--radius-lg)] bg-surface-panel p-6 sm:p-8">
      <div className="grid max-w-[60ch] gap-3">
        <h2 id="first-run" className="font-display text-2xl font-semibold text-balance">Plot your starting point</h2>
        <p className="text-sm leading-relaxed text-ink-secondary">
          Levels here are earned, not chosen. Mark what you can already do and the ladder fills on its own, starting with <LevelName level={rung.level} />.
        </p>
      </div>

      <div className="grid gap-4 rounded-[var(--radius-md)] bg-surface-raised p-5 sm:p-6">
        <h3 className="font-display text-base font-semibold text-ink">First up</h3>
        <p className="max-w-[65ch] text-base leading-relaxed text-ink">{first.label}</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-ink-faint">{first.group.title}</span>
          <Link href={requirementHref(first)} className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-sm)] bg-accent px-4 text-sm font-bold text-accent-ink transition-colors hover:bg-accent-strong">
            Assess it
            <IconArrow className="size-4" />
          </Link>
        </div>
      </div>

      <dl className="grid gap-x-8 gap-y-5 md:grid-cols-3">
        {HOW_IT_WORKS.map(({ term, detail }) => (
          <div key={term} className="grid content-start gap-1.5 border-t border-line pt-4">
            <dt className="text-sm font-semibold text-ink">{term}</dt>
            <dd className="text-sm leading-relaxed text-ink-muted">{detail}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-3">
        <h3 className="text-sm font-semibold text-ink">
          <LevelName level={rung.level} /> draws on {rung.total} competencies across {domains.length} domains
        </h3>
        <ul className="flex flex-wrap gap-2">
          {domains.map((g) => (
            <li key={g.code}>
              <Link href={requirementGroupHref(g.requirements[0])} className="inline-flex min-h-9 items-center gap-2 rounded-full bg-surface-raised px-3.5 text-xs text-ink-secondary transition-colors hover:bg-surface-active hover:text-ink">
                {g.title}
                <span className="font-mono text-ink-faint">{g.requirements.length}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
