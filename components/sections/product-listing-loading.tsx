import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-title";

const skeletonClass =
  "rounded-md bg-muted motion-safe:animate-pulse motion-reduce:animate-none";

export function ProductListingLoading({
  eyebrow = "Shop",
  title = "Loading products",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading the product catalog</span>
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 size-80 rounded-full bg-primary/10 blur-3xl"
        />
        <Container className="relative pb-10 pt-8 sm:pb-12 sm:pt-10 md:pb-14 md:pt-12">
          <div className="flex items-center gap-2">
            <div className={`${skeletonClass} h-3 w-10`} />
            <div className="text-xs text-muted-foreground">/</div>
            <div className={`${skeletonClass} h-3 w-20`} />
          </div>
          <div className="mt-10 max-w-3xl sm:mt-12">
            <Eyebrow className="text-primary">{eyebrow}</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.02] sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <div className={`${skeletonClass} mt-5 h-4 max-w-2xl`} />
            <div className={`${skeletonClass} mt-2 h-4 max-w-lg`} />
          </div>
        </Container>
      </section>

      <Container className="grid gap-8 py-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:py-10">
        <div className="hidden rounded-[var(--radius)] border border-border bg-surface-elevated p-5 shadow-[var(--shadow-soft)] lg:block">
          <div className={`${skeletonClass} h-3 w-20`} />
          <div className="mt-7 space-y-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <div className={`${skeletonClass} mb-2 h-3 w-16`} />
                <div className={`${skeletonClass} h-11 w-full`} />
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex min-h-16 items-center justify-between gap-4 rounded-[var(--radius)] border border-border bg-surface-elevated/70 px-4 py-3">
            <div className={`${skeletonClass} h-4 w-24`} />
            <div className="flex gap-2">
              <div className={`${skeletonClass} size-10`} />
              <div className={`${skeletonClass} h-10 w-28 sm:w-36`} />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 min-[430px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                className="overflow-hidden rounded-[var(--radius)] border border-border bg-surface-elevated"
                key={index}
              >
                <div className={`${skeletonClass} aspect-[4/5] rounded-none`} />
                <div className="p-4 md:p-5">
                  <div className={`${skeletonClass} h-3 w-20`} />
                  <div className={`${skeletonClass} mt-3 h-5 w-4/5`} />
                  <div className={`${skeletonClass} mt-2 h-5 w-3/5`} />
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <div className={`${skeletonClass} h-4 w-16`} />
                    <div className={`${skeletonClass} h-4 w-14`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
