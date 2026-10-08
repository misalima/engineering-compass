import { Bone, SkeletonHeader, SkeletonPage } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader />
      <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="grid gap-2">
            <Bone onCanvas className="h-3 w-24" />
            <Bone onCanvas className="h-11 w-full" />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Bone onCanvas className="h-3 w-80 max-w-full" />
        <Bone onCanvas className="h-12 w-32" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="grid gap-3 rounded-[var(--radius-lg)] border border-line bg-surface-panel p-5"
          >
            <Bone className="h-6 w-24 rounded-full" />
            <Bone className="h-6 w-4/5" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-2/3" />
            <Bone className="mt-2 h-3 w-3/4" />
            <Bone className="h-3 w-1/2" />
            <div className="mt-1 flex justify-between border-t border-line pt-3">
              <Bone className="h-3 w-16" />
              <Bone className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonPage>
  );
}
