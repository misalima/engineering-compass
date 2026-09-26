"use client";

import { useActionState } from "react";
import type { ActionState } from "@/app/(app)/actions";
import { saveProjectAction } from "@/app/(app)/projects/actions";
import { Button } from "@/components/ui/button";

type Project = { name: string; description: string | null; role: string | null; period: string | null; stack: string[]; environment: string | null; visibility: "private" | "anonymized" | "public" };

const field = "w-full rounded-[var(--radius-sm)] border border-line-strong bg-surface-base px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-accent";
const label = "block text-xs font-semibold text-ink-secondary";

export function ProjectForm({ id, project }: { id: number | null; project?: Project }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveProjectAction.bind(null, id), null);
  const text = (name: keyof Project, title: string, placeholder = "") => (
    <div className="grid gap-2">
      <label className={label} htmlFor={name}>{title}</label>
      <input id={name} name={name} className={field} placeholder={placeholder} defaultValue={(project?.[name] as string | null) ?? ""} maxLength={200} required={name === "name"} />
    </div>
  );

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {text("name", "Name")}
        {text("role", "Your role", "e.g. Backend engineer")}
        {text("period", "Period", "e.g. 2025–2026")}
        {text("environment", "Environment", "e.g. Production, 5k users")}
      </div>
      <div className="grid gap-2">
        <label className={label} htmlFor="stack">Stack <span className="font-normal text-ink-faint">(comma separated)</span></label>
        <input id="stack" name="stack" className={field} placeholder="Go, PostgreSQL, Redis" defaultValue={project?.stack.join(", ") ?? ""} maxLength={1000} />
      </div>
      <div className="grid gap-2">
        <label className={label} htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={4} maxLength={5000} className={field} defaultValue={project?.description ?? ""} />
      </div>
      <div className="grid gap-2">
        <label className={label} htmlFor="visibility">Visibility</label>
        <select id="visibility" name="visibility" className={`${field} pr-10`} defaultValue={project?.visibility ?? "private"}>
          <option value="private">Private</option>
          <option value="anonymized">Anonymized</option>
          <option value="public">Public</option>
        </select>
        <p className="text-xs text-ink-faint">Nothing is shared yet. This records how the project may be shown if a portfolio is ever published.</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : id === null ? "Create project" : "Save project"}</Button>
        <p aria-live="polite" className={`text-sm ${state?.ok === false ? "text-danger" : "text-ink-muted"}`}>{state?.message}</p>
      </div>
    </form>
  );
}
