import { Bone, SkeletonHeader, SkeletonMeter, SkeletonPage, SkeletonPanel, SkeletonRows } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SkeletonPage>
      <Bone onCanvas className="mb-[calc(-16.667%-1.5rem)] aspect-[3/1] w-full rounded-[var(--radius-lg)] opacity-60 max-[640px]:mb-[calc(-28.125%-1.5rem)] max-[640px]:aspect-[16/9]" />
      <div className="relative grid gap-6 px-[clamp(0rem,2vw,2rem)]">
        <SkeletonHeader eyebrow aside />
        <div className="max-w-md">
          <SkeletonMeter />
        </div>
      </div>
      <SkeletonPanel>
        <SkeletonRows count={5} />
      </SkeletonPanel>
    </SkeletonPage>
  );
}
