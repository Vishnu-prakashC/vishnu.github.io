import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float, Line } from "@react-three/drei";
import * as THREE from "three";

const SKILLS = [
  "React",
  "Node",
  "Three.js",
  "MongoDB",
  "Tailwind",
  "GSAP",
  "WebGL",
];

const PRIMARY = new THREE.Color("#6C7BFF");
const ACCENT = new THREE.Color("#FF4ECD");
const CYAN = new THREE.Color("#00F0FF");

function SkillOrb({ label, position, color }) {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
        </mesh>
        <Html
          position={[0, 0.35, 0]}
          center
          distanceFactor={2}
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "10px",
            color: "rgba(255,255,255,0.9)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          <span>{label}</span>
        </Html>
      </group>
    </Float>
  );
}

function OrbitRing({ radius }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const t = (i / 64) * Math.PI * 2;
      pts.push([Math.cos(t) * radius, 0, Math.sin(t) * radius]);
    }
    return pts;
  }, [radius]);
  return <Line points={points} color="#6C7BFF" />;
}

export default function SkillsOrbitScene() {
  const groupRef = useRef(null);
  const orbitRadius = 1.8;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  const colors = [PRIMARY, ACCENT, CYAN, PRIMARY, ACCENT, CYAN, PRIMARY];

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <pointLight position={[0, 0, 2]} color="#00F0FF" intensity={0.4} />
      <group ref={groupRef}>
        <OrbitRing radius={orbitRadius} />
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color={PRIMARY} emissive={PRIMARY} emissiveIntensity={0.3} />
        </mesh>
        {SKILLS.map((label, i) => {
          const angle = (i / SKILLS.length) * Math.PI * 2;
          const x = Math.cos(angle) * orbitRadius;
          const z = Math.sin(angle) * orbitRadius;
          return (
            <SkillOrb
              key={label}
              label={label}
              position={[x, 0, z]}
              color={colors[i % colors.length]}
            />
          );
        })}
      </group>
    </>
  );
}
