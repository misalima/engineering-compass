import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const variants = {
  primary: "bg-accent font-bold text-accent-ink hover:bg-accent-strong",
  secondary: "border border-line-strong font-semibold text-ink hover:bg-surface-active",
} as const;

export function Button({ className = "", variant = "primary", type = "button", ...props }: ButtonProps) {
  return (
    <button
      className={`min-h-11 cursor-pointer rounded-[var(--radius-sm)] px-4 text-sm transition ${variants[variant]} ${className}`}
      type={type}
      {...props}
    />
  );
}

export function PrimaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="primary" {...props} />;
}

export function SecondaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="secondary" {...props} />;
}
