"use client";

import type { HttpTypes } from "@medusajs/types";
import Image from "next/image";
import {
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
  useState,
} from "react";
import { useCart } from "@/components/cart/cart-provider";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";
import { formatMoney } from "@/lib/format";
import { cx } from "@/lib/utils";

const inputClasses =
  "h-12 w-full rounded-xl border border-input bg-background/75 px-4 text-sm text-foreground outline-none transition-[border-color,box-shadow,background] placeholder:text-muted-foreground/65 hover:border-border focus:border-primary focus:bg-background focus:shadow-[0_0_0_4px_oklch(77%_0.155_68/0.1)] disabled:cursor-not-allowed disabled:opacity-50";

type CheckoutCart = NonNullable<ReturnType<typeof useCart>["cart"]>;
type PlacedOrder = HttpTypes.StoreOrder;
type CheckoutResponse = {
  message?: string;
  order?: PlacedOrder;
  paymentProviderId?: string;
};
type CountryOption = {
  label: string;
  value: string;
};

function getRequiredValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export function CheckoutPage() {
  const { cart, clearCart, error: cartError, isLoading, isMutating } = useCart();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [paymentProviderId, setPaymentProviderId] = useState<string | null>(null);
  const items = cart?.items ?? [];
  const currencyCode = cart?.currency_code ?? "usd";
  const countryOptions =
    cart?.region?.countries?.flatMap((country) =>
      country.iso_2
        ? [
            {
              label: country.display_name ?? country.name ?? country.iso_2.toUpperCase(),
              value: country.iso_2.toLowerCase(),
            },
          ]
        : [],
    ) ?? [];

  async function submitCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    if (!cart || items.length === 0) {
      setFormError("Your cart is empty.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const requiredFields = [
      "email",
      "firstName",
      "lastName",
      "phone",
      "address1",
      "city",
      "province",
      "postalCode",
      "country",
      "cardName",
      "cardNumber",
      "expiry",
      "cvc",
    ];
    const missingField = requiredFields.some((field) => !getRequiredValue(formData, field));

    if (missingField) {
      setFormError("Please complete all required fields before placing the order.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        body: JSON.stringify({
          address1: getRequiredValue(formData, "address1"),
          address2: getRequiredValue(formData, "address2"),
          cardName: getRequiredValue(formData, "cardName"),
          cardNumber: getRequiredValue(formData, "cardNumber"),
          city: getRequiredValue(formData, "city"),
          countryCode: getRequiredValue(formData, "country"),
          email: getRequiredValue(formData, "email"),
          firstName: getRequiredValue(formData, "firstName"),
          lastName: getRequiredValue(formData, "lastName"),
          phone: getRequiredValue(formData, "phone"),
          postalCode: getRequiredValue(formData, "postalCode"),
          province: getRequiredValue(formData, "province"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = (await response.json()) as CheckoutResponse;

      if (!response.ok || !data.order) {
        setFormError(data.message ?? "Unable to place the Medusa order.");
        return;
      }

      setOrder(data.order);
      setPaymentProviderId(data.paymentProviderId ?? null);
      await clearCart();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Unable to place the order.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (order) {
    return <CheckoutConfirmation order={order} paymentProviderId={paymentProviderId} />;
  }

  const errorMessage = formError ?? cartError;
  const submitDisabled = isMutating || isSubmitting;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-30" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-10rem] top-[-15rem] size-[34rem] rounded-full bg-primary/7 blur-[120px]"
        />
        <Container className="relative grid gap-9 pb-10 pt-12 md:pb-14 md:pt-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div>
            <Eyebrow className="text-primary">Your order / 02</Eyebrow>
            <h1 className="mt-4 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.02] sm:text-5xl md:text-6xl">
              Complete the details.
              <span className="text-gradient block">Know what happens next.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              This checkout completes the cart through the provider selected by the configured
              Medusa backend. Confirm that provider&apos;s behavior before placing an order.
            </p>
          </div>

          <ol aria-label="Checkout progress" className="grid grid-cols-3 gap-2">
            {[
              ["01", "Cart", true],
              ["02", "Details", true],
              ["03", "Confirm", false],
            ].map(([step, label, active]) => (
              <li
                aria-current={step === "02" ? "step" : undefined}
                className={
                  active
                    ? "rounded-xl border border-primary/30 bg-primary/8 px-3 py-3"
                    : "rounded-xl border border-border bg-surface-elevated/65 px-3 py-3"
                }
                key={String(step)}
              >
                <div className={active ? "text-xs font-bold text-primary" : "text-xs font-bold text-muted-foreground"}>
                  {String(step)}
                </div>
                <div className="mt-1 text-[0.68rem] text-muted-foreground">{String(label)}</div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container className="pb-36 pt-8 md:pt-12 lg:pb-20">
        {isLoading ? (
          <CheckoutLoading />
        ) : items.length === 0 || !cart ? (
          <CheckoutEmptyState error={cartError} />
        ) : (
          <>
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-start xl:gap-10">
              <CheckoutSummary cart={cart} currencyCode={currencyCode} />

              <form
                aria-busy={submitDisabled}
                aria-describedby={errorMessage ? "checkout-payment-note checkout-form-error" : "checkout-payment-note"}
                className="space-y-5 lg:col-start-1 lg:row-start-1"
                id="checkout-form"
                onSubmit={submitCheckout}
              >
                <CheckoutPanel
                  description="Where we associate the order and its delivery contact."
                  step="01"
                  title="Contact"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <CheckoutField autoComplete="email" label="Email" name="email" type="email" />
                    <CheckoutField autoComplete="tel" label="Phone" name="phone" type="tel" />
                    <CheckoutField autoComplete="given-name" label="First name" name="firstName" />
                    <CheckoutField autoComplete="family-name" label="Last name" name="lastName" />
                  </div>
                </CheckoutPanel>

                <CheckoutPanel
                  description="Used by Medusa to prepare the available shipping method and tax."
                  step="02"
                  title="Delivery details"
                >
                  <div className="grid gap-4">
                    <CheckoutField
                      autoComplete="address-line1"
                      label="Street address"
                      name="address1"
                    />
                    <CheckoutField
                      autoComplete="address-line2"
                      label="Apartment, suite, etc."
                      name="address2"
                      required={false}
                    />
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      <CheckoutField autoComplete="address-level2" label="City" name="city" />
                      <CheckoutField
                        autoComplete="address-level1"
                        label="State / province"
                        name="province"
                      />
                      <CheckoutField
                        autoComplete="postal-code"
                        label="Postal code"
                        name="postalCode"
                      />
                    </div>
                    <CheckoutSelect label="Country" name="country" options={countryOptions} />
                  </div>

                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-background/65 p-4 text-xs leading-5 text-muted-foreground">
                    <Icon className="mt-0.5 size-4 text-primary" name="truck" />
                    <p>
                      The configured Medusa backend applies an available shipping option when this
                      order is placed; there is no shipping selector in this storefront flow.
                    </p>
                  </div>
                </CheckoutPanel>

                <CheckoutPanel
                  description="Reference fields retained by the existing checkout payload."
                  step="03"
                  title="Payment configuration"
                >
                  <div
                    className="flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/7 p-4"
                    id="checkout-payment-note"
                  >
                    <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-primary/25 bg-background text-primary">
                      <Icon className="size-4" name="shield-check" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Do not enter real card details</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        This storefront does not tokenize these fields or send them to the selected
                        payment provider. The existing API retains only the final four number
                        digits in cart metadata; provider selection and payment behavior remain
                        controlled by the configured Medusa backend.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4">
                    <CheckoutField
                      aria-describedby="checkout-payment-note"
                      autoComplete="off"
                      label="Placeholder name"
                      name="cardName"
                    />
                    <CheckoutField
                      aria-describedby="checkout-payment-note"
                      autoComplete="off"
                      inputMode="numeric"
                      label="Placeholder number"
                      name="cardNumber"
                      placeholder="4242 4242 4242 4242"
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <CheckoutField
                        aria-describedby="checkout-payment-note"
                        autoComplete="off"
                        label="Expiry"
                        name="expiry"
                        placeholder="MM / YY"
                      />
                      <CheckoutField
                        aria-describedby="checkout-payment-note"
                        autoComplete="off"
                        inputMode="numeric"
                        label="CVC"
                        name="cvc"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </CheckoutPanel>

                {errorMessage ? (
                  <p
                    className="flex items-start gap-3 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm leading-6 text-danger"
                    id="checkout-form-error"
                    role="alert"
                  >
                    <Icon className="mt-1 size-4" name="x" />
                    {errorMessage}
                  </p>
                ) : null}

                <Button
                  className="hidden h-13 w-full lg:inline-flex"
                  disabled={submitDisabled}
                  type="submit"
                >
                  {isSubmitting ? "Creating Medusa order..." : "Submit order"}
                  {isSubmitting ? null : <Icon className="size-4" name="arrow-right" />}
                </Button>
                <p className="hidden text-center text-[0.68rem] leading-5 text-muted-foreground lg:block">
                  By continuing, you confirm you are of legal purchasing age in your location.
                </p>
              </form>
            </div>

            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/92 shadow-[0_-18px_50px_oklch(3%_0.01_255/0.5)] backdrop-blur-xl lg:hidden">
              <Container className="flex items-center gap-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    Current total
                  </p>
                  <p className="mt-0.5 truncate font-display text-lg font-semibold tabular-nums">
                    {formatMoney(cart.total, currencyCode)}
                  </p>
                </div>
                <Button
                  className="min-w-[11.5rem]"
                  disabled={submitDisabled}
                  form="checkout-form"
                  type="submit"
                >
                  {isSubmitting ? "Creating order..." : "Submit order"}
                </Button>
              </Container>
            </div>

            <span aria-live="polite" className="sr-only" role="status">
              {isSubmitting ? "Creating your Medusa order." : ""}
            </span>
          </>
        )}
      </Container>
    </>
  );
}

function CheckoutPanel({
  children,
  description,
  step,
  title,
}: {
  children: ReactNode;
  description: string;
  step: string;
  title: string;
}) {
  const titleId = `checkout-panel-${step}`;

  return (
    <section
      aria-labelledby={titleId}
      className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-[var(--shadow-soft)] sm:p-6"
    >
      <div className="flex items-start gap-4 border-b border-border pb-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/8 text-xs font-bold text-primary">
          {step}
        </span>
        <div>
          <h2 className="font-display text-2xl" id={titleId}>
            {title}
          </h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function CheckoutField({
  label,
  name,
  required = true,
  ...props
}: {
  label: string;
  name: string;
  required?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="grid gap-2">
      <label
        className="flex items-center justify-between gap-3 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-muted-foreground"
        htmlFor={name}
      >
        <span>{label}</span>
        {!required ? (
          <span className="text-[0.62rem] font-medium normal-case tracking-normal">Optional</span>
        ) : null}
      </label>
      <input className={inputClasses} id={name} name={name} required={required} {...props} />
    </div>
  );
}

function CheckoutSelect({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: CountryOption[];
}) {
  const defaultValue = options[0]?.value ?? "";

  return (
    <div className="grid gap-2">
      <label
        className="text-[0.68rem] font-bold uppercase tracking-[0.13em] text-muted-foreground"
        htmlFor={name}
      >
        {label}
      </label>
      <select className={inputClasses} defaultValue={defaultValue} id={name} name={name} required>
        {options.length === 0 ? (
          <option value="">No countries available for this region</option>
        ) : (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        )}
      </select>
    </div>
  );
}

function CheckoutSummary({
  cart,
  currencyCode,
}: {
  cart: CheckoutCart;
  currencyCode: string;
}) {
  const items = cart.items ?? [];
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const hasShippingMethod = Boolean(cart.shipping_methods?.length);
  const hasShippingAddress = Boolean(cart.shipping_address?.country_code);

  return (
    <aside
      aria-label="Order summary"
      className="rounded-2xl border border-border bg-surface-elevated shadow-[var(--shadow-soft)] lg:sticky lg:top-28 lg:col-start-2 lg:row-start-1"
    >
      <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
        <div>
          <Eyebrow>Order summary</Eyebrow>
          <h2 className="mt-1.5 font-display text-2xl">Your selection</h2>
        </div>
        <span className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-[0.68rem] font-semibold text-muted-foreground">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      <ul className="scrollbar-hide max-h-[23rem] divide-y divide-border overflow-y-auto px-5 sm:px-6">
        {items.map((item) => {
          const thumbnail =
            item.thumbnail ??
            item.product?.thumbnail ??
            "/assets/product-accessories-BrKIPgD4.jpg";
          const title = item.product_title ?? item.title ?? "Untitled product";
          const variantTitle = item.variant_title ?? item.variant?.title;

          return (
            <li className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 py-4" key={item.id}>
              <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-background">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,oklch(77%_0.155_68/0.1),transparent_65%)]"
                />
                <Image
                  alt={title}
                  className="object-contain p-1.5"
                  fill
                  sizes="72px"
                  src={thumbnail}
                />
              </div>
              <div className="flex min-w-0 flex-col justify-center">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-sm font-semibold leading-5">{title}</h3>
                    {variantTitle && variantTitle !== "Default" ? (
                      <p className="mt-0.5 truncate text-[0.7rem] text-muted-foreground">
                        {variantTitle}
                      </p>
                    ) : null}
                  </div>
                  <div className="shrink-0 text-right text-xs font-semibold tabular-nums">
                    {formatMoney((item.unit_price ?? 0) * item.quantity, currencyCode)}
                  </div>
                </div>
                <p className="mt-1 text-[0.68rem] text-muted-foreground">Qty {item.quantity}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-border p-5 sm:p-6">
        <dl className="space-y-3 text-sm">
          <SummaryRow label="Subtotal" value={formatMoney(cart.subtotal, currencyCode)} />
          <SummaryRow
            label="Shipping"
            value={
              hasShippingMethod
                ? formatMoney(cart.shipping_total, currencyCode)
                : "At order placement"
            }
          />
          <SummaryRow
            label="Taxes"
            value={
              hasShippingAddress ? formatMoney(cart.tax_total, currencyCode) : "At order placement"
            }
          />
          <SummaryRow
            label={hasShippingMethod && hasShippingAddress ? "Total" : "Current total"}
            strong
            value={formatMoney(cart.total, currencyCode)}
          />
        </dl>

        <div className="mt-5 space-y-3 rounded-xl border border-border bg-background/65 p-4">
          <SummaryFact icon="package" label="Creates a Medusa Admin order" />
          <SummaryFact icon="shield-check" label="Payment behavior controlled by the backend" />
        </div>
        <p className="mt-4 text-[0.68rem] leading-5 text-muted-foreground">
          The displayed total is the cart&apos;s current Medusa value. Shipping, tax, and the final
          total can update when the order is placed.
        </p>
      </div>
    </aside>
  );
}

function SummaryFact({
  icon,
  label,
}: {
  icon: "package" | "shield-check";
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
      <Icon className="size-3.5 text-primary" name={icon} />
      <span>{label}</span>
    </div>
  );
}

function CheckoutLoading() {
  return (
    <div aria-live="polite" className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_25rem]" role="status">
      <span className="sr-only">Loading checkout.</span>
      <div aria-hidden="true" className="space-y-5">
        {[0, 1, 2].map((item) => (
          <div className="rounded-2xl border border-border bg-surface-elevated p-6" key={item}>
            <div className="h-8 w-44 animate-pulse rounded-lg bg-secondary" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="h-12 animate-pulse rounded-xl bg-secondary" />
              <div className="h-12 animate-pulse rounded-xl bg-secondary" />
            </div>
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="h-[32rem] animate-pulse rounded-2xl border border-border bg-surface-elevated lg:col-start-2 lg:row-start-1" />
    </div>
  );
}

function CheckoutEmptyState({ error }: { error: string | null }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated px-6 py-20 text-center shadow-[var(--shadow-soft)] sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/7 blur-[90px]"
      />
      <div className="relative mx-auto grid size-16 place-items-center rounded-2xl border border-border bg-background shadow-[var(--glow)]">
        <Icon className="size-6 text-primary" name="shopping-bag" />
      </div>
      <h2 className="relative mt-6 font-display text-3xl font-semibold">There is nothing to check out yet.</h2>
      <p className="relative mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
        Add a product to your cart before entering delivery details.
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

function CheckoutConfirmation({
  order,
  paymentProviderId,
}: {
  order: PlacedOrder;
  paymentProviderId: string | null;
}) {
  const orderLabel = order.display_id ? `#${order.display_id}` : order.id;
  const itemCount = order.items?.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <Container className="py-12 md:py-20">
      <span aria-live="polite" className="sr-only" role="status">
        Order {orderLabel} was created successfully.
      </span>
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 shadow-[var(--shadow-soft)] sm:p-8 md:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8rem] top-[-10rem] size-80 rounded-full bg-primary/10 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <div>
            <div className="grid size-14 place-items-center rounded-2xl border border-primary/35 bg-primary/10 text-primary shadow-[var(--glow)]">
              <Icon className="size-6" name="check" />
            </div>
            <Eyebrow className="mt-7 text-primary">Order created / 03</Eyebrow>
            <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.04] sm:text-5xl">
              Order {orderLabel} is in Medusa.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
              The Store API completed this order and it should now appear in Medusa Admin. Payment
              state and provider behavior are controlled by the configured backend.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/products">
                Keep shopping
                <Icon className="size-4" name="arrow-right" />
              </ButtonLink>
              <ButtonLink href="/wishlist" variant="secondary">
                View wishlist
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background/70 p-5">
            <Eyebrow>Final order</Eyebrow>
            <dl className="mt-5 space-y-3 text-sm">
              <SummaryRow label="Subtotal" value={formatMoney(order.subtotal, order.currency_code)} />
              <SummaryRow label="Shipping" value={formatMoney(order.shipping_total, order.currency_code)} />
              <SummaryRow label="Taxes" value={formatMoney(order.tax_total, order.currency_code)} />
              <SummaryRow
                label="Final total"
                strong
                value={formatMoney(order.total, order.currency_code)}
              />
            </dl>
            <dl className="mt-5 space-y-3 border-t border-border pt-5 text-xs">
              <ConfirmationDetail label="Email" value={order.email ?? "Not provided"} />
              <ConfirmationDetail
                label="Items"
                value={`${itemCount} ${itemCount === 1 ? "item" : "items"}`}
              />
              {paymentProviderId ? (
                <ConfirmationDetail label="Selected provider" value={paymentProviderId} />
              ) : null}
            </dl>
          </div>
        </div>
      </div>
    </Container>
  );
}

function ConfirmationDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="break-all font-medium text-foreground">{value}</dd>
    </div>
  );
}

function SummaryRow({
  className,
  label,
  strong,
  value,
}: {
  className?: string;
  label: string;
  strong?: boolean;
  value: string;
}) {
  return (
    <div
      className={cx(
        strong
          ? "mt-5 flex items-end justify-between gap-4 border-t border-border pt-5"
          : "flex items-center justify-between gap-4",
        className,
      )}
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
