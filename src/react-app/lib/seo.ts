// Placeholder for the reusable base. Project branches must replace this value.
export const canonicalOrigin = "https://example.com";

export type SeoMetadata = {
  title: string;
  description: string;
  canonicalPath: string;
  indexable: boolean;
};

const routeMetadata: Record<string, SeoMetadata> = {
  "/": {
    title: "Cloudflare-App-Base | Reusable application foundation",
    description:
      "A reusable full-stack application foundation for projects running on Cloudflare.",
    canonicalPath: "/",
    indexable: true,
  },
  "/about": {
    title: "About | Cloudflare-App-Base",
    description:
      "Learn about the reusable Cloudflare-App-Base project foundation.",
    canonicalPath: "/about",
    indexable: true,
  },
  "/services": {
    title: "Services | Cloudflare-App-Base",
    description:
      "Review the reusable capabilities provided by Cloudflare-App-Base.",
    canonicalPath: "/services",
    indexable: true,
  },
  "/contact": {
    title: "Contact | Cloudflare-App-Base",
    description:
      "Project branches provide their own confirmed contact information.",
    canonicalPath: "/contact",
    indexable: true,
  },
  "/privacy": {
    title: "Privacy | Cloudflare-App-Base",
    description:
      "Review the provisional privacy sample included with Cloudflare-App-Base.",
    canonicalPath: "/privacy",
    indexable: true,
  },
  "/terms": {
    title: "Terms | Cloudflare-App-Base",
    description:
      "Review the provisional terms sample included with Cloudflare-App-Base.",
    canonicalPath: "/terms",
    indexable: true,
  },
};

const notFoundMetadata: SeoMetadata = {
  title: "Page not found | Cloudflare-App-Base",
  description: "The requested Cloudflare-App-Base page could not be found.",
  canonicalPath: "/",
  indexable: false,
};

export function getSeoMetadata(pathname: string): SeoMetadata {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";

  return routeMetadata[normalizedPath] ?? notFoundMetadata;
}
