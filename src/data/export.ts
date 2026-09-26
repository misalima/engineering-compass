import "server-only";
import { listProjects } from "@/db/projects";
import { listAllEvents, type AssessmentDetail } from "@/db/queries";
import { INTEGRATED_APP, STATUS_LABEL, LEVEL_NAME } from "@/progression";
import { ownerDb } from "./auth";
import { getOverview } from "./standard";

export async function exportData() {
  const db = await ownerDb();
  const { standard, details, progress } = await getOverview();
  const [projects, events] = await Promise.all([listProjects(db), listAllEvents(db)]);
  const entries = (m: Map<string, AssessmentDetail>) => [...m].map(([code, a]) => ({ code, ...a }));
  return {
    exportedAt: new Date().toISOString(),
    standard: { version: standard.version, track: standard.track },
    level: progress.level,
    deployedIntegratedApp: details.deployedIntegratedApp,
    assessments: { competencies: entries(details.competencies), experiences: entries(details.experiences), depthCriteria: entries(details.depthCriteria) },
    projects,
    events,
    standardSnapshot: standard,
  };
}

export function toMarkdown(data: Awaited<ReturnType<typeof exportData>>) {
  const s = data.standardSnapshot;
  const byCode = new Map([...data.assessments.competencies, ...data.assessments.experiences, ...data.assessments.depthCriteria].map((a) => [a.code, a]));
  const lines = [`# Engineering Compass export`, "", `- Exported: ${data.exportedAt}`, `- ${s.track}, Standard v${s.version}`, `- Level: ${LEVEL_NAME[data.level]}`, ""];
  const item = (code: string, title: string) => {
    const a = byCode.get(code);
    lines.push(`- **${STATUS_LABEL[a?.status ?? "not_started"]}** — ${title} \`${code}\``);
    if (a?.notesMarkdown) lines.push("", "  Notes:", "", indent(a.notesMarkdown), "");
    if (a?.evidenceMarkdown) lines.push("", "  Evidence:", "", indent(a.evidenceMarkdown), "");
  };

  lines.push("## Competencies", "");
  for (const d of s.domains) {
    lines.push(`### ${d.order}. ${d.title}`, "");
    for (const c of d.competencies) item(c.code, `${c.statement} _(${LEVEL_NAME[c.requiredLevel]})_`);
    lines.push("");
  }
  lines.push("## Experiences", "", `- **${data.deployedIntegratedApp ? "Completed" : "Not started"}** — 0. ${INTEGRATED_APP.title}`);
  for (const e of s.experiences) item(e.code, `${e.number}. ${e.title}`);
  lines.push("", "## Depth Gates", "");
  for (const g of s.depthGates) {
    lines.push(`### ${g.title}`, "");
    for (const c of g.criteria) item(c.code, c.statement);
    lines.push("");
  }
  lines.push("## Projects", "");
  for (const p of data.projects) lines.push(`- **${p.name}** (${p.visibility})${p.stack.length ? ` — ${p.stack.join(", ")}` : ""}`);
  return lines.join("\n") + "\n";
}

const indent = (text: string) => text.split("\n").map((l) => `  ${l}`).join("\n");
