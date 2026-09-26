"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/** Native disclosure that closes itself after navigating. */
export function MobileMenu({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details ref={ref} className="relative [&_summary::-webkit-details-marker]:hidden">
      <summary className="-mr-2 flex min-h-11 cursor-pointer list-none items-center rounded-[var(--radius-sm)] px-3 text-sm font-semibold text-accent hover:bg-surface-panel">Menu</summary>
      <div className="absolute right-0 top-[calc(100%+0.75rem)] w-56 rounded-[var(--radius-md)] bg-surface-raised p-1 shadow-[var(--shadow-raised)]">{children}</div>
    </details>
  );
}
