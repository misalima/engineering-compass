"use client";

import { useActionState, useState } from "react";
import { saveAssessmentAction, type ActionState } from "@/app/(app)/actions";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import type { ItemKind } from "@/standard/schema";
import { STATUS_LABEL, type Status } from "@/progression";
import { SELECTABLE_STATUSES } from "@/lib/validation";

type Props = {
  kind: ItemKind;
  code: string;
  current: {
    status: Status;
    notesMarkdown: string | null;
    evidenceMarkdown: string | null;
    confidence: number | null;
    reviewDueAt: string | null;
    projectId?: number | null;
  };
  projects?: { id: number; name: string }[];
  masteredLabel?: string;
};

const REVIEW_INTERVALS = [
  { days: 2, label: "2 days" },
  { days: 5, label: "5 days" },
  { days: 7, label: "1 week" },
  { days: 14, label: "2 weeks" },
  { days: 30, label: "1 month" },
  { days: 90, label: "3 months" },
];

/** YYYY-MM-DD in the browser's time zone, so "in 2 days" matches your calendar, not UTC. */
const localDateIn = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-CA");
};
const formatDay = (iso: string) => new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(`${iso}T00:00:00`));

const field = "w-full rounded-[var(--radius-sm)] border border-line-strong bg-surface-base px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-accent";
const label = "block text-xs font-semibold text-ink-secondary";

function MarkdownField({ name, title, hint, value, onChange }: { name: string; title: string; hint: string; value: string; onChange: (v: string) => void }) {
  const [preview, setPreview] = useState(false);
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <label className={label} htmlFor={name}>{title} <span className="font-normal text-ink-faint">(optional)</span></label>
        <button type="button" className="cursor-pointer text-xs text-accent" onClick={() => setPreview((p) => !p)} aria-pressed={preview}>
          {preview ? "Edit" : "Preview"}
        </button>
      </div>
      {preview ? (
        <div className="min-h-28 rounded-[var(--radius-sm)] border border-line bg-surface-base px-3.5 py-2.5">
          {value.trim() ? <Markdown>{value}</Markdown> : <p className="text-sm text-ink-faint">Nothing to preview.</p>}
        </div>
      ) : null}
      <textarea id={name} name={name} rows={5} maxLength={20000} className={`${field} ${preview ? "hidden" : ""}`} placeholder={hint} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function AssessmentForm({ kind, code, current, projects, masteredLabel = STATUS_LABEL.mastered }: Props) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveAssessmentAction, null);
  const [status, setStatus] = useState<Status>(current.status === "not_applicable" ? "not_started" : current.status);
  const [notes, setNotes] = useState(current.notesMarkdown ?? "");
  const [evidence, setEvidence] = useState(current.evidenceMarkdown ?? "");
  const [confidence, setConfidence] = useState(current.confidence?.toString() ?? "");
  const [reviewChoice, setReviewChoice] = useState(current.reviewDueAt ? "keep" : "");
  const reviewDueAt = reviewChoice === "keep" ? (current.reviewDueAt ?? "") : reviewChoice ? localDateIn(Number(reviewChoice)) : "";
  const [projectId, setProjectId] = useState(current.projectId?.toString() ?? "");
  const [reason, setReason] = useState("");
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    if (state?.ok) {
      setReason("");
      setReviewChoice(reviewChoice ? "keep" : "");
    }
  }
  const regressing = current.status === "mastered" && status !== "mastered";

  if (current.status === "not_applicable") {
    return <p className="text-sm text-ink-muted">This item is Not applicable in the active Standard version and cannot be assessed.</p>;
  }

  return (
    <form action={action} className="grid gap-6">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="code" value={code} />

      <fieldset className="grid gap-2">
        <legend className={`${label} mb-2`}>Status</legend>
        <div className="grid gap-2 sm:grid-cols-4">
          {SELECTABLE_STATUSES.map((s) => (
            <label key={s} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] border px-3 text-sm ${status === s ? "border-accent bg-surface-active text-ink" : "border-line-strong text-ink-muted hover:text-ink"}`}>
              <input type="radio" name="status" value={s} checked={status === s} onChange={() => setStatus(s)} className="accent-[var(--accent)]" />
              {s === "mastered" ? masteredLabel : STATUS_LABEL[s]}
            </label>
          ))}
        </div>
        {status === "mastered" && current.status !== "mastered" ? (
          <p className="text-xs text-ink-muted">Only choose this if you can do everything in the statement above without step-by-step guidance and explain why it works.</p>
        ) : null}
      </fieldset>

      {status !== current.status ? (
        <div className="grid gap-2">
          <label className={label} htmlFor="reason">
            {regressing ? "What changed?" : "Reason for the change"} <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <input id="reason" name="reason" maxLength={1000} className={field} value={reason} onChange={(e) => setReason(e.target.value)} placeholder={regressing ? "e.g. Could not reproduce it from scratch" : ""} />
        </div>
      ) : null}

      <MarkdownField name="notesMarkdown" title="Notes" hint="Context, doubts, reminders. Markdown supported." value={notes} onChange={setNotes} />
      <MarkdownField name="evidenceMarkdown" title="Evidence" hint="A short description and links, e.g. [PR](https://github.com/...)" value={evidence} onChange={setEvidence} />

      <div className="grid items-start gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <label className={label} htmlFor="confidence">Confidence</label>
          <select id="confidence" name="confidence" className={`${field} pr-10`} value={confidence} onChange={(e) => setConfidence(e.target.value)}>
            <option value="">Not set</option>
            {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} / 5</option>)}
          </select>
        </div>
        <div className="grid gap-2">
          <label className={label} htmlFor="reviewIn">Review in</label>
          <select id="reviewIn" className={`${field} pr-10`} value={reviewChoice} onChange={(e) => setReviewChoice(e.target.value)} aria-describedby="reviewIn-due">
            {current.reviewDueAt ? <option value="keep">Keep ({formatDay(current.reviewDueAt)})</option> : null}
            <option value="">{current.reviewDueAt ? "No review" : "Not set"}</option>
            {REVIEW_INTERVALS.map((r) => <option key={r.days} value={r.days}>{r.label}</option>)}
          </select>
          <input type="hidden" name="reviewDueAt" value={reviewDueAt} />
          <p id="reviewIn-due" className="text-xs text-ink-faint">{reviewDueAt ? `Due ${formatDay(reviewDueAt)}` : "No review scheduled"}</p>
        </div>
        {projects ? (
          <div className="grid gap-2">
            <label className={label} htmlFor="projectId">Project</label>
            <select id="projectId" name="projectId" className={`${field} pr-10`} value={projectId} onChange={(e) => setProjectId(e.target.value)}>
              <option value="">None</option>
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Save assessment"}</Button>
        <p aria-live="polite" className={`text-sm ${state?.ok === false ? "text-danger" : "text-ink-muted"}`}>{state?.message}</p>
      </div>
    </form>
  );
}
