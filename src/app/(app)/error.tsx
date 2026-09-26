"use client";

import Link from "next/link";
import { useEffect } from "react";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { Button } from "@/components/ui/button";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MainContentContainer>
      <section role="alert" className="grid max-w-2xl gap-6 rounded-[var(--radius-lg)] bg-surface-panel p-6 sm:p-8">
        <div className="grid gap-3">
          <h1 className="font-display text-2xl font-medium">This page didn’t load</h1>
          <p className="text-sm leading-relaxed text-ink-secondary">
            Nothing you saved was lost. This is usually temporary, often the database waking up or a dropped connection. Try again in a moment.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button onClick={() => retry()}>Try again</Button>
          <Link href="/" className="inline-flex min-h-11 items-center rounded-[var(--radius-sm)] px-2 text-sm font-semibold text-accent hover:text-accent-strong">Go to Dashboard</Link>
        </div>
        {error.digest ? <p className="text-xs text-ink-faint">Reference for the server logs: <code className="font-mono text-ink-muted">{error.digest}</code></p> : null}
      </section>
    </MainContentContainer>
  );
}
