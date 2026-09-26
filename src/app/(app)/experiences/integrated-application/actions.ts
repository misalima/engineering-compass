"use server";

import { refresh } from "next/cache";
import { setDeployedIntegratedApp } from "@/data/assessments";

export async function setDeployedIntegratedAppAction(formData: FormData) {
  await setDeployedIntegratedApp(formData.get("value") === "true");
  refresh();
}
