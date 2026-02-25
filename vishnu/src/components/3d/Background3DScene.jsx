import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import ScrollScene from "./ScrollScene";
import FloatingElements from "./FloatingElements";

/**
 * Single Canvas for scroll-reactive background + floating elements + bloom.
 * Lazy-loaded by Background3DWrapper to avoid blocking initial paint.
 */
export default function Background3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 2, 2]} intensity={0.6} />
      <ScrollScene />
      <FloatingElements />
      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={0.4} luminanceSmoothing={0.9} />
      </EffectComposer>
    </Canvas>
  );
}
