import Link from "next/link";
import { TOPIC_BY_CODE, topicHref } from "@/growth/catalog";
import type { StudyEntry } from "@/growth/model";
import { STANDARD_V1_1 } from "@/standard";
import { DomainBadge } from "./domain-badge";
import { DeleteStudy, StudyForm } from "./forms";

const domainNames = new Map(
  STANDARD_V1_1.domains.map((d) => [d.code, d.title]),
);

export function StudyList({
  entries,
  editable = false,
}: {
  entries: StudyEntry[];
  editable?: boolean;
}) {
  if (!entries.length)
    return (
      <p className="text-sm text-ink-muted">
        No studies recorded yet. Choose a topic and log what you covered.
      </p>
    );
  return (
    <ul className="divide-y divide-line">
      {entries.map((entry) => {
        const topic = TOPIC_BY_CODE.get(entry.topicCode);
        return (
          <li key={entry.id} className="grid gap-3 py-5 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Link
                className="text-sm font-semibold hover:text-accent"
                href={topicHref(entry.topicCode)}
              >
                {topic?.title ?? entry.topicCode}
              </Link>
              <time
                dateTime={entry.studiedOn}
                className="text-xs text-ink-muted"
              >
                {entry.studiedOn}
              </time>
            </div>
            {topic ? (
              <div>
                <DomainBadge
                  domainCode={topic.domainCode}
                  title={domainNames.get(topic.domainCode)!}
                />
              </div>
            ) : null}
            {entry.notes ? (
              <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-ink-secondary">
                {entry.notes}
              </p>
            ) : null}
            {entry.link ? (
              <a
                className="break-all text-sm text-accent hover:underline"
                href={entry.link}
                target="_blank"
                rel="noreferrer"
              >
                {entry.link}
              </a>
            ) : null}
            {editable ? (
              <details className="text-sm">
                <summary className="min-h-10 cursor-pointer text-ink-muted">
                  Edit study
                </summary>
                <div className="mt-3 grid gap-4 rounded-[var(--radius-sm)] bg-surface-base p-4">
                  <StudyForm
                    initial={entry}
                    topics={[
                      {
                        code: entry.topicCode,
                        title: topic?.title ?? entry.topicCode,
                      },
                    ]}
                  />
                  <DeleteStudy id={entry.id} />
                </div>
              </details>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
