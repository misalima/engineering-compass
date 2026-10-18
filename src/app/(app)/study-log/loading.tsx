import {
  SkeletonHeader,
  SkeletonPage,
  SkeletonPanel,
  SkeletonStudies,
} from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader aside />
      <SkeletonPanel>
        <SkeletonStudies />
      </SkeletonPanel>
    </SkeletonPage>
  );
}
