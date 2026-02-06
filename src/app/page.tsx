import dynamic from "next/dynamic";
import { Mailchimp } from "@/components";
import { about, baseURL, home, person, routes, social } from "@/resources";

// Code splitting: Load these components dynamically to reduce initial bundle size
const Posts = dynamic(() => import("@/components/blog/Posts").then((mod) => ({ default: mod.Posts })), {
  loading: () => null,
});
const Projects = dynamic(() => import("@/components/work/Projects").then((mod) => ({ default: mod.Projects })), {
  loading: () => null,
});
import {
  Avatar,
  Badge,
  Button,
  Column,
  Heading,
  IconButton,
  Line,
  Meta,
  RevealFx,
  Row,
  Schema,
  Text,
} from "@/components/ui";
import { HomeClient } from "./HomeClient";

export async function generateMetadata() {
  const metadata = Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });

  return {
    ...metadata,
    keywords: home.keywords,
  };
}

export default async function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      {/* Explicit WebPage Schema JSON-LD for consistent validation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `${baseURL}${home.path}`,
            image: home.image ? `${baseURL}${home.image}` : `${baseURL}/api/og/generate?title=${encodeURIComponent(home.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
              url: `${baseURL}${about.path}`,
              image: `${baseURL}${person.avatar}`,
            },
            mainEntity: {
              "@type": "Person",
              name: person.name,
            },
          }),
        }}
      />
      <HomeClient
        projectsComponent={<Projects range={[1, 1]} />}
        postsComponent={<Posts range={[1, 2]} columns="2" />}
      />
    </Column>
  );
}
