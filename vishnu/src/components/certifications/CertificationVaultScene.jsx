import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import CertificateCard3D from "./CertificateCard3D";

const PRIMARY = new THREE.Color("#6C7BFF");
const CYAN = new THREE.Color("#00F0FF");

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function CertificationVaultScene({ certifications, onSelectCertificate, selectedCertificate, mouseRef }) {
  const targetCamX = useRef(0);
  const targetCamY = useRef(0);

  useFrame((state) => {
    const cam = state.camera;
    if (!cam) return;
    const { x: mx, y: my } = mouseRef?.current ?? { x: 0, y: 0 };
    targetCamX.current = mx * 0.4;
    targetCamY.current = my * 0.25;
    cam.position.x = lerp(cam.position.x, targetCamX.current, 0.03);
    cam.position.y = lerp(cam.position.y, targetCamY.current, 0.03);
    cam.lookAt(0, 0, -2);
    cam.updateProjectionMatrix();
  });

  const count = certifications.length;
  const positions = [];
  const cols = count <= 3 ? count : 2;
  const rows = Math.ceil(count / cols);
  const spacingX = 2.2;
  const spacingZ = 1.8;
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = (col - (cols - 1) / 2) * spacingX + (Math.random() - 0.5) * 0.4;
    const z = -2 - row * spacingZ + (Math.random() - 0.5) * 0.3;
    const y = (Math.random() - 0.5) * 0.5;
    positions.push([x, y, z]);
  }

  return (
    <>
      <color attach="background" args={["#0a0a0c"]} />
      <fog attach="fog" args={["#0a0a0c", 4, 14]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[2, 2, 2]} intensity={0.8} />
      <pointLight position={[-2, 1, 1]} color={PRIMARY} intensity={0.5} />
      <pointLight position={[2, -0.5, 0]} color={CYAN} intensity={0.35} />
      <Sparkles
        count={80}
        scale={[12, 8, 10]}
        position={[0, 0, -4]}
        speed={0.3}
        color="#00F0FF"
        size={1.2}
        opacity={0.4}
      />
      <Sparkles
        count={40}
        scale={[10, 6, 8]}
        position={[0, 0, -3]}
        speed={0.2}
        color="#6C7BFF"
        size={1.5}
        opacity={0.25}
      />
      {certifications.map((cert, i) => (
        <CertificateCard3D
          key={cert.id}
          certificate={cert}
          position={positions[i]}
          index={i}
          onSelect={onSelectCertificate}
          isBlurred={selectedCertificate != null && selectedCertificate.id !== cert.id}
        />
      ))}
    </>
  );
}

export default CertificationVaultScene;
