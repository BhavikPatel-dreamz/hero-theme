import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { collections as fallbackCollections } from "@/lib/data";
import { listCategories, listCollections } from "@/lib/medusa";

export async function CatalogMarqueeSection() {
  const [categories, collections] = await Promise.all([
    listCategories().catch(() => []),
    listCollections().catch(() => fallbackCollections),
  ]);
  const links = [
    ...collections.map((collection) => ({
      href: `/collections/${collection.handle}`,
      label: collection.name,
      type: "Collection",
    })),
    ...categories.map((category) => ({
      href: `/categories/${category.handle}`,
      label: category.name,
      type: "Category",
    })),
  ].slice(0, 12);

  if (links.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="catalog-carousel-title" className="border-y border-border bg-surface">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="text-[0.68rem] font-bold uppercase tracking-[0.19em] text-primary">
              Catalog carousel
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl" id="catalog-carousel-title">
              Collections and categories, at a glance.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            A quick route into the collections and categories already available in the live catalog.
          </p>
        </div>

        <div className="scrollbar-hide mt-10 flex gap-3 overflow-x-auto pb-2">
          {links.map((link, index) => (
            <Link
              className="group flex min-h-28 min-w-[15rem] items-end justify-between gap-5 rounded-xl border border-border bg-background/70 p-5 transition-[border-color,background,transform] hover:-translate-y-0.5 hover:border-primary/40 hover:bg-surface-elevated"
              href={link.href}
              key={`${link.type}-${link.href}`}
            >
              <span>
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {link.type} · {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 block font-display text-xl font-semibold">{link.label}</span>
              </span>
              <Icon className="size-4 shrink-0 text-muted-foreground transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" name="arrow-up-right" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
