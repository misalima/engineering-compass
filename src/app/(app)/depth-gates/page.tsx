import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { LevelName } from "@/components/ui/level-badge";
import { Meter } from "@/components/ui/meter";
import { PageHeader } from "@/components/ui/page-header";
import { getOverview } from "@/data/standard";
import { GATE_IMAGES } from "@/lib/gate-images";
import { gateHref } from "@/lib/links";

export const metadata: Metadata = { title: "Depth Gates" };

export default async function DepthGatesPage() {
  const { standard, details, progress } = await getOverview();
  const { depth } = progress.metrics;

  return (
    <MainContentContainer>
      <PageHeader
        title="Depth Gates"
        description={
          <>
            <LevelName level="L4" /> requires Go + Database Engineering + one of {"{Distributed Systems, Reliability/Operations, AI Engineering}"} + any two of the remaining gates. Completing all eight is an optional Full Depth badge.
          </>
        }
        aside={
          <span className="text-sm text-ink-secondary">
            {depth.ruleSatisfied ? "Gate rule met" : "Gate rule not met"}{depth.fullDepth ? " · Full Depth" : ""}
          </span>
        }
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {standard.depthGates.map((g) => {
          const mastered = g.criteria.filter((c) => details.depthCriteria.get(c.code)?.status === "mastered").length;
          const complete = progress.completedGates.has(g.code);
          const image = GATE_IMAGES[g.code];
          return (
            <li key={g.code}>
              <Link href={gateHref(g.code)} className="group grid overflow-hidden rounded-[var(--radius-lg)] bg-surface-panel scheme-dark transition-colors hover:bg-surface-raised">
                {image ? (
                  <div className="relative mb-[-20%] overflow-hidden">
                    <Image
                      src={image}
                      alt=""
                      placeholder="blur"
                      sizes="(min-width: 768px) calc((100vw - 15rem) / 2), 100vw"
                      className="aspect-[5/2] w-full object-cover transition-transform duration-500 ease-[var(--ease-out)] motion-safe:group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface-panel from-20% via-surface-panel/80 via-55% to-transparent to-90% transition-colors group-hover:from-surface-raised group-hover:via-surface-raised/80" />
                  </div>
                ) : null}
                <div className="relative grid gap-5 px-6 pb-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-lg font-semibold">{g.order}. {g.title}</h2>
                    <span className={`text-xs ${complete ? "text-accent" : "text-ink-faint"}`}>{complete ? "Complete" : "Open"}</span>
                  </div>
                  <Meter label="Criteria mastered" value={mastered} total={g.criteria.length} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </MainContentContainer>
  );
}
