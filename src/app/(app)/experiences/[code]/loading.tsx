import { SkeletonAssessment, SkeletonItemHeader, SkeletonPage } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonItemHeader statement />
      <SkeletonAssessment />
    </SkeletonPage>
  );
}
