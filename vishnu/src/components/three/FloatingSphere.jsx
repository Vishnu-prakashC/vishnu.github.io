import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";

function AnimatedSphere() {
  const mesh = useRef();
  const { camera } = useThree();

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.003;
    mesh.current.rotation.x += 0.001;

    // subtle floating effect
    mesh.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;

    // scroll-based camera push
    const scrollY = window.scrollY;
    camera.position.z = 5 + scrollY * 0.002;
  });

  return (
    <mesh ref={mesh} scale={2}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        color="#6C7BFF"
        distort={0.4}
        speed={2}
        roughness={0}
      />
    </mesh>
  );
}

export default function FloatingSphere() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 2, 2]} />
      <AnimatedSphere />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={0.8} />
      </EffectComposer>
    </Canvas>
  );
}
