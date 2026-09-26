import Image from "next/image";
import Link from "next/link";
import { PRODUCT } from "@/config/product";

const [brand, product] = PRODUCT.name.split(" ");

const sizes = {
  sm: { px: 36, className: "size-9", text: "text-sm", gap: "gap-3" },
  lg: { px: 56, className: "size-14", text: "text-base", gap: "gap-3.5" },
} as const;

export function Logo({ size = "sm" }: { size?: keyof typeof sizes }) {
  const s = sizes[size];

  return (
    <Link
      className={`inline-flex min-h-11 items-center ${s.gap}`}
      href="/"
      aria-label={`${PRODUCT.name} — home`}
    >
      <Image
        src="/assets/images/logo.png"
        alt=""
        loading="eager"
        width={s.px}
        height={s.px}
        className={`${s.className} rounded-[var(--radius-sm)]`}
        aria-hidden="true"
      />
      <span className="grid leading-none">
        <strong className={`${s.text} font-semibold tracking-[-.025em]`}>{brand}</strong>
        {product ? (
          <em className={`${s.text} font-semibold not-italic tracking-[-.025em] text-accent`}>{product}</em>
        ) : null}
      </span>
    </Link>
  );
}
