import Link from "next/link";
import { ProductCard } from "@/components/sections/product-card";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionTitle } from "@/components/ui/section-title";
import { listProducts } from "@/lib/medusa";

export async function ProductsSection() {
  const { products } = await listProducts({ limit: 20 }).catch(() => ({ products: [] }));
  const flaggedBestsellers = products.filter((product) =>
    product.statusFlags.includes("bestseller"),
  );
  const flaggedFeatured = products.filter((product) => product.statusFlags.includes("featured"));
  const bestsellers = (
    flaggedBestsellers.length > 0
      ? flaggedBestsellers
      : flaggedFeatured.length > 0
        ? flaggedFeatured
        : products
  ).slice(0, 4);
  const bestsellerIds = new Set(bestsellers.map((product) => product.id));
  const flaggedNew = products.filter((product) => product.statusFlags.includes("new"));
  const newestByDate = [...products].sort((first, second) => {
    const firstDate = first.createdAt ? Date.parse(first.createdAt) : 0;
    const secondDate = second.createdAt ? Date.parse(second.createdAt) : 0;
    return secondDate - firstDate;
  });
  const newArrivals = (flaggedNew.length > 0 ? flaggedNew : newestByDate)
    .filter((product) => !bestsellerIds.has(product.id))
    .slice(0, 4);
  const primaryEyebrow =
    flaggedBestsellers.length > 0
      ? "Bestsellers"
      : flaggedFeatured.length > 0
        ? "Featured products"
        : "From the catalog";

  return (
    <section className="border-y border-border bg-surface">
      <Container className="py-24 md:py-32 lg:py-36">
        <SectionTitle
          action={<CatalogLink href="/products">Shop all products</CatalogLink>}
          className="mb-12 lg:mb-14"
          eyebrow={primaryEyebrow}
          title="A focused edit from the current catalog."
        />
        {bestsellers.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 min-[460px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {bestsellers.map((product, index) => (
              <ProductCard index={index} key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <CatalogUnavailable />
        )}

        {newArrivals.length > 0 ? (
          <div className="mt-20 border-t border-border pt-14 md:mt-24 md:pt-16">
            <SectionTitle
              action={<CatalogLink href="/products?sort=new">View new arrivals</CatalogLink>}
              className="mb-12"
              eyebrow={flaggedNew.length > 0 ? "New arrivals" : "Recently added"}
              title="Fresh additions, straight from the catalog."
              titleClassName="text-3xl sm:text-4xl lg:text-5xl"
            />
            <div className="grid grid-cols-1 gap-5 min-[460px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {newArrivals.map((product, index) => (
                <ProductCard index={index} key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function CatalogLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      className="inline-flex min-h-11 items-center gap-2 border-b border-border text-xs font-bold uppercase tracking-[0.13em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      href={href}
    >
      {children}
      <Icon className="size-4" name="arrow-up-right" />
    </Link>
  );
}

function CatalogUnavailable() {
  return (
    <div className="rounded-2xl border border-border bg-background/70 p-8 text-sm leading-6 text-muted-foreground">
      Products will appear here when the existing storefront catalog is available.
    </div>
  );
}
