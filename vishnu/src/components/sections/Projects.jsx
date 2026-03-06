import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { scrollReveal, hoverScaleSubtle, viewportOnce, motionTransition } from "../../utils/motion";
import { PROJECTS } from "../../data/projects";

const cardTransition = { duration: motionTransition.medium.duration, ease: motionTransition.medium.ease };

function ProjectCard({ item }) {
  return (
    <motion.div
      data-cursor-label="View"
      data-cursor-hover
      variants={hoverScaleSubtle}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={cardTransition}
      className="group project-card relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:border-[var(--color-primary)]/30 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(108,123,255,0.08)] hover-scale-on-hover"
    >
      <Link to={`/project/${item.slug}`} className="absolute inset-0 z-10" aria-label={`View ${item.title}`} />
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
    </motion.div>
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
        className="font-heading text-4xl font-bold mb-4 md:text-5xl lg:text-6xl"
        variants={itemVariants}
      >
        Featured Projects
      </motion.h2>
      <motion.p
        className="text-[var(--color-text)]/50 mb-16 max-w-xl text-lg"
        variants={itemVariants}
      >
        Selected work — from web apps to interactive experiences
      </motion.p>

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
