import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteProjectAction } from "../actions";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { ProjectForm } from "@/components/project-form";
import { SecondaryButton } from "@/components/ui/button";
import { PageHeader, Section } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getProjectWithExperiences } from "@/data/projects";
import { itemHref } from "@/lib/links";

export const metadata: Metadata = { title: "Project" };

export default async function ProjectPage({ params }: PageProps<"/projects/[id]">) {
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();
  const found = await getProjectWithExperiences(id);
  if (!found) notFound();
  const { project, experiences } = found;

  return (
    <MainContentContainer>
      <PageHeader eyebrow={<Link href="/projects" className="hover:text-accent">Projects</Link>} title={project.name} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Section title="Details">
          <ProjectForm id={id} project={project} />
        </Section>
        <div className="grid content-start gap-6">
          <Section title="Linked experiences">
            {experiences.length ? (
              <ul className="grid gap-3">
                {experiences.map((e) => (
                  <li key={e.code} className="flex items-start justify-between gap-4">
                    <Link href={itemHref("experience", e.code)} className="text-sm text-ink-secondary hover:text-accent">{e.number}. {e.title}</Link>
                    <StatusBadge status={e.status} label={e.status === "mastered" ? "Completed" : undefined} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-muted">Link this project from an experience&apos;s assessment.</p>
            )}
          </Section>
          <Section title="Delete">
            <form action={deleteProjectAction.bind(null, id)} className="grid gap-3">
              <p className="text-sm text-ink-muted">Experiences keep their assessments; only the project link is removed.</p>
              <SecondaryButton type="submit">Delete project</SecondaryButton>
            </form>
          </Section>
        </div>
      </div>
    </MainContentContainer>
  );
}
