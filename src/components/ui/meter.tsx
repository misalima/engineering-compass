export function Meter({ value, total, label }: { value: number; total: number; label: string }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-3 text-xs">
        <span className="text-ink-muted">{label}</span>
        <span className="font-mono text-ink-secondary">{value}/{total}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-raised" role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={total} aria-valuenow={value}>
        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
