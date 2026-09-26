import { LEVEL_NAME, type Level } from "@/progression";

const RANK: Record<Level, number> = { L0: 0, L1: 1, L2: 2, L3: 3, L4: 4 };

/** Four ascending bars; filled bars show how high the level sits on the ladder. */
export function LevelBars({ level }: { level: Level }) {
  return (
    <span aria-hidden="true" className="inline-flex h-3 items-end gap-[2px]">
      {[1, 2, 3, 4].map((i) => (
        <span key={i} className={`w-[3px] rounded-full bg-current ${i <= RANK[level] ? "" : "opacity-25"}`} style={{ height: `${i * 25}%` }} />
      ))}
    </span>
  );
}

/** For a level inside a sentence or heading. Use LevelBadge only where the level stands alone. */
export function LevelName({ level }: { level: Level }) {
  return <span className="font-semibold text-accent">{LEVEL_NAME[level]}</span>;
}

export function LevelBadge({ level }: { level: Level }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-accent/30 bg-accent/10 py-1 pl-2.5 pr-3 align-middle text-xs font-semibold text-accent">
      <LevelBars level={level} />
      <span><span className="sr-only">Level: </span>{LEVEL_NAME[level]}</span>
    </span>
  );
}
