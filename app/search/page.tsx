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
  title: "Search - DaVinci",
  description: "Search the DaVinci storefront catalog.",
};

type SearchRouteProps = {
  searchParams: Promise<PageSearchParams>;
};

export default async function SearchRoute({ searchParams }: SearchRouteProps) {
  const page = getPageFromSearchParams(await searchParams);
  const { catalogAvailable, count, products } = await listAllProducts()
    .then((catalog) => ({ ...catalog, catalogAvailable: true }))
    .catch(() => ({ catalogAvailable: false, count: 0, products: [] }));

  return (
    <SiteShell>
      <ProductListingPage
        basePath="/search"
        count={count}
        description="Search products, categories, collections, and tags from the current catalog."
        emptyMessage={
          catalogAvailable
            ? "No products match that search."
            : "The connected catalog is temporarily unavailable. Please try again shortly."
        }
        eyebrow="Search"
        limit={PRODUCT_PAGE_SIZE}
        offset={getOffsetFromPage(page)}
        products={products}
        title="Search"
      />
    </SiteShell>
  );
}
