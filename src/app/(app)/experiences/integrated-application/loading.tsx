import { Bone, SkeletonItemHeader, SkeletonPage, SkeletonPanel } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonItemHeader statement />
      <SkeletonPanel>
        <div className="grid gap-5">
          <Bone className="h-4 w-full max-w-[65ch]" />
          <Bone className="h-11 w-44" />
        </div>
      </SkeletonPanel>
    </SkeletonPage>
  );
}
