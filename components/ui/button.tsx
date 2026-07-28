import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<ButtonVariant, string> = {
  primary:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.7rem] border border-primary bg-primary px-6 py-3 text-[0.86rem] font-bold text-primary-foreground shadow-[0_10px_34px_oklch(77%_0.155_68/0.16)] transition-[background,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-[oklch(82%_0.15_70)] hover:shadow-[0_14px_42px_oklch(77%_0.155_68/0.25)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-45",
  secondary:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.7rem] border border-border bg-surface-elevated px-6 py-3 text-[0.86rem] font-bold text-foreground transition-[background,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/55 hover:bg-secondary active:translate-y-0 disabled:pointer-events-none disabled:opacity-45",
  ghost:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.7rem] border border-transparent px-4 py-2.5 text-[0.84rem] font-semibold text-foreground transition-[background,border-color,color] duration-200 hover:border-border hover:bg-secondary disabled:pointer-events-none disabled:opacity-45",
  danger:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.7rem] border border-danger/35 bg-danger/10 px-6 py-3 text-[0.86rem] font-bold text-danger transition-[background,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-danger/60 hover:bg-danger/15 active:translate-y-0 disabled:pointer-events-none disabled:opacity-45",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
};

export function buttonClasses(variant: ButtonVariant = "primary", className?: string) {
  return cx(variants[variant], className);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", ...props },
  ref,
) {
  return <button className={buttonClasses(variant, className)} ref={ref} {...props} />;
});

export function ButtonLink({ className, variant = "primary", ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}
