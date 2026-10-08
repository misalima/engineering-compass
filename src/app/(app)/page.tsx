import { Compass } from "lucide-react";
import { IconArrow } from "@/components/icons";
import { DomainBadge } from "@/components/growth/domain-badge";
import { getActiveStandard } from "@/data/standard";
import Link from "next/link";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { PageHeader, Section } from "@/components/ui/page-header";
import { ProgressBar } from "@/components/ui/meter";
import { StudyList } from "@/components/growth/study-list";
import { getGrowth, getStudies } from "@/data/growth";
import { topicHref } from "@/growth/catalog";
import { GOALS, STACKS } from "@/growth/model";

export default async function DashboardPage() {
  const [growth, recent, { standard }] = await Promise.all([
    getGrowth(),
    getStudies({ pageSize: 5 }),
    getActiveStandard(),
  ]);
  const domainNames = new Map(standard.domains.map((d) => [d.code, d.title]));
  const { profile, focus, target, alternatives } = growth;
  return (
    <MainContentContainer>
      <PageHeader
        eyebrow="Your direction"
        title="Keep your next step in sight."
        description={`${GOALS[profile.goal]} · ${STACKS[profile.primaryStack]}${profile.stackTools.length ? ` · ${profile.stackTools.join(", ")}` : ""}`}
        aside={
          <Link
            href="/settings"
            className="text-sm text-accent hover:text-accent-hover py-2 px-3 rounded-md hover:bg-surface-raised"
          >
            Edit career path{" "}
            <IconArrow className="ml-1 inline-block size-4 shrink-0 align-middle" />
          </Link>
        }
      />
      <Link
        href={`/milestones#${target.id}`}
        className="group flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-line pb-5 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
      >
        <div className="min-w-0">
          <p className="text-xs text-ink-muted">Target milestone</p>
          <h2 className="mt-1 font-display text-lg font-semibold tracking-tight group-hover:text-accent">
            {target.title}{" "}
            <IconArrow className="ml-1 inline-block size-4 align-middle text-accent" />
          </h2>
        </div>
        <div className="w-full sm:w-56">
          <p className="mb-2 text-xs text-ink-secondary">
            {target.done} / {target.total} competencies independent
          </p>
          <ProgressBar
            value={target.done}
            total={target.total}
            label="Target milestone capabilities"
          />
        </div>
      </Link>
      <section
        className="relative isolate overflow-hidden border-l-[3px] border-accent bg-accent/[0.06] px-5 py-7 sm:px-8 sm:py-8"
        aria-labelledby="focus-heading"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_90%_0%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-28 -z-10 hidden size-80 rotate-[-25deg] items-center justify-center rounded-full border border-accent/15 sm:flex"
        >
          <div className="flex size-60 items-center justify-center rounded-full border border-dashed border-accent/20">
            <div className="flex size-40 items-center justify-center rounded-full border border-accent/15">
              <Compass strokeWidth={1.25} className="size-20 text-accent/20" />
            </div>
          </div>
          <span className="absolute left-11 top-10 size-3 rounded-full bg-accent/40" />
          <span className="absolute bottom-10 right-11 size-2 rounded-full bg-accent/25" />
        </div>
        <div className="mb-5 flex items-center gap-2.5 text-accent">
          <span className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-ink">
            <Compass className="size-4" aria-hidden="true" />
          </span>
          <p className="text-xs font-semibold">Recommended next focus</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-10">
          <div className="min-w-0">
            {focus ? (
              <div className="mb-4">
                <DomainBadge
                  domainCode={focus.domainCode}
                  title={domainNames.get(focus.domainCode)!}
                />
              </div>
            ) : null}
            <h2
              id="focus-heading"
              className="max-w-[32ch] font-display text-2xl font-semibold leading-tight tracking-tight text-ink [overflow-wrap:anywhere]"
            >
              {focus?.title ?? "Your target requirements are met."}
            </h2>
            <p className="mt-3 max-w-[55ch] text-sm leading-relaxed text-ink-secondary">
              {focus?.scope ??
                "Review your assessments or choose the next milestone to continue your path."}
            </p>
          </div>
          <div className="min-w-0 lg:pb-1">
            {growth.reason ? (
              <div>
                <p className="mb-2 text-sm font-semibold text-ink-secondary">
                  Why this next?
                </p>
                <p className="max-w-[48ch] text-sm leading-relaxed text-ink-faint">
                  {growth.reason}
                </p>
              </div>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={focus ? topicHref(focus.code) : "/milestones"}
                className="group/action inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-sm)] bg-accent px-5 text-sm font-semibold text-accent-ink transition-[background-color,box-shadow] duration-200 hover:bg-accent-hover hover:shadow-md focus-visible:bg-accent-hover"
              >
                {focus ? "Explore topic" : "View milestones"}
                <IconArrow className="size-4 transition-transform duration-200 motion-safe:group-hover/action:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:gap-12">
        <div className="grid gap-6">
          <Section
            variant="plain"
            title="Also on your path"
            aside={
              <Link href="/topics" className="text-xs text-accent">
                All topics{" "}
                <IconArrow className="ml-1 inline-block size-3.5 shrink-0 align-middle" />
              </Link>
            }
          >
            {alternatives.length ? (
              <ul className="divide-y divide-line">
                {alternatives.map((t) => (
                  <li key={t.code}>
                    <Link
                      href={topicHref(t.code)}
                      className="flex items-center justify-between gap-4 rounded-[var(--radius-sm)] px-4 py-4 transition-colors hover:bg-surface-raised hover:text-accent focus-visible:bg-surface-raised"
                    >
                      <div>
                        <h3 className="text-sm font-semibold">{t.title}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <DomainBadge
                            domainCode={t.domainCode}
                            title={domainNames.get(t.domainCode)!}
                          />
                          <span className="text-xs text-ink-muted">
                            {t.state}
                          </span>
                        </div>
                      </div>
                      <span className="shrink-0 text-xs text-ink-muted">
                        {t.done}/{t.total}{" "}
                        <IconArrow className="ml-1 inline-block size-3.5 shrink-0 align-middle" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-muted">
                No remaining gaps in this target. You can explore the full
                catalog or reassess your skills.
              </p>
            )}
          </Section>
        </div>
        <Section
          variant="plain"
          title="Recent studies"
          aside={
            <Link href="/study-log" className="text-xs text-accent">
              Study log{" "}
              <IconArrow className="ml-1 inline-block size-3.5 shrink-0 align-middle" />
            </Link>
          }
        >
          <StudyList entries={recent.rows} />
        </Section>
      </div>
    </MainContentContainer>
  );
}
