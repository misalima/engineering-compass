import { IconArrow } from "@/components/icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { PageHeader, Section } from "@/components/ui/page-header";
import { StudyForm } from "@/components/growth/forms";
import { StudyList } from "@/components/growth/study-list";
import { getGrowth, getStudies } from "@/data/growth";
import { getActiveStandard } from "@/data/standard";
import { GROWTH_CATALOG, TOPIC_BY_CODE } from "@/growth/catalog";
import { MILESTONE_INFO, ABILITY_LABEL } from "@/growth/model";
import { itemHref } from "@/lib/links";

export async function generateMetadata({
  params,
}: PageProps<"/topics/[code]">) {
  return { title: TOPIC_BY_CODE.get((await params).code)?.title ?? "Topic" };
}
export default async function TopicPage({
  params,
}: PageProps<"/topics/[code]">) {
  const { code } = await params;
  if (!TOPIC_BY_CODE.has(code)) notFound();
  const [growth, studies, { standard }] = await Promise.all([
    getGrowth(),
    getStudies({ topicCode: code, pageSize: 5 }),
    getActiveStandard(),
  ]);
  const topic = growth.topics.find((t) => t.code === code)!;
  const statements = new Map(
    standard.domains.flatMap((d) =>
      d.competencies.map((c) => [c.code, c.statement] as const),
    ),
  );
  return (
    <MainContentContainer>
      <PageHeader
        eyebrow={
          <Link href="/topics" className="hover:text-accent">
            Study topics
          </Link>
        }
        title={topic.title}
        description={topic.scope}
      />
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-secondary">
        <span>{topic.studyCount} studies recorded</span>
        <span>
          {topic.done}/{topic.total} capabilities self-assessed as independent
        </span>
      </div>
      <p className="text-xs text-ink-muted">
        {topic.requiredAt
          ? `Required from ${MILESTONE_INFO[topic.requiredAt].title}; included in later milestones.`
          : "An optional topic for your current career goal and primary language."}
      </p>
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="grid gap-6">
          <Section title="What can you do with this knowledge?">
            <p className="mb-4 text-sm text-ink-muted">
              Assess these when you can apply them. Studying this topic never
              changes an assessment automatically.
            </p>
            <ul className="divide-y divide-line">
              {topic.requirements.map((c) => (
                <li key={c.code}>
                  <Link
                    href={itemHref("competency", c.code)}
                    className="block rounded-[var(--radius-sm)] px-4 py-4 transition-colors hover:bg-surface-raised focus-visible:bg-surface-raised"
                  >
                    <p className="text-sm leading-relaxed">
                      {statements.get(c.code)}
                    </p>
                    <p className="mt-2 text-xs text-ink-muted">
                      {ABILITY_LABEL[c.status]}
                      {c.hasEvidence ? " · Evidence recorded" : ""}{" "}
                      <IconArrow className="ml-1 inline-block size-3.5 shrink-0 align-middle" />
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
          <Section
            title="Study history"
            aside={
              <Link
                href={`/study-log?topic=${encodeURIComponent(code)}`}
                className="text-xs text-accent"
              >
                View all {studies.total}{" "}
                <IconArrow className="ml-1 inline-block size-3.5 shrink-0 align-middle" />
              </Link>
            }
          >
            <StudyList entries={studies.rows} />
          </Section>
        </div>
        <div className="grid gap-6">
          <div id="log-study" className="scroll-mt-6">
            <Section title="I studied this">
              <StudyForm topics={[topic]} topicCode={topic.code} />
            </Section>
          </div>
          <Section title="References & scope">
            <p className="mb-4 text-xs leading-relaxed text-ink-muted">
              Primary references behind this topic. The grouping and milestone
              placement are Engineering Compass editorial decisions.
            </p>
            <ul className="grid gap-3">
              {topic.sourceIds.map((id) => {
                const source = GROWTH_CATALOG.sources.find((s) => s.id === id)!;
                return (
                  <li key={id}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-accent hover:underline"
                    >
                      {source.title} ↗
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-xs text-ink-faint">
              Path v{GROWTH_CATALOG.version} · reviewed{" "}
              {GROWTH_CATALOG.reviewedAt}
            </p>
          </Section>
        </div>
      </div>
    </MainContentContainer>
  );
}
