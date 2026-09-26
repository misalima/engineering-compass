import type { ReactNode } from "react";
import { MainContentContainer } from "@/components/layout/main-content-container";

/** A placeholder shape. `onCanvas` is for bones outside panels, which sit on a darker background. */
export function Bone({ className = "", onCanvas = false }: { className?: string; onCanvas?: boolean }) {
  return <div className={`animate-pulse rounded-[var(--radius-sm)] ${onCanvas ? "bg-surface-panel" : "bg-surface-raised"} ${className}`} />;
}

export function SkeletonPage({ children }: { children: ReactNode }) {
  return (
    <MainContentContainer aria-busy="true">
      <span className="sr-only" role="status">Loading…</span>
      {children}
    </MainContentContainer>
  );
}

/** Mirrors PageHeader. */
export function SkeletonHeader({ eyebrow = false, description = true, aside = false }: { eyebrow?: boolean; description?: boolean; aside?: boolean }) {
  return (
    <div className="flex items-end justify-between gap-8 pb-2">
      <div className="grid w-full max-w-[40rem] gap-3">
        {eyebrow ? <Bone onCanvas className="h-3 w-28" /> : null}
        <Bone onCanvas className="h-9 w-72 max-w-full" />
        {description ? <Bone onCanvas className="mt-1 h-4 w-full" /> : null}
      </div>
      {aside ? <Bone onCanvas className="h-4 w-24 shrink-0 max-[640px]:hidden" /> : null}
    </div>
  );
}

/** Mirrors Section: a panel with a title. */
export function SkeletonPanel({ children, title = true, className = "" }: { children?: ReactNode; title?: boolean; className?: string }) {
  return (
    <div className={`rounded-[var(--radius-lg)] bg-surface-panel p-6 sm:p-8 ${className}`}>
      {title ? <Bone className="mb-6 h-5 w-44" /> : null}
      {children}
    </div>
  );
}

/** Mirrors the clickable item lists: text on the left, status badge on the right. */
export function SkeletonRows({ count, twoLine = false }: { count: number; twoLine?: boolean }) {
  return (
    <div className="grid gap-1">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex items-start justify-between gap-6 px-3 py-3">
          <div className="grid w-full max-w-[36rem] gap-2">
            <Bone className={`h-4 ${twoLine ? "w-48" : i % 3 === 1 ? "w-3/4" : "w-full"}`} />
            {twoLine ? <Bone className="h-4 w-full" /> : null}
          </div>
          <Bone className="h-4 w-20 shrink-0" />
        </div>
      ))}
    </div>
  );
}

/** Mirrors Meter: label, count, bar. */
export function SkeletonMeter() {
  return (
    <div className="grid gap-2">
      <div className="flex justify-between gap-3">
        <Bone className="h-3 w-32" />
        <Bone className="h-3 w-10" />
      </div>
      <Bone className="h-1.5 w-full rounded-full" />
    </div>
  );
}

/** Mirrors the header of competency, experience, and criterion pages: breadcrumb, chips, statement. */
export function SkeletonItemHeader({ statement = false }: { statement?: boolean }) {
  return (
    <div className="grid gap-4">
      <Bone onCanvas className="h-3 w-40" />
      <div className="flex gap-3">
        <Bone onCanvas className="h-6 w-36 rounded-full" />
        <Bone onCanvas className="h-6 w-48" />
      </div>
      <div className="grid max-w-[70ch] gap-2">
        <Bone onCanvas className="h-7 w-full" />
        <Bone onCanvas className="h-7 w-2/3" />
      </div>
      {statement ? <Bone onCanvas className="h-5 w-full max-w-[70ch]" /> : null}
    </div>
  );
}

function SkeletonField({ tall = false }: { tall?: boolean }) {
  return (
    <div className="grid gap-2">
      <Bone className="h-3 w-20" />
      <Bone className={tall ? "h-28" : "h-11"} />
    </div>
  );
}

/** Mirrors AssessmentPanel: the form on the left, history on the right. */
export function SkeletonAssessment() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <SkeletonPanel>
        <div className="grid gap-6">
          <div className="grid gap-2 sm:grid-cols-4">
            {[0, 1, 2, 3].map((i) => <Bone key={i} className="h-11" />)}
          </div>
          <SkeletonField tall />
          <SkeletonField tall />
          <div className="grid gap-4 sm:grid-cols-3">
            <SkeletonField />
            <SkeletonField />
          </div>
          <Bone className="h-11 w-40" />
        </div>
      </SkeletonPanel>
      <SkeletonPanel>
        <SkeletonTimeline count={3} />
      </SkeletonPanel>
    </div>
  );
}

/** Mirrors the history lists: entries with a left rule. */
export function SkeletonTimeline({ count }: { count: number }) {
  return (
    <div className="grid gap-5">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="grid gap-2 border-l border-line-strong pl-4">
          <Bone className={`h-4 ${i % 2 ? "w-2/3" : "w-full"}`} />
          <Bone className="h-4 w-40" />
          <Bone className="h-3 w-28" />
        </div>
      ))}
    </div>
  );
}

/** Mirrors the project form fields. */
export function SkeletonForm({ fields }: { fields: number }) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: fields }, (_, i) => <SkeletonField key={i} />)}
      </div>
      <SkeletonField tall />
      <Bone className="h-11 w-36" />
    </div>
  );
}
