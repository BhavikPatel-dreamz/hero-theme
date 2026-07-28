import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-title";

const skeletonClass =
  "rounded-md bg-muted motion-safe:animate-pulse motion-reduce:animate-none";

export default function ProductLoading() {
  return (
    <SiteShell>
      <main aria-busy="true" aria-live="polite">
        <span className="sr-only">Loading product details</span>
        <Container className="pt-7 sm:pt-9">
          <div className="flex items-center gap-2">
            <div className={`${skeletonClass} h-3 w-10`} />
            <div className="text-xs text-muted-foreground">/</div>
            <div className={`${skeletonClass} h-3 w-16`} />
            <div className="text-xs text-muted-foreground">/</div>
            <div className={`${skeletonClass} h-3 w-28`} />
          </div>
        </Container>

        <Container className="grid gap-8 py-7 sm:py-10 lg:grid-cols-[minmax(0,1fr)_27.5rem] lg:gap-12 xl:gap-16">
          <div>
            <div className={`${skeletonClass} aspect-square rounded-[var(--radius)] border border-border`} />
            <div className="mt-3 flex gap-3 overflow-hidden">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className={`${skeletonClass} aspect-square w-20 shrink-0 rounded-[var(--radius)] sm:w-24`}
                  key={index}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-border bg-surface-elevated p-5 shadow-[var(--shadow-soft)] md:p-6">
            <Eyebrow className="text-primary">Product</Eyebrow>
            <div className={`${skeletonClass} mt-4 h-10 w-full`} />
            <div className={`${skeletonClass} mt-2 h-10 w-4/5`} />
            <div className={`${skeletonClass} mt-5 h-4 w-2/3`} />
            <div className={`${skeletonClass} mt-8 h-8 w-36`} />
            <div className="mt-8 space-y-3">
              <div className={`${skeletonClass} h-11 w-full`} />
              <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-[8.5rem_1fr]">
                <div className={`${skeletonClass} h-12 w-full`} />
                <div className={`${skeletonClass} h-12 w-full`} />
              </div>
              <div className={`${skeletonClass} h-12 w-full`} />
              <div className={`${skeletonClass} h-12 w-full`} />
            </div>
          </div>
        </Container>
      </main>
    </SiteShell>
  );
}
