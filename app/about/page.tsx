import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntro } from "@/components/sections/page-intro";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/types/site";

export const metadata: Metadata = {
  title: "About this storefront - DaVinci",
  description: "A considered, catalog-led shopping experience for adults of legal purchasing age.",
};

const principles: Array<{ body: string; icon: IconName; title: string }> = [
  {
    body: "Product names, imagery, variants, prices, availability, categories, and collections stay tied to connected catalog records.",
    icon: "shopping-bag",
    title: "Catalog-led",
  },
  {
    body: "The visual language and copy are intended for adults of legal purchasing age, without youth-oriented themes or health claims.",
    icon: "shield-check",
    title: "Adult by design",
  },
  {
    body: "Local wishlist storage and missing account, order-history, and contact integrations are stated directly instead of appearing as controls that do not work.",
    icon: "check",
    title: "Clear about state",
  },
];

export default function AboutRoute() {
  return (
    <SiteShell>
      <PageIntro
        actions={
          <>
            <ButtonLink href="/products">
              Explore the catalog
              <Icon className="size-4" name="arrow-right" />
            </ButtonLink>
            <ButtonLink href="/categories" variant="secondary">
              Browse categories
            </ButtonLink>
          </>
        }
        description="A dark, considered shopping experience for adult-use products—built around the catalog that is actually connected and the capabilities that actually exist."
        detail={
          <>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-primary">
              Storefront standard
            </p>
            <p className="mt-3 font-display text-2xl font-semibold leading-tight">
              Adult audience. Clear product data. No invented claims.
            </p>
          </>
        }
        eyebrow="About this storefront"
        title="A more considered way to browse."
      />

      <section aria-labelledby="about-approach-title">
        <Container className="py-12 sm:py-16 lg:py-24">
          <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
            <figure className="relative min-h-[28rem] overflow-hidden rounded-[var(--radius)] border border-border bg-surface shadow-[var(--shadow-soft)] sm:min-h-[36rem]">
              <Image
                alt="Abstract close-up of a dark device with a warm orange center"
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                src="/assets/story-macro-C-SsUhyi.jpg"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-background/55 p-5 text-xs uppercase tracking-[0.15em] text-white/65 backdrop-blur-md sm:p-6">
                Detail, restraint, and a quieter visual rhythm
              </figcaption>
            </figure>

            <div className="flex flex-col justify-center rounded-[var(--radius)] border border-border bg-surface-elevated p-6 shadow-[var(--shadow-soft)] sm:p-9 lg:p-12">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-primary">
                The approach
              </p>
              <h2 className="mt-4 max-w-xl text-balance font-display text-4xl font-semibold leading-[1.05] sm:text-5xl" id="about-approach-title">
                Let the products and the data set the pace.
              </h2>
              <div className="mt-7 max-w-2xl space-y-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                <p>
                  This experience is organized around large product imagery, legible choices, and
                  enough breathing room to compare the catalog without visual noise.
                </p>
                <p>
                  It does not add a fictional founder story, manufacturing history, service
                  promise, or product benefit. Verified company-history content is not included in
                  this project, so this page explains the storefront approach instead.
                </p>
              </div>
              <div className="mt-9 grid grid-cols-2 gap-4 border-t border-border pt-7">
                <div>
                  <p className="font-display text-3xl font-semibold text-primary">Live</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    catalog connection
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-semibold text-primary">21+</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    current access notice
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="principles-title" className="border-y border-border bg-surface">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-primary">
              Three principles
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl" id="principles-title">
              Premium should still feel precise.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {principles.map((principle, index) => (
              <article
                className="rounded-[var(--radius)] border border-border bg-background p-6 sm:p-7"
                key={principle.title}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                    <Icon className="size-5" name={principle.icon} />
                  </span>
                  <span className="text-xs font-bold tabular-nums text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold">{principle.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{principle.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="relative isolate overflow-hidden rounded-[var(--radius)] border border-border bg-surface-elevated p-7 shadow-[var(--shadow-soft)] sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:p-12">
            <div
              aria-hidden="true"
              className="absolute -right-32 -top-36 -z-10 size-80 rounded-full bg-primary/[0.09] blur-3xl"
            />
            <div>
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-primary">
                Ready to explore?
              </p>
              <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl font-semibold sm:text-5xl">
                Start with what is available now.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Browse the connected catalog, save a shortlist on this device, and review live
                options before adding anything to the cart.
              </p>
            </div>
            <ButtonLink className="mt-7 shrink-0 lg:mt-0" href="/products">
              Shop all products
              <Icon className="size-4" name="arrow-right" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
