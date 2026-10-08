import { IconArrow } from "@/components/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { PageHeader, Section } from "@/components/ui/page-header";
import { StudyForm } from "@/components/growth/forms";
import { StudyList } from "@/components/growth/study-list";
import { getStudies } from "@/data/growth";
import { GROWTH_CATALOG, TOPIC_BY_CODE } from "@/growth/catalog";

export const metadata: Metadata = { title: "Study log" };
export default async function StudyLogPage({
  searchParams,
}: PageProps<"/study-log">) {
  const params = await searchParams;
  const topicCode =
    typeof params.topic === "string" && TOPIC_BY_CODE.has(params.topic)
      ? params.topic
      : undefined;
  const parsed = Number(params.page);
  const requested =
    Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, 100000) : 1;
  let studies = await getStudies({ topicCode, page: requested });
  const page = Math.min(requested, studies.pages);
  if (page !== requested) studies = await getStudies({ topicCode, page });
  const href = (p: number) =>
    `/study-log?${new URLSearchParams({ page: String(p), ...(topicCode ? { topic: topicCode } : {}) })}`;
  return (
    <MainContentContainer>
      <PageHeader
        title="Your study history"
        description="Capture what you covered, when, and anything worth keeping. Practical capability is assessed separately."
      />
      <Section title="Log a study">
        <StudyForm
          topics={GROWTH_CATALOG.topics.map(({ code, title }) => ({
            code,
            title,
          }))}
          topicCode={topicCode}
        />
      </Section>
      <Section
        title={topicCode ? TOPIC_BY_CODE.get(topicCode)!.title : "All studies"}
        aside={
          topicCode ? (
            <Link href="/study-log" className="text-xs text-accent">
              Clear filter
            </Link>
          ) : (
            <span className="text-xs text-ink-faint">
              {studies.total} entries
            </span>
          )
        }
      >
        <StudyList entries={studies.rows} editable />
        {studies.pages > 1 ? (
          <nav
            aria-label="Study history pages"
            className="mt-6 flex justify-between text-sm"
          >
            {page > 1 ? (
              <Link href={href(page - 1)} className="text-accent">
                ← Previous
              </Link>
            ) : (
              <span />
            )}
            <span>
              {page} / {studies.pages}
            </span>
            {page < studies.pages ? (
              <Link href={href(page + 1)} className="text-accent">
                Next{" "}
                <IconArrow className="ml-1 inline-block size-3.5 shrink-0 align-middle" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        ) : null}
      </Section>
    </MainContentContainer>
  );
}
