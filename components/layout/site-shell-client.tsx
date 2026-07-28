"use client";

import type { ReactNode } from "react";
import { CartProvider, useCart } from "@/components/cart/cart-provider";
import { AgeGate } from "@/components/layout/age-gate";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { WishlistProvider, useWishlist } from "@/components/wishlist/wishlist-provider";

export type NavigationLink = {
  detail?: string;
  href: string;
  label: string;
};

type SiteShellClientProps = {
  categoryLinks: NavigationLink[];
  children: ReactNode;
  collectionLinks: NavigationLink[];
};

export function SiteShellClient({
  categoryLinks,
  children,
  collectionLinks,
}: SiteShellClientProps) {
  return (
    <CartProvider>
      <WishlistProvider>
        <SiteShellContent categoryLinks={categoryLinks} collectionLinks={collectionLinks}>
          {children}
        </SiteShellContent>
      </WishlistProvider>
    </CartProvider>
  );
}

function SiteShellContent({
  categoryLinks,
  children,
  collectionLinks,
}: SiteShellClientProps) {
  const { closeCart, isCartOpen, itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div aria-hidden="true" className="site-noise pointer-events-none fixed inset-0 z-[90] opacity-[0.018]" />
      <Navbar
        cartCount={itemCount}
        categoryLinks={categoryLinks}
        collectionLinks={collectionLinks}
        onCartOpen={openCart}
        wishlistCount={wishlistCount}
      />
      <main className="relative flex-1" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer categoryLinks={categoryLinks.slice(0, 6)} />
      <CartDrawer onClose={closeCart} open={isCartOpen} />
      <AgeGate />
    </div>
  );
}
