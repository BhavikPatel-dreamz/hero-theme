import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

export type FaqItem = {
  answer: ReactNode;
  question: string;
};

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, index) => (
        <details className="group" key={item.question} open={index === 0}>
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-left marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="pr-4 font-display text-lg font-semibold leading-7 sm:text-xl">
              {item.question}
            </span>
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-[border-color,color,transform] group-open:border-primary/40 group-open:text-primary">
              <Icon
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-open:rotate-180"
                name="chevron-down"
              />
            </span>
          </summary>
          <div className="max-w-3xl pb-6 pr-12 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
