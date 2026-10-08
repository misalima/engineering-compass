import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow?: ReactNode;
  title: string;
  description?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="flex items-end justify-between gap-8 pb-2 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-3">
      <div className="min-w-0">
        {eyebrow ? (
          <div className="mb-3 text-xs text-ink-faint">{eyebrow}</div>
        ) : null}
        <h1 className="font-display text-[clamp(1.75rem,2.5vw,2.5rem)] font-medium leading-[1.1] tracking-[-.025em] [overflow-wrap:anywhere]">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-ink-secondary">
            {description}
          </p>
        ) : null}
      </div>
      {aside}
    </header>
  );
}

export function Section({
  id,
  title,
  children,
  aside,
  variant = "panel",
}: {
  id?: string;
  title: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
  variant?: "panel" | "plain";
}) {
  return (
    <section
      id={id}
      className={
        variant === "plain"
          ? "min-w-0 scroll-mt-6"
          : "scroll-mt-6 rounded-[var(--radius-lg)] bg-surface-panel p-6 sm:p-8"
      }
    >
      <div className="mb-5 flex items-start justify-between gap-6">
        <h2 className="font-display text-lg font-semibold tracking-[-.025em]">
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
}
