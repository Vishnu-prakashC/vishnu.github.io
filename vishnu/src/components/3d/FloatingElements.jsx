import { useFrame } from "@react-three/fiber";
import { useRef, memo } from "react";

/**
 * Small floating 3D shapes with slow rotation and subtle Y float.
 * Very low opacity so they feel premium and non-distracting.
 * Used only inside Canvas (Background3DWrapper).
 */
function FloatingIcosahedron() {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += 0.0012;
    meshRef.current.rotation.y += 0.0018;
    meshRef.current.position.y = 0.5 + Math.sin(t * 0.5) * 0.08;
  });
  return (
    <mesh ref={meshRef} position={[2.5, 0.5, -1]} scale={0.35}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#4a4a6a" transparent opacity={0.06} depthWrite={false} />
    </mesh>
  );
}

function FloatingTorus() {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += 0.0008;
    meshRef.current.rotation.y += 0.0012;
    meshRef.current.position.y = -0.3 + Math.sin(t * 0.5) * 0.08;
  });
  return (
    <mesh ref={meshRef} position={[-2.2, -0.3, -0.5]} scale={0.3}>
      <torusGeometry args={[0.5, 0.2, 8, 16]} />
      <meshBasicMaterial color="#4a4a6a" transparent opacity={0.06} depthWrite={false} />
    </mesh>
  );
}

function FloatingOctahedron() {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += 0.0014;
    meshRef.current.rotation.y += 0.0021;
    meshRef.current.position.y = -0.6 + Math.sin(t * 0.5) * 0.08;
  });
  return (
    <mesh ref={meshRef} position={[1, -0.6, -1.2]} scale={0.25}>
      <octahedronGeometry args={[0.6, 0]} />
      <meshBasicMaterial color="#4a4a6a" transparent opacity={0.06} depthWrite={false} />
    </mesh>
  );
}

function FloatingElements() {
  return (
    <group>
      <FloatingIcosahedron />
      <FloatingTorus />
      <FloatingOctahedron />
    </group>
  );
}

export default memo(FloatingElements);
