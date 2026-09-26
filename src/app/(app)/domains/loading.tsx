import { Bone, SkeletonHeader, SkeletonPage } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <SkeletonHeader />
      <div className="overflow-hidden rounded-[var(--radius-lg)] bg-surface-panel">
        <div className="flex gap-8 border-b border-line px-6 py-4">
          {["w-20", "w-16", "w-12", "w-16", "w-12", "w-14"].map((w, i) => <Bone key={i} className={`h-3 ${w}`} />)}
        </div>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex items-center gap-8 border-b border-line px-6 py-4 last:border-0">
            <Bone className={`h-4 ${i % 3 === 0 ? "w-56" : i % 3 === 1 ? "w-44" : "w-64"}`} />
            <Bone className="ml-auto h-3 w-10" />
            <Bone className="h-3 w-10" />
            <Bone className="h-5 w-28 rounded-full" />
            <Bone className="h-3 w-24" />
          </div>
        ))}
      </div>
    </SkeletonPage>
  );
}
