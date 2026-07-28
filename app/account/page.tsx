import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { InfoPage } from "@/components/sections/info-page";
import { StatusNotice } from "@/components/sections/status-notice";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/types/site";

export const metadata: Metadata = {
  title: "Account - DaVinci",
  description: "Account integration status and locally available shopping tools.",
};

const accountDestinations: Array<{
  detail: string;
  href: string;
  icon: IconName;
  label: string;
  status: string;
}> = [
  {
    detail: "Products you save remain in this browser until you clear them or site data.",
    href: "/wishlist",
    icon: "heart",
    label: "Wishlist",
    status: "Stored locally",
  },
  {
    detail: "View the items and totals in the cart associated with this browser.",
    href: "/cart",
    icon: "shopping-bag",
    label: "Shopping cart",
    status: "Available",
  },
  {
    detail: "No authenticated order-retrieval service is connected to this storefront.",
    href: "/account/orders",
    icon: "package",
    label: "Order history",
    status: "Not connected",
  },
];

export default function AccountRoute() {
  return (
    <SiteShell>
      <InfoPage
        asideDescription="These routes explain which account features are available in the current frontend build."
        asideTitle="Account routes"
        description="Use the shopping tools available on this device, with a clear view of what is—and is not—connected to an account."
        eyebrow="Account overview"
        links={[
          { href: "/auth", label: "Authentication status" },
          { href: "/account/orders", label: "Order history status" },
          { href: "/wishlist", label: "Open wishlist" },
          { href: "/cart", label: "View cart" },
        ]}
        title="Your storefront, without false promises."
      >
        <StatusNotice
          actions={
            <>
              <ButtonLink href="/products">Browse products</ButtonLink>
              <ButtonLink href="/auth" variant="secondary">
                View sign-in status
              </ButtonLink>
            </>
          }
          description="No authentication service or customer-profile endpoint is present in this project. This page therefore does not display a fabricated profile, addresses, or account controls."
          icon="user"
          title="Account services are not connected."
        />

        <section aria-labelledby="available-tools-title" className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-primary">
                Current browser
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold" id="available-tools-title">
                Available shopping tools
              </h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {accountDestinations.map((destination) => (
              <Link
                className="group flex min-h-64 flex-col rounded-[var(--radius)] border border-border bg-surface p-5 transition-[background,border-color,transform] hover:-translate-y-0.5 hover:border-primary/45 hover:bg-background sm:p-6"
                href={destination.href}
                key={destination.href}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-elevated text-primary">
                    <Icon className="size-5" name={destination.icon} />
                  </span>
                  <span className="text-right text-[0.62rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    {destination.status}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold">{destination.label}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {destination.detail}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold transition-colors group-hover:text-primary">
                  Open
                  <Icon className="size-4" name="arrow-up-right" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </InfoPage>
    </SiteShell>
  );
}
