import { exportData } from "@/data/export";

export async function GET() {
  const data = await exportData();
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="engineering-compass-${data.exportedAt.slice(0, 10)}.json"`,
      "Cache-Control": "no-store",
    },
  });
}
