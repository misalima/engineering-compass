import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssessmentPanel } from "@/components/assessment/assessment-panel";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { LevelBadge } from "@/components/ui/level-badge";
import { listProjects } from "@/data/projects";
import { getOverview } from "@/data/standard";

export const metadata: Metadata = { title: "Experience" };

export default async function ExperiencePage({ params }: PageProps<"/experiences/[code]">) {
  const code = decodeURIComponent((await params).code);
  const { standard, details } = await getOverview();
  const experience = standard.experiences.find((e) => e.code === code);
  if (!experience) notFound();
  const projects = await listProjects();

  return (
    <MainContentContainer>
      <div className="grid gap-4">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-faint">
          <Link href="/experiences" className="hover:text-accent">Experience Matrix</Link>
        </nav>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-surface-active px-2.5 py-1 text-ink">{experience.tier === "core" ? "Core" : "Strong"}</span>
          <LevelBadge level={experience.tier === "core" ? "L3" : "L4"} />
          <span className="font-mono text-ink-faint">{experience.code}</span>
        </div>
        <h1 className="font-display text-[clamp(1.5rem,2vw,2rem)] font-medium">{experience.number}. {experience.title}</h1>
        <p className="max-w-[70ch] text-base leading-relaxed text-ink-secondary">{experience.statement}</p>
      </div>
      <AssessmentPanel
        kind="experience"
        code={experience.code}
        detail={details.experiences.get(experience.code)}
        projects={projects.map((p) => ({ id: p.id, name: p.name }))}
        masteredLabel="Completed"
      />
    </MainContentContainer>
  );
}
