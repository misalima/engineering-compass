import { Bone, SkeletonHeader, SkeletonPage, SkeletonPanel, SkeletonRows } from "@/components/ui/skeleton";

const STEPS = ["h-2", "h-8", "h-14", "h-20", "h-28"];

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader />
      <div className="grid gap-1 rounded-[var(--radius-lg)] bg-surface-panel p-3 sm:p-5 min-[1100px]:grid-cols-5 min-[1100px]:gap-2">
        {STEPS.map((step) => (
          <div key={step} className="flex items-center gap-4 px-3 py-3 min-[1100px]:grid min-[1100px]:content-start min-[1100px]:gap-4">
            <div className="hidden h-28 items-end min-[1100px]:flex"><Bone className={`w-full rounded-b-none ${step}`} /></div>
            <Bone className="size-3 shrink-0 min-[1100px]:hidden" />
            <div className="grid w-full gap-2">
              <Bone className="h-4 w-4/5" />
              <Bone className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-x-10 gap-y-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
        <SkeletonPanel title={false}>
          <div className="grid gap-8">
            <div className="grid gap-3">
              <div className="flex justify-between gap-6"><Bone className="h-6 w-64" /><Bone className="h-4 w-12" /></div>
              <Bone className="h-2 w-full rounded-full" />
            </div>
            <div className="grid gap-4 rounded-[var(--radius-md)] bg-surface-raised p-5 sm:p-6">
              <Bone onCanvas className="h-5 w-48" />
              <Bone onCanvas className="h-5 w-full" />
              <Bone onCanvas className="ml-auto h-11 w-44" />
            </div>
            <SkeletonRows count={5} />
          </div>
        </SkeletonPanel>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-1">
          {[4, 3].map((rows, i) => (
            <div key={i} className="grid gap-4 border-t border-line pt-5">
              <Bone onCanvas className="h-4 w-32" />
              {Array.from({ length: rows }, (_, j) => <Bone key={j} onCanvas className={`h-4 ${j % 2 ? "w-2/3" : "w-full"}`} />)}
            </div>
          ))}
        </div>
      </div>
    </SkeletonPage>
  );
}
