import type { ReactNode } from "react";
import type { IconName } from "@/types/site";
import { Icon } from "@/components/ui/icon";

type StatusNoticeProps = {
  actions?: ReactNode;
  description: string;
  eyebrow?: string;
  icon: IconName;
  title: string;
};

export function StatusNotice({
  actions,
  description,
  eyebrow = "Integration status",
  icon,
  title,
}: StatusNoticeProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-[var(--radius)] border border-primary/20 bg-primary/[0.055] p-5 sm:p-7">
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-24 -z-10 size-56 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
          <Icon className="size-5" name={icon} />
        </span>
        <div className="min-w-0">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-balance font-display text-2xl font-semibold sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            {description}
          </p>
          {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
