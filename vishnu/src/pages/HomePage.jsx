import { memo, useMemo, lazy, Suspense, useRef, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import ScrollProgress from "../components/ui/ScrollProgress";
import { motionTransition } from "../utils/motion";
import { useScroll } from "../contexts/ScrollContext";

const About = lazy(() => import("../components/sections/About"));
const Skills = lazy(() => import("../components/sections/Skills"));
const Certifications = lazy(() => import("../components/sections/Certifications"));
const Projects = lazy(() => import("../components/sections/Projects"));
const Contact = lazy(() => import("../components/sections/Contact"));

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = motionTransition.page;

const SECTION_IDS = ["about", "skills", "certifications", "projects", "contact"];

function HomePage({ triggerWaveRef, isWaveBusy }) {
  const transition = useMemo(() => pageTransition, []);
  const location = useLocation();
  const { scrollToSection } = useScroll();
  const prevPathRef = useRef(location.pathname);
  const firstRunWithHomeHashRef = useRef(true);

  useEffect(() => {
    const wasOnHome = prevPathRef.current === "/";
    prevPathRef.current = location.pathname;
    if (location.pathname !== "/" || !location.hash) return;
    const id = location.hash.slice(1).toLowerCase();
    if (!SECTION_IDS.includes(id)) return;
    const isLandingOnHome = !wasOnHome && location.pathname === "/";
    const isInitialLoadWithHash = wasOnHome && firstRunWithHomeHashRef.current;
    if (!isLandingOnHome && !isInitialLoadWithHash) return;
    if (isInitialLoadWithHash) firstRunWithHomeHashRef.current = false;
    const t = setTimeout(() => {
      scrollToSection(id, { duration: 1.2, offset: -100 });
    }, 300);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash, scrollToSection]);

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
        <Certifications />
        <Projects />
        <Contact />
      </Suspense>
    </motion.div>
  );
}

export default memo(HomePage);
