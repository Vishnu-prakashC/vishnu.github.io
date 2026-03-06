import { memo, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import HeroScene from "./HeroScene";

function Hero3DFallback() {
  return (
    <div
      className="aspect-square w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--color-primary)]/20 via-transparent to-[var(--color-accent)]/20"
      aria-hidden
    />
  );
}

function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [preferReducedMotion, setPreferReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPreferReducedMotion(mq.matches);
    const handler = () => setPreferReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!mounted || preferReducedMotion) {
    return <Hero3DFallback />;
  }

  return (
    <div className="aspect-square w-full max-w-md rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(Hero3D);
