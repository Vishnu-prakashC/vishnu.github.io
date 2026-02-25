import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedReveal from "../animations/AnimatedReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".project-card");

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen px-10 py-20"
    >
      <h2 className="text-4xl font-bold mb-16">Projects</h2>

      <div className="grid md:grid-cols-3 gap-10">
        {[1, 2, 3].map((item, index) => (
          <AnimatedReveal key={item} delayIndex={index}>
            <div
              className="project-card bg-white/5 border border-white/10 p-8 rounded-xl opacity-0"
            >
              <h3 className="text-xl font-semibold mb-4">
                Project {item}
              </h3>
              <p className="text-white/60">
                Description of project and tech stack used.
              </p>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
