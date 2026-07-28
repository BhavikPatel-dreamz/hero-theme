import type { Metadata } from "next";
import { CheckoutPage } from "@/components/checkout/checkout-page";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Checkout - DaVinci",
  description:
    "Complete an order through the payment provider selected by the configured Medusa backend.",
};

export default function CheckoutRoute() {
  return (
    <SiteShell>
      <CheckoutPage />
    </SiteShell>
  );
}
