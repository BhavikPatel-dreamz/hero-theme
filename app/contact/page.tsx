import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { InfoPage } from "@/components/sections/info-page";
import { StatusNotice } from "@/components/sections/status-notice";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/types/site";

export const metadata: Metadata = {
  title: "Contact status - DaVinci",
  description: "Support-channel status and self-service information for the storefront.",
};

const preparationNotes: Array<{ body: string; icon: IconName; title: string }> = [
  {
    body: "Keep the order number shown by checkout. This frontend cannot retrieve it after the checkout view is left.",
    icon: "package",
    title: "Order reference",
  },
  {
    body: "Record the product name, selected variant, and the page where you saw the issue.",
    icon: "shopping-bag",
    title: "Product details",
  },
  {
    body: "Never include passwords or full payment credentials in a support message.",
    icon: "shield-check",
    title: "Sensitive details",
  },
];

export default function ContactRoute() {
  return (
    <SiteShell>
      <InfoPage
        asideDescription="Use the available self-service pages while a real merchant support channel is pending."
        asideTitle="Self-service options"
        description="A support page should send messages somewhere real. This build has no contact endpoint or verified merchant contact details, so it does not display a non-functional form."
        eyebrow="Contact"
        links={[
          { href: "/faq", label: "Frequently asked questions" },
          { href: "/policies/shipping", label: "Shipping information" },
          { href: "/policies/returns", label: "Returns information" },
          { href: "/account/orders", label: "Order-history status" },
        ]}
        title="Support needs a real destination."
      >
        <StatusNotice
          actions={<ButtonLink href="/faq">Read the FAQ</ButtonLink>}
          description="The project does not supply a contact API, support email address, phone number, postal address, or live-chat integration. No message is collected or submitted from this page."
          icon="mail"
          title="Contact is not connected yet."
        />

        <section aria-labelledby="support-preparation-title" className="mt-10">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-primary">
            Before contacting the merchant
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold" id="support-preparation-title">
            Details worth keeping nearby
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Once the merchant publishes a verified support channel, these details can help make a
            request easier to understand.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {preparationNotes.map((note) => (
              <article
                className="rounded-[var(--radius)] border border-border bg-surface p-5 sm:p-6"
                key={note.title}
              >
                <span className="grid size-10 place-items-center rounded-xl border border-border bg-background text-primary">
                  <Icon className="size-5" name={note.icon} />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold">{note.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{note.body}</p>
              </article>
            ))}
          </div>
        </section>
      </InfoPage>
    </SiteShell>
  );
}
