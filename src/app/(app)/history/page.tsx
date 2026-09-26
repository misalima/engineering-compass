import type { Metadata } from "next";
import Link from "next/link";
import { describeEvent, formatDateTime } from "@/components/assessment/assessment-history";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { PageHeader } from "@/components/ui/page-header";
import { getHistoryPage } from "@/data/assessments";
import { getActiveStandard } from "@/data/standard";
import type { ItemKind } from "@/standard/schema";
import { itemHref } from "@/lib/links";

export const metadata: Metadata = { title: "History" };

const PAGE_SIZE = 50;
const KINDS: { value: ItemKind | undefined; label: string }[] = [
  { value: undefined, label: "All" },
  { value: "competency", label: "Competencies" },
  { value: "experience", label: "Experiences" },
  { value: "depth_criterion", label: "Depth criteria" },
];

export default async function HistoryPage({ searchParams }: PageProps<"/history">) {
  const sp = await searchParams;
  const kind = KINDS.find((k) => k.value && k.value === sp.kind)?.value;
  const page = Math.max(1, Math.floor(Number(sp.page)) || 1);
  const { standard } = await getActiveStandard();
  const { rows, pages } = await getHistoryPage({ page, pageSize: PAGE_SIZE, kind });

  const labels = new Map<string, string>([
    ...standard.domains.flatMap((d) => d.competencies.map((c) => [c.code, c.statement] as const)),
    ...standard.experiences.map((e) => [e.code, `${e.number}. ${e.title}`] as const),
    ...standard.depthGates.flatMap((g) => g.criteria.map((c) => [c.code, `${g.title}: ${c.statement}`] as const)),
  ]);
  const href = (p: number, k = kind) => `/history?${new URLSearchParams({ ...(k ? { kind: k } : {}), ...(p > 1 ? { page: String(p) } : {}) })}`;

  return (
    <MainContentContainer>
      <PageHeader title="History" description="Every status change and every edit to notes or evidence, newest first. History is append-only." />
      <nav aria-label="Filter by type" className="flex flex-wrap gap-2">
        {KINDS.map((k) => (
          <Link key={k.label} href={href(1, k.value)} aria-current={k.value === kind ? "page" : undefined} className={`rounded-full px-3 py-1.5 text-xs ${k.value === kind ? "bg-surface-active text-ink" : "text-ink-muted hover:text-ink"}`}>
            {k.label}
          </Link>
        ))}
      </nav>
      <section className="rounded-[var(--radius-lg)] bg-surface-panel p-6 sm:p-8">
        {rows.length ? (
          <ol className="grid gap-5">
            {rows.map((e) => (
              <li key={e.id} className="grid gap-1 border-l border-line-strong pl-4">
                <Link href={itemHref(e.itemKind, e.itemCode)} className="text-sm text-ink hover:text-accent">{labels.get(e.itemCode) ?? e.itemCode}</Link>
                <span className="text-sm text-ink-secondary">{describeEvent(e)}{e.reason ? ` — ${e.reason}` : ""}</span>
                <time className="text-xs text-ink-faint" dateTime={e.createdAt.toISOString()}>{formatDateTime(e.createdAt)}</time>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-ink-muted">No events recorded yet.</p>
        )}
      </section>
      {pages > 1 ? (
        <nav aria-label="Pagination" className="flex items-center justify-between text-sm">
          {page > 1 ? <Link href={href(page - 1)} className="text-accent">Newer</Link> : <span />}
          <span className="text-ink-faint">Page {page} of {pages}</span>
          {page < pages ? <Link href={href(page + 1)} className="text-accent">Older</Link> : <span />}
        </nav>
      ) : null}
    </MainContentContainer>
  );
}
