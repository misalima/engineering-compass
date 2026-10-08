"use client";

import { useActionState, useState } from "react";
import {
  saveStudyAction,
  deleteStudyAction,
} from "@/app/(app)/study-log/actions";
import { saveCareerAction } from "@/app/(app)/settings/career-actions";
import { Button } from "@/components/ui/button";
import {
  GOALS,
  STACKS,
  STACK_TOOLS,
  MILESTONES,
  MILESTONE_INFO,
  type CareerProfile,
} from "@/growth/model";

const field =
  "mt-2 w-full rounded-[var(--radius-sm)] border border-line-strong bg-surface-base px-3 py-2.5 text-sm text-ink focus:border-accent";
const label = "block text-sm text-ink-secondary";
export function CareerForm({ profile }: { profile: CareerProfile }) {
  const [state, action, pending] = useActionState(saveCareerAction, null);
  return (
    <form action={action} className="grid max-w-3xl gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          Career goal
          <select name="goal" defaultValue={profile.goal} className={field}>
            {Object.entries(GOALS).map(([id, title]) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Primary career language
          <select
            name="primaryStack"
            defaultValue={profile.primaryStack}
            className={field}
          >
            {Object.entries(STACKS).map(([id, title]) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="text-xs text-ink-muted">
        This is the stack you want to develop professionally. Other languages
        remain in the catalog; Python also supports the AI path.
      </p>
      <fieldset>
        <legend className={label}>Tools to prioritize</legend>
        <div className="mt-3 flex flex-wrap gap-4">
          {STACK_TOOLS.map((tool) => (
            <label
              key={tool}
              className="flex min-h-9 items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                name="stackTools"
                value={tool}
                defaultChecked={profile.stackTools.includes(tool)}
              />
              {tool}
            </label>
          ))}
        </div>
      </fieldset>
      <label className={label}>
        Current target milestone
        <select
          name="targetMilestone"
          defaultValue={profile.targetMilestone}
          className={field}
        >
          {MILESTONES.map((id) => (
            <option key={id} value={id}>
              {MILESTONE_INFO[id].title}
            </option>
          ))}
        </select>
      </label>
      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save career path"}
        </Button>
      </div>
      <p role="status" className="text-sm text-ink-secondary">
        {state?.message}
      </p>
    </form>
  );
}

type StudyFormProps = {
  topics: { code: string; title: string }[];
  topicCode?: string;
  initial?: {
    id: number;
    topicCode: string;
    studiedOn: string;
    notes: string | null;
    link: string | null;
  };
};
export function StudyForm({ topics, topicCode, initial }: StudyFormProps) {
  const [state, action, pending] = useActionState(saveStudyAction, null);
  // Browser-local date, computed on focus when the user starts a new entry (no server timezone assumption).
  const [date, setDate] = useState(initial?.studiedOn ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [link, setLink] = useState(initial?.link ?? "");
  const [selected, setSelected] = useState(
    initial?.topicCode ?? topicCode ?? "",
  );
  const [seen, setSeen] = useState(state);
  if (seen !== state) {
    setSeen(state);
    if (state?.ok && !initial) {
      setNotes("");
      setLink("");
    }
  }
  const setToday = () => {
    if (!date) setDate(new Date().toLocaleDateString("en-CA"));
  };
  return (
    <form action={action} onFocus={setToday} className="grid gap-4">
      {initial ? <input type="hidden" name="id" value={initial.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_12rem]">
        <label className={label}>
          Topic
          <select
            name="topicCode"
            required
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className={field}
          >
            <option value="" disabled>
              Select what you studied
            </option>
            {topics.map((t) => (
              <option key={t.code} value={t.code}>
                {t.title}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Study date
          <input
            type="date"
            required
            name="studiedOn"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={field}
          />
        </label>
      </div>
      <label className={label}>
        Notes <span className="text-ink-faint">(optional)</span>
        <textarea
          name="notes"
          rows={3}
          maxLength={5000}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What did you cover? What still needs practice?"
          className={field}
        />
      </label>
      <label className={label}>
        Reference or project link{" "}
        <span className="text-ink-faint">(optional)</span>
        <input
          name="link"
          type="url"
          maxLength={2000}
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://…"
          className={field}
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : initial ? "Save changes" : "Log study"}
        </Button>
        <span role="status" className="text-sm text-ink-secondary">
          {state?.message}
        </span>
      </div>
    </form>
  );
}
export function DeleteStudy({ id }: { id: number }) {
  const [state, action, pending] = useActionState(deleteStudyAction, null);
  const [confirming, setConfirming] = useState(false);
  if (!confirming)
    return (
      <button
        type="button"
        className="min-h-10 text-xs text-ink-muted hover:text-ink"
        onClick={() => setConfirming(true)}
      >
        Delete entry
      </button>
    );
  return (
    <form action={action} className="flex flex-wrap items-center gap-3 text-xs">
      <input type="hidden" name="id" value={id} />
      <span>Delete this study entry?</span>
      <Button type="submit" variant="secondary" disabled={pending}>
        {pending ? "Deleting…" : "Delete"}
      </Button>
      <button
        type="button"
        className="min-h-10"
        onClick={() => setConfirming(false)}
      >
        Cancel
      </button>
      <span role="status">{state?.message}</span>
    </form>
  );
}
