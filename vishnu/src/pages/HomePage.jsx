import { memo, useMemo, lazy, Suspense, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import ScrollProgress from "../components/ui/ScrollProgress";
import { motionTransition } from "../utils/motion";

const About = lazy(() => import("../components/sections/About"));
const Skills = lazy(() => import("../components/sections/Skills"));
const Projects = lazy(() => import("../components/sections/Projects"));
const Contact = lazy(() => import("../components/sections/Contact"));

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = motionTransition.page;

function HomePage({ triggerWaveRef, isWaveBusy }) {
  const transition = useMemo(() => pageTransition, []);

  const triggerWave = useCallback(() => {
    triggerWaveRef?.current?.triggerWave?.();
  }, [triggerWaveRef]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={transition}
    >
      <Hero onTriggerWave={triggerWave} isWaveBusy={isWaveBusy} />
      <Suspense fallback={<section className="min-h-[50vh]" aria-hidden />}>
        <About />
        <Skills />
        <Projects />
        <Contact />
      </Suspense>
    </motion.div>
  );
}

export default memo(HomePage);
