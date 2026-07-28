"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

export function NewsletterSection() {
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Newsletter signup is ready for a future mailing-service connection.");
  }

  return (
    <section className="border-t border-border bg-surface" id="newsletter">
      <Container className="py-20 md:py-24">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-soft)] sm:p-10 lg:p-14">
          <div aria-hidden="true" className="absolute -right-24 -top-40 size-96 rounded-full bg-primary/[0.07] blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.19em] text-primary">
                <Icon className="size-4" name="mail" />
                Catalog updates
              </div>
              <h2 className="mt-5 max-w-xl text-balance font-display text-4xl font-semibold leading-[1.04] sm:text-5xl">
                Fewer emails. Better reasons to open them.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
                A polished signup surface for future product drops and catalog updates. The current
                project does not yet expose a mailing-list endpoint.
              </p>
            </div>
            <div>
              <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="newsletter-email">
                  Email address
                </label>
                <input
                  className="min-h-12 min-w-0 flex-1 rounded-[0.7rem] border border-input bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground"
                  id="newsletter-email"
                  placeholder="Email address"
                  required
                  type="email"
                />
                <Button className="min-h-12" type="submit">
                  Join the list
                  <Icon className="size-4" name="arrow-right" />
                </Button>
              </form>
              <p aria-live="polite" className="mt-3 min-h-5 text-xs text-muted-foreground" role="status">
                {message ?? "Intended for adults of legal purchasing age."}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
