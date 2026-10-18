import type { Metadata } from "next";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { PageHeader } from "@/components/ui/page-header";
import { TopicCatalog } from "@/components/growth/topic-catalog";
import { getGrowth, getSubtopicStudyCounts } from "@/data/growth";
import { MILESTONE_INFO } from "@/growth/model";
import { getActiveStandard } from "@/data/standard";

export const metadata: Metadata = { title: "Study topics" };
export default async function TopicsPage() {
  const [growth, { standard }, subtopicCounts] = await Promise.all([
    getGrowth(),
    getActiveStandard(),
    getSubtopicStudyCounts(),
  ]);
  const names = new Map(standard.domains.map((d) => [d.code, d.title]));
  const counts = new Map(subtopicCounts.map((s) => [s.topicCode, s.count]));
  const cards = growth.topics.map(
    ({
      code,
      title,
      scope,
      domainCode,
      state,
      inTarget,
      requiredAt,
      done,
      total,
      studyCount,
      subtopics,
    }) => ({
      code,
      title,
      scope,
      domainCode,
      domainTitle: names.get(domainCode)!,
      requirementLabel: inTarget
        ? "Required for your current milestone"
        : requiredAt
          ? `Required from ${MILESTONE_INFO[requiredAt].title}`
          : "Optional for your selected career path",
      state,
      inTarget,
      done,
      total,
      studyCount,
      studiedSubtopicCount: counts.get(code) ?? 0,
      subtopicCount: subtopics.length,
    }),
  );
  return (
    <MainContentContainer>
      <PageHeader
        title="Know what to study next."
        description="Explore concrete topics, record your studies and assess the capabilities each topic supports."
      />
      <TopicCatalog topics={cards} targetTitle={growth.target.title} />
    </MainContentContainer>
  );
}
