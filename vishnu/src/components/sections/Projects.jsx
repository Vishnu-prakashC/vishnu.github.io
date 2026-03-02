import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { scrollReveal, hoverScaleSubtle, viewportOnce, motionTransition } from "../../utils/motion";

const PROJECTS = [
  { id: 1, title: "Project 1", description: "Description of project and tech stack used." },
  { id: 2, title: "Project 2", description: "Description of project and tech stack used." },
  { id: 3, title: "Project 3", description: "Description of project and tech stack used." },
];

const cardTransition = { duration: motionTransition.medium.duration, ease: motionTransition.medium.ease };

function ProjectCard({ item }) {
  return (
    <motion.div
      variants={hoverScaleSubtle}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={cardTransition}
      className="project-card bg-white/5 border border-white/10 p-8 rounded-xl hover:border-white/20 hover:bg-white/[0.07] transition-colors duration-200 hover-scale-on-hover"
    >
      <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
      <p className="text-white/60">{item.description}</p>
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
        className="text-4xl font-bold mb-16"
        variants={itemVariants}
      >
        Projects
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
