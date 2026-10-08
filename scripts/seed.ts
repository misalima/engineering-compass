import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "../src/db/schema";
import { seedGrowth } from "../src/db/seed-growth";
import { seedStandard } from "../src/db/seed";
import { STANDARD_V1_1 } from "../src/standard";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set (add it to .env or .env.local)");

  const pool = new Pool({ connectionString: url });
  try {
    const db = drizzle({ client: pool, schema });
    const result = await seedStandard(db, STANDARD_V1_1);
    await seedGrowth(db, result.versionId);
    console.log("Career path v2 topics and competency links are ready");
    console.log(result.inserted ? `Seeded Standard v${STANDARD_V1_1.version}` : `Standard v${STANDARD_V1_1.version} already seeded`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
