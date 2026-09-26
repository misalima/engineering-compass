import { Bone, SkeletonHeader, SkeletonMeter, SkeletonPage } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader aside />
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="grid overflow-hidden rounded-[var(--radius-lg)] bg-surface-panel">
            <Bone className="mb-[-20%] aspect-[5/2] w-full rounded-none opacity-60" />
            <div className="relative grid gap-5 px-6 pb-6">
              <div className="flex justify-between gap-4">
                <Bone className="h-5 w-48" />
                <Bone className="h-3 w-12" />
              </div>
              <SkeletonMeter />
            </div>
          </div>
        ))}
      </div>
    </SkeletonPage>
  );
}
