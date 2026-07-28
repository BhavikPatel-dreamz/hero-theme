import type {
  Collection,
  NavItem,
  TrustMetric,
} from "@/types/site";

export const brand = {
  name: "DaVinci",
  logo: "DA\u00b7VINCI",
  href: "/",
};

export const navItems: NavItem[] = [
  { label: "New arrivals", href: "/products?sort=new" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

export const announcementMessages = [
  "For adults of legal purchasing age only",
  "Availability and pricing update from the live catalog",
  "Shipping and taxes are calculated at checkout",
  "Questions before ordering? Visit our FAQ",
];

const portableImage = "/assets/product-portable-CFKnmSQP.jpg";
const desktopImage = "/assets/product-desktop-DdNf9Un2.jpg";
const accessoriesImage = "/assets/product-accessories-BrKIPgD4.jpg";

export const hero = {
  eyebrow: "Curated for adult customers",
  title: "Set the tone.",
  accent: "Own the ritual.",
  body: "Explore premium devices, hookah essentials, shisha accessories, and everyday care products from the current store catalog.",
  image: "/assets/hero-campaign-v2.png",
};

export const trustMetrics: TrustMetric[] = [
  { icon: "shield-check", title: "Adults only", body: "Legal-age access" },
  { icon: "zap", title: "Live catalog", body: "Current availability" },
  { icon: "lock", title: "Backend totals", body: "Pricing at checkout" },
  { icon: "heart", title: "Save favorites", body: "Stored on this device" },
];

export const collections: Collection[] = [
  {
    handle: "portable",
    name: "Portable Vaporizers",
    tagline: "Portable collection",
    description:
      "Browse portable devices and available variants from the current catalog.",
    image: portableImage,
  },
  {
    handle: "desktop",
    name: "Desktop Vaporizers",
    tagline: "Desktop collection",
    description:
      "Explore desktop devices, product details, and live availability.",
    image: desktopImage,
  },
  {
    handle: "accessories",
    name: "Accessories",
    tagline: "Care and accessories",
    description:
      "Find compatible accessories, cleaning products, and replacement parts in the catalog.",
    image: accessoriesImage,
  },
];

export function getCollection(handle: string) {
  return collections.find((collection) => collection.handle === handle);
}
