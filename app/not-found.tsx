import Image from "next/image";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="hero-grid absolute inset-0 -z-10 opacity-35 [mask-image:linear-gradient(to_right,black,transparent_78%)]"
        />
        <Container className="py-12 sm:py-16 lg:py-24">
          <div className="grid min-h-[36rem] overflow-hidden rounded-[var(--radius)] border border-border bg-surface-elevated shadow-[var(--shadow-soft)] lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)]">
            <div className="relative z-10 flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <div className="flex items-center gap-3">
                <span className="font-display text-5xl font-semibold tabular-nums text-primary sm:text-6xl">
                  404
                </span>
                <span className="h-10 w-px bg-border" />
                <span className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Page not found
                </span>
              </div>
              <h1 className="mt-8 max-w-xl text-balance font-display text-5xl font-semibold leading-[1] sm:text-6xl">
                That page has left the shelf.
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-base leading-8 text-muted-foreground">
                The address may have changed, or the catalog item may no longer be available. Try
                the current product listing or search the store instead.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/products">
                  Browse products
                  <Icon className="size-4" name="arrow-right" />
                </ButtonLink>
                <ButtonLink href="/search" variant="secondary">
                  Search the store
                  <Icon className="size-4" name="search" />
                </ButtonLink>
                <ButtonLink href="/" variant="ghost">
                  Return home
                </ButtonLink>
              </div>
            </div>

            <div className="relative min-h-[24rem] overflow-hidden border-t border-border bg-surface lg:min-h-full lg:border-l lg:border-t-0">
              <Image
                alt="Dark rectangular device in warm studio light"
                className="object-cover opacity-75"
                fill
                loading="eager"
                sizes="(min-width: 1024px) 52vw, 100vw"
                src="/assets/hero-device-BnN7IleR.jpg"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-surface-elevated via-transparent to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 border-t border-white/15 pt-4 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/60 sm:bottom-7 sm:left-7 sm:right-7">
                <span>Back to the catalog</span>
                <Icon className="size-4 text-primary" name="arrow-up-right" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
