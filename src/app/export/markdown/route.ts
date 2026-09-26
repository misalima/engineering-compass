import { exportData, toMarkdown } from "@/data/export";

export async function GET() {
  const data = await exportData();
  return new Response(toMarkdown(data), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="engineering-compass-${data.exportedAt.slice(0, 10)}.md"`,
      "Cache-Control": "no-store",
    },
  });
}
