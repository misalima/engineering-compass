import { SkeletonForm, SkeletonHeader, SkeletonPage, SkeletonPanel, SkeletonRows } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader />
      <div className="grid gap-6 lg:grid-cols-2">
        <SkeletonPanel>
          <SkeletonRows count={4} twoLine />
        </SkeletonPanel>
        <SkeletonPanel>
          <SkeletonForm fields={4} />
        </SkeletonPanel>
      </div>
    </SkeletonPage>
  );
}
