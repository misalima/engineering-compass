import {
  SkeletonHeader,
  SkeletonPage,
  SkeletonPanel,
  SkeletonStudyForm,
  SkeletonStudies,
} from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader />
      <SkeletonPanel>
        <SkeletonStudyForm />
      </SkeletonPanel>
      <SkeletonPanel>
        <SkeletonStudies />
      </SkeletonPanel>
    </SkeletonPage>
  );
}
