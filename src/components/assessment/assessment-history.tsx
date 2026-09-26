import { STATUS_LABEL } from "@/progression";
import type { HistoryEvent as Event } from "@/data/assessments";

export const formatDateTime = (d: Date) => new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(d);

export function describeEvent(e: Event) {
  if (e.fromStatus !== e.toStatus) return `${STATUS_LABEL[e.fromStatus]} → ${STATUS_LABEL[e.toStatus]}`;
  const changed = [e.notesChanged && "notes", e.evidenceChanged && "evidence"].filter(Boolean).join(" and ");
  return `Edited ${changed}`;
}

export function AssessmentHistory({ events }: { events: Event[] }) {
  if (!events.length) return <p className="text-sm text-ink-faint">No changes recorded yet.</p>;
  return (
    <ol className="grid gap-3">
      {events.map((e) => (
        <li key={e.id} className="grid gap-1 border-l border-line-strong pl-4">
          <span className="text-sm text-ink">{describeEvent(e)}</span>
          {e.reason ? <span className="text-sm text-ink-muted">{e.reason}</span> : null}
          <time className="text-xs text-ink-faint" dateTime={e.createdAt.toISOString()}>{formatDateTime(e.createdAt)}</time>
        </li>
      ))}
    </ol>
  );
}
