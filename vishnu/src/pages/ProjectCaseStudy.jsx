import { memo, useEffect, useLayoutEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjectBySlug, PROJECTS } from "../data/projects";
import { scrollReveal, viewportOnce } from "../utils/motion";
import { useScroll } from "../contexts/ScrollContext";

function CaseStudyContent({ project }) {
  if (!project) return null;

  return (
    <article className="min-h-screen">
      <header className="relative flex min-h-[60vh] items-end px-6 pb-16 pt-28 sm:px-10">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/10 via-transparent to-[var(--color-bg)]"
          aria-hidden
        />
        <div className="relative">
          <motion.span
            className="font-mono text-sm uppercase tracking-widest text-[var(--color-primary)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Case Study
          </motion.span>
          <motion.h1
            className="font-heading mt-2 text-4xl font-bold sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {project.title}
          </motion.h1>
          <motion.p
            className="mt-4 max-w-xl text-lg text-[var(--color-text)]/60"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.tagline}
          </motion.p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <motion.section
          className="py-16"
          initial="initial"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{ initial: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
        >
          <h2 className="font-heading text-2xl font-semibold">Overview</h2>
          <p className="mt-4 text-[var(--color-text)]/80 leading-relaxed">{project.description}</p>
        </motion.section>

        <motion.section
          className="py-16 border-t border-white/10"
          initial="initial"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scrollReveal}
        >
          <h2 className="font-heading text-2xl font-semibold">Problem</h2>
          <p className="mt-4 text-[var(--color-text)]/80 leading-relaxed">{project.problem}</p>
        </motion.section>

        <motion.section
          className="py-16 border-t border-white/10"
          initial="initial"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scrollReveal}
        >
          <h2 className="font-heading text-2xl font-semibold">Solution</h2>
          <p className="mt-4 text-[var(--color-text)]/80 leading-relaxed">{project.solution}</p>
        </motion.section>

        <motion.section
          className="py-16 border-t border-white/10"
          initial="initial"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scrollReveal}
        >
          <h2 className="font-heading text-2xl font-semibold">Tech Stack</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="font-mono rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--color-text)]/90"
              >
                {tech}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          className="py-16 border-t border-white/10"
          initial="initial"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scrollReveal}
        >
          <h2 className="font-heading text-2xl font-semibold">Live Demo</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            <a
              href={project.liveUrl}
              className="rounded-full bg-[var(--color-primary)] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
            >
              View live site
            </a>
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                className="rounded-full border border-white/20 px-6 py-3 font-medium transition-colors hover:border-[var(--color-primary)]/50"
              >
                Source code
              </a>
            )}
          </div>
        </motion.section>

        <motion.section
          className="py-16 border-t border-white/10"
          initial="initial"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scrollReveal}
        >
          <h2 className="font-heading text-2xl font-semibold">Next Project</h2>
          <div className="mt-4">
            {(() => {
              const next = PROJECTS.find((p) => p.slug === project.nextSlug);
              return next ? (
                <Link
                  to={`/project/${next.slug}`}
                  className="font-heading text-lg font-medium text-[var(--color-primary)] hover:underline"
                >
                  → {next.title}
                </Link>
              ) : null;
            })()}
          </div>
        </motion.section>
      </div>
    </article>
  );
}

function ProjectCaseStudy() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { scrollToTop } = useScroll();
  const project = getProjectBySlug(slug);

  useLayoutEffect(() => {
    scrollToTop();
  }, [slug, scrollToTop]);

  useEffect(() => {
    scrollToTop();
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      scrollToTop();
      raf2 = requestAnimationFrame(() => {
        scrollToTop();
      });
    });
    const timeouts = [0, 50, 150, 350, 600].map((ms) => setTimeout(scrollToTop, ms));
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      timeouts.forEach(clearTimeout);
    };
  }, [slug, scrollToTop]);

  if (!project) {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <>
      <CaseStudyContent project={project} />
    </>
  );
}

export default memo(ProjectCaseStudy);
