import { SkeletonHeader, SkeletonMeter, SkeletonPage, SkeletonPanel, SkeletonRows } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader />
      <SkeletonPanel title={false}>
        <SkeletonMeter />
      </SkeletonPanel>
      {[6, 4, 3].map((rows, i) => (
        <SkeletonPanel key={i}>
          <SkeletonRows count={rows} />
        </SkeletonPanel>
      ))}
    </SkeletonPage>
  );
}
