"use client";

import Image from "next/image";
import { useCart } from "@/components/cart/cart-provider";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";
import { formatMoney } from "@/lib/format";

export function CartPage() {
  const { cart, error, isLoading, isMutating, itemCount, removeLineItem, updateLineItem } =
    useCart();
  const currencyCode = cart?.currency_code ?? "usd";
  const items = cart?.items ?? [];
  const hasShippingMethod = Boolean(cart?.shipping_methods?.length);
  const hasShippingAddress = Boolean(cart?.shipping_address?.country_code);
  const checkoutDisabled = isLoading || isMutating;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-35" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8rem] top-[-12rem] size-[30rem] rounded-full bg-primary/8 blur-[110px]"
        />
        <Container className="relative grid gap-9 pb-10 pt-12 md:pb-14 md:pt-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div>
            <Eyebrow className="text-primary">Your order / 01</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.02] sm:text-5xl md:text-6xl">
              Everything you chose,
              <span className="text-gradient block">ready for review.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Adjust quantities before continuing. Products and current totals stay connected to
              the live Medusa cart.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-border bg-surface-elevated/75 p-5 backdrop-blur-lg lg:block">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl border border-primary/25 bg-primary/8 text-primary">
                <Icon className="size-4.5" name="package" />
              </div>
              <div>
                <p className="text-sm font-semibold">Medusa-backed cart</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Live products and pricing</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {[
                ["01", "Cart"],
                ["02", "Details"],
                ["03", "Confirm"],
              ].map(([step, label], index) => (
                <div
                  className={
                    index === 0
                      ? "rounded-lg border border-primary/30 bg-primary/8 px-2 py-2.5"
                      : "rounded-lg border border-border bg-background/55 px-2 py-2.5"
                  }
                  key={step}
                >
                  <div className={index === 0 ? "text-xs font-bold text-primary" : "text-xs font-bold text-muted-foreground"}>
                    {step}
                  </div>
                  <div className="mt-0.5 text-[0.65rem] text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="pb-36 pt-8 md:pt-12 lg:pb-16">
        <span aria-live="polite" className="sr-only" role="status">
          {isMutating ? "Updating your cart." : ""}
        </span>

        {isLoading ? (
          <CartLoading />
        ) : items.length === 0 ? (
          <CartEmptyState error={error} />
        ) : (
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start xl:gap-10">
            <section
              aria-busy={isMutating}
              aria-labelledby="cart-items-title"
              className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
                <div>
                  <Eyebrow>Shopping bag</Eyebrow>
                  <h2 className="mt-1.5 font-display text-xl" id="cart-items-title">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </h2>
                </div>
                <ButtonLink className="shrink-0" href="/products" variant="ghost">
                  <span className="hidden sm:inline">Continue shopping</span>
                  <span className="sm:hidden">Shop</span>
                  <Icon className="size-4" name="arrow-up-right" />
                </ButtonLink>
              </div>

              <ul className="divide-y divide-border px-5 sm:px-6">
                {items.map((item) => {
                  const thumbnail =
                    item.thumbnail ??
                    item.product?.thumbnail ??
                    "/assets/product-accessories-BrKIPgD4.jpg";
                  const title = item.product_title ?? item.title ?? "Untitled product";
                  const variantTitle = item.variant_title ?? item.variant?.title;
                  const lineTotal = (item.unit_price ?? 0) * item.quantity;

                  return (
                    <li
                      className="grid grid-cols-[5.75rem_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[7.25rem_minmax(0,1fr)] sm:gap-5 sm:py-6 md:grid-cols-[7.25rem_minmax(0,1fr)_auto]"
                      key={item.id}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-background">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,oklch(77%_0.155_68/0.12),transparent_66%)]"
                        />
                        <Image
                          alt={title}
                          className="object-contain p-2.5 transition-transform duration-300 hover:scale-[1.03]"
                          fill
                          sizes="(max-width: 639px) 92px, 116px"
                          src={thumbnail}
                        />
                      </div>

                      <div className="flex min-w-0 flex-col">
                        <div>
                          <h3 className="line-clamp-2 max-w-xl text-sm font-semibold leading-5 sm:text-base">
                            {title}
                          </h3>
                          {variantTitle && variantTitle !== "Default" ? (
                            <p className="mt-1.5 truncate text-xs text-muted-foreground">
                              {variantTitle}
                            </p>
                          ) : null}
                          <p className="mt-2 text-xs text-muted-foreground">
                            {formatMoney(item.unit_price, currencyCode)} per item
                          </p>
                        </div>

                        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4 md:justify-start">
                          <div
                            aria-label={`Quantity for ${title}`}
                            className="inline-flex h-11 items-center overflow-hidden rounded-lg border border-border bg-background"
                            role="group"
                          >
                            <button
                              aria-label={`Decrease quantity of ${title}`}
                              className="grid size-11 place-items-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
                              disabled={isMutating || item.quantity <= 1}
                              onClick={() => updateLineItem(item.id, item.quantity - 1)}
                              type="button"
                            >
                              <Icon className="size-3.5" name="minus" />
                            </button>
                            <span
                              aria-live="polite"
                              className="w-10 text-center text-xs font-bold tabular-nums"
                            >
                              {item.quantity}
                            </span>
                            <button
                              aria-label={`Increase quantity of ${title}`}
                              className="grid size-11 place-items-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
                              disabled={isMutating}
                              onClick={() => updateLineItem(item.id, item.quantity + 1)}
                              type="button"
                            >
                              <Icon className="size-3.5" name="plus" />
                            </button>
                          </div>
                          <button
                            aria-label={`Remove ${title} from cart`}
                            className="min-h-11 rounded-lg px-3 text-xs font-semibold text-muted-foreground transition-colors hover:bg-danger/10 hover:text-danger disabled:cursor-not-allowed disabled:opacity-40"
                            disabled={isMutating}
                            onClick={() => removeLineItem(item.id)}
                            type="button"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center justify-between border-t border-border pt-4 md:col-span-1 md:block md:border-0 md:pt-0 md:text-right">
                        <span className="text-xs text-muted-foreground md:hidden">Line total</span>
                        <div className="font-display text-lg font-semibold tabular-nums">
                          {formatMoney(lineTotal, currencyCode)}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {error ? (
                <p
                  className="mx-5 mb-5 rounded-xl border border-danger/35 bg-danger/10 px-4 py-3 text-sm leading-6 text-danger sm:mx-6 sm:mb-6"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}
            </section>

            <CartSummary
              cartTotal={formatMoney(cart?.total, currencyCode)}
              checkoutDisabled={checkoutDisabled}
              currencyCode={currencyCode}
              hasShippingAddress={hasShippingAddress}
              hasShippingMethod={hasShippingMethod}
              itemCount={itemCount}
              shippingTotal={cart?.shipping_total}
              subtotal={cart?.subtotal}
              taxTotal={cart?.tax_total}
            />
          </div>
        )}
      </Container>

      {!isLoading && items.length > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/92 shadow-[0_-18px_50px_oklch(3%_0.01_255/0.5)] backdrop-blur-xl lg:hidden">
          <Container className="flex items-center gap-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3">
            <div className="min-w-0 flex-1">
              <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Current total
              </p>
              <p className="mt-0.5 truncate font-display text-lg font-semibold tabular-nums">
                {formatMoney(cart?.total, currencyCode)}
              </p>
            </div>
            <ButtonLink
              aria-disabled={checkoutDisabled}
              className={
                checkoutDisabled
                  ? "min-w-[11rem] pointer-events-none opacity-50"
                  : "min-w-[11rem]"
              }
              href="/checkout"
              tabIndex={checkoutDisabled ? -1 : undefined}
            >
              Checkout
              <Icon className="size-4" name="arrow-right" />
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </>
  );
}

function CartSummary({
  cartTotal,
  checkoutDisabled,
  currencyCode,
  hasShippingAddress,
  hasShippingMethod,
  itemCount,
  shippingTotal,
  subtotal,
  taxTotal,
}: {
  cartTotal: string;
  checkoutDisabled: boolean;
  currencyCode: string;
  hasShippingAddress: boolean;
  hasShippingMethod: boolean;
  itemCount: number;
  shippingTotal: number | null | undefined;
  subtotal: number | null | undefined;
  taxTotal: number | null | undefined;
}) {
  return (
    <aside
      aria-label="Order summary"
      className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-[var(--shadow-soft)] lg:sticky lg:top-28 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <Eyebrow>Order summary</Eyebrow>
          <h2 className="mt-1.5 font-display text-2xl">Review totals</h2>
        </div>
        <span className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-[0.68rem] font-semibold text-muted-foreground">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        <CartTotalRow label="Subtotal" value={formatMoney(subtotal, currencyCode)} />
        <CartTotalRow
          label="Shipping"
          value={hasShippingMethod ? formatMoney(shippingTotal, currencyCode) : "At order placement"}
        />
        <CartTotalRow
          label="Taxes"
          value={hasShippingAddress ? formatMoney(taxTotal, currencyCode) : "At order placement"}
        />
        <CartTotalRow
          label={hasShippingMethod && hasShippingAddress ? "Total" : "Current total"}
          strong
          value={cartTotal}
        />
      </dl>

      <div className="mt-5 rounded-xl border border-primary/20 bg-primary/7 p-4">
        <div className="flex items-start gap-3">
          <Icon className="mt-0.5 size-4 text-primary" name="shield-check" />
          <div>
            <p className="text-xs font-semibold text-foreground">Clear before you continue</p>
            <p className="mt-1 text-[0.7rem] leading-5 text-muted-foreground">
              Medusa confirms shipping, tax, and the final order total when the order is placed.
            </p>
          </div>
        </div>
      </div>

      <ButtonLink
        aria-disabled={checkoutDisabled}
        className={
          checkoutDisabled
            ? "mt-5 hidden w-full pointer-events-none opacity-50 lg:inline-flex"
            : "mt-5 hidden w-full lg:inline-flex"
        }
        href="/checkout"
        tabIndex={checkoutDisabled ? -1 : undefined}
      >
        Proceed to checkout
        <Icon className="size-4" name="arrow-right" />
      </ButtonLink>

      <p className="mt-4 text-center text-[0.68rem] leading-5 text-muted-foreground">
        Storefront intended only for adults of legal purchasing age.
      </p>
    </aside>
  );
}

function CartLoading() {
  return (
    <div aria-live="polite" className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_23rem]" role="status">
      <span className="sr-only">Loading your cart.</span>
      <div aria-hidden="true" className="rounded-2xl border border-border bg-surface-elevated p-5 sm:p-6">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-secondary" />
        <div className="mt-6 space-y-6">
          {[0, 1].map((item) => (
            <div className="grid grid-cols-[6rem_1fr] gap-5 border-t border-border pt-6" key={item}>
              <div className="aspect-square animate-pulse rounded-xl bg-secondary" />
              <div className="space-y-3 py-2">
                <div className="h-3 w-4/5 animate-pulse rounded bg-secondary" />
                <div className="h-3 w-2/5 animate-pulse rounded bg-secondary" />
                <div className="mt-7 h-11 w-36 animate-pulse rounded-lg bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="h-80 animate-pulse rounded-2xl border border-border bg-surface-elevated" />
    </div>
  );
}

function CartEmptyState({ error }: { error: string | null }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated px-6 py-20 text-center shadow-[var(--shadow-soft)] sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/7 blur-[90px]"
      />
      <div className="relative mx-auto grid size-16 place-items-center rounded-2xl border border-border bg-background shadow-[var(--glow)]">
        <Icon className="size-6 text-primary" name="shopping-bag" />
      </div>
      <h2 className="relative mt-6 font-display text-3xl font-semibold">Your bag is currently empty.</h2>
      <p className="relative mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
        Browse the live catalog and add the products you want to review here.
      </p>
      <ButtonLink className="relative mt-7" href="/products">
        Browse products
        <Icon className="size-4" name="arrow-right" />
      </ButtonLink>
      {error ? (
        <p
          className="relative mx-auto mt-5 max-w-md rounded-xl border border-danger/35 bg-danger/10 px-4 py-3 text-sm text-danger"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function CartTotalRow({
  label,
  strong,
  value,
}: {
  label: string;
  strong?: boolean;
  value: string;
}) {
  return (
    <div
      className={
        strong
          ? "mt-5 flex items-end justify-between gap-4 border-t border-border pt-5"
          : "flex items-center justify-between gap-4"
      }
    >
      <dt className={strong ? "font-display text-lg" : "text-muted-foreground"}>{label}</dt>
      <dd
        className={
          strong
            ? "text-right font-display text-2xl font-semibold tabular-nums"
            : "text-right text-xs font-medium tabular-nums"
        }
      >
        {value}
      </dd>
    </div>
  );
}
