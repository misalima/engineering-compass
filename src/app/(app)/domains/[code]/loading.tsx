import {
  SkeletonHeader,
  SkeletonMeter,
  SkeletonPage,
  SkeletonPanel,
  SkeletonRows,
} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader eyebrow description={false} aside />
      <SkeletonPanel title={false} className="grid gap-4 sm:grid-cols-2">
        <SkeletonMeter />
        <SkeletonMeter />
      </SkeletonPanel>
      <SkeletonPanel>
        <SkeletonRows count={3} twoLine />
      </SkeletonPanel>
      <SkeletonPanel>
        <SkeletonRows count={5} />
      </SkeletonPanel>
      <SkeletonPanel>
        <SkeletonRows count={4} />
      </SkeletonPanel>
    </SkeletonPage>
  );
}
