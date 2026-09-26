import { Bone, SkeletonHeader, SkeletonMeter, SkeletonPage, SkeletonPanel, SkeletonRows } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader eyebrow description={false} aside />
      <SkeletonPanel title={false} className="grid gap-4 sm:grid-cols-2">
        <SkeletonMeter />
        <SkeletonMeter />
      </SkeletonPanel>
      <SkeletonPanel>
        <div className="flex flex-wrap gap-2">
          {["w-24", "w-32", "w-20", "w-28", "w-36", "w-24", "w-28"].map((w, i) => <Bone key={i} className={`h-7 rounded-full ${w}`} />)}
        </div>
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
