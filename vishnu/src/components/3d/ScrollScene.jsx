import { useFrame, useThree } from "@react-three/fiber";
import { useRef, memo } from "react";

/**
 * Scroll-reactive 3D background scene.
 * Camera position reacts smoothly to scroll offset; renders subtle background geometry.
 * Used only inside Canvas (Background3DWrapper).
 */
function ScrollScene() {
  const meshRef = useRef(null);
  const { camera } = useThree();

  useFrame((state) => {
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const baseZ = 8;
    const factor = 0.003;
    camera.position.z = baseZ + scrollY * factor;
    camera.position.y = scrollY * 0.0005;
    camera.updateProjectionMatrix();

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} scale={3} position={[0, 0, -2]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#2a2a4a"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

export default memo(ScrollScene);
