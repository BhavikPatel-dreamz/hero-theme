import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { collections as fallbackCollections } from "@/lib/data";
import { listCategories, listCollections } from "@/lib/medusa";

export async function CategoryNavSection() {
  const [categories, collections] = await Promise.all([
    listCategories().catch(() => []),
    listCollections().catch(() => fallbackCollections),
  ]);
  const items = [
    ...categories.slice(0, 6).map((category) => ({
      detail: category.productCount ? `${category.productCount} items` : "Category",
      href: `/categories/${category.handle}`,
      label: category.name,
    })),
    ...collections.slice(0, 3).map((collection) => ({
      detail: collection.productCount ? `${collection.productCount} items` : "Collection",
      href: `/collections/${collection.handle}`,
      label: collection.name,
    })),
  ].slice(0, 8);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-border bg-surface">
      <Container className="py-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Explore the catalog
          </span>
          <Link className="text-xs font-semibold text-primary transition-colors hover:text-foreground" href="/categories">
            View all categories
          </Link>
        </div>
        <nav aria-label="Shop categories" className="scrollbar-hide flex gap-3 overflow-x-auto pb-1">
          {items.map((item, index) => (
            <Link
              className="group flex min-h-[4.5rem] min-w-[13rem] items-center gap-4 rounded-xl border border-border bg-background/70 px-4 py-3 transition-[background,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-surface-elevated"
              href={item.href}
              key={item.href}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-surface text-[0.62rem] font-bold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{item.detail}</span>
              </span>
              <Icon className="ml-auto size-4 text-muted-foreground transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-primary" name="arrow-up-right" />
            </Link>
          ))}
        </nav>
      </Container>
    </section>
  );
}
