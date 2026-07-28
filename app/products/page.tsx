import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ProductListingPage } from "@/components/sections/product-listing-page";
import { listAllProducts } from "@/lib/medusa";
import {
  getOffsetFromPage,
  getPageFromSearchParams,
  PRODUCT_PAGE_SIZE,
  type PageSearchParams,
} from "@/lib/pagination";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products \u2014 DaVinci",
  description: "Browse every product from the Medusa catalog.",
};

type ProductsRouteProps = {
  searchParams: Promise<PageSearchParams>;
};

export default async function ProductsRoute({ searchParams }: ProductsRouteProps) {
  const page = getPageFromSearchParams(await searchParams);
  const { catalogAvailable, count, products } = await listAllProducts()
    .then((catalog) => ({ ...catalog, catalogAvailable: true }))
    .catch(() => ({ catalogAvailable: false, count: 0, products: [] }));

  return (
    <SiteShell>
      <ProductListingPage
        basePath="/products"
        count={count}
        description="Browse every product from the Medusa catalog."
        emptyMessage={
          catalogAvailable
            ? "No products are available yet."
            : "The connected catalog is temporarily unavailable. Please try again shortly."
        }
        eyebrow="Shop"
        limit={PRODUCT_PAGE_SIZE}
        offset={getOffsetFromPage(page)}
        products={products}
        title="Products"
      />
    </SiteShell>
  );
}
