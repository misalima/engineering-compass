import type { Metadata } from "next";
import Link from "next/link";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { ProjectForm } from "@/components/project-form";
import { PageHeader, Section } from "@/components/ui/page-header";
import { listProjects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await listProjects();

  return (
    <MainContentContainer>
      <PageHeader title="Projects" description="Real systems you worked on. Link them from experiences to keep evidence in context." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Your projects">
          {projects.length ? (
            <ul className="-mx-5 grid gap-1">
              {projects.map((p) => (
                <li key={p.id}>
                  <Link href={`/projects/${p.id}`} className="grid gap-1 rounded-[var(--radius-sm)] px-5 py-3 hover:bg-surface-raised">
                    <span className="flex items-center justify-between gap-4 text-sm text-ink"><span className="min-w-0 [overflow-wrap:anywhere]">{p.name}</span><span className="shrink-0 text-xs capitalize text-ink-faint">{p.visibility}</span></span>
                    {p.stack.length ? <span className="text-xs text-ink-muted">{p.stack.join(" · ")}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-muted">No projects yet.</p>
          )}
        </Section>
        <Section title="New project">
          <ProjectForm id={null} />
        </Section>
      </div>
    </MainContentContainer>
  );
}
