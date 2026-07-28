import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/site";
import { Icon } from "@/components/ui/icon";

type CategoryCardProps = {
  category: Category;
  headingLevel?: 2 | 3;
};

export function CategoryCard({ category, headingLevel = 3 }: CategoryCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const itemCount =
    typeof category.productCount === "number"
      ? `${category.productCount} ${category.productCount === 1 ? "item" : "items"}`
      : "Catalog category";

  return (
    <article className="group h-full">
      <Link
        className="flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-surface-elevated shadow-[var(--shadow-soft)] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary/55 hover:shadow-[var(--shadow-hover)]"
        href={`/categories/${category.handle}`}
      >
        <div className="relative aspect-[5/4] overflow-hidden bg-surface sm:aspect-[4/5]">
          <Image
            alt={category.name}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            src={category.image}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-background via-background/5 to-transparent"
          />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4 sm:p-5">
            <span className="rounded-lg border border-white/15 bg-background/65 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
              {itemCount}
            </span>
            <span className="grid size-10 place-items-center rounded-xl border border-white/15 bg-background/65 text-white backdrop-blur-md transition-[background,border-color,color] group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="size-4" name="arrow-up-right" />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-primary">
            Shop category
          </p>
          <Heading className="mt-3 text-balance font-display text-2xl font-semibold sm:text-3xl">
            {category.name}
          </Heading>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {category.description}
          </p>
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold">
            Explore category
            <Icon
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              name="arrow-right"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
