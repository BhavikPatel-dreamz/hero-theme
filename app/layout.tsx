import type { Metadata, Viewport } from "next";
import "./globals.css";

function parseSiteUrl(value?: string) {
  const candidate = value?.trim();

  if (!candidate) {
    return undefined;
  }

  try {
    return new URL(/^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`);
  } catch {
    return undefined;
  }
}

const metadataBase =
  parseSiteUrl(process.env.NEXT_PUBLIC_BASE_URL) ??
  parseSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  parseSiteUrl(process.env.VERCEL_URL) ??
  (process.env.NODE_ENV === "development" ? new URL("http://localhost:3000") : undefined);
const socialImage = metadataBase
  ? new URL("/assets/hero-campaign-v2.png", metadataBase)
  : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: "DaVinci — Premium Adult-Use Storefront",
  description:
    "Browse adult-use devices, hookah and shisha essentials, e-liquids, and accessories from the current storefront catalog.",
  openGraph: {
    title: "DaVinci — Premium Adult-Use Storefront",
    description:
      "Browse adult-use devices, hookah and shisha essentials, e-liquids, and accessories from the current storefront catalog.",
    type: "website",
    images: socialImage
      ? [
          {
            alt: "DaVinci precision device in a dark studio setting",
            height: 863,
            url: socialImage,
            width: 1823,
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "DaVinci — Premium Adult-Use Storefront",
    description:
      "Browse adult-use devices, hookah and shisha essentials, e-liquids, and accessories from the current storefront catalog.",
    images: socialImage ? [socialImage] : undefined,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#090b0e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="h-full antialiased"
      data-scroll-behavior="smooth"
      lang="en"
    >
      <body className="min-h-full bg-background font-sans text-foreground">{children}</body>
    </html>
  );
}
