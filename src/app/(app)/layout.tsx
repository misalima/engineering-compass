import { AppShell } from "@/components/layout/app-shell";
import { requireOwner } from "@/data/auth";
import { ACTIVE_STANDARD_VERSION } from "@/standard";

export default async function PrivateLayout({ children }: LayoutProps<"/">) {
  await requireOwner();
  return <AppShell standardVersion={ACTIVE_STANDARD_VERSION}>{children}</AppShell>;
}
