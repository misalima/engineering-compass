import { Section } from "@/components/ui/page-header";
import { getItemHistory, type AssessmentDetail } from "@/data/assessments";
import type { ItemKind } from "@/standard/schema";
import { AssessmentForm } from "./assessment-form";
import { AssessmentHistory, formatDateTime } from "./assessment-history";

export async function AssessmentPanel({ kind, code, detail, projects, masteredLabel }: { kind: ItemKind; code: string; detail?: AssessmentDetail; projects?: { id: number; name: string }[]; masteredLabel?: string }) {
  const rows = await getItemHistory(kind, code);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <Section
        title="Assessment"
        aside={detail?.lastReviewedAt ? <span className="text-xs text-ink-faint">Last reviewed {formatDateTime(detail.lastReviewedAt)}</span> : null}
      >
        <AssessmentForm
          kind={kind}
          code={code}
          projects={projects}
          masteredLabel={masteredLabel}
          current={{
            status: detail?.status ?? "not_started",
            notesMarkdown: detail?.notesMarkdown ?? null,
            evidenceMarkdown: detail?.evidenceMarkdown ?? null,
            confidence: detail?.confidence ?? null,
            reviewDueAt: detail?.reviewDueAt?.toISOString().slice(0, 10) ?? null,
            projectId: detail?.projectId ?? null,
          }}
        />
      </Section>
      <Section title="History">
        <AssessmentHistory events={rows} />
      </Section>
    </div>
  );
}
