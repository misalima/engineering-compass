import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export const metadata: Metadata = { title: "Not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="grid w-full max-w-sm gap-8 rounded-[var(--radius-lg)] bg-surface-panel p-8">
        <Logo size="lg" />
        <div className="grid gap-2">
          <h1 className="font-display text-2xl font-medium">Page not found</h1>
          <p className="text-sm leading-relaxed text-ink-muted">The link may be outdated, or the item isn’t part of the active Standard.</p>
        </div>
        <Link href="/" className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-sm)] bg-accent px-4 text-sm font-bold text-accent-ink transition-colors hover:bg-accent-strong">
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
