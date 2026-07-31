import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { canonicalOrigin, getSeoMetadata } from "@/lib/seo";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, key); document.head.append(element); }
  element.content = content;
}

export function SeoMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const metadata = getSeoMetadata(pathname);
    const url = `${canonicalOrigin}${metadata.canonicalPath}`;
    document.title = metadata.title;
    setMeta("name", "description", metadata.description);
    setMeta("name", "robots", metadata.indexable ? "index,follow" : "noindex,nofollow");
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", `${canonicalOrigin}/vite.svg`);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.append(canonical); }
    canonical.href = url;
  }, [pathname]);
  return null;
}
