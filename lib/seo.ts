import type { Metadata } from "next";
import { services } from "@/data/services";
import { site, hasNumber, serviceAreas } from "@/data/site";
import { imageUrl, isLive, ogImageUrl } from "@/lib/cloudinary";
import type { Media } from "@/lib/types";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/** Absolute URL of a real image, for JSON-LD. Undefined for placeholders. */
export function mediaUrl(m: Media) {
  if (!isLive(m)) return undefined;
  return m.src ? absoluteUrl(m.src) : imageUrl(m.publicId);
}

type ShareImage = { url: string; width?: number; height?: number };

/** Social share image for a cover. Undefined falls back to the generated default. */
export function shareImage(m: Media): ShareImage | undefined {
  if (!isLive(m)) return undefined;
  return m.src
    ? { url: absoluteUrl(m.src), width: m.width, height: m.height }
    : { url: ogImageUrl(m.publicId), width: 1200, height: 630 };
}

type Args = {
  title: string;
  /** Use the title as written, without the " | UPEDGE" suffix. */
  absoluteTitle?: boolean;
  description: string;
  path: string;
  /** Use shareImage(cover). Falls back to the generated default. */
  image?: ShareImage;
  type?: "website" | "article";
};

/** Per-page metadata with canonical, Open Graph and Twitter cards. */
export function buildMetadata({ title, absoluteTitle, description, path, image, type = "website" }: Args): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ ...image, alt: title }] : undefined;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, type, images },
    twitter: { card: "summary_large_image", title, description, images: image ? [image.url] : undefined },
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
    alternateName: site.alternateName,
    founder: { "@type": "Person", name: site.founder },
    foundingDate: site.foundingYear,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: absoluteUrl(`/services/${s.slug}`) },
      })),
    },
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
    geo: { "@type": "GeoCoordinates", ...site.geo },
    hasMap: site.mapUrl,
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

/** Tells search engines the site's name, shown above its results. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    alternateName: site.alternateName,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
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
