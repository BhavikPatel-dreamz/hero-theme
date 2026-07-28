import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionTitle } from "@/components/ui/section-title";
import { collections as fallbackCollections } from "@/lib/data";
import { listCategories, listCollections } from "@/lib/medusa";

type FeatureDestination = {
  description: string;
  href: string;
  image: string;
  kind: string;
  name: string;
};

const vapeTerms = ["vape", "vapor", "device", "disposable", "e-liquid", "eliquid"];
const hookahTerms = ["hookah", "shisha", "coal", "bowl", "hose"];

function matchesAny(item: FeatureDestination, terms: string[]) {
  const value = `${item.name} ${item.description}`.toLowerCase();
  return terms.some((term) => value.includes(term));
}

export async function CraftSection() {
  const [categories, collections] = await Promise.all([
    listCategories().catch(() => []),
    listCollections().catch(() => fallbackCollections),
  ]);
  const destinations: FeatureDestination[] = [
    ...categories.map((category) => ({
      description: category.description,
      href: `/categories/${category.handle}`,
      image: category.image,
      kind: "Category",
      name: category.name,
    })),
    ...collections.map((collection) => ({
      description: collection.description,
      href: `/collections/${collection.handle}`,
      image: collection.image,
      kind: "Collection",
      name: collection.name,
    })),
  ];
  const selected: FeatureDestination[] = [];
  const vapeDestination = destinations.find((item) => matchesAny(item, vapeTerms));
  const hookahDestination = destinations.find(
    (item) => item.href !== vapeDestination?.href && matchesAny(item, hookahTerms),
  );

  if (vapeDestination) selected.push(vapeDestination);
  if (hookahDestination) selected.push(hookahDestination);

  for (const destination of destinations) {
    if (selected.length >= 2) break;
    if (!selected.some((item) => item.href === destination.href)) selected.push(destination);
  }

  if (selected.length === 0) {
    selected.push(
      ...fallbackCollections.slice(0, 2).map((collection) => ({
        description: collection.description,
        href: `/collections/${collection.handle}`,
        image: collection.image,
        kind: "Collection",
        name: collection.name,
      })),
    );
  }

  return (
    <section className="overflow-hidden bg-background">
      <Container className="py-24 md:py-32 lg:py-36">
        <SectionTitle
          className="mb-12 lg:mb-14"
          eyebrow="Featured edits"
          title="Two ways into the current collection."
        />
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {selected.slice(0, 2).map((item, index) => (
            <Link
              className="group relative isolate min-h-[30rem] overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-soft)] sm:min-h-[36rem]"
              href={item.href}
              key={item.href}
            >
              <Image
                alt={item.name}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                src={item.image}
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,oklch(7%_0.01_255/0.95)_0%,oklch(7%_0.01_255/0.5)_42%,transparent_76%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/58">
                  <span>{item.kind}</span>
                  <span>0{index + 1}</span>
                </div>
                <div className="mt-6 flex items-end justify-between gap-6">
                  <div>
                    <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                      {item.name}
                    </h3>
                    <p className="mt-3 max-w-lg line-clamp-2 text-sm leading-6 text-white/58">
                      {item.description}
                    </p>
                  </div>
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/[0.06] text-white transition-[background,color,transform] group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" name="arrow-up-right" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
