import type { ReactNode } from "react";
import { SiteShellClient, type NavigationLink } from "@/components/layout/site-shell-client";
import { listCategories, listCollections } from "@/lib/medusa";

export async function SiteShell({ children }: { children: ReactNode }) {
  const [categories, collections] = await Promise.all([
    listCategories().catch(() => []),
    listCollections().catch(() => []),
  ]);
  const categoryLinks: NavigationLink[] = categories.slice(0, 12).map((category) => ({
    detail: category.productCount ? `${category.productCount} products` : undefined,
    href: `/categories/${category.handle}`,
    label: category.name,
  }));
  const collectionLinks: NavigationLink[] = collections.slice(0, 6).map((collection) => ({
    detail: collection.productCount ? `${collection.productCount} products` : collection.tagline,
    href: `/collections/${collection.handle}`,
    label: collection.name,
  }));

  return (
    <SiteShellClient categoryLinks={categoryLinks} collectionLinks={collectionLinks}>
      {children}
    </SiteShellClient>
  );
}
