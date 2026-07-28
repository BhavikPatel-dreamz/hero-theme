import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-title";

type PageIntroProps = {
  actions?: ReactNode;
  description: string;
  detail?: ReactNode;
  eyebrow: string;
  title: string;
};

export function PageIntro({
  actions,
  description,
  detail,
  eyebrow,
  title,
}: PageIntroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <div
        aria-hidden="true"
        className="hero-grid absolute inset-0 -z-10 opacity-45 [mask-image:linear-gradient(to_right,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-56 -z-10 size-[34rem] rounded-full bg-primary/[0.075] blur-3xl"
      />
      <Container className="py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,22rem)]">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
              <Eyebrow className="text-primary">{eyebrow}</Eyebrow>
            </div>
            <h1 className="mt-5 max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {description}
            </p>
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {detail ? (
            <div className="border-l border-border pl-5 sm:pl-7 lg:mb-1">{detail}</div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
