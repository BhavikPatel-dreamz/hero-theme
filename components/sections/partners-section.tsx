import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-title";

const partnerMarks = [
  { name: "All products", detail: "current assortment" },
  { name: "Categories", detail: "catalog taxonomy" },
  { name: "Collections", detail: "published edits" },
  { name: "Wishlist", detail: "stored in this browser" },
  { name: "FAQ", detail: "storefront answers" },
  { name: "Policies", detail: "current information" },
];

export function PartnersSection() {
  return (
    <section>
      <Container className="py-24 md:py-28">
        <div className="rounded-2xl border border-border bg-surface/35 p-8 md:p-12">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <Eyebrow className="text-primary">Explore the storefront</Eyebrow>
              <h2 className="mt-3 max-w-2xl font-display text-3xl tracking-[-0.03em] md:text-4xl">
                Clear paths through the current catalog.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-muted-foreground">
              Each destination reflects functionality and content available in this frontend.
            </p>
          </div>
          <div className="mt-10 grid border-y border-border sm:grid-cols-2 md:grid-cols-3">
            {partnerMarks.map((partner, index) => (
              <div
                className="group flex min-h-28 flex-col justify-center border-border py-5 sm:px-6 md:min-h-32 md:border-l md:px-7 md:first:border-l-0"
                key={partner.name}
              >
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-foreground/80 transition-colors group-hover:text-primary">
                  {partner.name}
                </span>
                <span className="mt-2 text-xs text-muted-foreground">{partner.detail}</span>
                <span className="mt-4 h-px w-8 bg-primary/45 transition-all duration-300 group-hover:w-14" />
                <span className="sr-only">Storefront destination {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
