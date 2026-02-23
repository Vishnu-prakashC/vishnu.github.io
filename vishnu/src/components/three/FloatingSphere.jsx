import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function AnimatedSphere() {
  const mesh = useRef();

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.003;
    mesh.current.rotation.x += 0.001;
  });

  return (
    <mesh ref={mesh} scale={2}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#6C7BFF"
        distort={0.3}
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
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
