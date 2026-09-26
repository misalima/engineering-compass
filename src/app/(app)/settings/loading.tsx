import { Bone, SkeletonHeader, SkeletonPage, SkeletonPanel } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader />
      <SkeletonPanel>
        <div className="grid gap-4">
          <Bone className="h-4 w-full max-w-[60ch]" />
          <div className="flex gap-3">
            <Bone className="h-11 w-20" />
            <Bone className="h-11 w-28" />
          </div>
        </div>
      </SkeletonPanel>
    </SkeletonPage>
  );
}
