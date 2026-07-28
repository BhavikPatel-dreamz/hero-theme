import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
};

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "text-[0.68rem] font-bold uppercase tracking-[0.19em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  action,
  className,
  eyebrow,
  title,
  titleClassName,
}: SectionTitleProps) {
  return (
    <div className={cx("grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto]", className)}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          className={cx(
            "mt-4 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-6xl",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
