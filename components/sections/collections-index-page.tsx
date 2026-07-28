import type { Collection } from "@/types/site";
import { CollectionCard } from "@/components/sections/collection-card";
import { EmptyState } from "@/components/sections/empty-state";
import { PageIntro } from "@/components/sections/page-intro";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

export function CollectionsIndexPage({ collections }: { collections: Collection[] }) {
  return (
    <>
      <PageIntro
        actions={
          <ButtonLink href="/categories" variant="secondary">
            Browse categories
            <Icon className="size-4" name="arrow-right" />
          </ButtonLink>
        }
        description="Explore the collections published in the connected catalog. Product availability, pricing, and options remain tied to the current store data."
        detail={
          <>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Available now
            </p>
            <p className="mt-2 font-display text-4xl font-semibold tabular-nums text-foreground">
              {collections.length}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {collections.length === 1 ? "catalog collection" : "catalog collections"}
            </p>
          </>
        }
        eyebrow="Curated collections"
        title="Browse with a point of view."
      />

      <section aria-label="Product collections">
        <Container className="py-10 sm:py-12 lg:py-16">
          {collections.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
              {collections.map((collection, index) => (
                <CollectionCard
                  collection={collection}
                  ctaLabel="Explore collection"
                  headingLevel={2}
                  index={index}
                  key={collection.id ?? collection.handle}
                  reveal={false}
                  showDescription
                />
              ))}
            </div>
          ) : (
            <EmptyState
              action={<ButtonLink href="/products">Browse all products</ButtonLink>}
              description="The connected catalog did not return any collections. The complete product listing is still available."
              eyebrow="Catalog status"
              icon="shopping-bag"
              title="No collections are available."
            />
          )}
        </Container>
      </section>
    </>
  );
}
