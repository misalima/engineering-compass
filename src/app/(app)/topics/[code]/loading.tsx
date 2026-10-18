import {
  Bone,
  SkeletonHeader,
  SkeletonPage,
  SkeletonPanel,
  SkeletonRows,
  SkeletonStudies,
} from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader eyebrow aside />
      <div className="flex flex-wrap gap-6">
        <Bone onCanvas className="h-4 w-32" />
        <Bone onCanvas className="h-4 w-64 max-w-full" />
      </div>
      <Bone onCanvas className="h-3 w-96 max-w-full" />
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="grid gap-6">
          <div className="border-t-2 border-accent pt-6">
            <div className="flex justify-between gap-4">
              <Bone onCanvas className="h-6 w-40" />
              <Bone onCanvas className="h-4 w-24" />
            </div>
            <Bone onCanvas className="mt-3 h-4 w-full" />
            <Bone onCanvas className="mt-5 h-1.5 w-full" />
            <div className="mt-3 divide-y divide-line">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4 px-3 py-5">
                  <Bone onCanvas className="size-6 shrink-0 rounded-full!" />
                  <Bone onCanvas className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          </div>
          <SkeletonPanel variant="plain">
            <Bone onCanvas className="mb-4 h-4 w-full" />
            <SkeletonRows count={3} twoLine />
          </SkeletonPanel>
          <SkeletonPanel variant="plain">
            <SkeletonStudies />
          </SkeletonPanel>
        </div>
        <div className="grid gap-6">
          <SkeletonPanel>
            <Bone className="mb-4 h-4 w-full" />
            <div className="grid gap-3">
              {[0, 1, 2].map((i) => (
                <Bone key={i} className="h-4 w-3/4" />
              ))}
            </div>
          </SkeletonPanel>
        </div>
      </div>
    </SkeletonPage>
  );
}
