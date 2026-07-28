import Link from "next/link";
import type { NavigationLink } from "@/components/layout/site-shell-client";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/section-title";

const serviceLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/policies/shipping", label: "Shipping" },
  { href: "/policies/returns", label: "Returns" },
];

const accountLinks = [
  { href: "/account", label: "Account" },
  { href: "/account/orders", label: "Order history" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/cart", label: "Cart" },
];

const legalLinks = [
  { href: "/policies/privacy", label: "Privacy" },
  { href: "/policies/terms", label: "Terms" },
  { href: "/policies/accessibility", label: "Accessibility" },
  { href: "/policies/age", label: "Age policy" },
];

function FooterGroup({
  links,
  title,
}: {
  links: Array<{ href: string; label: string }>;
  title: string;
}) {
  return (
    <div>
      <Eyebrow className="mb-5 text-foreground">{title}</Eyebrow>
      <ul className="space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="text-muted-foreground transition-colors hover:text-primary"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ categoryLinks }: { categoryLinks: NavigationLink[] }) {
  const shopLinks =
    categoryLinks.length > 0
      ? categoryLinks
      : [
          { href: "/products", label: "All products" },
          { href: "/categories", label: "Categories" },
          { href: "/collections", label: "Collections" },
        ];

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-border bg-surface md:mt-28">
      <div aria-hidden="true" className="absolute -right-32 -top-44 size-[28rem] rounded-full bg-primary/[0.055] blur-3xl" />
      <Container className="relative py-14 md:py-20">
        <div className="grid gap-12 border-b border-border pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <Logo className="text-2xl" />
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              A premium catalog experience for adults of legal purchasing age. Product details,
              prices, variants, and availability come from the current commerce catalog.
            </p>
            <Link
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-foreground"
              href="/about"
            >
              About the storefront
              <Icon className="size-4" name="arrow-up-right" />
            </Link>
          </div>
          <FooterNewsletter />
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <FooterGroup links={shopLinks} title="Shop" />
          <FooterGroup links={serviceLinks} title="Customer care" />
          <FooterGroup links={accountLinks} title="Account" />
          <FooterGroup links={legalLinks} title="Legal" />
        </div>

        <div className="grid gap-6 border-t border-border pt-7 text-xs text-muted-foreground md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-3xl leading-6">
            Age restricted. You must meet the legal purchasing age in your jurisdiction to enter
            or purchase. Keep age-restricted products away from children and pets. Frontend age
            confirmation does not replace identity or legal-compliance checks.
          </p>
          <div className="md:text-right">
            <div className="font-semibold text-foreground">© 2026 DaVinci</div>
            <div className="mt-1">Catalog and checkout powered by the existing store backend.</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
