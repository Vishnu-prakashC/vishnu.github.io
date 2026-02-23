import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../ui/MagneticButton";
import HeroScene from "../three/HeroScene";

export default function Hero() {
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    ).fromTo(
      textRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
      "-=0.6"
    );
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-center px-6 pt-24 overflow-hidden">
      <HeroScene />
      <div className="relative z-10 max-w-4xl">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 opacity-0 leading-tight tracking-tight"
        >
          Hi, I’m <span className="text-indigo-400">Vishnu</span>
        </h1>
        <p
          ref={textRef}
          className="text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed opacity-0"
        >
          Full Stack Developer building modern web experiences
          with 3D, animations and interactive UI.
        </p>
        <div className="mt-12 flex justify-center">
          <MagneticButton>View Projects</MagneticButton>
        </div>
      </div>
    </section>
  );
}