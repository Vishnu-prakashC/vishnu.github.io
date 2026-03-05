import { memo, useMemo, lazy, Suspense, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import WaveTransition from "./components/WaveTransition";
import IntroLoader from "./components/ui/IntroLoader";
import ScrollProgress from "./components/ui/ScrollProgress";
import CustomCursor from "./components/cursor/CustomCursor";
import { motionTransition } from "./utils/motion";

const About = lazy(() => import("./components/sections/About"));
const Skills = lazy(() => import("./components/sections/Skills"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Contact = lazy(() => import("./components/sections/Contact"));

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = motionTransition.page;

function App() {
  const transition = useMemo(() => pageTransition, []);
  const waveRef = useRef(null);
  const [isWaveBusy, setIsWaveBusy] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const triggerWave = useCallback(() => {
    waveRef.current?.triggerWave();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <IntroLoader onFinish={() => setIntroDone(true)} />
      {introDone && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <WaveTransition ref={waveRef} onBusyChange={setIsWaveBusy} />
          <Navbar />
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
        </>
      )}
    </div>
  );
}

export default memo(App);
