import type { Category } from "@/types/site";
import { CategoryCard } from "@/components/sections/category-card";
import { EmptyState } from "@/components/sections/empty-state";
import { PageIntro } from "@/components/sections/page-intro";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

export function CategoriesIndexPage({ categories }: { categories: Category[] }) {
  return (
    <>
      <PageIntro
        actions={
          <ButtonLink href="/products" variant="secondary">
            View every product
            <Icon className="size-4" name="arrow-right" />
          </ButtonLink>
        }
        description="Browse the product groups currently available from the connected store catalog. Names, descriptions, imagery, and item counts come from catalog records when supplied."
        detail={
          <>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Available now
            </p>
            <p className="mt-2 font-display text-4xl font-semibold tabular-nums text-foreground">
              {categories.length}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {categories.length === 1 ? "catalog category" : "catalog categories"}
            </p>
          </>
        }
        eyebrow="Shop by category"
        title="Find your part of the ritual."
      />

      <section aria-label="Product categories">
        <Container className="py-10 sm:py-12 lg:py-16">
          {categories.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard category={category} headingLevel={2} key={category.id} />
              ))}
            </div>
          ) : (
            <EmptyState
              action={<ButtonLink href="/products">Browse all products</ButtonLink>}
              description="The connected catalog did not return any product categories. You can still browse the complete product listing."
              eyebrow="Catalog status"
              icon="shopping-bag"
              title="No categories are available."
            />
          )}
        </Container>
      </section>
    </>
  );
}
