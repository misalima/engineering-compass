import type { ComponentType } from "react";

export type SidebarMenuItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  active?: boolean;
};

type SidebarMenuProps = {
  items: readonly SidebarMenuItem[];
  label: string;
};

export function SidebarMenu({ items, label }: SidebarMenuProps) {
  return (
    <nav className="grid gap-1" aria-label={label}>
      {items.map(({ label: itemLabel, href, icon: Icon, active }) => (
        <a
          key={itemLabel}
          href={href}
          className={`flex min-h-11 items-center gap-3 rounded-[var(--radius-sm)] px-3.5 text-sm transition-colors duration-200 ease-[var(--ease-out)] ${active ? "bg-surface-active text-ink" : "text-ink-muted hover:bg-surface-panel hover:text-ink"}`}
          aria-current={active ? "page" : undefined}
        >
          <Icon className="size-[1.125rem] shrink-0" />
          {itemLabel}
        </a>
      ))}
    </nav>
  );
}
