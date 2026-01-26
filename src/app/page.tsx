import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, home, person, routes, social } from "@/resources";
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
} from "@once-ui-system/core";
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
