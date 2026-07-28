import Link from "next/link";
import { CategoryCard } from "@/components/sections/category-card";
import { CollectionCard } from "@/components/sections/collection-card";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionTitle } from "@/components/ui/section-title";
import { collections as fallbackCollections } from "@/lib/data";
import { listCategories, listCollections } from "@/lib/medusa";

export async function CatalogSection() {
  const [categories, collections] = await Promise.all([
    listCategories().catch(() => []),
    listCollections().catch(() => fallbackCollections),
  ]);
  const featuredCategories = categories.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute -left-56 top-1/3 size-[34rem] rounded-full bg-primary/[0.035] blur-3xl" />
      <Container className="relative py-24 md:py-32 lg:py-36">
        <SectionTitle
          action={
            <Link
              className="inline-flex items-center gap-2 border-b border-border pb-2 text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              href="/categories"
            >
              All categories
              <Icon className="size-4" name="arrow-up-right" />
            </Link>
          }
          className="mb-14"
          eyebrow="Featured categories"
          title="Start with the way you like to unwind."
        />
        {featuredCategories.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {featuredCategories.map((category) => (
              <CategoryCard category={category} key={category.id} />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {collections.slice(0, 3).map((collection, index) => (
              <CollectionCard
                collection={collection}
                index={index}
                key={collection.id ?? collection.handle}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
