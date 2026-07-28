import { trustMetrics } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

export function FeatureStrip() {
  return (
    <section aria-labelledby="why-shop-title" className="border-b border-border bg-background">
      <h2 className="sr-only" id="why-shop-title">Why shop this storefront</h2>
      <Container className="grid gap-px bg-border py-px sm:grid-cols-2 lg:grid-cols-4">
        {trustMetrics.map((metric, index) => (
          <div className="relative flex min-h-32 items-center gap-4 bg-background p-5 sm:p-6 lg:min-h-36 lg:p-7" key={metric.title}>
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/[0.07]">
              <Icon className="size-[1.1rem] text-primary" name={metric.icon} />
            </span>
            <div className="min-w-0">
              <div className="text-[0.62rem] font-bold uppercase tracking-[0.17em] text-muted-foreground">0{index + 1}</div>
              <div className="mt-2 text-sm font-bold">{metric.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{metric.body}</div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
