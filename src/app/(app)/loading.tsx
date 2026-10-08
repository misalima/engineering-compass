import {
  Bone,
  SkeletonHeader,
  SkeletonPage,
  SkeletonPanel,
  SkeletonStudies,
} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader eyebrow aside />
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-line pb-5">
        <div className="grid gap-2">
          <Bone onCanvas className="h-3 w-28" />
          <Bone onCanvas className="h-6 w-64 max-w-full" />
        </div>
        <div className="grid w-full gap-2 sm:w-56">
          <Bone onCanvas className="h-3 w-48 max-w-full" />
          <Bone onCanvas className="h-1.5 w-full rounded-full" />
        </div>
      </div>
      <div className="relative overflow-hidden border-l-[3px] border-accent bg-accent/[0.06] px-5 py-7 sm:px-8 sm:py-8">
        <div className="mb-5 flex items-center gap-2.5">
          <Bone className="size-8 rounded-full" />
          <Bone className="h-3 w-40" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-10">
          <div className="grid gap-3">
            <Bone className="mb-1 h-6 w-24 rounded-full" />
            <Bone className="h-8 w-4/5" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-2/3" />
          </div>
          <div>
            <Bone className="mb-2 h-3 w-24" />
            <Bone className="mb-2 h-4 w-full" />
            <Bone className="h-4 w-3/4" />
            <div className="mt-6 flex flex-wrap gap-3">
              <Bone className="h-12 w-40" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:gap-12">
        <SkeletonPanel variant="plain">
          <div className="divide-y divide-line">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 px-4 py-4"
              >
                <div className="grid w-full gap-2">
                  <Bone onCanvas className="h-4 w-3/4" />
                  <div className="flex gap-2">
                    <Bone onCanvas className="h-6 w-24 rounded-full" />
                    <Bone onCanvas className="h-3 w-28 max-w-full" />
                  </div>
                </div>
                <Bone onCanvas className="h-3 w-12 shrink-0" />
              </div>
            ))}
          </div>
        </SkeletonPanel>
        <SkeletonPanel variant="plain">
          <SkeletonStudies onCanvas />
        </SkeletonPanel>
      </div>
    </SkeletonPage>
  );
}
