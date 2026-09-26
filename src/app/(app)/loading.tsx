import { SkeletonHeader, SkeletonMeter, SkeletonPage, SkeletonPanel, SkeletonRows } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader eyebrow />
      <SkeletonPanel title={false} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => <SkeletonMeter key={i} />)}
      </SkeletonPanel>
      <div className="grid gap-6 lg:grid-cols-2">
        {[5, 3, 4, 5].map((rows, i) => (
          <SkeletonPanel key={i}>
            <SkeletonRows count={rows} />
          </SkeletonPanel>
        ))}
      </div>
    </SkeletonPage>
  );
}
