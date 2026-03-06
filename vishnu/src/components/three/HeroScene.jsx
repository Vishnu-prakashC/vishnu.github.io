import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const PRIMARY = new THREE.Color("#6C7BFF");
const ACCENT = new THREE.Color("#FF4ECD");

function HeroShape() {
  const meshRef = useRef(null);
  const ringRef = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.12;
      ringRef.current.rotation.z = t * 0.08;
    }
  });

  return (
    <group>
      <Float speed={0.8} floatIntensity={0.4}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color={PRIMARY}
            wireframe
            emissive={PRIMARY}
            emissiveIntensity={0.15}
          />
        </mesh>
        <mesh ref={ringRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.6, 0.03, 8, 48]} />
          <meshBasicMaterial color={ACCENT} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 4, 2]} intensity={1.2} />
      <pointLight position={[-3, -2, 2]} color="#00F0FF" intensity={0.6} />
      <HeroShape />
    </>
  );
}
