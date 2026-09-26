import Link from "next/link";
import { LevelBars } from "@/components/ui/level-badge";
import { levelHref } from "@/lib/links";
import { LEVEL_NAME, type Level } from "@/progression";

type Rung = { level: Level; done: number; total: number };
type State = "complete" | "current" | "next" | "later";

const RUNGS: Level[] = ["L0", "L1", "L2", "L3", "L4"];
const STEP_HEIGHT: Record<Level, string> = { L0: "8%", L1: "28%", L2: "50%", L3: "74%", L4: "100%" };

const STATE_LABEL: Record<State, string> = { complete: "Complete", current: "Current", next: "Next", later: "Later" };
const style: Record<State, { rung: string; name: string; label: string; fill: string }> = {
  complete: { rung: "hover:bg-surface-raised", name: "text-ink-secondary", label: "text-ink-faint", fill: "bg-accent/35" },
  current: { rung: "hover:bg-surface-raised", name: "font-semibold text-ink", label: "text-ink-secondary", fill: "bg-accent/35" },
  next: { rung: "bg-surface-raised hover:bg-surface-active", name: "font-semibold text-accent", label: "text-ink-secondary", fill: "bg-accent" },
  later: { rung: "hover:bg-surface-raised", name: "text-ink-muted", label: "text-ink-faint", fill: "bg-line-strong" },
};

/** The five levels as a rising staircase; each step fills with that level's met requirements. */
export function LevelLadder({ current, next, rungs }: { current: Level; next: Level | null; rungs: Rung[] }) {
  const rank = (level: Level) => RUNGS.indexOf(level);

  return (
    <nav aria-label="Level ladder" className="rounded-[var(--radius-lg)] bg-surface-panel p-3 sm:p-5">
      <ol className="grid gap-1 min-[1100px]:grid-cols-5 min-[1100px]:gap-2">
        {RUNGS.map((level) => {
          const rung = rungs.find((r) => r.level === level);
          const state: State = rank(level) < rank(current) ? "complete" : level === current ? "current" : level === next ? "next" : "later";
          const s = style[state];
          const reached = state === "complete" || state === "current";
          const fill = reached || !rung?.total ? 100 : (rung.done / rung.total) * 100;

          const body = (
            <>
              <span aria-hidden="true" className="hidden h-28 items-end min-[1100px]:flex">
                <span
                  className={`relative w-full overflow-hidden rounded-t-[var(--radius-sm)] bg-canvas/50 ${state === "next" ? "outline outline-1 -outline-offset-1 outline-dashed outline-accent/60" : ""}`}
                  style={{ height: STEP_HEIGHT[level] }}
                >
                  <span className={`absolute inset-x-0 bottom-0 ${s.fill}`} style={{ height: fill > 0 ? `max(${fill}%, 0.25rem)` : 0 }} />
                </span>
              </span>
              <span aria-hidden="true" className={`shrink-0 min-[1100px]:hidden ${reached || state === "next" ? "text-accent" : "text-ink-faint"}`}>
                <LevelBars level={level} />
              </span>
              <span className="grid min-w-0 gap-1">
                <span className={`text-sm leading-snug text-balance ${s.name}`}>{LEVEL_NAME[level]}</span>
                <span className={`text-xs ${s.label}`}>
                  {level === "L0" && state !== "current" ? "Start" : STATE_LABEL[state]}
                  {rung ? (
                    <span className="font-mono">
                      {" · "}
                      {rung.done}/{rung.total}
                      <span className="sr-only"> requirements met</span>
                    </span>
                  ) : null}
                </span>
              </span>
            </>
          );
          const rungClass = `flex h-full items-center gap-4 rounded-[var(--radius-md)] px-3 py-3 transition-colors duration-200 ease-[var(--ease-out)] min-[1100px]:grid min-[1100px]:content-start min-[1100px]:items-stretch min-[1100px]:gap-4`;

          return (
            <li key={level} aria-current={state === "current" ? "step" : undefined}>
              {level === "L0" ? (
                <div className={rungClass}>{body}</div>
              ) : (
                <Link href={levelHref(level)} className={`${rungClass} ${s.rung}`}>{body}</Link>
              )}
            </li>
          );
        })}
      </ol>
      <p className="px-3 pt-3 text-xs text-ink-faint">Senior/Exceptional Engineer sits above the ladder as a narrative reference, not a checklist.</p>
    </nav>
  );
}
