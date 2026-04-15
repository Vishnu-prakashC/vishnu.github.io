import { memo, useMemo, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  scrollRevealGentle,
  scrollRevealScaleGentle,
  viewportOnceSmooth,
  motionTransitionGentle,
  motionEasingGentle,
} from "../../utils/motion";
import { PROJECTS } from "../../data/projects";

const MotionLink = motion.create(Link);

const TILT_MAX = 8;
const TILT_PERSPECTIVE = 1200;

function ProjectCard({ item }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * TILT_MAX,
      y: x * TILT_MAX,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <MotionLink
      ref={cardRef}
      to={`/project/${item.slug}`}
      aria-label={`View ${item.title}`}
      data-cursor-label="View"
      data-cursor-hover
      data-cursor-project-preview
      className="group project-card relative block overflow-hidden rounded-2xl p-[1px] transition-all duration-500 hover-scale-on-hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        perspective: TILT_PERSPECTIVE,
        transformStyle: "preserve-3d",
      }}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 },
      }}
      transition={{ duration: 0.35, ease: motionEasingGentle.inOut }}
    >
      {/* Animated gradient border / glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "linear-gradient(135deg, rgba(108,123,255,0.5) 0%, rgba(255,78,205,0.3) 35%, rgba(0,240,255,0.2) 70%, rgba(108,123,255,0.4) 100%)",
          backgroundSize: "200% 200%",
          animation: isHovered ? "gradient-shift 3s ease infinite" : "none",
          filter: "blur(1px)",
        }}
      />
      <div
        className="absolute inset-[1px] rounded-2xl bg-[var(--color-bg)]"
        style={{ zIndex: 0 }}
      />
      <motion.div
        className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-500 group-hover:border-white/20 group-hover:bg-white/[0.06]"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.2s ease-out, border-color 0.35s, background 0.35s",
          boxShadow: isHovered
            ? "0 0 40px rgba(108,123,255,0.12), inset 0 0 60px rgba(108,123,255,0.03)"
            : "none",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(108,123,255,0.15), transparent 70%)",
          }}
        />
        <div className="relative">
          <h3 className="font-heading text-xl font-semibold mb-4 text-[var(--color-text)]">{item.title}</h3>
          <p className="text-[var(--color-text)]/60">{item.description}</p>
        </div>
      </motion.div>
    </MotionLink>
  );
}

function Projects() {
  const sectionVariants = useMemo(
    () => ({
      initial: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: motionTransitionGentle.staggerNormal,
          delayChildren: motionTransitionGentle.delayChildren,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(() => scrollRevealGentle, []);

  return (
    <motion.section
      id="projects"
      className="min-h-screen px-6 sm:px-10 py-20"
      initial="initial"
      whileInView="visible"
      viewport={viewportOnceSmooth}
      variants={sectionVariants}
    >
      <div className="section-content mx-auto w-full max-w-6xl">
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
          {PROJECTS.map((item, i) => (
            <motion.div
              key={item.id}
              variants={scrollRevealScaleGentle}
              transition={{
                delay: motionTransitionGentle.delayChildren + i * motionTransitionGentle.staggerTight,
                ease: motionEasingGentle.out,
              }}
            >
              <ProjectCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default memo(Projects);
