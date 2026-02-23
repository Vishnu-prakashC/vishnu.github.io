<<<<<<< HEAD
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
=======
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../ui/MagneticButton";
import FloatingSphere from "../three/FloatingSphere";

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
>>>>>>> about-working

const Hero = () => {
  return (
<<<<<<< HEAD
    <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
      
      {/* LEFT SIDE TEXT */}
      <div className="max-w-xl space-y-6">
        <h2 className="text-4xl font-bold">
          Hi, I'm <span className="text-blue-500">Vishnu</span>
        </h2>

        <p className="text-gray-400 text-lg">
          Full Stack Developer building modern web experiences with 3D,
          animations and interactive UI.
        </p>

        <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
          View Projects
        </button>
      </div>

      {/* RIGHT SIDE 3D */}
      <div className="w-[400px] h-[400px]">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <Sphere args={[1, 100, 200]} scale={2.2}>
            <meshStandardMaterial color="#3b82f6" />
          </Sphere>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

    </section>
  );
};

export default Hero;
=======
    <section className="h-screen flex items-center px-10">
      <div className="w-1/2">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 opacity-0 leading-tight tracking-tight"
        >
          Hi, I’m <span className="text-indigo-400">Vishnu</span>
        </h1>
        <p
          ref={textRef}
          className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed opacity-0"
        >
          Full Stack Developer building modern web experiences
          with 3D, animations and interactive UI.
        </p>
        <div className="mt-12">
          <MagneticButton>View Projects</MagneticButton>
        </div>
      </div>

      <div className="w-1/2 h-[500px]">
        <FloatingSphere />
      </div>
    </section>
  );
}
>>>>>>> about-working
