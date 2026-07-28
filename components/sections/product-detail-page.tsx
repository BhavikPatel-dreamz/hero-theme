"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type ReactNode } from "react";
import type { Product, ProductVariant } from "@/types/site";
import { cx } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-provider";
import { ProductCard } from "@/components/sections/product-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";
import { WishlistButton } from "@/components/wishlist/wishlist-button";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useDialogFocus } from "@/hooks/use-dialog-focus";

type ProductDetailPageProps = {
  product: Product;
  relatedProducts: Product[];
};

type ProductAccordionItem = {
  value: string;
  title: string;
  content: ReactNode;
  contentClassName?: string;
};

export function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  const router = useRouter();
  const { addLineItem, error: cartError, isMutating } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [addingMode, setAddingMode] = useState<"cart" | "buy" | null>(null);
  const selectedVariant = product.variants[selectedVariantIndex] ?? product.variants[0];
  const comparisonProducts = [product, ...relatedProducts.slice(0, 2)];
  const canPurchase = Boolean(selectedVariant.id && selectedVariant.inStock);

  async function addSelectedVariant(action: "cart" | "buy" = "cart") {
    if (!canPurchase) {
      return;
    }

    setAddingMode(action);

    try {
      const nextCart = await addLineItem(selectedVariant.id, quantity);

      if (!nextCart) {
        return;
      }

      if (action === "buy") {
        router.push("/checkout");
        return;
      }

      setAdded(true);
      window.setTimeout(() => setAdded(false), 1500);
    } catch {
      // The cart provider owns the user-facing error state.
    } finally {
      setAddingMode(null);
    }
  }

  return (
    <>
      <Container className="pt-7 sm:pt-9">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link className="transition-colors hover:text-foreground" href="/">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="transition-colors hover:text-foreground" href="/products">
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="max-w-[16rem] truncate text-foreground sm:max-w-md">
              {product.name}
            </li>
          </ol>
        </nav>
      </Container>

      <section aria-label="Product overview" className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -right-48 top-8 -z-10 size-[30rem] rounded-full bg-primary/5 blur-3xl"
        />
        <Container className="grid gap-8 py-7 sm:py-10 lg:grid-cols-[minmax(0,1fr)_27.5rem] lg:gap-12 xl:gap-16">
          <ProductGallery
            activeImage={activeImage}
            onImageChange={setActiveImage}
            product={product}
          />

          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductPurchasePanel
              added={added}
              addingMode={addingMode}
              canPurchase={canPurchase}
              cartError={cartError}
              onAddSelectedVariant={addSelectedVariant}
              onQuantityChange={setQuantity}
              onVariantChange={setSelectedVariantIndex}
              product={product}
              quantity={quantity}
              selectedVariant={selectedVariant}
              selectedVariantIndex={selectedVariantIndex}
              isMutating={isMutating}
            />
          </div>
        </Container>
      </section>

      <ProductSpecifications product={product} />
      <ProductFeatures product={product} />
      <ProductComparison comparisonProducts={comparisonProducts} product={product} />
      <ProductReviews product={product} />
      <RelatedProducts products={relatedProducts} />
      <div aria-hidden="true" className="h-28 md:hidden" />
      <MobilePurchaseBar
        added={added}
        addingMode={addingMode}
        canPurchase={canPurchase}
        isMutating={isMutating}
        onAddSelectedVariant={addSelectedVariant}
        product={product}
        selectedVariant={selectedVariant}
      />
    </>
  );
}

function ProductPurchasePanel({
  added,
  addingMode,
  canPurchase,
  cartError,
  isMutating,
  onAddSelectedVariant,
  onQuantityChange,
  onVariantChange,
  product,
  quantity,
  selectedVariant,
  selectedVariantIndex,
}: {
  added: boolean;
  addingMode: "cart" | "buy" | null;
  canPurchase: boolean;
  cartError: string | null;
  isMutating: boolean;
  onAddSelectedVariant: (action?: "cart" | "buy") => Promise<void>;
  onQuantityChange: (value: number) => void;
  onVariantChange: (variantIndex: number) => void;
  product: Product;
  quantity: number;
  selectedVariant: ProductVariant;
  selectedVariantIndex: number;
}) {
  const showCompareAt = Boolean(
    product.compareAt &&
      product.compareAt > selectedVariant.price &&
      selectedVariant.price === product.price,
  );
  const discountPercentage = showCompareAt
    ? Math.round(((product.compareAt! - selectedVariant.price) / product.compareAt!) * 100)
    : 0;

  return (
    <div className="rounded-[var(--radius)] border border-border bg-surface-elevated/90 p-5 shadow-[var(--shadow-soft)] backdrop-blur md:p-6">
      <div className="flex flex-wrap items-center gap-2">
        {product.badge ? <Eyebrow className="text-primary">{product.badge}</Eyebrow> : null}
        {discountPercentage > 0 ? (
          <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-primary">
            {discountPercentage}% off
          </span>
        ) : null}
      </div>
      <h1 className="mt-3 text-balance font-display text-3xl font-semibold leading-[1.05] sm:text-4xl md:text-5xl">
        {product.name}
      </h1>
      {product.subtitle ? <p className="mt-2 text-muted-foreground">{product.subtitle}</p> : null}

      {product.rating && product.reviewCount ? (
        <a className="mt-4 inline-flex items-center gap-2 text-sm" href="#reviews">
          <StarRating iconClassName="size-3.5" rating={product.rating} />
          <span className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            {product.rating} ({product.reviewCount} {product.reviewCount === 1 ? "review" : "reviews"})
          </span>
        </a>
      ) : null}

      <div className="mt-6 flex items-baseline gap-3">
        <div className="text-3xl font-semibold tabular-nums">
          {selectedVariant.priceDisplay}
        </div>
        {showCompareAt ? (
          <div className="text-lg text-muted-foreground line-through tabular-nums">
            {product.compareAtDisplay}
          </div>
        ) : null}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        {product.shortDescription}
      </p>

      <VariantSelector
        onChange={onVariantChange}
        optionLabel={product.optionLabel}
        selectedIndex={selectedVariantIndex}
        variants={product.variants}
      />

      <div className="mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-[auto_1fr]">
        <QuantityControl onChange={onQuantityChange} quantity={quantity} />

        <Button
          className="relative h-12 w-full overflow-hidden disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!canPurchase || isMutating}
          onClick={() => void onAddSelectedVariant("cart")}
          type="button"
        >
          {added ? (
            <span className="inline-flex items-center gap-2 motion-safe:animate-[ticker-in_180ms_ease-out_both] motion-reduce:animate-none">
              <Icon className="size-4" name="check" />
              Added
            </span>
          ) : (
            <span className="motion-safe:animate-[ticker-in_180ms_ease-out_both] motion-reduce:animate-none">
              {addingMode === "cart" ? "Adding..." : canPurchase ? "Add to cart" : "Sold out"}
            </span>
          )}
        </Button>
      </div>

      <Button
        className="mt-3 h-12 w-full disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!canPurchase || isMutating}
        onClick={() => void onAddSelectedVariant("buy")}
        type="button"
        variant="secondary"
      >
        {addingMode === "buy" ? "Preparing..." : "Buy now"}
      </Button>
      <WishlistButton className="mt-3 h-12 w-full" product={product} showLabel />
      {cartError ? (
        <p className="mt-3 text-xs text-danger" role="alert">
          {cartError}
        </p>
      ) : null}

      <div aria-live="polite" className="mt-4 text-xs text-muted-foreground">
        {selectedVariant.inStock ? (
          <span className="inline-flex items-center gap-2 text-success">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
            In stock
          </span>
        ) : (
          <span>Currently sold out</span>
        )}
      </div>

      <div className="mt-6 flex gap-3 rounded-[var(--radius)] border border-border bg-background/55 p-4 text-xs leading-5 text-muted-foreground">
        <Icon className="mt-0.5 size-4 text-primary" name="shield-check" />
        <p>
          Intended only for adults of legal purchasing age. Check and follow the laws where
          you live.
        </p>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <Link
          className="group rounded-[var(--radius)] border border-border bg-background/55 p-4 text-xs leading-5 text-muted-foreground transition-colors hover:border-primary/45 hover:text-foreground"
          href="/policies/shipping"
        >
          <span className="flex items-center gap-2 font-semibold text-foreground">
            <Icon className="size-4 text-primary" name="truck" />
            Shipping information
          </span>
          <span className="mt-2 block">Options and totals come from the configured backend.</span>
        </Link>
        <Link
          className="group rounded-[var(--radius)] border border-border bg-background/55 p-4 text-xs leading-5 text-muted-foreground transition-colors hover:border-primary/45 hover:text-foreground"
          href="/policies/returns"
        >
          <span className="flex items-center gap-2 font-semibold text-foreground">
            <Icon className="size-4 text-primary" name="rotate-ccw" />
            Returns information
          </span>
          <span className="mt-2 block">Review the current policy status before ordering.</span>
        </Link>
      </div>

      <ProductAccordion items={getProductAccordionItems(product)} />
    </div>
  );
}

function ProductGallery({
  activeImage,
  onImageChange,
  product,
}: {
  activeImage: number;
  onImageChange: (imageIndex: number) => void;
  product: Product;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxTitleId = useId();
  const lightboxDialogRef = useDialogFocus<HTMLDivElement>({
    onClose: () => setLightboxOpen(false),
    open: lightboxOpen,
  });
  const activeSource = product.images[activeImage] ?? product.images[0];

  useBodyScrollLock(lightboxOpen);

  function showPreviousImage() {
    onImageChange((activeImage - 1 + product.images.length) % product.images.length);
  }

  function showNextImage() {
    onImageChange((activeImage + 1) % product.images.length);
  }

  return (
    <div className="min-w-0">
      <button
        aria-haspopup="dialog"
        aria-label={`Enlarge ${product.name} image ${activeImage + 1}`}
        className="group/gallery relative block aspect-square w-full overflow-hidden rounded-[var(--radius)] border border-border bg-surface shadow-[var(--shadow-soft)] transition-colors hover:border-primary/50"
        onClick={() => setLightboxOpen(true)}
        type="button"
      >
        <Image
          alt={product.name}
          className="object-cover motion-safe:animate-[gallery-in_350ms_ease-out_both] motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover/gallery:scale-[1.02] motion-reduce:animate-none"
          fill
          key={activeSource}
          preload={activeImage === 0}
          sizes="(min-width: 1440px) 820px, (min-width: 1024px) 58vw, 100vw"
          src={activeSource}
        />
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-surface-elevated/90 px-3 text-xs font-semibold text-foreground backdrop-blur">
          <Icon className="size-4 text-primary" name="search" />
          Enlarge
        </span>
      </button>

      <div
        aria-label="Choose product image"
        className="scrollbar-hide mt-3 flex gap-3 overflow-x-auto pb-1"
        role="group"
      >
        {product.images.map((image, index) => (
          <button
            aria-label={`View ${product.name} image ${index + 1}`}
            aria-pressed={index === activeImage}
            className={cx(
              "relative aspect-square w-20 shrink-0 overflow-hidden rounded-[var(--radius)] border bg-surface transition-colors sm:w-24",
              index === activeImage
                ? "border-primary ring-1 ring-primary/35"
                : "border-border hover:border-muted-foreground",
            )}
            key={image}
            onClick={() => onImageChange(index)}
            type="button"
          >
            <Image
              alt=""
              aria-hidden="true"
              className="object-cover"
              fill
              sizes="96px"
              src={image}
            />
          </button>
        ))}
      </div>

      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-overlay p-3 backdrop-blur-md motion-safe:animate-[fade-in_180ms_ease-out_both] motion-reduce:animate-none sm:p-6"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              setLightboxOpen(false);
            }
          }}
        >
          <div
            aria-labelledby={lightboxTitleId}
            aria-modal="true"
            className="flex h-[min(92svh,56rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-surface-elevated shadow-[var(--shadow-hover)] motion-safe:animate-[modal-in_220ms_ease-out_both] motion-reduce:animate-none"
            ref={lightboxDialogRef}
            role="dialog"
            tabIndex={-1}
          >
            <div className="flex min-h-16 items-center justify-between gap-4 border-b border-border px-4 sm:px-5">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold" id={lightboxTitleId}>
                  {product.name}
                </h2>
                <p aria-live="polite" className="mt-0.5 text-xs text-muted-foreground">
                  Image {activeImage + 1} of {product.images.length}
                </p>
              </div>
              <Button
                aria-label="Close enlarged image"
                className="size-11 rounded-full px-0 py-0"
                onClick={() => setLightboxOpen(false)}
                type="button"
                variant="ghost"
              >
                <Icon className="size-5" name="x" />
              </Button>
            </div>

            <div className="relative min-h-0 flex-1 bg-background">
              <Image
                alt={`${product.name}, enlarged image ${activeImage + 1}`}
                className="object-contain motion-safe:animate-[gallery-in_250ms_ease-out_both] motion-reduce:animate-none"
                fill
                key={`lightbox-${activeSource}`}
                sizes="100vw"
                src={activeSource}
              />

              {product.images.length > 1 ? (
                <>
                  <button
                    aria-label="View previous image"
                    className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface-elevated/90 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary sm:left-5"
                    onClick={showPreviousImage}
                    type="button"
                  >
                    <Icon className="size-5 rotate-180" name="arrow-right" />
                  </button>
                  <button
                    aria-label="View next image"
                    className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface-elevated/90 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary sm:right-5"
                    onClick={showNextImage}
                    type="button"
                  >
                    <Icon className="size-5" name="arrow-right" />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function VariantSelector({
  onChange,
  optionLabel,
  selectedIndex,
  variants,
}: {
  onChange: (variantIndex: number) => void;
  optionLabel: string;
  selectedIndex: number;
  variants: ProductVariant[];
}) {
  const selectedVariant = variants[selectedIndex] ?? variants[0];

  return (
    <div className="mt-8">
      <div className="mb-3 flex items-center justify-between gap-4">
        <Eyebrow>{optionLabel}</Eyebrow>
        <div className="text-xs text-muted-foreground">{selectedVariant.name}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant, index) => (
          <button
            aria-label={`Select ${variant.name}`}
            aria-pressed={index === selectedIndex}
            className={cx(
              "relative grid min-h-11 min-w-11 place-items-center rounded-[var(--radius)] border px-3 text-xs font-semibold motion-safe:transition-[border-color,background,transform]",
              index === selectedIndex
                ? "border-primary bg-surface text-primary"
                : "border-border bg-background",
              variant.inStock ? "hover:border-primary" : "opacity-45",
            )}
            disabled={!variant.inStock}
            key={variant.id}
            onClick={() => onChange(index)}
            title={`${variant.name}${variant.inStock ? "" : " - sold out"}`}
            type="button"
          >
            <span
              aria-hidden="true"
              className="mr-2 inline-block size-3 rounded-full border border-border align-middle"
              style={{ backgroundColor: variant.color }}
            />
            {variant.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function QuantityControl({
  onChange,
  quantity,
}: {
  onChange: (value: number) => void;
  quantity: number;
}) {
  return (
    <div className="flex h-12 w-full items-center rounded-[var(--radius)] border border-border min-[420px]:w-auto">
      <button
        aria-label="Decrease quantity"
        className="grid size-12 place-items-center transition-colors hover:bg-secondary"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        type="button"
      >
        <Icon className="size-4" name="minus" />
      </button>
      <span aria-live="polite" className="min-w-10 flex-1 text-center text-sm tabular-nums">
        {quantity}
      </span>
      <button
        aria-label="Increase quantity"
        className="grid size-12 place-items-center transition-colors hover:bg-secondary"
        onClick={() => onChange(quantity + 1)}
        type="button"
      >
        <Icon className="size-4" name="plus" />
      </button>
    </div>
  );
}

function ProductAccordion({ items }: { items: ProductAccordionItem[] }) {
  const [openItem, setOpenItem] = useState<string | null>("desc");
  const accordionId = useId();

  return (
    <div className="mt-6 border-t border-border">
      {items.map((item) => {
        const isOpen = openItem === item.value;
        const panelId = `${accordionId}-${item.value}-panel`;
        const triggerId = `${accordionId}-${item.value}-trigger`;

        return (
          <div className="border-b border-border" key={item.value}>
            <h3 className="flex">
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="flex flex-1 cursor-pointer items-center justify-between py-4 text-left text-sm font-semibold transition-colors hover:text-primary"
                id={triggerId}
                onClick={() => setOpenItem(isOpen ? null : item.value)}
                type="button"
              >
                {item.title}
                <Icon
                  className={cx(
                    "h-4 w-4 shrink-0 text-muted-foreground motion-safe:transition-transform motion-safe:duration-200",
                    isOpen ? "motion-safe:rotate-180" : "",
                  )}
                  name="chevron-down"
                />
              </button>
            </h3>
            {isOpen ? (
              <div
                className={cx(
                  "pb-4 pt-0 motion-safe:animate-[fade-in_200ms_ease-out_both] motion-reduce:animate-none",
                  item.contentClassName,
                )}
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
              >
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function getProductAccordionItems(product: Product): ProductAccordionItem[] {
  const items: ProductAccordionItem[] = [
    {
      value: "desc",
      title: "Description",
      content: product.description,
      contentClassName: "text-sm leading-relaxed text-muted-foreground",
    },
  ];

  if (product.inBox.length > 0) {
    items.push({
      value: "box",
      title: "What's included",
      content: (
        <ul className="space-y-1.5 text-sm">
          {product.inBox.map((item) => (
            <li className="text-muted-foreground" key={item}>
              {item}
            </li>
          ))}
        </ul>
      ),
    });
  }

  return items;
}

function ProductSpecifications({ product }: { product: Product }) {
  const headingId = useId();

  if (
    product.specs.length === 0 &&
    product.categoryNames.length === 0 &&
    product.collectionNames.length === 0
  ) {
    return null;
  }

  return (
    <section aria-labelledby={headingId} className="border-t border-border bg-surface">
      <Container className="grid gap-8 py-16 md:grid-cols-[0.7fr_1.3fr] md:py-20">
        <div>
          <Eyebrow className="text-primary">Specifications</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl" id={headingId}>
            Product details.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
            Only information present in the current catalog record is shown here.
          </p>
        </div>
        <div className="overflow-x-auto rounded-[var(--radius)] border border-border bg-surface-elevated">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <caption className="sr-only">Specifications for {product.name}</caption>
            <tbody className="divide-y divide-border">
              {product.collectionNames.length > 0 ? (
                <tr>
                  <th className="w-1/3 px-4 py-3 font-medium text-muted-foreground" scope="row">
                    Collection
                  </th>
                  <td className="break-words px-4 py-3">{product.collectionNames.join(", ")}</td>
                </tr>
              ) : null}
              {product.categoryNames.length > 0 ? (
                <tr>
                  <th className="w-1/3 px-4 py-3 font-medium text-muted-foreground" scope="row">
                    Category
                  </th>
                  <td className="break-words px-4 py-3">{product.categoryNames.join(", ")}</td>
                </tr>
              ) : null}
              {product.specs.map((spec) => (
                <tr key={spec.label}>
                  <th className="w-1/3 px-4 py-3 font-medium text-muted-foreground" scope="row">
                    {spec.label}
                  </th>
                  <td className="break-words px-4 py-3">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

function ProductFeatures({ product }: { product: Product }) {
  if (product.features.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border bg-background">
      {product.features.map((feature, index) => (
        <Container
          className={cx(
            "grid items-center gap-12 py-16 md:grid-cols-2 md:py-24",
            index % 2 ? "md:[&>*:first-child]:order-2" : "",
          )}
          key={feature.title}
        >
          <div>
            <Eyebrow>Feature {String(index + 1).padStart(2, "0")}</Eyebrow>
            <h3 className="mt-3 max-w-md font-display text-3xl font-semibold leading-tight md:text-4xl">
              {feature.title}
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
              {feature.body}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
            <Image
              alt=""
              aria-hidden="true"
              className="object-cover"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              src={product.images[index % product.images.length]}
            />
          </div>
        </Container>
      ))}
    </section>
  );
}

function ProductComparison({
  comparisonProducts,
  product,
}: {
  comparisonProducts: Product[];
  product: Product;
}) {
  const headingId = useId();

  if (comparisonProducts.length < 2) {
    return null;
  }

  return (
    <section aria-labelledby={headingId} className="border-t border-border bg-surface">
      <Container className="py-16 md:py-20">
        <Eyebrow>Compare</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl" id={headingId}>
          Compare catalog details.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
          Available prices and specifications from the current product records.
        </p>
        <div className="mt-10 overflow-x-auto rounded-[var(--radius)] border border-border bg-surface-elevated">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="sr-only">Catalog comparison including {product.name}</caption>
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-4 text-left font-normal text-muted-foreground" scope="col">
                  Detail
                </th>
                {comparisonProducts.map((comparisonProduct) => (
                  <th
                    className="px-4 py-4 text-left font-semibold"
                    key={comparisonProduct.handle}
                    scope="col"
                  >
                    {comparisonProduct.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {product.specs.slice(0, 4).map((spec) => (
                <tr key={spec.label}>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground" scope="row">
                    {spec.label}
                  </th>
                  {comparisonProducts.map((comparisonProduct) => {
                    const matchingSpec = comparisonProduct.specs.find(
                      (candidate) => candidate.label === spec.label,
                    );

                    return (
                      <td className="px-4 py-3" key={comparisonProduct.handle}>
                        {matchingSpec ? matchingSpec.value : "Not listed"}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground" scope="row">
                  Price
                </th>
                {comparisonProducts.map((comparisonProduct) => (
                  <td className="px-4 py-3 tabular-nums" key={comparisonProduct.handle}>
                    {comparisonProduct.priceDisplay}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

function ProductReviews({ product }: { product: Product }) {
  if (!product.rating || !product.reviewCount) {
    return null;
  }

  return (
    <section aria-labelledby="product-reviews-heading" className="scroll-mt-28 border-t border-border bg-background" id="reviews">
      <Container className="grid gap-10 py-16 md:grid-cols-[18rem_1fr] md:py-20">
        <div>
          <Eyebrow className="text-primary">Reviews</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold" id="product-reviews-heading">
            Customer ratings.
          </h2>
          <div className="font-display text-5xl font-semibold tabular-nums">{product.rating}</div>
          <StarRating className="mt-2" iconClassName="size-4" rating={product.rating} />
          <div className="mt-1 text-xs text-muted-foreground">
            Based on {product.reviewCount} {product.reviewCount === 1 ? "catalog review" : "catalog reviews"}
          </div>
        </div>

        <div className="space-y-6">
          {product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <article
                className="rounded-[var(--radius)] border border-border bg-surface-elevated p-5 sm:p-6"
                key={`${review.author}-${review.title}-${index}`}
              >
                <h3 className="font-semibold">{review.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {review.body}
                </p>
                <p className="mt-4 text-xs font-semibold text-foreground">{review.author}</p>
              </article>
            ))
          ) : (
            <div className="rounded-[var(--radius)] border border-border bg-surface-elevated p-6 text-sm text-muted-foreground">
              No written review text is available in this product record.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border bg-background">
      <Container className="py-16 md:py-20">
        <Eyebrow>Explore more</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
          More from the catalog.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-5 min-[430px]:grid-cols-2 md:grid-cols-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard index={index} key={product.handle} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function StarRating({
  className,
  iconClassName,
  rating,
}: {
  className?: string;
  iconClassName?: string;
  rating: number;
}) {
  const normalizedRating = Math.min(5, Math.max(0, rating));

  return (
    <div
      aria-label={`${normalizedRating} out of 5 stars`}
      className={cx("flex gap-0.5", className)}
      role="img"
    >
      {[0, 1, 2, 3, 4].map((star) => (
        <Icon
          className={cx(
            star < Math.round(normalizedRating)
              ? "fill-primary text-primary"
              : "text-muted-foreground/45",
            iconClassName,
          )}
          key={star}
          name="star"
        />
      ))}
    </div>
  );
}

function MobilePurchaseBar({
  added,
  addingMode,
  canPurchase,
  isMutating,
  onAddSelectedVariant,
  product,
  selectedVariant,
}: {
  added: boolean;
  addingMode: "cart" | "buy" | null;
  canPurchase: boolean;
  isMutating: boolean;
  onAddSelectedVariant: (action?: "cart" | "buy") => Promise<void>;
  product: Product;
  selectedVariant: ProductVariant;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface-elevated/95 p-3 shadow-[var(--shadow-soft)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-[44rem] grid-cols-[1fr_auto] items-center gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{product.name}</div>
          <div className="text-xs text-muted-foreground">{selectedVariant.priceDisplay}</div>
        </div>
        <Button
          className="h-11 px-4"
          disabled={!canPurchase || isMutating}
          onClick={() => void onAddSelectedVariant("cart")}
          type="button"
        >
          {added ? "Added" : addingMode === "cart" ? "Adding..." : canPurchase ? "Add" : "Sold out"}
        </Button>
      </div>
    </div>
  );
}
