import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { EmptyState } from "@/components/sections/empty-state";
import { InfoPage } from "@/components/sections/info-page";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order history status - DaVinci",
  description: "Order-history integration status for the DaVinci storefront.",
};

export default function OrdersRoute() {
  return (
    <SiteShell>
      <InfoPage
        asideDescription="No customer identity or order-retrieval call is made from this route."
        asideTitle="Account status"
        description="A genuine order history needs authenticated customer data and a retrieval endpoint. Neither is connected in this frontend build."
        eyebrow="Account / orders"
        links={[
          { href: "/account", label: "Account overview" },
          { href: "/auth", label: "Authentication status" },
          { href: "/cart", label: "Current cart" },
          { href: "/faq", label: "Order FAQ" },
        ]}
        title="No order history is available."
      >
        <EmptyState
          action={
            <>
              <ButtonLink href="/products">Browse products</ButtonLink>
              <ButtonLink href="/account" variant="secondary">
                Back to account
              </ButtonLink>
            </>
          }
          className="min-h-[28rem] shadow-none"
          description="The existing checkout can display the order it receives immediately after placement, but this project has no authenticated service for retrieving past orders later. No sample order rows are shown."
          eyebrow="Integration not connected"
          icon="package"
          title="Past orders cannot be retrieved."
        />
        <p className="mt-6 border-l border-primary/50 pl-4 text-sm leading-7 text-muted-foreground">
          Keep the confirmation shown at checkout. A production order-history page should only be
          enabled after secure customer authentication and order ownership checks are available.
        </p>
      </InfoPage>
    </SiteShell>
  );
}
