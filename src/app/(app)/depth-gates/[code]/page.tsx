import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { Meter } from "@/components/ui/meter";
import { PageHeader, Section } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getOverview } from "@/data/standard";
import { GATE_IMAGES } from "@/lib/gate-images";
import { itemHref } from "@/lib/links";

export const metadata: Metadata = { title: "Depth Gate" };

export default async function DepthGatePage({ params }: PageProps<"/depth-gates/[code]">) {
  const code = decodeURIComponent((await params).code);
  const { standard, details, progress } = await getOverview();
  const gate = standard.depthGates.find((g) => g.code === code);
  if (!gate) notFound();
  const image = GATE_IMAGES[gate.code];
  const complete = progress.completedGates.has(gate.code);
  const mastered = gate.criteria.filter((c) => details.depthCriteria.get(c.code)?.status === "mastered").length;

  return (
    <MainContentContainer>
      <div className="overflow-hidden rounded-[var(--radius-lg)] bg-canvas pb-[clamp(1.25rem,2vw,2rem)] scheme-dark">
        {image ? (
          <div className="relative mb-[calc(-16.667%-1.5rem)] overflow-hidden max-[640px]:mb-[calc(-28.125%-1.5rem)]">
            <Image
              src={image}
              alt=""
              placeholder="blur"
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 781px) calc(100vw - 15rem), 100vw"
              className="aspect-[3/1] w-full object-cover max-[640px]:aspect-[16/9]"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-canvas from-20% via-canvas/80 via-55% to-transparent to-90%" />
          </div>
        ) : null}
        <div className="relative grid gap-6 px-[clamp(1.25rem,2vw,2rem)]">
          <PageHeader
            eyebrow={<Link href="/depth-gates" className="hover:text-accent">Depth Gate {gate.order} of {standard.depthGates.length}</Link>}
            title={gate.title}
            description="Complete only when every criterion is mastered and has been exercised repeatedly or in a real system."
            aside={<span className={`text-sm font-semibold ${complete ? "text-accent" : "text-ink-muted"}`}>{complete ? "Complete" : "Open"}</span>}
          />
          <div className="max-w-md">
            <Meter label="Criteria mastered" value={mastered} total={gate.criteria.length} />
          </div>
        </div>
      </div>
      <Section title="Criteria">
        <ul className="-mx-5 grid gap-1">
          {gate.criteria.map((c) => (
            <li key={c.code}>
              <Link href={itemHref("depth_criterion", c.code)} className="flex items-start justify-between gap-6 rounded-[var(--radius-sm)] px-5 py-3 hover:bg-surface-raised">
                <span className="text-sm leading-relaxed text-ink-secondary">{c.statement}</span>
                <StatusBadge status={details.depthCriteria.get(c.code)?.status ?? "not_started"} />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </MainContentContainer>
  );
}
