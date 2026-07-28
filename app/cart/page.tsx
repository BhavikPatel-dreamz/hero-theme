import type { Metadata } from "next";
import { CartPage } from "@/components/cart/cart-page";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Cart - DaVinci",
  description: "Review live products and current totals in your Medusa-backed DaVinci cart.",
};

export default function CartRoute() {
  return (
    <SiteShell>
      <CartPage />
    </SiteShell>
  );
}
