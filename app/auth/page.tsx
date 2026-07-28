import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { InfoPage } from "@/components/sections/info-page";
import { StatusNotice } from "@/components/sections/status-notice";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Sign-in status - DaVinci",
  description: "Authentication integration status for the DaVinci storefront.",
};

const unavailableFlows = [
  "Customer sign-in",
  "Account registration",
  "Password recovery",
  "Cross-device wishlist sync",
];

export default function AuthRoute() {
  return (
    <SiteShell>
      <InfoPage
        asideDescription="Shopping remains available without an account in the current storefront build."
        asideTitle="Shop as a guest"
        description="This route is ready for a future customer-authentication integration, but it does not pretend that one exists today."
        eyebrow="Authentication"
        links={[
          { href: "/account", label: "Account overview" },
          { href: "/wishlist", label: "Local wishlist" },
          { href: "/cart", label: "Shopping cart" },
          { href: "/products", label: "Browse products" },
        ]}
        title="Sign-in is not configured."
      >
        <StatusNotice
          actions={
            <>
              <ButtonLink href="/products">Continue shopping</ButtonLink>
              <ButtonLink href="/account" variant="secondary">
                Account overview
              </ButtonLink>
            </>
          }
          description="There are no authentication actions, session handlers, or customer-profile calls in this frontend. A login form would collect information without somewhere valid to send it, so none is shown."
          icon="lock"
          title="No sign-in service is connected."
        />

        <section aria-labelledby="unavailable-auth-title" className="mt-10">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-primary">
            Current capability
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold" id="unavailable-auth-title">
            Account flows remain inactive
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            These interfaces should only be enabled when the project supplies the matching backend
            behavior and validation.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {unavailableFlows.map((flow) => (
              <li
                className="flex min-h-16 items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold"
                key={flow}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-background text-muted-foreground">
                  <Icon className="size-4" name="x" />
                </span>
                <span>{flow}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-l border-primary/50 pl-4 text-sm leading-7 text-muted-foreground">
            The wishlist continues to work locally in this browser. It is not associated with a
            customer identity or synchronized between devices.
          </p>
        </section>
      </InfoPage>
    </SiteShell>
  );
}
