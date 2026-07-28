"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  useRef,
  useState,
} from "react";
import type { NavigationLink } from "@/components/layout/site-shell-client";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useDialogFocus } from "@/hooks/use-dialog-focus";
import { navItems } from "@/lib/data";

type NavbarProps = {
  cartCount: number;
  categoryLinks: NavigationLink[];
  collectionLinks: NavigationLink[];
  onCartOpen: () => void;
  wishlistCount: number;
};

const fallbackShopLinks: NavigationLink[] = [
  { detail: "Full catalog", href: "/products", label: "All products" },
  { detail: "Browse taxonomy", href: "/categories", label: "Categories" },
  { detail: "Curated ranges", href: "/collections", label: "Collections" },
];

export function Navbar({
  cartCount,
  categoryLinks,
  collectionLinks,
  onCartOpen,
  wishlistCount,
}: NavbarProps) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const shopLinks = categoryLinks.length > 0 ? categoryLinks : fallbackShopLinks;

  function openSearchFromMenu() {
    setMenuOpen(false);
    setSearchOpen(true);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/88 shadow-[0_10px_40px_oklch(3%_0.01_255/0.32)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/78">
      <AnnouncementBar />
      <Container className="grid h-[4.5rem] grid-cols-[auto_1fr_auto] items-center gap-5">
        <div className="flex items-center gap-9">
          <Logo />
          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            <div
              className="relative"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setMegaMenuOpen(false);
                }
              }}
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                onClick={() => setMegaMenuOpen((open) => !open)}
                type="button"
              >
                Shop
                <Icon
                  className={`size-3.5 transition-transform ${megaMenuOpen ? "rotate-180" : ""}`}
                  name="chevron-down"
                />
              </button>
              {megaMenuOpen ? (
                <MegaMenu
                  categoryLinks={shopLinks}
                  collectionLinks={collectionLinks}
                  onNavigate={() => setMegaMenuOpen(false)}
                />
              ) : null}
            </div>
            {navItems.map((item) => (
              <Link
                className="inline-flex min-h-11 items-center rounded-lg px-3 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div />

        <div className="flex items-center gap-0.5 sm:gap-1">
          <HeaderAction className="hidden sm:grid" label="Search" onClick={() => setSearchOpen(true)}>
            <Icon className="size-[1.05rem]" name="search" />
          </HeaderAction>
          <Link
            aria-label="Account"
            className="hidden size-11 place-items-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground sm:grid"
            href="/account"
          >
            <Icon className="size-[1.05rem]" name="user" />
          </Link>
          <Link
            aria-label={`Wishlist, ${wishlistCount} items`}
            className="relative grid size-11 place-items-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground"
            href="/wishlist"
          >
            <Icon className="size-[1.05rem]" name="heart" />
            <CountBadge count={wishlistCount} />
          </Link>
          <HeaderAction label={`Cart, ${cartCount} items`} onClick={onCartOpen}>
            <Icon className="size-[1.05rem]" name="shopping-bag" />
            <CountBadge count={cartCount} />
          </HeaderAction>
          <HeaderAction
            className="lg:hidden"
            expanded={menuOpen}
            label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Icon className="size-[1.1rem]" name="menu" />
          </HeaderAction>
        </div>
      </Container>

      <MobileNavigation
        categoryLinks={shopLinks}
        collectionLinks={collectionLinks}
        onClose={() => setMenuOpen(false)}
        onSearchOpen={openSearchFromMenu}
        open={menuOpen}
      />
      <SearchOverlay
        categoryLinks={shopLinks.slice(0, 5)}
        onClose={() => setSearchOpen(false)}
        open={searchOpen}
      />
    </header>
  );
}

function HeaderAction({
  children,
  className = "",
  expanded,
  label,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  expanded?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-expanded={expanded}
      aria-label={label}
      className={`relative grid size-11 place-items-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground ${className}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function CountBadge({ count }: { count: number }) {
  if (count <= 0) {
    return null;
  }

  return (
    <span className="absolute right-0.5 top-0.5 grid min-w-[1.05rem] place-items-center rounded-md bg-primary px-1 text-[0.58rem] font-bold leading-[1.05rem] text-primary-foreground">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function MegaMenu({
  categoryLinks,
  collectionLinks,
  onNavigate,
}: {
  categoryLinks: NavigationLink[];
  collectionLinks: NavigationLink[];
  onNavigate: () => void;
}) {
  return (
    <div className="absolute left-0 top-full w-[min(58rem,calc(100vw-5rem))] pt-3">
      <div className="glass-panel overflow-hidden rounded-2xl p-7">
        <div className="grid gap-8 lg:grid-cols-[1.45fr_0.75fr]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-primary">
                Categories
              </span>
              <Link
                className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                href="/categories"
                onClick={onNavigate}
              >
                View all
              </Link>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-x-7 gap-y-1">
              {categoryLinks.slice(0, 10).map((link) => (
                <Link
                  className="group flex min-h-14 items-center justify-between gap-3 border-b border-border py-2 text-sm font-semibold transition-colors hover:text-primary"
                  href={link.href}
                  key={link.href}
                  onClick={onNavigate}
                >
                  <span className="min-w-0">
                    <span className="block truncate">{link.label}</span>
                    {link.detail ? (
                      <span className="mt-0.5 block text-[0.7rem] font-normal text-muted-foreground">
                        {link.detail}
                      </span>
                    ) : null}
                  </span>
                  <Icon className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" name="arrow-up-right" />
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background/70 p-5">
            <span className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-primary">
              Collections
            </span>
            <div className="mt-4 space-y-1">
              {(collectionLinks.length > 0 ? collectionLinks : fallbackShopLinks)
                .slice(0, 5)
                .map((link) => (
                  <Link
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    href={link.href}
                    key={link.href}
                    onClick={onNavigate}
                  >
                    <span className="truncate">{link.label}</span>
                    <Icon className="size-3.5" name="arrow-right" />
                  </Link>
                ))}
            </div>
            <Link
              className="mt-5 flex min-h-11 items-center justify-between rounded-lg border border-primary/25 bg-primary/8 px-4 text-xs font-bold uppercase tracking-[0.12em] text-primary transition-colors hover:bg-primary/12"
              href="/products"
              onClick={onNavigate}
            >
              Shop the full catalog
              <Icon className="size-4" name="arrow-up-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNavigation({
  categoryLinks,
  collectionLinks,
  onClose,
  onSearchOpen,
  open,
}: {
  categoryLinks: NavigationLink[];
  collectionLinks: NavigationLink[];
  onClose: () => void;
  onSearchOpen: () => void;
  open: boolean;
}) {
  const dialogRef = useDialogFocus<HTMLDivElement>({ onClose, open });
  useBodyScrollLock(open);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-label="Mobile navigation"
      aria-modal="true"
      className="fixed inset-0 z-50 animate-[fade-in_180ms_ease-out_both] overflow-y-auto bg-background"
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      <Container className="flex min-h-full flex-col py-5">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <Logo />
          <Button aria-label="Close menu" className="size-11 px-0 py-0" onClick={onClose} type="button" variant="ghost">
            <Icon className="size-5" name="x" />
          </Button>
        </div>

        <button
          className="mt-6 flex min-h-14 w-full items-center gap-3 rounded-xl border border-border bg-surface px-4 text-left text-sm text-muted-foreground"
          onClick={onSearchOpen}
          type="button"
        >
          <Icon className="size-4" name="search" />
          Search the catalog
        </button>

        <nav aria-label="Mobile primary navigation" className="py-6">
          <div className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-primary">
            Explore
          </div>
          <div className="mt-3 divide-y divide-border border-y border-border">
            {[...navItems, { href: "/account", label: "Account" }].map(
              (item) => (
                <Link
                  className="flex min-h-14 items-center justify-between text-lg font-semibold"
                  href={item.href}
                  key={item.href}
                  onClick={onClose}
                >
                  {item.label}
                  <Icon className="size-4 text-muted-foreground" name="arrow-up-right" />
                </Link>
              ),
            )}
          </div>
        </nav>

        <div className="grid gap-7 pb-8 sm:grid-cols-2">
          <MobileLinkGroup links={categoryLinks.slice(0, 8)} onNavigate={onClose} title="Categories" />
          <MobileLinkGroup
            links={(collectionLinks.length > 0 ? collectionLinks : fallbackShopLinks).slice(0, 6)}
            onNavigate={onClose}
            title="Collections"
          />
        </div>
        <p className="mt-auto border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
          This storefront is intended only for adults of legal purchasing age.
        </p>
      </Container>
    </div>
  );
}

function MobileLinkGroup({
  links,
  onNavigate,
  title,
}: {
  links: NavigationLink[];
  onNavigate: () => void;
  title: string;
}) {
  return (
    <div>
      <div className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-primary">
        {title}
      </div>
      <div className="mt-3 grid gap-1">
        {links.map((link) => (
          <Link
            className="rounded-lg py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            href={link.href}
            key={link.href}
            onClick={onNavigate}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SearchOverlay({
  categoryLinks,
  onClose,
  open,
}: {
  categoryLinks: NavigationLink[];
  onClose: () => void;
  open: boolean;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const dialogRef = useDialogFocus<HTMLDivElement>({ initialFocusRef: inputRef, onClose, open });

  useBodyScrollLock(open);

  if (!open) {
    return null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
    onClose();
  }

  function handleBackdropClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      aria-labelledby="search-dialog-title"
      aria-modal="true"
      className="fixed inset-0 z-[70] animate-[fade-in_180ms_ease-out_both] overflow-y-auto bg-overlay px-4 py-4 backdrop-blur-xl sm:px-6 sm:py-8"
      onMouseDown={handleBackdropClick}
      role="dialog"
    >
      <div
        className="glass-panel mx-auto flex min-h-[min(42rem,calc(100svh-2rem))] max-w-4xl flex-col rounded-2xl p-5 sm:p-8"
        ref={dialogRef}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div>
            <span className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-primary">
              Catalog search
            </span>
            <h2 className="mt-1 font-display text-xl" id="search-dialog-title">
              What are you looking for?
            </h2>
          </div>
          <Button aria-label="Close search" className="size-11 px-0 py-0" onClick={onClose} type="button" variant="ghost">
            <Icon className="size-5" name="x" />
          </Button>
        </div>

        <form className="mt-10" onSubmit={handleSubmit} role="search">
          <label className="sr-only" htmlFor="site-search">
            Search products
          </label>
          <div className="flex items-center gap-4 border-b border-primary/40 pb-5 focus-within:border-primary">
            <Icon className="size-6 text-primary" name="search" />
            <input
              className="min-w-0 flex-1 bg-transparent font-display text-3xl text-foreground outline-none placeholder:text-muted-foreground sm:text-5xl"
              id="site-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              ref={inputRef}
              type="search"
              value={query}
            />
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>Search names, categories, collections, and catalog tags.</span>
            <button className="font-bold uppercase tracking-[0.12em] text-primary" type="submit">
              Search
            </button>
          </div>
        </form>

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_15rem]">
          <div>
            <div className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Browse categories
            </div>
            <div className="mt-4 divide-y divide-border border-y border-border">
              {query.trim() ? (
                <Link
                  className="group flex min-h-14 items-center justify-between gap-4 text-sm font-semibold transition-colors hover:text-primary"
                  href={`/search?q=${encodeURIComponent(query.trim())}`}
                  onClick={onClose}
                >
                  Search for &quot;{query.trim()}&quot;
                  <Icon className="size-4 transition-transform group-hover:translate-x-1" name="arrow-right" />
                </Link>
              ) : null}
              {categoryLinks.map((link) => (
                <Link
                  className="group flex min-h-14 items-center justify-between gap-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  href={link.href}
                  key={link.href}
                  onClick={onClose}
                >
                  {link.label}
                  <Icon className="size-4 transition-transform group-hover:translate-x-1" name="arrow-up-right" />
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background/65 p-5 text-sm text-muted-foreground">
            <Icon className="size-5 text-primary" name="sliders-horizontal" />
            <h3 className="mt-5 font-display text-lg text-foreground">Refine after searching</h3>
            <p className="mt-2 leading-6">
              Use live catalog filters for availability, category, collection, price order, and status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
