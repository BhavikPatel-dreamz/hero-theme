import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";

export function MissionSection() {
  return (
    <section className="overflow-hidden border-y border-border bg-surface/30">
      <Container className="py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-background md:order-2">
            <Image
              alt="Dark product device photographed in warm studio light"
              className="object-cover"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              src="/assets/hero-device-BnN7IleR.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/65 via-transparent to-primary/10" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-foreground/20 pt-4 text-[0.6rem] uppercase tracking-[0.18em] text-foreground/65 md:bottom-7 md:left-7 md:right-7">
              <span>Catalog study<br />Series 02</span>
              <span>01 / 01</span>
            </div>
          </div>
          <div className="md:order-1">
            <Eyebrow className="text-primary">Catalog clarity</Eyebrow>
            <h2 className="mt-4 max-w-xl text-balance font-display text-4xl leading-[1.03] tracking-[-0.045em] md:text-6xl">
              Details grounded in the current store.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground">
              Product names, variants, prices, availability, and specifications are shown only
              when the connected catalog supplies them.
            </p>
            <div className="mt-9 grid max-w-lg grid-cols-3 gap-4 border-y border-border py-6">
              <div>
                <div className="font-display text-2xl text-primary md:text-3xl">Live</div>
                <div className="mt-1 text-xs text-muted-foreground">catalog pricing</div>
              </div>
              <div>
                <div className="font-display text-2xl text-primary md:text-3xl">Local</div>
                <div className="mt-1 text-xs text-muted-foreground">browser wishlist</div>
              </div>
              <div>
                <div className="font-display text-2xl text-primary md:text-3xl">Adult</div>
                <div className="mt-1 text-xs text-muted-foreground">legal-age access</div>
              </div>
            </div>
            <Link
              className="mt-9 inline-flex items-center gap-2 text-sm transition-colors hover:text-primary"
              href="/products"
            >
              Browse products
              <Icon className="size-4" name="arrow-up-right" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
