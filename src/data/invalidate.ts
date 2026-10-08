import "server-only";
import { revalidatePath } from "next/cache";

/** Assessments, studies and profile changes affect multiple cached routes. */
export function invalidateOwnerViews() {
  revalidatePath("/", "layout");
}
