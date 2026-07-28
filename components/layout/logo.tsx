import Link from "next/link";
import { brand } from "@/lib/data";
import { cx } from "@/lib/utils";

export function Logo({ className = "text-lg" }: { className?: string }) {
  return (
    <Link
      aria-label="DaVinci home"
      className={cx("group inline-flex items-center gap-2.5 font-display font-semibold tracking-[-0.03em]", className)}
      href={brand.href}
    >
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-lg border border-primary/30 bg-primary/[0.07] text-[0.68rem] font-extrabold tracking-[-0.06em] text-primary shadow-[var(--glow)]">
        DV
      </span>
      <span>
        DA<span className="px-0.5 text-primary">{"\u00b7"}</span>VINCI
      </span>
    </Link>
  );
}
