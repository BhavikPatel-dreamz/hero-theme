"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { announcementMessages } from "@/lib/data";
import { Container } from "@/components/ui/container";

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % announcementMessages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="border-b border-primary/15 bg-primary/[0.06] text-xs text-muted-foreground">
      <Container className="relative flex h-9 items-center justify-center overflow-hidden">
        <span className="absolute left-0 hidden items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.17em] text-foreground md:flex">
          <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
          Adults-only storefront
        </span>
        <span
          key={announcementMessages[index]}
          className="max-w-full truncate px-2 text-center text-[0.65rem] font-bold uppercase tracking-[0.13em] motion-safe:animate-[ticker-in_350ms_ease-out_both]"
        >
          {announcementMessages[index]}
        </span>
        <Link
          className="absolute right-0 hidden text-[0.62rem] font-bold uppercase tracking-[0.13em] text-primary transition-colors hover:text-foreground md:block"
          href="/policies/age"
        >
          Age policy
        </Link>
      </Container>
    </div>
  );
}
