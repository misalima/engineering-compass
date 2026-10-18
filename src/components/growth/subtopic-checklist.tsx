"use client";

import { useState, useTransition } from "react";
import { IconCheck } from "@/components/icons";
import { setSubtopicStudiedAction } from "@/app/(app)/topics/actions";

type Completion = { subtopicCode: string; studiedOn: string };
type Props = {
  topicCode: string;
  subtopics: { code: string; title: string }[];
  completions: Completion[];
};

export function SubtopicChecklist({
  topicCode,
  subtopics,
  completions,
}: Props) {
  const [saved, setSaved] = useState(completions);
  const [seen, setSeen] = useState(completions);
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  // Reconcile refreshed server data, including back/forward navigation, without resetting a saved checkbox.
  if (seen !== completions) {
    setSeen(completions);
    setSaved(completions);
  }
  const dates = new Map(saved.map((c) => [c.subtopicCode, c.studiedOn]));
  const done = subtopics.filter((s) => dates.has(s.code)).length;

  function toggle(subtopicCode: string, checked: boolean) {
    const now = new Date();
    const studiedOn = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const previous = saved;
    setSaved(
      checked
        ? [...saved, { subtopicCode, studiedOn }]
        : saved.filter((c) => c.subtopicCode !== subtopicCode),
    );
    setFeedback(null);
    startTransition(async () => {
      try {
        const result = await setSubtopicStudiedAction({
          topicCode,
          subtopicCode,
          checked,
          studiedOn,
        });
        if (!result.ok) setSaved(previous);
        setFeedback(
          result.ok
            ? {
                ok: true,
                message: checked
                  ? "Study recorded. Add notes or a link in Study history."
                  : "Item unchecked. Your study history is preserved.",
              }
            : result,
        );
      } catch {
        setSaved(previous);
        setFeedback({
          ok: false,
          message: "Could not save this item. Please try again.",
        });
      }
    });
  }

  return (
    <section
      aria-labelledby="study-checklist-title"
      className="min-w-0 border-t-2 border-accent pt-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2
          id="study-checklist-title"
          className="font-display text-xl font-semibold tracking-tight"
        >
          What to study
        </h2>
        <span className="text-sm tabular-nums text-accent">
          {done} of {subtopics.length} studied
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Check each item as you study it. Each check records a study with today’s
        date; practical ability is assessed below.
      </p>
      <progress
        aria-label="Subtopics studied"
        value={done}
        max={subtopics.length}
        className="mt-5 h-1.5 w-full accent-accent"
      />
      <ul className="mt-3 divide-y divide-line" aria-busy={pending}>
        {subtopics.map((subtopic) => (
          <li key={subtopic.code}>
            <label
              className={`group flex min-h-16 cursor-pointer items-start gap-4 rounded-[var(--radius-sm)] px-3 py-4 transition-colors hover:bg-surface-raised ${pending ? "cursor-wait" : ""}`}
            >
              <span className="relative mt-0.5 size-6 shrink-0">
                <input
                  type="checkbox"
                  aria-label={subtopic.title}
                  aria-describedby={
                    dates.has(subtopic.code)
                      ? `studied-${subtopic.code}`
                      : undefined
                  }
                  checked={dates.has(subtopic.code)}
                  disabled={pending}
                  onChange={(event) =>
                    toggle(subtopic.code, event.target.checked)
                  }
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="flex size-6 items-center justify-center rounded-full border border-line-strong bg-surface-base text-transparent transition-[background-color,border-color,box-shadow,color] duration-200 group-hover:border-accent group-hover:ring-4 group-hover:ring-accent/10 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent peer-disabled:opacity-50 motion-reduce:transition-none"
                >
                  <IconCheck className="size-3.5" strokeWidth={3} />
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block text-sm leading-relaxed ${dates.has(subtopic.code) ? "text-ink-secondary" : "text-ink"}`}
                >
                  {subtopic.title}
                </span>
                {dates.has(subtopic.code) ? (
                  <span
                    id={`studied-${subtopic.code}`}
                    className="mt-1 block text-xs text-ink-muted"
                  >
                    Studied{" "}
                    <time dateTime={dates.get(subtopic.code)}>
                      {dates.get(subtopic.code)}
                    </time>
                  </span>
                ) : null}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <p
        role={feedback?.ok === false ? "alert" : "status"}
        className="mt-3 min-h-5 text-xs leading-relaxed text-ink-muted"
      >
        {pending ? "Saving…" : feedback?.message}
      </p>
    </section>
  );
}
