"use client";

import { EmptyState } from "@/components/sections/empty-state";
import { PageIntro } from "@/components/sections/page-intro";
import { ProductCard } from "@/components/sections/product-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { useWishlist } from "@/components/wishlist/wishlist-provider";

export function WishlistPage() {
  const { clearWishlist, count, items } = useWishlist();

  return (
    <>
      <PageIntro
        actions={
          <ButtonLink href="/products" variant="secondary">
            Keep browsing
            <Icon className="size-4" name="arrow-right" />
          </ButtonLink>
        }
        description="Keep a considered shortlist as you browse. Saved products stay in this browser and are not synced to an account."
        detail={
          <>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Saved on this device
            </p>
            <p className="mt-2 font-display text-4xl font-semibold tabular-nums text-foreground">
              {count}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {count === 1 ? "product" : "products"}
            </p>
          </>
        }
        eyebrow="Your wishlist"
        title="A shortlist worth returning to."
      />

      <section aria-label="Saved products">
        <Container className="py-10 sm:py-12 lg:py-16">
          {count === 0 ? (
            <EmptyState
              action={
                <>
                  <ButtonLink href="/products">Browse products</ButtonLink>
                  <ButtonLink href="/categories" variant="secondary">
                    Shop categories
                  </ButtonLink>
                </>
              }
              description="Select the heart on any product card to keep it in this browser for another visit. Account syncing is not connected."
              eyebrow="Your shortlist is clear"
              icon="heart"
              title="Nothing saved yet."
            />
          ) : (
            <>
              <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-primary">
                    Saved selection
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-semibold">
                    {count} {count === 1 ? "product" : "products"}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Availability and pricing may change with the connected catalog.
                  </p>
                </div>
                <Button onClick={clearWishlist} type="button" variant="danger">
                  Clear saved items
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-5 min-[460px]:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {items.map((product, index) => (
                  <ProductCard index={index} key={product.id} product={product} />
                ))}
              </div>
              <p className="mt-8 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
                Wishlist data is stored locally in this browser. Clearing site data or selecting
                “Clear saved items” removes this list.
              </p>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
