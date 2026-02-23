import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { MeshDistortMaterial } from "@react-three/drei";

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />

        <Sphere args={[1, 64, 64]} scale={1.5}>
          <MeshDistortMaterial
            color="#6C7BFF"
            distort={0.3}
            speed={2}
            roughness={0.2}
          />
        </Sphere>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}