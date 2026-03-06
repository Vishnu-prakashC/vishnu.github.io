export const PROJECTS = [
  {
    id: 1,
    title: "Project One",
    slug: "project-one",
    tagline: "Full stack application with real-time features",
    description: "Full stack application with real-time features and modern UI.",
    heroImage: null,
    problem: "Users needed a single dashboard to manage multiple services and see real-time updates without refreshing.",
    solution: "Built a real-time dashboard with WebSockets, reactive state, and a clean component architecture that scales.",
    techStack: ["React", "Node.js", "WebSockets", "Tailwind", "PostgreSQL"],
    liveUrl: "#",
    sourceUrl: "#",
    nextSlug: "project-two",
  },
  {
    id: 2,
    title: "Project Two",
    slug: "project-two",
    tagline: "Immersive 3D experience",
    description: "Immersive 3D experience built with React Three Fiber.",
    heroImage: null,
    problem: "The brand wanted an interactive 3D product viewer that works on the web without plugins.",
    solution: "Delivered a WebGL experience with React Three Fiber, optimized for performance and mobile fallbacks.",
    techStack: ["React", "Three.js", "React Three Fiber", "GSAP"],
    liveUrl: "#",
    sourceUrl: "#",
    nextSlug: "project-three",
  },
  {
    id: 3,
    title: "Project Three",
    slug: "project-three",
    tagline: "Interactive dashboard",
    description: "Interactive dashboard with animations and data visualization.",
    heroImage: null,
    problem: "Data-heavy dashboards often feel static and hard to navigate.",
    solution: "Created an animated, accessible dashboard with clear data viz and scroll-driven storytelling.",
    techStack: ["React", "Framer Motion", "D3.js", "Tailwind"],
    liveUrl: "#",
    sourceUrl: "#",
    nextSlug: "project-one",
  },
];

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}
