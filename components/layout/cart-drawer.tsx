"use client";

import Image from "next/image";
import { useCart } from "@/components/cart/cart-provider";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { formatMoney } from "@/lib/format";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useDialogFocus } from "@/hooks/use-dialog-focus";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ onClose, open }: CartDrawerProps) {
  const { cart, error, isLoading, isMutating, itemCount, removeLineItem, updateLineItem } =
    useCart();
  const currencyCode = cart?.currency_code ?? "usd";
  const items = cart?.items ?? [];
  const dialogRef = useDialogFocus<HTMLElement>({ onClose, open });
  const hasShippingMethod = Boolean(cart?.shipping_methods?.length);
  const hasShippingAddress = Boolean(cart?.shipping_address?.country_code);

  useBodyScrollLock(open);

  if (!open) {
    return null;
  }

  return (
    <>
      <button
        aria-hidden="true"
        className="fixed inset-0 z-50 animate-[fade-in_180ms_ease-out_both] bg-overlay backdrop-blur-md"
        onClick={onClose}
        tabIndex={-1}
        type="button"
      />
      <aside
        aria-busy={isLoading || isMutating}
        aria-describedby="cart-drawer-description"
        aria-labelledby="cart-drawer-title"
        aria-modal="true"
        className="fixed bottom-0 right-0 top-0 z-50 flex w-full animate-[drawer-in_420ms_cubic-bezier(.22,1,.36,1)_both] flex-col overflow-hidden border-l border-border bg-surface-elevated shadow-[var(--shadow-soft)] sm:w-[min(29rem,100vw)]"
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <div className="relative border-b border-border px-5 py-5 sm:px-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
          />
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.19em] text-primary">
                <span className="size-1.5 rounded-full bg-primary shadow-[0_0_14px_var(--primary)]" />
                Your selection
              </div>
              <h2 className="mt-1.5 font-display text-2xl leading-none" id="cart-drawer-title">
                Shopping bag
              </h2>
              <p
                aria-live="polite"
                className="mt-1.5 text-xs text-muted-foreground"
                id="cart-drawer-description"
              >
                {isLoading
                  ? "Loading your cart"
                  : `${itemCount} ${itemCount === 1 ? "item" : "items"}`}
              </p>
            </div>
            <Button
              aria-label="Close shopping bag"
              className="size-11 shrink-0 px-0 py-0"
              onClick={onClose}
              type="button"
              variant="ghost"
            >
              <Icon className="size-4.5" name="x" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <CartDrawerLoading />
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="grid size-16 place-items-center rounded-2xl border border-border bg-background shadow-[var(--glow)]">
              <Icon className="size-6 text-primary" name="shopping-bag" />
            </div>
            <h3 className="mt-6 font-display text-2xl">Your bag is ready when you are.</h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
              Explore the live catalog and add a product to begin your order.
            </p>
            <ButtonLink className="mt-7" href="/products" onClick={onClose}>
              Browse products
              <Icon className="size-4" name="arrow-right" />
            </ButtonLink>
            {error ? (
              <p
                className="mt-5 max-w-xs rounded-xl border border-danger/35 bg-danger/10 px-4 py-3 text-xs leading-5 text-danger"
                role="alert"
              >
                {error}
              </p>
            ) : null}
          </div>
        ) : (
          <>
            <ul
              aria-label="Items in your shopping bag"
              className="scrollbar-hide flex-1 divide-y divide-border overflow-y-auto px-5 sm:px-6"
            >
              {items.map((item) => {
                const thumbnail =
                  item.thumbnail ??
                  item.product?.thumbnail ??
                  "/assets/product-accessories-BrKIPgD4.jpg";
                const title = item.product_title ?? item.title ?? "Untitled product";
                const variantTitle = item.variant_title ?? item.variant?.title;
                const lineTotal = (item.unit_price ?? 0) * item.quantity;

                return (
                  <li className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 py-5" key={item.id}>
                    <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-background">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,oklch(77%_0.155_68/0.11),transparent_65%)]"
                      />
                      <Image
                        alt={title}
                        className="object-contain p-2 transition-transform duration-300 hover:scale-[1.03]"
                        fill
                        sizes="88px"
                        src={thumbnail}
                      />
                    </div>

                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="line-clamp-2 text-sm font-semibold leading-5">{title}</h3>
                          {variantTitle && variantTitle !== "Default" ? (
                            <p className="mt-1 truncate text-xs text-muted-foreground">
                              {variantTitle}
                            </p>
                          ) : null}
                        </div>
                        <div className="shrink-0 text-right text-sm font-semibold tabular-nums">
                          {formatMoney(lineTotal, currencyCode)}
                        </div>
                      </div>

                      <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                        <div>
                          <div
                            aria-label={`Quantity for ${title}`}
                            className="inline-flex h-10 items-center overflow-hidden rounded-lg border border-border bg-background"
                            role="group"
                          >
                            <button
                              aria-label={`Decrease quantity of ${title}`}
                              className="grid size-10 place-items-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
                              disabled={isMutating || item.quantity <= 1}
                              onClick={() => updateLineItem(item.id, item.quantity - 1)}
                              type="button"
                            >
                              <Icon className="size-3.5" name="minus" />
                            </button>
                            <span
                              aria-live="polite"
                              className="w-8 text-center text-xs font-semibold tabular-nums"
                            >
                              {item.quantity}
                            </span>
                            <button
                              aria-label={`Increase quantity of ${title}`}
                              className="grid size-10 place-items-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
                              disabled={isMutating}
                              onClick={() => updateLineItem(item.id, item.quantity + 1)}
                              type="button"
                            >
                              <Icon className="size-3.5" name="plus" />
                            </button>
                          </div>
                          {item.quantity > 1 ? (
                            <p className="mt-1.5 text-[0.68rem] text-muted-foreground">
                              {formatMoney(item.unit_price, currencyCode)} each
                            </p>
                          ) : null}
                        </div>
                        <button
                          aria-label={`Remove ${title} from cart`}
                          className="min-h-10 rounded-lg px-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-danger/10 hover:text-danger disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={isMutating}
                          onClick={() => removeLineItem(item.id)}
                          type="button"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-border bg-background/72 px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5 backdrop-blur-xl sm:px-6 sm:pb-6">
              {error ? (
                <p
                  className="mb-4 rounded-xl border border-danger/35 bg-danger/10 px-4 py-3 text-xs leading-5 text-danger"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              <dl className="space-y-2.5 text-sm">
                <CartTotalRow
                  label="Subtotal"
                  value={formatMoney(cart?.subtotal, currencyCode)}
                />
                <CartTotalRow
                  label="Shipping"
                  value={
                    hasShippingMethod
                      ? formatMoney(cart?.shipping_total, currencyCode)
                      : "At order placement"
                  }
                />
                <CartTotalRow
                  label="Taxes"
                  value={
                    hasShippingAddress
                      ? formatMoney(cart?.tax_total, currencyCode)
                      : "At order placement"
                  }
                />
                <CartTotalRow
                  label={hasShippingMethod && hasShippingAddress ? "Total" : "Current total"}
                  strong
                  value={formatMoney(cart?.total, currencyCode)}
                />
              </dl>

              <p className="mt-4 flex items-start gap-2 text-[0.7rem] leading-5 text-muted-foreground">
                <Icon className="mt-0.5 size-3.5 text-primary" name="shield-check" />
                Shipping and tax are confirmed by Medusa when the order is placed.
              </p>

              <ButtonLink
                aria-disabled={isMutating}
                className={
                  isMutating
                    ? "mt-5 w-full pointer-events-none opacity-50"
                    : "mt-5 w-full"
                }
                href="/checkout"
                onClick={onClose}
                tabIndex={isMutating ? -1 : undefined}
              >
                Review checkout
                <Icon className="size-4" name="arrow-right" />
              </ButtonLink>
              <ButtonLink
                className="mt-2 w-full"
                href="/products"
                onClick={onClose}
                variant="ghost"
              >
                Continue shopping
              </ButtonLink>
            </div>
          </>
        )}

        <span aria-live="polite" className="sr-only" role="status">
          {isMutating ? "Updating your cart." : ""}
        </span>
      </aside>
    </>
  );
}

function CartDrawerLoading() {
  return (
    <div aria-live="polite" className="flex-1 px-5 py-6 sm:px-6" role="status">
      <span className="sr-only">Loading your shopping bag.</span>
      <div aria-hidden="true" className="space-y-5">
        {[0, 1, 2].map((item) => (
          <div className="grid grid-cols-[5.5rem_1fr] gap-4" key={item}>
            <div className="aspect-square animate-pulse rounded-xl bg-secondary" />
            <div className="space-y-3 py-1">
              <div className="h-3 w-4/5 animate-pulse rounded bg-secondary" />
              <div className="h-3 w-2/5 animate-pulse rounded bg-secondary" />
              <div className="mt-5 h-10 w-28 animate-pulse rounded-lg bg-secondary" />
            </div>
          </div>
        ))}
      </div>
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
          ? "mt-3 flex items-end justify-between border-t border-border pt-4"
          : "flex items-center justify-between gap-4"
      }
    >
      <dt className={strong ? "font-display text-lg text-foreground" : "text-muted-foreground"}>
        {label}
      </dt>
      <dd
        className={
          strong
            ? "font-display text-xl font-semibold tabular-nums text-foreground"
            : "text-right text-xs font-medium tabular-nums text-foreground"
        }
      >
        {value}
      </dd>
    </div>
  );
}
