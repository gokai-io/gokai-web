import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

/**
 * Generates /robots.txt at the app root.
 *
 * Public marketing paths are open to all crawlers.
 * Auth, API, and app-shell paths are blocked.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/login",
          "/esqueci-senha",
          "/redefinir-senha",
          "/app/",
          "/api/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
