export const canonicalOrigin = "https://fitoa.net";

export type SeoMetadata = {
  title: string;
  description: string;
  canonicalPath: string;
  indexable: boolean;
};

const routeMetadata: Record<string, SeoMetadata> = {
  "/": {
    title: "Cloudflare-Ankit | Provisional project",
    description:
      "Cloudflare-Ankit is a provisional project site that will evolve with confirmed client requirements.",
    canonicalPath: "/",
    indexable: true,
  },
  "/about": {
    title: "About | Cloudflare-Ankit",
    description:
      "Learn about the provisional Cloudflare-Ankit project identity.",
    canonicalPath: "/about",
    indexable: true,
  },
  "/services": {
    title: "Services | Cloudflare-Ankit",
    description:
      "Services and products for Cloudflare-Ankit will be confirmed before delivery.",
    canonicalPath: "/services",
    indexable: true,
  },
  "/contact": {
    title: "Contact | Cloudflare-Ankit",
    description:
      "Contact information for Cloudflare-Ankit will be published after confirmation.",
    canonicalPath: "/contact",
    indexable: true,
  },
  "/privacy": {
    title: "Privacy | Cloudflare-Ankit",
    description:
      "Review the provisional privacy sample for Cloudflare-Ankit.",
    canonicalPath: "/privacy",
    indexable: true,
  },
  "/terms": {
    title: "Terms | Cloudflare-Ankit",
    description:
      "Review the provisional terms sample for Cloudflare-Ankit.",
    canonicalPath: "/terms",
    indexable: true,
  },
};

const notFoundMetadata: SeoMetadata = {
  title: "Page not found | Cloudflare-Ankit",
  description: "The requested Cloudflare-Ankit page could not be found.",
  canonicalPath: "/",
  indexable: false,
};

export function getSeoMetadata(pathname: string): SeoMetadata {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";

  return routeMetadata[normalizedPath] ?? notFoundMetadata;
}
