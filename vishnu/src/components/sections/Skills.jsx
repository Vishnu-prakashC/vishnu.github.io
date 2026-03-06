import { memo } from "react";
import { motion } from "framer-motion";
import {
  scrollRevealGentle,
  scrollRevealScaleGentle,
  viewportOnceSmooth,
  motionTransitionGentle,
  motionEasingGentle,
} from "../../utils/motion";

const SKILL_GROUPS = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Tailwind", "GSAP", "Framer Motion"],
    accent: "primary",
  },
  {
    label: "Backend & Data",
    skills: ["Node.js", "MongoDB", "PostgreSQL", "REST", "WebSockets"],
    accent: "accent",
  },
  {
    label: "Tools & Graphics",
    skills: ["Three.js", "WebGL", "TypeScript", "Git", "Vite"],
    accent: "cyan",
  },
];

const accentStyles = {
  primary: {
    border: "border-white/10 hover:border-[var(--color-primary)]/40",
    glow: "hover:shadow-[0_0_32px_rgba(108,123,255,0.12)]",
    dot: "bg-[var(--color-primary)]",
    text: "group-hover:text-[var(--color-primary)]",
  },
  accent: {
    border: "border-white/10 hover:border-[var(--color-accent)]/40",
    glow: "hover:shadow-[0_0_32px_rgba(255,78,205,0.12)]",
    dot: "bg-[var(--color-accent)]",
    text: "group-hover:text-[var(--color-accent)]",
  },
  cyan: {
    border: "border-white/10 hover:border-[var(--color-accent-cyan)]/40",
    glow: "hover:shadow-[0_0_32px_rgba(0,240,255,0.12)]",
    dot: "bg-[var(--color-accent-cyan)]",
    text: "group-hover:text-[var(--color-accent-cyan)]",
  },
};

function SkillCard({ name, accent, index }) {
  const style = accentStyles[accent];
  return (
    <motion.div
      variants={scrollRevealScaleGentle}
      transition={{ delay: index * 0.03, ease: motionEasingGentle.out }}
      className={`group relative overflow-hidden rounded-2xl border bg-white/[0.02] px-6 py-5 transition-all duration-500 ${style.border} ${style.glow}`}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { duration: 0.4, ease: motionEasingGentle.inOut },
      }}
    >
      <div className="flex items-center gap-4">
        <span
          className={`h-2 w-2 shrink-0 rounded-full opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125 ${style.dot}`}
        />
        <span
          className={`font-mono text-sm font-medium text-[var(--color-text)]/85 transition-colors duration-300 ${style.text}`}
        >
          {name}
        </span>
      </div>
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 50% 100%, ${accent === "primary" ? "rgba(108,123,255,0.06)" : accent === "accent" ? "rgba(255,78,205,0.06)" : "rgba(0,240,255,0.06)"} 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

function Skills() {
  return (
    <motion.section
      id="skills"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
      initial="initial"
      whileInView="visible"
      viewport={viewportOnceSmooth}
      variants={{
        initial: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: motionTransitionGentle.staggerTight,
            delayChildren: motionTransitionGentle.delayChildren,
          },
        },
      }}
    >
      <motion.h2
        className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-3"
        variants={scrollRevealGentle}
      >
        Skills & Tech
      </motion.h2>
      <motion.p
        className="text-[var(--color-text)]/50 mb-20 max-w-lg text-center text-base tracking-wide md:text-lg"
        variants={scrollRevealGentle}
      >
        Technologies I use to build immersive experiences
      </motion.p>

      <motion.div
        className="grid w-full max-w-5xl gap-12 md:gap-16"
        variants={{
          initial: {},
          visible: {
            transition: {
              staggerChildren: motionTransitionGentle.staggerTight,
              delayChildren: motionTransitionGentle.delayChildren * 0.5,
            },
          },
        }}
      >
        {SKILL_GROUPS.map((group, gi) => (
          <motion.div
            key={group.label}
            variants={scrollRevealGentle}
            className="space-y-5"
          >
            <span className="inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]/70">
              {group.label}
            </span>
            <motion.div
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5"
              variants={{
                initial: {},
                visible: {
                  transition: { staggerChildren: 0.04, delayChildren: 0.06 },
                },
              }}
            >
              {group.skills.map((skill, si) => (
                <SkillCard
                  key={skill}
                  name={skill}
                  accent={group.accent}
                  index={si}
                />
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default memo(Skills);
