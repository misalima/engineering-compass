import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/auth";
import { getDb } from "@/db/client";
import { sessionIsOwner } from "@/lib/owner";

export const requireOwner = cache(async () => {
  const session = await auth();
  if (!sessionIsOwner(session)) redirect("/login");
  return session!;
});

/** The only way to get a database handle: the owner check always runs first. */
export const ownerDb = cache(async () => {
  await requireOwner();
  return getDb();
});
