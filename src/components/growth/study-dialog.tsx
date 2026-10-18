"use client";

import { useCallback, useId, useRef, useState } from "react";
import { IconClose, IconPlus } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { StudyForm } from "./forms";

export function StudyDialog({
  topics,
  topicCode,
}: {
  topics: { code: string; title: string }[];
  topicCode?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const close = useCallback(() => dialog.current?.close(), []);
  const saved = useCallback(() => {
    setMessage("Study recorded.");
    dialog.current?.close();
  }, []);

  return (
    <div className="shrink-0">
      <Button
        onClick={() => {
          setMessage("");
          setOpen(true);
          dialog.current?.showModal();
        }}
        className="inline-flex items-center gap-2"
      >
        <IconPlus aria-hidden="true" className="size-4" />
        Log a study
      </Button>
      <span role="status" className="sr-only">
        {message}
      </span>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl overscroll-contain overflow-y-auto rounded-[var(--radius-lg)] border border-line bg-surface-panel p-0 text-ink shadow-2xl backdrop:bg-black/45 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2
                id={titleId}
                className="font-display text-xl font-semibold tracking-tight"
              >
                Log a study
              </h2>
              <p
                id={descriptionId}
                className="mt-2 text-sm leading-relaxed text-ink-muted"
              >
                Capture what you covered. Practical ability is assessed
                separately.
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close study form"
              className="-mr-2 -mt-2 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink"
            >
              <IconClose aria-hidden="true" className="size-5" />
            </button>
          </div>
          {open ? (
            <StudyForm
              topics={topics}
              topicCode={topicCode}
              onSaved={saved}
              onCancel={close}
            />
          ) : null}
        </div>
      </dialog>
    </div>
  );
}
