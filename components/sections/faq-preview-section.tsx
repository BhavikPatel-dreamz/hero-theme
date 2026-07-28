import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

const questions = [
  {
    answer:
      "Only adults who meet the legal purchasing age in their jurisdiction may enter or purchase age-restricted products.",
    question: "Who can shop this storefront?",
  },
  {
    answer:
      "Product names, prices, variants, and stock status are read from the existing commerce catalog. Final totals remain controlled by the backend.",
    question: "Where do price and availability come from?",
  },
  {
    answer:
      "Shipping methods, taxes, and eligible totals are resolved by the existing cart and checkout flow when you place an order.",
    question: "How are shipping and taxes handled?",
  },
  {
    answer:
      "Account authentication is not connected in this build. The wishlist is stored locally in this browser, while the cart uses the existing cart cookie and backend.",
    question: "Do I need an account to save or shop?",
  },
];

export function FaqPreviewSection() {
  return (
    <section className="border-t border-border bg-background">
      <Container className="grid gap-12 py-24 md:py-32 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <div className="text-[0.68rem] font-bold uppercase tracking-[0.19em] text-primary">
            Good to know
          </div>
          <h2 className="mt-5 max-w-lg text-balance font-display text-4xl font-semibold leading-[1.04] sm:text-5xl">
            Straight answers before checkout.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
            Store behavior stays tied to the current catalog, cart, and checkout implementation.
          </p>
          <Link className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-foreground" href="/faq">
            Read the full FAQ
            <Icon className="size-4" name="arrow-up-right" />
          </Link>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {questions.map((item, index) => (
            <details className="group" key={item.question} name="home-faq">
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-4">
                  <span className="text-[0.62rem] font-bold tracking-[0.15em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-semibold sm:text-xl">{item.question}</span>
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-surface transition-[background,color,transform] group-open:rotate-45 group-open:bg-primary group-open:text-primary-foreground">
                  <Icon className="size-4" name="plus" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pl-10 text-sm leading-7 text-muted-foreground sm:pl-12">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
