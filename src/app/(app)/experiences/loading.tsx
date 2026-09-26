import { SkeletonHeader, SkeletonPage, SkeletonPanel, SkeletonRows } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader aside />
      <SkeletonPanel>
        <SkeletonRows count={1} twoLine />
      </SkeletonPanel>
      <SkeletonPanel>
        <SkeletonRows count={6} twoLine />
      </SkeletonPanel>
      <SkeletonPanel>
        <SkeletonRows count={4} twoLine />
      </SkeletonPanel>
    </SkeletonPage>
  );
}
