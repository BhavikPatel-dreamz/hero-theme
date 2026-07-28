import type { ReactNode } from "react";
import Link from "next/link";
import { PageIntro } from "@/components/sections/page-intro";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

type InfoPageLink = {
  href: string;
  label: string;
};

type InfoPageProps = {
  asideDescription?: string;
  asideTitle?: string;
  children?: ReactNode;
  description: string;
  eyebrow: string;
  links?: InfoPageLink[];
  title: string;
};

const defaultLinks: InfoPageLink[] = [
  { href: "/products", label: "Browse products" },
  { href: "/categories", label: "Shop categories" },
  { href: "/faq", label: "Read the FAQ" },
  { href: "/contact", label: "Contact status" },
];

export function InfoPage({
  asideDescription = "Move between the store's live catalog and its customer-information pages.",
  asideTitle = "Continue exploring",
  children,
  description,
  eyebrow,
  links = defaultLinks,
  title,
}: InfoPageProps) {
  return (
    <>
      <PageIntro description={description} eyebrow={eyebrow} title={title} />
      <Container className="py-10 sm:py-12 lg:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] xl:gap-12">
          <div className="min-w-0 rounded-[var(--radius)] border border-border bg-surface-elevated p-5 shadow-[var(--shadow-soft)] sm:p-8 lg:p-10">
            {children}
          </div>

          <aside className="overflow-hidden rounded-[var(--radius)] border border-border bg-surface lg:sticky lg:top-32">
            <div className="border-b border-border p-5 sm:p-6">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-primary">
                Useful next steps
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold">{asideTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {asideDescription}
              </p>
            </div>
            <nav aria-label="Related pages" className="divide-y divide-border">
              {links.map((link) => (
                <Link
                  className="group flex min-h-14 items-center justify-between gap-4 px-5 py-4 text-sm font-semibold transition-colors hover:bg-surface-elevated hover:text-primary sm:px-6"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                  <Icon
                    className="size-4 text-muted-foreground transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-primary"
                    name="arrow-up-right"
                  />
                </Link>
              ))}
            </nav>
            <p className="border-t border-border px-5 py-5 text-xs leading-6 text-muted-foreground sm:px-6">
              Adult-use storefront. Follow the purchasing-age rules that apply where you live.
            </p>
          </aside>
        </div>
      </Container>
    </>
  );
}
