import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex flex-col justify-center px-6 max-w-5xl mx-auto"
    >
      <h2 className="text-4xl font-bold mb-12">About Me</h2>

      {[1, 2, 3].map((_, i) => (
        <div
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
          className="mb-10 p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm opacity-0"
        >
          <h3 className="text-xl font-semibold mb-2">
            Engineering & Development
          </h3>
          <p className="text-white/60">
            Passionate about building scalable full stack applications,
            interactive UI systems, and performance-driven experiences.
          </p>
        </div>
      ))}
    </section>
  );
}
