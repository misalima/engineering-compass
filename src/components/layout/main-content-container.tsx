import type { HTMLAttributes } from "react";

export function MainContentContainer({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mx-auto grid w-full max-w-[90rem] gap-6 px-[clamp(1.25rem,3.5vw,4rem)] py-8 max-[780px]:px-4 max-[780px]:py-6 ${className}`}
      {...props}
    />
  );
}
