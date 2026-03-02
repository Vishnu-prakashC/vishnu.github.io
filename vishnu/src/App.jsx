import { memo, useMemo, lazy, Suspense, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import WaveTransition from "./components/WaveTransition";
import { motionTransition } from "./utils/motion";

const About = lazy(() => import("./components/sections/About"));
const Projects = lazy(() => import("./components/sections/Projects"));

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

  const triggerWave = useCallback(() => {
    waveRef.current?.triggerWave();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
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
          <Projects />
        </Suspense>
      </motion.div>
    </div>
  );
}

export default memo(App);
