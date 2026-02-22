import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";
import { NextResponse } from "next/server";

/**
 * Sitemap using only standard tags (loc, lastmod) so Google Search Console accepts it.
 * lastmod uses publishedAt for blog/work entries.
 */
function toSitemapDate(date: string): string {
  const d = new Date(date);
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
}

export async function GET() {
  const blogPosts = getPosts(["src", "app", "blog", "posts"]);
  const workPosts = getPosts(["src", "app", "work", "projects"]);
  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const urlEntries: string[] = [];

  // Static routes (no publish date)
  for (const route of activeRoutes) {
    const path = route === "/" ? "" : route;
    urlEntries.push(`
  <url>
    <loc>${baseURL}${path}</loc>
    <lastmod>${toSitemapDate(new Date().toISOString())}</lastmod>
  </url>`);
  }

  // Blog posts
  for (const post of blogPosts) {
    urlEntries.push(`
  <url>
    <loc>${baseURL}/blog/${post.slug}</loc>
    <lastmod>${toSitemapDate(post.metadata.publishedAt)}</lastmod>
  </url>`);
  }

  // Work projects
  for (const post of workPosts) {
    urlEntries.push(`
  <url>
    <loc>${baseURL}/work/${post.slug}</loc>
    <lastmod>${toSitemapDate(post.metadata.publishedAt)}</lastmod>
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
