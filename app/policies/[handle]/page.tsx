import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { InfoPage } from "@/components/sections/info-page";
import { StatusNotice } from "@/components/sections/status-notice";

type PolicyDefinition = {
  description: string;
  notice: string;
  sections: Array<{
    body: string[];
    title: string;
  }>;
  title: string;
};

const policies: Record<string, PolicyDefinition> = {
  accessibility: {
    title: "Accessibility",
    description: "How this frontend approaches an inclusive, keyboard-friendly shopping experience.",
    notice:
      "A verified accessibility-support contact is not supplied by this project. The contact page explains that limitation instead of publishing an unconfirmed channel.",
    sections: [
      {
        title: "Frontend approach",
        body: [
          "The storefront uses semantic page landmarks, a skip link, visible focus styles, descriptive controls, and layouts designed to adapt across screen sizes.",
          "Interactive disclosures and navigation controls are intended to remain keyboard operable, while motion is reduced when the browser requests reduced motion.",
        ],
      },
      {
        title: "Ongoing responsibility",
        body: [
          "Accessibility depends on the complete deployed experience, including catalog content, third-party services, and future integrations. Those areas should be tested before production release.",
        ],
      },
    ],
  },
  age: {
    title: "Age policy",
    description: "The current frontend access notice for an adult-only storefront.",
    notice:
      "The age screen is a frontend notice. It does not replace identity checks, delivery controls, or any other compliance required in the shopper's jurisdiction.",
    sections: [
      {
        title: "Adult access",
        body: [
          "This storefront is intended only for adults of legal purchasing age. The current access screen asks visitors to confirm that they are at least 21 or meet the legal purchasing age where they live.",
          "Products and product imagery are not intended for minors. Age-restricted products should be kept away from children and pets.",
        ],
      },
      {
        title: "Browser confirmation",
        body: [
          "After confirmation, the existing frontend stores an age-confirmation cookie in the browser for 30 days. Removing that cookie causes the access notice to appear again.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy summary",
    description: "A plain-language summary of data behavior visible in this frontend codebase.",
    notice:
      "This summary is not a complete production privacy notice. The project does not provide the merchant identity, retention schedule, processor list, legal bases, or privacy-contact details needed for one.",
    sections: [
      {
        title: "Data kept in this browser",
        body: [
          "Wishlist products are stored in local browser storage and are not tied to a customer account. Clearing the wishlist or site data removes them.",
          "Age confirmation is stored in a first-party browser cookie for 30 days. A separate HTTP-only cart identifier cookie is also configured for 30 days so the existing backend can retrieve the active cart.",
        ],
      },
      {
        title: "Checkout data",
        body: [
          "When checkout is submitted, the existing checkout route receives the customer and address fields required by that flow and passes them into the connected commerce order process.",
          "No customer-authentication or profile service is connected in this frontend build.",
        ],
      },
      {
        title: "Production information still required",
        body: [
          "Before deployment, the merchant should publish accurate information about who controls customer data, why it is processed, where it is sent, how long it is retained, and how a customer can make a privacy request.",
        ],
      },
    ],
  },
  returns: {
    title: "Returns information",
    description: "What the current project does—and does not—establish about returns.",
    notice:
      "The codebase does not supply a verified return window, item-eligibility rules, fees, return address, or support workflow. This page does not invent those terms.",
    sections: [
      {
        title: "No published return promise",
        body: [
          "Return eligibility cannot be determined from this frontend. A merchant-approved return policy and working support channel are required before specific return promises can be shown.",
          "Do not send an item to an address taken from unverified material. Use only contact and return instructions published by the merchant once those details are configured.",
        ],
      },
      {
        title: "Information to retain",
        body: [
          "Keep the order confirmation and relevant product details after checkout. The current storefront does not provide authenticated order-history retrieval after the checkout confirmation view is left.",
        ],
      },
    ],
  },
  shipping: {
    title: "Shipping information",
    description: "How shipping choices and totals are presented by the existing commerce flow.",
    notice:
      "This frontend does not establish delivery areas, carrier services, dispatch times, arrival dates, packaging claims, or free-shipping thresholds.",
    sections: [
      {
        title: "Backend-calculated options",
        body: [
          "The active cart and checkout flow request available shipping options from the connected commerce backend. Shipping totals shown in the interface come from that existing cart data.",
          "Availability can depend on cart contents, inventory, address, region, and the shipping configuration maintained outside this frontend.",
        ],
      },
      {
        title: "Confirm before ordering",
        body: [
          "Review the shipping option and complete order total presented during checkout. A production storefront should also publish verified carrier, timing, restricted-destination, and delivery-verification details from the merchant.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of use",
    description: "Current storefront-use information and the merchant terms still required for production.",
    notice:
      "This project does not include the verified merchant legal entity, governing jurisdiction, warranty terms, liability terms, dispute process, or complete conditions of sale required for production terms.",
    sections: [
      {
        title: "Using this storefront",
        body: [
          "Access is intended only for adults who meet the legal purchasing age where they live. Visitors are responsible for following applicable product and purchasing restrictions.",
          "Catalog availability, variants, prices, shipping options, taxes, and order completion are controlled by the connected commerce data and may change.",
        ],
      },
      {
        title: "Account and saved data",
        body: [
          "Authentication is not connected. Wishlist items are stored locally in the browser and should not be treated as an account-backed reservation or guarantee of availability.",
        ],
      },
      {
        title: "Merchant terms still required",
        body: [
          "Before taking production orders, the merchant should replace this implementation summary with reviewed terms that accurately identify the seller and cover payment, fulfilment, cancellations, returns, warranties, and applicable law.",
        ],
      },
    ],
  },
};

const policyLinks = [
  { href: "/policies/privacy", label: "Privacy summary" },
  { href: "/policies/terms", label: "Terms of use" },
  { href: "/policies/shipping", label: "Shipping information" },
  { href: "/policies/returns", label: "Returns information" },
  { href: "/policies/accessibility", label: "Accessibility" },
  { href: "/policies/age", label: "Age policy" },
];

type PolicyRouteProps = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: PolicyRouteProps): Promise<Metadata> {
  const { handle } = await params;
  const policy = policies[handle];

  if (!policy) {
    return {
      title: "Policy not found - DaVinci",
    };
  }

  return {
    title: `${policy.title} - DaVinci`,
    description: policy.description,
  };
}

export default async function PolicyRoute({ params }: PolicyRouteProps) {
  const { handle } = await params;
  const policy = policies[handle];

  if (!policy) {
    notFound();
  }

  return (
    <SiteShell>
      <InfoPage
        asideDescription="Review the other storefront summaries and implementation notes."
        asideTitle="Policy index"
        description={policy.description}
        eyebrow="Store policies"
        links={policyLinks.filter((link) => link.href !== `/policies/${handle}`).slice(0, 4)}
        title={policy.title}
      >
        <StatusNotice
          description={policy.notice}
          eyebrow="Important limitation"
          icon="shield-check"
          title="Read this as a storefront summary."
        />

        <div className="mt-10 divide-y divide-border">
          {policy.sections.map((section, index) => (
            <section
              aria-labelledby={`policy-section-${index}`}
              className="grid gap-4 py-8 first:pt-0 last:pb-0 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-6"
              key={section.title}
            >
              <span
                aria-hidden="true"
                className="text-[0.68rem] font-bold tabular-nums tracking-[0.16em] text-primary"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold" id={`policy-section-${index}`}>
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </InfoPage>
    </SiteShell>
  );
}
