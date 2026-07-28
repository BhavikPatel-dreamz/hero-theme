import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { listProducts } from "@/lib/medusa";

export async function TestimonialsSection() {
  const { products } = await listProducts({ limit: 24 }).catch(() => ({ products: [] }));
  const ratedProducts = products.filter(
    (product) => typeof product.rating === "number" && typeof product.reviewCount === "number",
  );
  const writtenReviews = products
    .flatMap((product) =>
      product.reviews.map((review) => ({
        ...review,
        product: product.name,
        rating: product.rating,
      })),
    )
    .slice(0, 3);
  const totalReviews = ratedProducts.reduce(
    (total, product) => total + (product.reviewCount ?? 0),
    0,
  );
  const weightedRating =
    totalReviews > 0
      ? ratedProducts.reduce(
          (total, product) =>
            total + (product.rating ?? 0) * (product.reviewCount ?? 0),
          0,
        ) / totalReviews
      : null;

  return (
    <section className="bg-background">
      <Container className="py-24 md:py-32">
        <div className="grid items-start gap-12 lg:grid-cols-[18rem_1fr] lg:gap-16">
          <div>
            <div className="text-[0.68rem] font-bold uppercase tracking-[0.19em] text-primary">
              Catalog feedback
            </div>
            {weightedRating ? (
              <>
                <div className="mt-5 flex items-end gap-3">
                  <div className="font-display text-6xl font-semibold tabular-nums">
                    {weightedRating.toFixed(1)}
                  </div>
                  <span className="mb-2 text-sm text-muted-foreground">out of 5</span>
                </div>
                <div className="mt-4 flex gap-1" aria-label={`${weightedRating.toFixed(1)} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Icon
                      className={
                        index < Math.round(weightedRating)
                          ? "size-4 fill-primary text-primary"
                          : "size-4 text-muted"
                      }
                      key={index}
                      name="star"
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Based on {totalReviews} catalog {totalReviews === 1 ? "rating" : "ratings"}.
                </p>
              </>
            ) : (
              <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight">
                Feedback belongs to the product data.
              </h2>
            )}
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              Ratings and written reviews are shown only when they are available in the existing
              catalog. No storefront testimonials are fabricated here.
            </p>
            <Link className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:text-foreground" href="/products">
              Browse products
              <Icon className="size-4" name="arrow-up-right" />
            </Link>
          </div>

          {writtenReviews.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {writtenReviews.map((review, index) => (
                <blockquote
                  className="flex min-h-72 flex-col rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)] transition-[border-color,transform] hover:-translate-y-1 hover:border-primary/40"
                  key={`${review.author}-${review.title}-${index}`}
                >
                  <Icon className="size-5 fill-primary text-primary" name="star" />
                  <p className="mt-7 text-sm leading-7 text-foreground/88">“{review.body}”</p>
                  <footer className="mt-auto border-t border-border pt-5 text-xs text-muted-foreground">
                    <span className="font-bold text-foreground">{review.author}</span>
                    <span className="mt-1 block truncate">{review.product}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 sm:p-10">
              <div aria-hidden="true" className="absolute -right-24 -top-28 size-72 rounded-full bg-primary/[0.055] blur-3xl" />
              <div className="relative flex min-h-64 flex-col justify-end">
                <div className="grid size-12 place-items-center rounded-xl border border-primary/20 bg-primary/[0.07] text-primary">
                  <Icon className="size-5" name="star" />
                </div>
                <h2 className="mt-6 max-w-xl text-balance font-display text-3xl font-semibold sm:text-4xl">
                  Written customer reviews are not configured in the current catalog.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                  This section will populate automatically when review records are available on products.
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
