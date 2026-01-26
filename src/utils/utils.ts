import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}

/**
 * Generate breadcrumb list for structured data
 */
export function generateBreadcrumbs(
  baseURL: string,
  path: string,
  title: string,
  routes: Record<string, { label: string; path: string }>,
): Array<{ name: string; url: string }> {
  const breadcrumbs: Array<{ name: string; url: string }> = [
    { name: "Home", url: baseURL },
  ];

  // Split path and build breadcrumbs
  const pathParts = path.split("/").filter(Boolean);
  let currentPath = "";

  for (const part of pathParts) {
    currentPath += `/${part}`;
    const route = routes[currentPath];
    if (route) {
      breadcrumbs.push({
        name: route.label,
        url: `${baseURL}${currentPath}`,
      });
    }
  }

  // Add current page (if different from last breadcrumb)
  if (breadcrumbs[breadcrumbs.length - 1]?.url !== `${baseURL}${path}`) {
    breadcrumbs.push({
      name: title,
      url: `${baseURL}${path}`,
    });
  }

  return breadcrumbs;
}
