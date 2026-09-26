import { Bone, SkeletonHeader, SkeletonPage, SkeletonPanel, SkeletonTimeline } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader />
      <div className="flex flex-wrap gap-2">
        {["w-12", "w-28", "w-24", "w-28"].map((w, i) => <Bone key={i} onCanvas className={`h-7 rounded-full ${w}`} />)}
      </div>
      <SkeletonPanel title={false}>
        <SkeletonTimeline count={8} />
      </SkeletonPanel>
    </SkeletonPage>
  );
}
