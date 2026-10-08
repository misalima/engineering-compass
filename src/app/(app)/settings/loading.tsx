import {
  Bone,
  SkeletonHeader,
  SkeletonPage,
  SkeletonPanel,
} from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader />
      <SkeletonPanel>
        <div className="grid max-w-3xl gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="grid gap-2">
                <Bone className="h-3 w-24" />
                <Bone className="h-11 w-full" />
              </div>
            ))}
          </div>
          <Bone className="h-3 w-full" />
          <Bone className="h-3 w-24" />
          <div className="flex flex-wrap gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <Bone key={i} className="h-11 w-28" />
            ))}
          </div>
          <div className="grid gap-2">
            <Bone className="h-3 w-40" />
            <Bone className="h-11 w-full" />
          </div>
          <Bone className="h-11 w-36" />
        </div>
      </SkeletonPanel>
      <SkeletonPanel>
        <div className="flex flex-wrap gap-3">
          {[0, 1, 2].map((i) => (
            <Bone key={i} className="h-11 w-24" />
          ))}
        </div>
      </SkeletonPanel>
      <SkeletonPanel>
        <Bone className="mb-4 h-4 w-full max-w-[60ch]" />
        <div className="flex gap-3">
          <Bone className="h-11 w-20" />
          <Bone className="h-11 w-28" />
        </div>
      </SkeletonPanel>
    </SkeletonPage>
  );
}
