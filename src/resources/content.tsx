import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
import { Fragment } from "react/jsx-runtime";

const person: Person = {
  firstName: "Kuldeep",
  lastName: "Modi",
  name: "Kuldeep Modi",
  role: "Full Stack Developer",
  avatar: "/images/Kuldeep.jpg",
  email: "kuldeepmodi95@gmail.com",
  location: "Asia/Kolkata", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Hindi"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      My newsletter about full stack development, web technologies, and building scalable solutions
    </>
  ),
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/MODIKULDEEP",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/kuldeep-modi",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    link: "https://wa.me/919558155439?text=Hello",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.png",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building scalable web applications and innovative solutions</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Sales & Manufacturing CRM</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/sales-and-manufacturing-crm",
  },
  subline: (
    <>
      I'm Kuldeep, a Full Stack Developer with 3+ years of experience building scalable web apps,
      CRMs, <br /> automation systems, and cross-platform applications. Passionate about React,
      Node.js, Next.js, and <br /> creating impactful solutions.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Goal-oriented Full Stack Developer with 3+ years of experience building scalable web apps,
        CRMs, automation systems, and cross-platform applications. Strong expertise in React,
        Node.js, Next.js, MySQL, MongoDB, automation workflows, API integrations, and performance
        optimization. Passionate about applying technical and problem-solving skills to develop
        impactful, scalable solutions.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Freelance",
        timeframe: "Nov 2024 – Present",
        role: "Full Stack Developer (Freelancer)",
        achievements: [
          <Fragment key="1">
            Developed a complete Sales and Manufacturing CRM to manage inquiries, sales pipeline,
            products, manufacturing processes, and dispatch operations.
          </Fragment>,
          <Fragment key="2">
            Built dynamic product attribute system, role-based access control (RBAC), and
            multi-level hierarchy for departments.
          </Fragment>,
          <Fragment key="3">
            Automated order syncing from Amazon, FirstCry, and Shopify using APIs, reducing manual
            workload and operational errors.
          </Fragment>,
          <Fragment key="4">
            Optimized courier assignment, delivery workflow, and tracking to reduce logistics cost
            and improve turnaround time.
          </Fragment>,
          <Fragment key="5">
            Integrated WhatsApp API for notifications and Mailgun for marketing and transactional
            emails.
          </Fragment>,
          <Fragment key="6">
            Developed a cross-platform internal operations app using Cordova (Ionic), deployable as
            Web, Android, and iOS from single codebase.
          </Fragment>,
          <Fragment key="7">
            Managed deployments on AWS, configured EC2 for hosting, and used S3 for secure file
            storage and media management.
          </Fragment>,
        ],
        images: [],
      },
      {
        company: "Applie Infosol",
        timeframe: "June 2024 – November 2024",
        role: "Full Stack Developer (Full-time)",
        achievements: [
          <Fragment key="8">
            Worked on a project with three dynamic modules, built using TypeScript across the stack
            for type safety and consistency.
          </Fragment>,
          <Fragment key="9">
            Developed the backend using Nest.js, integrated MySQL with TypeORM, and documented APIs
            using Swagger UI. Implemented mailing services with Mailgun.
          </Fragment>,
          <Fragment key="10">
            Implemented a dynamic multilanguage feature allowing content to be updated without
            rebuilding the codebase, improving localization flexibility.
          </Fragment>,
          <Fragment key="11">
            Built the admin panel using Metronic theme and Redux, allowing dynamic handling of
            frontend language changes.
          </Fragment>,
          <Fragment key="12">
            Developed the frontend module in Next.js, integrated with Calendly for scheduling, and
            implemented custom search and filtering functionalities.
          </Fragment>,
          <Fragment key="13">
            Solved PDF generation issues using Puppeteer to dynamically generate high-quality PDFs,
            improving content delivery.
          </Fragment>,
        ],
        images: [],
      },
      {
        company: "Syndell Technology",
        timeframe: "December 2022 – May 2024",
        role: "MERN Stack Developer (Full-time)",
        achievements: [
          <Fragment key="14">
            Developed and optimized websites/web apps using the MERN Stack, resulting in improved
            performance and user experience.
          </Fragment>,
          <Fragment key="15">
            Designed efficient database structures for seamless data management and scalability,
            reducing query execution time.
          </Fragment>,
          <Fragment key="16">
            Implemented secure and reusable components for enhanced performance and scalability,
            reducing development time.
          </Fragment>,
          <Fragment key="17">
            Integrated third-party services and APIs to enhance application functionalities and user
            experience, resulting in increased user engagement.
          </Fragment>,
          <Fragment key="18">
            Transferred projects seamlessly from MySQL to MongoDB databases, ensuring data integrity
            and efficiency, reducing database query response time.
          </Fragment>,
          <Fragment key="19">
            Collaborated with cross-functional teams to plan and execute project milestones,
            ensuring timely delivery and customer satisfaction.
          </Fragment>,
          <Fragment key="20">
            Utilized MVC structure for organized and maintainable codebase, leading to improved code
            readability and maintainability.
          </Fragment>,
          <Fragment key="21">
            Automated tasks using RPA tools like Power Automate, streamlining processes and
            improving productivity.
          </Fragment>,
        ],
        images: [],
      },
      {
        company: "Agile Academy",
        timeframe: "April 2022 – September 2022",
        role: "Frontend Developer Intern",
        achievements: [
          <Fragment key="22">
            Designed and developed responsive web pages, banners, and logos using Photoshop and
            Illustrator.
          </Fragment>,
          <Fragment key="23">
            Gained practical experience in UI/UX design using Adobe XD and Figma.
          </Fragment>,
          <Fragment key="24">
            Utilized frontend development technologies like HTML, CSS, JavaScript, and jQuery to
            build interactive web pages.
          </Fragment>,
          <Fragment key="25">
            Collaborated with senior developers and designers to refine design concepts and improve
            user experiences.
          </Fragment>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "INDUS University",
        description: (
          <>Bachelor of Technology in Computer Science And Engineering (2019 – 2023) - CGPA: 8.67</>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical Skills",
    skills: [
      {
        title: "Frontend Development",
        description: (
          <>
            Expertise in building responsive and interactive user interfaces using modern frontend
            technologies.
          </>
        ),
        tags: [
          {
            name: "React.js",
            icon: "react",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "TypeScript",
            icon: "typescript",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
        ],
        images: [],
      },
      {
        title: "Backend Development",
        description: (
          <>Building scalable server-side applications and RESTful APIs with Node.js ecosystem.</>
        ),
        tags: [
          {
            name: "Node.js",
            icon: "nodejs",
          },
          {
            name: "Express.js",
            icon: "express",
          },
          {
            name: "Nest.js",
            icon: "nestjs",
          },
        ],
        images: [],
      },
      {
        title: "Databases & ORMs",
        description: (
          <>
            Working with various databases and ORMs for efficient data management and query
            optimization.
          </>
        ),
        tags: [
          {
            name: "MongoDB",
            icon: "mongodb",
          },
          {
            name: "MySQL",
            icon: "mysql",
          },
          {
            name: "PostgreSQL",
            icon: "postgresql",
          },
          {
            name: "TypeORM",
            icon: "typescript",
          },
        ],
        images: [],
      },
      {
        title: "DevOps & Cloud",
        description: (
          <>Deploying and managing applications on cloud platforms with CI/CD pipelines.</>
        ),
        tags: [
          {
            name: "AWS",
            icon: "aws",
          },
          {
            name: "Docker",
            icon: "docker",
          },
          {
            name: "CI/CD",
            icon: "rocket",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about full stack development and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Full stack development projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { about, blog, gallery, home, newsletter, person, social, work };
