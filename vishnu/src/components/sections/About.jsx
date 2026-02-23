<<<<<<< HEAD
const About = () => {
  return (
    <section id="about" className="px-10 py-20">
      <h3 className="text-3xl font-bold mb-6">About Me</h3>

      <p className="text-gray-400 max-w-2xl">
        Passionate about building scalable full stack applications,
        interactive UI systems, and performance-driven experiences. 
      </p>
=======
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-3xl text-center">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold mb-6 opacity-0"
        >
          About Me
        </h2>
        <p
          ref={textRef}
          className="text-white/60 text-lg leading-relaxed opacity-0"
        >
          I am an engineering student passionate about building scalable web
          applications, real-time systems, and immersive 3D experiences using
          modern frontend technologies.
        </p>
      </div>
>>>>>>> about-working
    </section>
  );
};

export default About;
