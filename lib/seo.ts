import type { Metadata } from "next";
import { site, hasNumber, serviceAreas } from "@/data/site";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

type Args = {
  title: string;
  description: string;
  path: string;
  /** Absolute image URL (use Cloudinary's ogImageUrl for covers). Falls back to the generated default. */
  image?: string;
  type?: "website" | "article";
};

/** Per-page metadata with canonical, Open Graph and Twitter cards. */
export function buildMetadata({ title, description, path, image, type = "website" }: Args): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, type, images },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}

const isPlaceholder = (v: string) => v.includes("[");

/** Organization + LocalBusiness (GeneralContractor). Unknown contact details are left out until filled in. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "GeneralContractor"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    logo: absoluteUrl("/brand/upedge-wordmark.svg"),
    image: absoluteUrl("/opengraph-image"),
    ...(hasNumber(site.phone) ? { telephone: site.phone } : {}),
    ...(!isPlaceholder(site.email) ? { email: site.email } : {}),
    ...(!isPlaceholder(site.address)
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: site.street,
            addressLocality: site.city,
            addressRegion: site.region,
            postalCode: site.postalCode,
            addressCountry: site.country,
          },
        }
      : {}),
    areaServed: [
      ...serviceAreas.tamilNadu.map((name) => ({ "@type": "AdministrativeArea", name: `${name}, Tamil Nadu` })),
      ...serviceAreas.elsewhere.map((name) => ({ "@type": "AdministrativeArea", name })),
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.openingHours.days,
      opens: site.openingHours.opens,
      closes: site.openingHours.closes,
    },
    sameAs: site.socials.filter((s) => s.href).map((s) => s.href),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
