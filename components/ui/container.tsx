import type { HTMLAttributes } from "react";
import { cx } from "@/lib/utils";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx("mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-10", className)}
      {...props}
    />
  );
}
