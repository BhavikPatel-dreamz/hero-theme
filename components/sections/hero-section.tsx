import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { hero } from "@/lib/data";

const heroFacts = [
  ["Live", "catalog data"],
  ["Clear", "variant status"],
  ["Adult", "access only"],
];

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100svh-6.75rem)] overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0">
        <Image
          alt="Dark precision vaporizer displayed on a textured stone surface"
          className="object-cover object-[62%_center] sm:object-center"
          fill
          preload
          sizes="100vw"
          src={hero.image}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(8%_0.01_255/0.98)_0%,oklch(8%_0.01_255/0.92)_34%,oklch(8%_0.01_255/0.48)_64%,oklch(8%_0.01_255/0.14)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,oklch(8%_0.01_255/0.82)_0%,transparent_42%,oklch(8%_0.01_255/0.22)_100%)]" />
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div aria-hidden="true" className="absolute -left-32 top-1/3 size-96 rounded-full bg-primary/[0.07] blur-3xl" />
      </div>

      <Container className="relative flex min-h-[calc(100svh-6.75rem)] flex-col justify-between pb-7 pt-10 sm:pb-9 sm:pt-14 lg:pt-16">
        <div className="flex items-center justify-between text-[0.64rem] font-bold uppercase tracking-[0.18em] text-white/55">
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_14px_var(--primary)]" />
            Adult-use storefront
          </span>
          <span className="hidden sm:block">Product data from the live catalog</span>
        </div>

        <div className="max-w-[52rem] py-16 sm:py-20 lg:py-24">
          <Reveal>
            <div className="flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-9 bg-primary" />
              {hero.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-7 max-w-4xl text-balance font-display text-[clamp(3.35rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white">
              {hero.title}
              <br />
              <span className="text-gradient">{hero.accent}</span>
            </h1>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-8 max-w-[38rem] text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
              {hero.body}
            </p>
          </Reveal>
          <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" delay={400}>
            <ButtonLink className="min-w-44" href="/products">
              Shop now
              <Icon className="size-4" name="arrow-right" />
            </ButtonLink>
            <ButtonLink className="min-w-44 border-white/15 bg-white/[0.045]" href="/categories" variant="secondary">
              Browse categories
            </ButtonLink>
          </Reveal>
        </div>

        <div className="grid gap-5 border-t border-white/12 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {heroFacts.map(([value, label]) => (
              <span className="text-xs text-white/48" key={label}>
                <b className="mr-2 font-bold text-white/88">{value}</b>
                {label}
              </span>
            ))}
          </div>
          <span className="hidden items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.17em] text-white/45 sm:flex">
            Explore
            <Icon className="size-3.5 rotate-90" name="arrow-right" />
          </span>
        </div>
      </Container>
    </section>
  );
}
