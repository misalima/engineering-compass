"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { IconArrow } from "@/components/icons";
import { sectionFor } from "@/components/layout/sidebar-menu";

/**
 * Goes back in history when the previous page was inside the app; otherwise links to the section list,
 * so a bookmarked or refreshed detail page never "backs" out of the app.
 */
export function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const depth = useRef(0);
  const popped = useRef(false);
  const last = useRef(pathname);

  useEffect(() => {
    const onPop = () => {
      popped.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (pathname === last.current) return;
    last.current = pathname;
    depth.current = popped.current ? Math.max(0, depth.current - 1) : depth.current + 1;
    popped.current = false;
  }, [pathname]);

  const section = sectionFor(pathname);
  if (!section || pathname === section.href) return null;

  return (
    <div className="mx-auto w-full max-w-[90rem] px-[clamp(1.25rem,3.5vw,4rem)] pt-6 max-[780px]:px-4 max-[780px]:pt-4">
      <Link
        href={section.href}
        onClick={(e) => {
          if (depth.current > 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            router.back();
          }
        }}
        className="-ml-2 inline-flex min-h-9 items-center gap-2 rounded-[var(--radius-sm)] px-2 text-sm text-ink-muted hover:bg-surface-panel hover:text-ink"
      >
        <IconArrow className="size-4 rotate-180" />
        Back
      </Link>
    </div>
  );
}
