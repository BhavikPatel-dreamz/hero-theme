"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useDialogFocus } from "@/hooks/use-dialog-focus";
import { Button, buttonClasses } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

const ageCookie = "davinci-age-verified=1";
const legalAge = 21;

function getAgeGateSnapshot() {
  return typeof document !== "undefined" && !document.cookie.includes(ageCookie);
}

function subscribeAgeGate(onStoreChange: () => void) {
  const timer = window.setTimeout(onStoreChange, 0);

  return () => window.clearTimeout(timer);
}

export function AgeGate() {
  const shouldShow = useSyncExternalStore(subscribeAgeGate, getAgeGateSnapshot, () => false);
  const [dismissed, setDismissed] = useState(false);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const visible = shouldShow && !dismissed;
  const dialogRef = useDialogFocus<HTMLDivElement>({
    closeOnEscape: false,
    initialFocusRef: confirmRef,
    open: visible,
  });

  useBodyScrollLock(visible);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] grid animate-[fade-in_220ms_ease-out_both] place-items-center overflow-y-auto bg-overlay px-4 py-6 backdrop-blur-xl sm:px-6">
      <div
        aria-describedby="age-gate-description"
        aria-labelledby="age-gate-title"
        aria-modal="true"
        className="glass-panel relative w-full max-w-2xl animate-[modal-in_360ms_ease-out_50ms_both] overflow-hidden rounded-2xl"
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <div aria-hidden="true" className="absolute -right-24 -top-28 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative border-b border-border p-6 sm:p-9">
          <div className="flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-primary">
            <span className="grid size-8 place-items-center rounded-lg border border-primary/25 bg-primary/10">
              <Icon className="size-4" name="shield-check" />
            </span>
            Adult access verification
          </div>
          <h2 className="mt-7 max-w-xl text-balance font-display text-4xl font-semibold leading-[1.05] sm:text-5xl" id="age-gate-title">
            This store is for adults of legal purchasing age.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base" id="age-gate-description">
            Confirm that you are at least {legalAge}, or meet the legal purchasing age where you
            live. Age-restricted products are not intended for minors.
          </p>
        </div>

        <div className="relative p-6 sm:p-9">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <Button
              className="w-full"
              onClick={() => {
                document.cookie = `${ageCookie}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
                setDismissed(true);
              }}
              ref={confirmRef}
              type="button"
            >
              I am {legalAge} or older
              <Icon className="size-4" name="arrow-right" />
            </Button>
            <a className={buttonClasses("secondary")} href="https://www.google.com">
              Exit site
            </a>
          </div>
          <p className="mt-6 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
            Confirmation is remembered in this browser for 30 days using the storefront’s
            existing cookie behavior. This screen is a frontend access notice and does not replace
            identity checks or legal compliance obligations.
          </p>
        </div>
      </div>
    </div>
  );
}
