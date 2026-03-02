import { memo, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { heroTitle, heroSubtitle, motionTransition } from "../../utils/motion";

function Hero({ onTriggerWave, isWaveBusy }) {
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (isWaveBusy || !onTriggerWave) return;
    gsap.to(buttonRef.current, { scale: 0.95, duration: 0.1 });
    gsap.to(buttonRef.current, { scale: 1, duration: 0.15, delay: 0.05 });
    onTriggerWave();
  };

  return (
    <section className="h-screen flex items-center px-6 sm:px-10">
      <div className="hero-content w-full">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight tracking-tight"
          variants={heroTitle}
          initial="initial"
          animate="animate"
        >
          Hi, I'm <span className="text-indigo-400">Vishnu</span>
        </motion.h1>
        <motion.p
          className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed"
          variants={heroSubtitle}
          initial="initial"
          animate="animate"
          transition={motionTransition.medium}
        >
          Full Stack Developer building modern web experiences
          with animations and interactive UI.
        </motion.p>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.25 }}
        >
          <button
            ref={buttonRef}
            type="button"
            onClick={handleClick}
            disabled={isWaveBusy}
            className="px-8 py-4 bg-[#6366F1] hover:bg-indigo-500 text-white rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e100f] disabled:opacity-70 disabled:cursor-not-allowed transition-colors hover-scale-on-hover"
          >
            View Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Hero);
