import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { scrollReveal, hoverScaleSubtle, viewportOnce, motionTransition } from "../../utils/motion";

const PROJECTS = [
  { id: 1, title: "Project One", description: "Full stack application with real-time features and modern UI.", slug: "project-one" },
  { id: 2, title: "Project Two", description: "Immersive 3D experience built with React Three Fiber.", slug: "project-two" },
  { id: 3, title: "Project Three", description: "Interactive dashboard with animations and data visualization.", slug: "project-three" },
];

const cardTransition = { duration: motionTransition.medium.duration, ease: motionTransition.medium.ease };

function ProjectCard({ item }) {
  return (
    <motion.a
      href={`#${item.slug}`}
      data-cursor-label="View"
      data-cursor-hover
      variants={hoverScaleSubtle}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={cardTransition}
      className="group project-card relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-[var(--color-primary)]/30 hover:bg-white/[0.06] hover-scale-on-hover"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(108,123,255,0.12), transparent 70%)",
        }}
      />
      <div className="relative">
        <h3 className="font-heading text-xl font-semibold mb-4 text-[var(--color-text)]">{item.title}</h3>
        <p className="text-[var(--color-text)]/60">{item.description}</p>
      </div>
    </motion.a>
  );
}

function Projects() {
  const sectionVariants = useMemo(
    () => ({
      initial: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      initial: scrollReveal.initial,
      visible: scrollReveal.visible,
    }),
    []
  );

  return (
    <motion.section
      id="projects"
      className="min-h-screen px-6 sm:px-10 py-20"
      initial="initial"
      whileInView="visible"
      viewport={viewportOnce}
      variants={sectionVariants}
    >
      <motion.h2
        className="font-heading text-4xl font-bold mb-16 md:text-5xl"
        variants={itemVariants}
      >
        Featured Projects
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
        {PROJECTS.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <ProjectCard item={item} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default memo(Projects);
