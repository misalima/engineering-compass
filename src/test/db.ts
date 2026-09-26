import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import * as schema from "@/db/schema";
import { seedStandard } from "@/db/seed";
import type { Db } from "@/db/types";
import { STANDARD_V1_1 } from "@/standard";

/** Fresh in-memory Postgres with the real migrations and Standard v1.1 seeded. */
export async function createTestDb() {
  const db = drizzle({ client: new PGlite(), schema });
  await migrate(db, { migrationsFolder: "drizzle" });
  const { versionId } = await seedStandard(db as unknown as Db, STANDARD_V1_1);
  return { db: db as unknown as Db, versionId };
}
