import React from "react";

export type MetaInput = {
  title: string;
  description: string;
  baseURL: string;
  path: string;
  image?: string;
};

export const Meta = {
  generate({ title, description, baseURL, path, image }: MetaInput) {
    const url = `${baseURL}${path}`;
    const imageUrl = image ? `${baseURL}${image}` : undefined;
    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        images: imageUrl ? [imageUrl] : undefined,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  },
};

export type SchemaProps = {
  as: "webPage" | "article" | "project" | "blogPosting";
  baseURL: string;
  path: string;
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
    image?: string;
  };
};

export function Schema({
  as,
  baseURL,
  path,
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: SchemaProps) {
  const schemaType = as === "article" ? "Article" : as === "blogPosting" ? "BlogPosting" : "WebPage";
  const data = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: title,
    description,
    url: `${baseURL}${path}`,
    image: image ? `${baseURL}${image}` : undefined,
    datePublished,
    dateModified,
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          url: author.url,
          image: author.image,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
