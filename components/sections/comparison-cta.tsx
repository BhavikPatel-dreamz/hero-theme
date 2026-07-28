import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

const accessorySearches = [
  { href: "/search?q=accessories", label: "Accessories" },
  { href: "/search?q=cleaning", label: "Cleaning & care" },
  { href: "/search?q=replacement", label: "Replacement parts" },
];

export function ComparisonCta() {
  return (
    <section className="border-y border-border bg-surface py-20 md:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-soft)]">
          <Image
            alt="A considered arrangement of device accessories and care components"
            className="object-cover object-center opacity-50"
            fill
            sizes="100vw"
            src="/assets/product-accessories-BrKIPgD4.jpg"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(8%_0.01_255/0.98)_0%,oklch(8%_0.01_255/0.9)_50%,oklch(8%_0.01_255/0.48)_100%)]" />
          <div aria-hidden="true" className="absolute -left-24 -top-32 size-80 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative grid min-h-[32rem] items-end gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_22rem] lg:p-14">
            <div className="max-w-2xl">
              <div className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary">
                Complete the setup
              </div>
              <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                Every detail deserves the same attention.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/58 sm:text-base">
                Search the existing catalog for accessories, maintenance products, and replacement
                parts. Compatibility details remain tied to each product record.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/search?q=accessories">
                  Find accessories
                  <Icon className="size-4" name="arrow-right" />
                </ButtonLink>
                <ButtonLink className="border-white/15 bg-white/[0.055]" href="/categories" variant="secondary">
                  Browse categories
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-xl border border-white/12 bg-black/25 p-5 backdrop-blur-md">
              <div className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/48">
                Quick searches
              </div>
              <div className="mt-3 divide-y divide-white/10">
                {accessorySearches.map((item) => (
                  <Link
                    className="group flex min-h-14 items-center justify-between text-sm font-semibold text-white/72 transition-colors hover:text-primary"
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                    <Icon className="size-4 transition-transform group-hover:translate-x-1" name="arrow-up-right" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
