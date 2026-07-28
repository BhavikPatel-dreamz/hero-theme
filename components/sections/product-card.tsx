import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/site";
import { ProductCardAddToCartButton } from "@/components/cart/product-card-add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { WishlistButton } from "@/components/wishlist/wishlist-button";
import { cx } from "@/lib/utils";

export type ProductCardView = "grid" | "list";

type ProductCardProps = {
  index: number;
  product: Product;
  view?: ProductCardView;
};

export function ProductCard({ index, product, view = "grid" }: ProductCardProps) {
  const [primaryImage, hoverImage] = product.images;
  const delay = ([0, 50, 100, 150] as const)[index % 4];
  const contextLabel =
    product.collectionNames[0] ?? product.categoryNames[0] ?? product.subtitle;
  const categoryLabel = product.categoryNames[0];
  const inStock = product.variants.some((variant) => variant.inStock);
  const availableVariantCount = product.variants.filter((variant) => variant.inStock).length;
  const discountPercentage =
    product.compareAt && product.compareAt > product.price
      ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
      : 0;
  const isList = view === "list";

  return (
    <Reveal className="h-full" delay={delay}>
      <article className="group h-full">
        <div
          className={cx(
            "relative h-full overflow-hidden rounded-[var(--radius)] border border-border bg-surface-elevated motion-safe:transition-[box-shadow,transform,border-color] motion-safe:duration-300 hover:border-primary/55 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[var(--shadow-hover)]",
            isList && "grid grid-cols-[7.25rem_minmax(0,1fr)] min-[430px]:grid-cols-[10rem_minmax(0,1fr)] sm:grid-cols-[13rem_minmax(0,1fr)]",
          )}
        >
          <div
            className={cx(
              "relative overflow-hidden bg-surface",
              isList ? "min-h-44" : "aspect-[4/5]",
            )}
          >
            <Link
              aria-label={`View ${product.name}`}
              className="block size-full"
              href={`/products/${product.handle}`}
            >
              <Image
                alt={product.name}
                className="object-cover motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:group-hover:scale-[1.035] motion-safe:group-hover:opacity-0"
                fill
                sizes={
                  isList
                    ? "(min-width: 640px) 208px, (min-width: 430px) 160px, 116px"
                    : "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, (min-width: 430px) 50vw, 100vw"
                }
                src={primaryImage}
              />
              {hoverImage ? (
                <Image
                  alt=""
                  aria-hidden="true"
                  className="scale-[1.035] object-cover opacity-0 motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:group-hover:scale-100 motion-safe:group-hover:opacity-100"
                  fill
                  sizes={
                    isList
                      ? "(min-width: 640px) 208px, (min-width: 430px) 160px, 116px"
                      : "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, (min-width: 430px) 50vw, 100vw"
                  }
                  src={hoverImage}
                />
              ) : null}
            </Link>

            <div className="absolute left-2.5 top-2.5 flex max-w-[calc(100%-3.5rem)] flex-wrap gap-1.5 sm:left-3 sm:top-3">
              {product.badge ? <Badge>{product.badge}</Badge> : null}
              {discountPercentage > 0 ? (
                <Badge className="border-primary/35 bg-primary/10 text-primary">
                  {discountPercentage}% off
                </Badge>
              ) : null}
            </div>

            <div className="absolute right-2.5 top-2.5 flex flex-col gap-2 sm:right-3 sm:top-3">
              <WishlistButton
                className="size-10 rounded-full px-0 py-0"
                product={product}
              />
              <ProductCardAddToCartButton className="size-10" product={product} />
            </div>
          </div>

          <div className={cx("flex min-w-0 flex-col p-4", isList ? "sm:p-5" : "md:p-5")}>
            <Link className="block min-w-0" href={`/products/${product.handle}`}>
              {contextLabel ? (
                <div className="flex min-w-0 items-center gap-1.5 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="truncate">{contextLabel}</span>
                  {categoryLabel && categoryLabel !== contextLabel ? (
                    <>
                      <span aria-hidden="true" className="text-border">
                        /
                      </span>
                      <span className="truncate">{categoryLabel}</span>
                    </>
                  ) : null}
                </div>
              ) : null}
              <h3
                className={cx(
                  "mt-2 line-clamp-2 font-display font-semibold leading-snug text-foreground",
                  isList ? "text-base sm:text-xl" : "min-h-[2.75rem] text-base",
                )}
              >
                {product.name}
              </h3>
              {product.subtitle && product.subtitle !== contextLabel ? (
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                  {product.subtitle}
                </p>
              ) : null}
              {isList ? (
                <p className="mt-3 hidden line-clamp-2 text-sm leading-6 text-muted-foreground min-[430px]:block">
                  {product.shortDescription}
                </p>
              ) : null}
            </Link>

            <div className={cx("mt-auto", isList ? "pt-4" : "pt-5")}>
              <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
                <div>
                  <div className="font-semibold tabular-nums text-foreground">
                    {product.priceDisplay}
                  </div>
                  {product.compareAt ? (
                    <div className="text-xs tabular-nums text-muted-foreground line-through">
                      {product.compareAtDisplay}
                    </div>
                  ) : null}
                </div>
                <span
                  className={cx(
                    "inline-flex items-center gap-1.5 text-[0.7rem] font-semibold",
                    inStock ? "text-success" : "text-muted-foreground",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cx("size-1.5 rounded-full", inStock ? "bg-success" : "bg-muted-foreground")}
                  />
                  {inStock ? "In stock" : "Sold out"}
                </span>
              </div>

              <div className="mt-4 flex min-h-5 items-center justify-between gap-3 border-t border-border pt-4">
                {product.rating && product.reviewCount ? (
                  <div
                    aria-label={`${product.rating} out of 5 stars from ${product.reviewCount} reviews`}
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                  >
                    <Icon className="size-3 fill-primary text-primary" name="star" />
                    <span className="tabular-nums text-foreground">{product.rating}</span>
                    <span>({product.reviewCount})</span>
                  </div>
                ) : (
                  <span aria-hidden="true" />
                )}

                {product.variants.length > 1 ? (
                  <div
                    aria-label={`${availableVariantCount} of ${product.variants.length} variants available`}
                    className="flex items-center gap-1.5"
                    role="img"
                  >
                    {product.variants.slice(0, 4).map((variant) => (
                      <span
                        aria-hidden="true"
                        className={cx(
                          "size-3 rounded-full border border-border",
                          variant.inStock ? "" : "opacity-35",
                        )}
                        key={variant.id}
                        style={{ backgroundColor: variant.color }}
                        title={`${variant.name}${variant.inStock ? "" : " - sold out"}`}
                      />
                    ))}
                    {product.variants.length > 4 ? (
                      <span className="text-[0.65rem] text-muted-foreground">
                        +{product.variants.length - 4}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
