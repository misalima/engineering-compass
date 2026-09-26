import { Bone, SkeletonForm, SkeletonHeader, SkeletonPage, SkeletonPanel, SkeletonRows } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader eyebrow description={false} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <SkeletonPanel>
          <SkeletonForm fields={4} />
        </SkeletonPanel>
        <div className="grid content-start gap-6">
          <SkeletonPanel>
            <SkeletonRows count={2} />
          </SkeletonPanel>
          <SkeletonPanel>
            <div className="grid gap-3">
              <Bone className="h-4 w-full" />
              <Bone className="h-11 w-full" />
            </div>
          </SkeletonPanel>
        </div>
      </div>
    </SkeletonPage>
  );
}
