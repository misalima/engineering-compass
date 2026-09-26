/** Any progress above zero keeps a visible sliver, so 1 of 455 never looks like nothing. */
export function ProgressBar({ value, total, label, className = "h-1.5" }: { value: number; total: number; label: string; className?: string }) {
  const pct = total ? (value / total) * 100 : 0;
  return (
    <div
      className={`overflow-hidden rounded-full bg-surface-raised ${className}`}
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={value}
      aria-valuetext={`${value} of ${total}`}
    >
      <div className="h-full rounded-full bg-accent" style={{ width: value > 0 ? `max(${pct}%, 0.375rem)` : 0 }} />
    </div>
  );
}

export function Meter({ value, total, label }: { value: number; total: number; label: string }) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-3 text-xs">
        <span className="text-ink-muted">{label}</span>
        <span className="font-mono text-ink-secondary">{value}/{total}</span>
      </div>
      <ProgressBar value={value} total={total} label={label} />
    </div>
  );
}
