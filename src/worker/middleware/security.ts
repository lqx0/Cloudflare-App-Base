import type { MiddlewareHandler } from "hono";

export function buildSecurityHeaders(environment?: string): Record<string, string> {
  const isLocal = environment === "local";
  const connectSource = isLocal ? "'self' ws: wss:" : "'self'";

  return {
    "Content-Security-Policy": `default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self'${isLocal ? " 'unsafe-inline'" : ""}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src ${connectSource}`,
    "Permissions-Policy": "camera=(), geolocation=(), microphone=()",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
  };
}

export const securityHeaders: MiddlewareHandler = async (c, next) => {
  await next();
  for (const [name, value] of Object.entries(buildSecurityHeaders(c.env.ENVIRONMENT))) {
    c.header(name, value);
  }
};
