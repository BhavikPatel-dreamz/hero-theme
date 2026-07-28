import type { HTMLAttributes } from "react";
import { cx } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cx(
        "inline-flex min-h-6 items-center rounded-md border border-border bg-surface-elevated/90 px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.11em] text-foreground backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
