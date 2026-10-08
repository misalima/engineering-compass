import "server-only";
import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";
import type { Db } from "./types";

const globalForDb = globalThis as unknown as { db?: Db };

// Standalone queries do not need a persistent WebSocket. Pool.connect() still
// uses WebSocket sessions for the interactive transactions in our repositories.
neonConfig.poolQueryViaFetch = true;

function createDb(): Db {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return drizzle({
    client: new Pool({
      connectionString: url,
      connectionTimeoutMillis: 10_000,
      idleTimeoutMillis: 10_000,
      maxLifetimeSeconds: 300,
    }),
    schema,
  });
}

export function getDb(): Db {
  return (globalForDb.db ??= createDb());
}
