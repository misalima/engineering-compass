import {
  Bone,
  SkeletonHeader,
  SkeletonMeter,
  SkeletonPage,
  SkeletonPanel,
  SkeletonRows,
} from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader aside />
      <div className="grid max-w-4xl gap-2">
        <Bone onCanvas className="h-4 w-full" />
        <Bone onCanvas className="h-4 w-3/4" />
      </div>
      {[0, 1, 2, 3].map((i) => (
        <SkeletonPanel key={i}>
          <Bone className="mb-5 h-4 w-3/4" />
          <SkeletonMeter />
          <Bone className="mt-5 h-10 w-60 max-w-full" />
          {i === 1 ? (
            <div className="mt-3 grid gap-x-6 md:grid-cols-2">
              <SkeletonRows count={4} />
              <SkeletonRows count={4} />
            </div>
          ) : null}
        </SkeletonPanel>
      ))}
      <Bone onCanvas className="h-3 w-2/3" />
    </SkeletonPage>
  );
}
