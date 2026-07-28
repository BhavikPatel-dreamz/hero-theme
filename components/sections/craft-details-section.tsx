import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";

const principles = [
  {
    icon: "zap" as const,
    label: "Live catalog",
    title: "Current store data.",
    body: "Product details, prices, variants, and stock labels come from the connected catalog.",
  },
  {
    icon: "shield-check" as const,
    label: "Clear limitations",
    title: "No invented promises.",
    body: "Shipping, returns, support, and account features are described only to the extent the project supports them.",
  },
  {
    icon: "thermometer" as const,
    label: "Adult access",
    title: "A mature experience.",
    body: "The interface is intended for adults of legal purchasing age and avoids health or youth-oriented claims.",
  },
];

export function CraftDetailsSection() {
  return (
    <section className="border-y border-border bg-surface/30">
      <Container className="py-24 md:py-28">
        <div className="grid gap-10 md:grid-cols-[0.72fr_1.28fr] md:gap-20">
          <div>
            <Eyebrow className="text-primary">Storefront principles</Eyebrow>
            <h2 className="mt-4 max-w-sm text-balance font-display text-4xl leading-[1.02] tracking-[-0.04em] md:text-5xl">
              Clarity in every step.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
              A premium shopping surface should make the available catalog, controls, and
              integration limits easy to understand.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {principles.map((principle, index) => (
              <article
                className="group rounded-xl border border-border bg-background/50 p-6 transition-colors hover:border-primary/45"
                key={principle.label}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-full border border-primary/25 bg-primary/5">
                    <Icon className="size-4 text-primary" name={principle.icon} />
                  </span>
                  <span className="text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <Eyebrow className="mt-8 text-primary/80">{principle.label}</Eyebrow>
                <h3 className="mt-2 font-display text-xl tracking-tight">{principle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
