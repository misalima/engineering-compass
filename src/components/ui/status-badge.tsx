import { STATUS_LABEL, type Status } from "@/progression";

const tone: Record<Status, string> = {
  mastered: "bg-accent",
  in_progress: "bg-ink-secondary",
  review_required: "bg-warning",
  not_started: "border border-line-strong",
  not_applicable: "bg-line",
};

export function StatusBadge({ status, label = STATUS_LABEL[status] }: { status: Status; label?: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-xs text-ink-secondary">
      <span className={`size-2 rounded-full ${tone[status]}`} aria-hidden="true" />
      {label}
    </span>
  );
}
