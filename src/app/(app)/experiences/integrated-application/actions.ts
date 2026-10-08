"use server";

import { invalidateOwnerViews } from "@/data/invalidate";
import { setDeployedIntegratedApp } from "@/data/assessments";

export async function setDeployedIntegratedAppAction(formData: FormData) {
  await setDeployedIntegratedApp(formData.get("value") === "true");
  invalidateOwnerViews();
}
