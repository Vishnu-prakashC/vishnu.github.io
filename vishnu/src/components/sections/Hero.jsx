import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <section className="h-screen flex items-center justify-center text-center px-6">
      <div>
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 opacity-0"
        >
          Hi, I’m Vichu
        </h1>
        <p
          ref={textRef}
          className="text-white/60 max-w-xl mx-auto text-lg opacity-0"
        >
          Aspiring MERN Stack Developer with a strong foundation in building responsive and interactive web applications. 
          Passionate about creating seamless user experiences using modern technologies, 
          with solid skills in Figma and UI/UX design.
        </p>
      </div>
    </section>
  );
}
