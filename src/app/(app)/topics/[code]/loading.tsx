import {
  Bone,
  SkeletonHeader,
  SkeletonPage,
  SkeletonPanel,
  SkeletonRows,
  SkeletonStudyForm,
  SkeletonStudies,
} from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader eyebrow />
      <div className="flex flex-wrap gap-6">
        <Bone onCanvas className="h-4 w-32" />
        <Bone onCanvas className="h-4 w-64 max-w-full" />
      </div>
      <Bone onCanvas className="h-3 w-96 max-w-full" />
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="grid gap-6">
          <SkeletonPanel>
            <Bone className="mb-4 h-4 w-full" />
            <SkeletonRows count={3} twoLine />
          </SkeletonPanel>
          <SkeletonPanel>
            <SkeletonStudies />
          </SkeletonPanel>
        </div>
        <div className="grid gap-6">
          <SkeletonPanel>
            <SkeletonStudyForm />
          </SkeletonPanel>
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
