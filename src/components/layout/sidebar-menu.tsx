"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconDepth, IconFolder, IconHistory, IconLibrary, IconOverview, IconRoute, IconSettings } from "@/components/icons";

const navigation = [
  { label: "Dashboard", href: "/", icon: IconOverview, match: ["/"] },
  { label: "Domains", href: "/domains", icon: IconLibrary, match: ["/domains", "/competencies"] },
  { label: "Experience Matrix", href: "/experiences", icon: IconRoute, match: ["/experiences"] },
  { label: "Depth Gates", href: "/depth-gates", icon: IconDepth, match: ["/depth-gates", "/depth-criteria"] },
  { label: "Projects", href: "/projects", icon: IconFolder, match: ["/projects"] },
  { label: "History", href: "/history", icon: IconHistory, match: ["/history"] },
  { label: "Settings", href: "/settings", icon: IconSettings, match: ["/settings"] },
] as const;

const isActive = (pathname: string, match: readonly string[]) =>
  match.some((m) => (m === "/" ? pathname === "/" : pathname === m || pathname.startsWith(`${m}/`)));

export const sectionFor = (pathname: string) => navigation.find((item) => isActive(pathname, item.match));

export function SidebarMenu({ label }: { label: string }) {
  const pathname = usePathname();
  return (
    <nav className="grid gap-1" aria-label={label}>
      {navigation.map(({ label: itemLabel, href, icon: Icon, match }) => {
        const active = isActive(pathname, match);
        return (
          <Link
            key={href}
            href={href}
            className={`flex min-h-11 items-center gap-3 rounded-[var(--radius-sm)] px-3.5 text-sm transition-colors duration-200 ease-[var(--ease-out)] ${active ? "bg-surface-active text-ink" : "text-ink-muted hover:bg-surface-panel hover:text-ink"}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="size-[1.125rem] shrink-0" />
            {itemLabel}
          </Link>
        );
      })}
    </nav>
  );
}
