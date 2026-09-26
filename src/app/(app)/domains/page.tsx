import type { Metadata } from "next";
import Link from "next/link";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { PageHeader } from "@/components/ui/page-header";
import { getOverview } from "@/data/standard";
import { domainHref } from "@/lib/links";
import { LevelBadge, LevelName } from "@/components/ui/level-badge";
import { DOMAIN_STATUS_LABEL } from "@/progression";

export const metadata: Metadata = { title: "Domains" };

export default async function DomainsPage() {
  const { progress } = await getOverview();

  return (
    <MainContentContainer>
      <PageHeader title="Domains" description={<>A domain is mid-level complete when every competency up to <LevelName level="L3" /> is Mastered. <LevelName level="L4" /> items never block it.</>} />
      <div className="overflow-x-auto rounded-[var(--radius-lg)] bg-surface-panel">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="text-xs text-ink-faint">
            <tr className="border-b border-line">
              <th scope="col" className="px-6 py-4 font-medium">Domain</th>
              <th scope="col" className="px-4 py-4 font-medium">Mid-level</th>
              <th scope="col" className="px-4 py-4 font-medium">Strong</th>
              <th scope="col" className="px-4 py-4 font-medium">Next level</th>
              <th scope="col" className="px-4 py-4 font-medium">Review</th>
              <th scope="col" className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {progress.domains.map((d, i) => (
              <tr key={d.code} className="group relative border-b border-line last:border-0 hover:bg-surface-raised/50 has-[a:focus-visible]:bg-surface-raised/50">
                <th scope="row" className="px-6 py-3.5 font-normal">
                  <Link href={domainHref(d.code)} className="text-ink outline-none group-hover:text-accent after:absolute after:inset-0 focus-visible:text-accent"><span className="mr-2 font-mono text-xs text-ink-faint">{i + 1}.</span>{d.title}</Link>
                </th>
                <td className="px-4 py-3.5 font-mono text-xs text-ink-secondary">{d.midLevel.mastered}/{d.midLevel.total}</td>
                <td className="px-4 py-3.5 font-mono text-xs text-ink-secondary">{d.advanced.total ? `${d.advanced.mastered}/${d.advanced.total}` : "—"}</td>
                <td className="px-4 py-3.5 text-xs text-ink-muted">{d.nextRequiredLevel ? <LevelBadge level={d.nextRequiredLevel} /> : "—"}</td>
                <td className="px-4 py-3.5 text-xs text-warning">{d.reviewRequired || ""}</td>
                <td className="px-6 py-3.5 text-xs text-ink-secondary">{DOMAIN_STATUS_LABEL[d.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainContentContainer>
  );
}
