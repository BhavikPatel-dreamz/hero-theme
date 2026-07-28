import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { FAQAccordion, type FaqItem } from "@/components/sections/faq-accordion";
import { InfoPage } from "@/components/sections/info-page";

export const metadata: Metadata = {
  title: "Frequently asked questions - DaVinci",
  description: "Answers about adult access, catalog data, cart, checkout, wishlist, and account status.",
};

const faqs: FaqItem[] = [
  {
    question: "Who is this storefront intended for?",
    answer:
      "Adults of legal purchasing age only. The current access notice asks visitors to confirm that they are at least 21 or meet the legal purchasing age where they live. That frontend confirmation does not replace any identity checks or compliance required by law.",
  },
  {
    question: "Where do product details and prices come from?",
    answer:
      "Products, variants, categories, collections, prices, and availability are read from the connected store catalog. When optional data such as ratings, specifications, or a second image is missing, the interface does not fabricate it.",
  },
  {
    question: "How does the wishlist work?",
    answer:
      "Saved products are stored in local browser storage on this device. They are not linked to a customer account or synchronized across devices. Clearing the wishlist or the browser's site data removes them.",
  },
  {
    question: "Can I create an account or sign in?",
    answer:
      "Not in this build. No authentication or customer-profile service is connected, so the storefront intentionally omits login, registration, and password-recovery forms.",
  },
  {
    question: "Can I view previous orders?",
    answer:
      "No authenticated order-history endpoint is connected. The existing checkout can show the order confirmation it receives when an order is placed, but this frontend does not provide a later order-retrieval view.",
  },
  {
    question: "How are shipping and taxes handled?",
    answer:
      "Available shipping options and checkout totals come from the existing cart and commerce backend. This frontend does not set delivery promises, shipping eligibility, tax rules, or fees.",
  },
  {
    question: "What is the return policy?",
    answer:
      "A verified merchant return window, eligibility rules, and support workflow are not included in this project. The returns page therefore states that limitation instead of promising terms the storefront cannot substantiate.",
  },
  {
    question: "How can I contact support?",
    answer:
      "A contact endpoint and verified merchant contact details are not configured. The contact page does not collect a message until there is a real destination for it.",
  },
];

export default function FaqRoute() {
  return (
    <SiteShell>
      <InfoPage
        asideDescription="The policy pages distinguish confirmed storefront behavior from information the merchant still needs to supply."
        asideTitle="Need more context?"
        description="Straight answers about what this storefront currently does, where its commerce data comes from, and which customer-service integrations are still absent."
        eyebrow="Frequently asked questions"
        links={[
          { href: "/policies/age", label: "Age policy" },
          { href: "/policies/privacy", label: "Privacy summary" },
          { href: "/policies/shipping", label: "Shipping information" },
          { href: "/contact", label: "Contact status" },
        ]}
        title="Useful answers, without the guesswork."
      >
        <section aria-labelledby="faq-list-title">
          <div className="mb-7">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-primary">
              Storefront essentials
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold" id="faq-list-title">
              Before you browse or check out
            </h2>
          </div>
          <FAQAccordion items={faqs} />
        </section>
      </InfoPage>
    </SiteShell>
  );
}
