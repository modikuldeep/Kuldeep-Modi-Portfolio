import { getPosts } from "@/utils/utils";
import { baseURL, person, routes as routesConfig } from "@/resources";
import { NextResponse } from "next/server";

/**
 * Custom sitemap that includes both lastmod and publication date (pd:publishdate).
 * Standard sitemap only has <lastmod>; we add an explicit publish date for blog/work entries.
 */
function toSitemapDate(date: string): string {
  const d = new Date(date);
  return d.toISOString().split("T")[0]; // YYYY-MM-DD for sitemap compatibility
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
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

  // Blog posts: lastmod + publish date + author
  for (const post of blogPosts) {
    const pubDate = toSitemapDate(post.metadata.publishedAt);
    urlEntries.push(`
  <url>
    <loc>${baseURL}/blog/${post.slug}</loc>
    <lastmod>${pubDate}</lastmod>
    <pd:publishdate>${pubDate}</pd:publishdate>
    <pd:author>${escapeXml(person.name)}</pd:author>
  </url>`);
  }

  // Work projects: lastmod + publish date + author
  for (const post of workPosts) {
    const pubDate = toSitemapDate(post.metadata.publishedAt);
    urlEntries.push(`
  <url>
    <loc>${baseURL}/work/${post.slug}</loc>
    <lastmod>${pubDate}</lastmod>
    <pd:publishdate>${pubDate}</pd:publishdate>
    <pd:author>${escapeXml(person.name)}</pd:author>
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:pd="https://kuldeepmodi.vercel.app/ns/sitemap#">
${urlEntries.join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
