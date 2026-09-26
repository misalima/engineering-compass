// One-off generator: docs/standard/standard-v1.1.md -> src/standard/standard-v1.1.json.
// The JSON is frozen after generation; this refuses to overwrite it unless --force is passed.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { standardSchema, type RequiredLevel, type Standard } from "../src/standard/schema";

const SOURCE = "docs/standard/standard-v1.1.md";
const TARGET = "src/standard/standard-v1.1.json";

const STOP = new Set(["i", "can", "a", "an", "the", "and", "or", "of", "to", "for", "in", "on", "with", "its", "my", "that", "as", "by", "from", "when", "into", "at", "is", "be", "it"]);

const TITLE_STOP = new Set(["and"]);

export function slugify(text: string, maxWords = 5, stop = STOP) {
  const words = text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[`'’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter((w) => w && !stop.has(w));
  return words.slice(0, maxWords).join("-");
}

function unique(base: string, used: Set<string>) {
  let code = base;
  for (let i = 2; used.has(code); i++) code = `${base}-${i}`;
  used.add(code);
  return code;
}

export function parseStandard(markdown: string): Standard {
  const lines = markdown.split("\n");
  const partStart = (title: string) => lines.findIndex((l) => l.startsWith(`# ${title}`));
  const partI = partStart("Part I");
  const partII = partStart("Part II");
  const partIII = partStart("Part III");
  const partIV = partStart("Part IV");
  const partV = partStart("Part V");
  const used = new Set<string>();

  const domains: Standard["domains"] = [];
  let level = null as RequiredLevel | null;
  let inKnowledge = false;
  for (const line of lines.slice(partI, partII)) {
    const domain = line.match(/^## (\d+)\. (.+)$/);
    if (domain) {
      const slug = slugify(domain[2].replace(/—.*$/, ""), 6, TITLE_STOP);
      domains.push({ code: unique(`domain.${slug}`, used), order: Number(domain[1]), title: domain[2].trim(), knowledge: [], competencies: [] });
      level = null;
      continue;
    }
    const current = domains.at(-1);
    if (!current) continue;
    if (line.startsWith("### Knowledge")) { inKnowledge = true; continue; }
    const heading = line.match(/^### (L[1-4]) — /);
    if (heading) { level = heading[1] as RequiredLevel; inKnowledge = false; continue; }
    if (inKnowledge && line.startsWith("`")) {
      current.knowledge = line.split("·").map((t) => t.trim().replace(/^`|`$/g, "")).filter(Boolean);
      continue;
    }
    const item = line.match(/^- \[ \] (.+)$/);
    if (item && level) {
      const domainSlug = current.code.replace("domain.", "");
      current.competencies.push({
        code: unique(`competency.${domainSlug}.${slugify(item[1])}`, used),
        order: current.competencies.length + 1,
        requiredLevel: level,
        statement: item[1].trim(),
      });
    }
  }

  const experiences: Standard["experiences"] = [];
  for (const line of lines.slice(partII, partIII)) {
    const m = line.match(/^- \[ \] \*\*(\d+)\. (.+?)\*\* — (.+)$/);
    if (!m) continue;
    const n = Number(m[1]);
    experiences.push({ code: unique(`experience.${slugify(m[2], 6, TITLE_STOP)}`, used), number: n, title: m[2], statement: m[3].trim(), tier: n <= 15 ? "core" : "strong" });
  }

  const depthGates: Standard["depthGates"] = [];
  for (const line of lines.slice(partIV, partV)) {
    const gate = line.match(/^## (\d+)\. (.+)$/);
    if (gate) {
      depthGates.push({ code: unique(`depth.${slugify(gate[2], 3, TITLE_STOP)}`, used), order: Number(gate[1]), title: gate[2].trim(), criteria: [] });
      continue;
    }
    const item = line.match(/^- \[ \] (.+)$/);
    const current = depthGates.at(-1);
    if (item && current) {
      current.criteria.push({ code: unique(`${current.code}.${slugify(item[1])}`, used), order: current.criteria.length + 1, statement: item[1].trim() });
    }
  }

  return standardSchema.parse({ version: "1.1", track: "Backend Engineering + AI", domains, experiences, depthGates });
}

if (process.argv[1]?.endsWith("parse-standard.ts")) {
  if (existsSync(TARGET) && !process.argv.includes("--force")) {
    console.error(`${TARGET} already exists and is frozen. Pass --force only if you mean to regenerate stable codes.`);
    process.exit(1);
  }
  const standard = parseStandard(readFileSync(SOURCE, "utf8"));
  writeFileSync(TARGET, JSON.stringify(standard, null, 2) + "\n");
  console.log(`Wrote ${TARGET}`);
}
