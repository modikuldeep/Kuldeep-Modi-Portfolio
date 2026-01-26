import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, home, person, work } from "@/resources";
import { generateBreadcrumbs } from "@/utils/utils";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  const metadata = Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });

  return {
    ...metadata,
    keywords: home.keywords,
  };
}

export default async function Work() {
  const breadcrumbs = generateBreadcrumbs(baseURL, work.path, work.title, {
    "/": { label: home.label, path: home.path },
  });

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
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
            name: work.title,
            description: work.description,
            url: `${baseURL}${work.path}`,
            image: `${baseURL}/api/og/generate?title=${encodeURIComponent(work.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
              url: `${baseURL}${about.path}`,
              image: `${baseURL}${person.avatar}`,
            },
          }),
        }}
      />
      
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((crumb, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: crumb.name,
              item: crumb.url,
            })),
          }),
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Projects />
    </Column>
  );
}
