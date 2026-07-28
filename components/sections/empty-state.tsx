import type { ReactNode } from "react";
import type { IconName } from "@/types/site";
import { Icon } from "@/components/ui/icon";
import { cx } from "@/lib/utils";

type EmptyStateProps = {
  action?: ReactNode;
  className?: string;
  description: string;
  eyebrow?: string;
  icon: IconName;
  title: string;
};

export function EmptyState({
  action,
  className,
  description,
  eyebrow = "Nothing here yet",
  icon,
  title,
}: EmptyStateProps) {
  return (
    <div
      className={cx(
        "relative isolate flex min-h-[24rem] overflow-hidden rounded-[var(--radius)] border border-border bg-surface-elevated px-6 py-16 shadow-[var(--shadow-soft)] sm:px-10",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-36 -z-10 size-80 rounded-full bg-primary/[0.08] blur-3xl"
      />
      <div className="m-auto max-w-lg text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary shadow-[var(--glow)]">
          <Icon className="size-6" name={icon} />
        </span>
        <p className="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-balance font-display text-3xl font-semibold sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
        {action ? <div className="mt-7 flex flex-wrap justify-center gap-3">{action}</div> : null}
      </div>
    </div>
  );
}
