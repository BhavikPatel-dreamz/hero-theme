"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

export function FooterNewsletter() {
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Newsletter signup is not connected to a mailing service yet.");
  }

  return (
    <div className="rounded-2xl border border-border bg-background/65 p-5 sm:p-6">
      <div className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-primary">
        Catalog updates
      </div>
      <h2 className="mt-2 font-display text-2xl">Stay in the loop.</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        The signup surface is ready for the project’s future mailing integration.
      </p>
      <form className="mt-5 flex flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="footer-newsletter-email">
          Email address
        </label>
        <input
          className="min-h-11 min-w-0 flex-1 rounded-[0.7rem] border border-input bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground"
          id="footer-newsletter-email"
          placeholder="Email address"
          required
          type="email"
        />
        <Button type="submit">Notify me</Button>
      </form>
      <p aria-live="polite" className="mt-3 min-h-5 text-xs text-muted-foreground" role="status">
        {message}
      </p>
    </div>
  );
}
