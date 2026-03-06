import { memo, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import SkillsOrbitScene from "./SkillsOrbitScene";

function SkillsOrbitFallback() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
      <span className="font-mono text-sm uppercase tracking-widest text-[var(--color-primary)]/80">
        You
      </span>
      {["React", "Node", "Three.js", "MongoDB", "Tailwind", "GSAP", "WebGL"].map((skill) => (
        <span
          key={skill}
          className="font-mono rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--color-text)]/90"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

function SkillsOrbit() {
  const [mounted, setMounted] = useState(false);
  const [use3D, setUse3D] = useState(true);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    setUse3D(!mq.matches && !coarse.matches);
  }, []);

  if (!mounted || !use3D) {
    return <SkillsOrbitFallback />;
  }

  return (
    <div className="h-[320px] w-full max-w-md">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SkillsOrbitScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(SkillsOrbit);
