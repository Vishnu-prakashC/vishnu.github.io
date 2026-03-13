import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float, useCursor } from "@react-three/drei";

const CARD_WIDTH = 260;
const CARD_HEIGHT = 160;

function CertificateCard3D({ certificate, position, index, onSelect, isBlurred }) {
  const groupRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime + index * 0.7;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.08;
  });

  const { title, issuer, image } = certificate;

  return (
    <Float speed={1.5} floatIntensity={0.25} rotationIntensity={0.1}>
      <group
        ref={groupRef}
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(certificate);
        }}
      >
        <mesh>
          <planeGeometry args={[1.6, 1]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        <Html
          transform
          center
          distanceFactor={2.2}
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            pointerEvents: "none",
            transition: "filter 0.3s ease, transform 0.3s ease",
            filter: isBlurred ? "blur(6px)" : "none",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        >
          <div
            className="certificate-card-3d"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 16,
              border: hovered
                ? "1px solid rgba(108, 123, 255, 0.5)"
                : "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(12px)",
              boxShadow: hovered
                ? "0 0 40px rgba(108, 123, 255, 0.2), 0 0 80px rgba(0, 240, 255, 0.08)"
                : "0 8px 32px rgba(0, 0, 0, 0.3)",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontFamily: "Space Grotesk, system-ui, sans-serif",
              color: "#fff",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <img
                src={image}
                alt=""
                style={{ width: 28, height: 28, objectFit: "contain" }}
                onError={(e) => {
                  e.target.style.display = "none";
                  if (e.target.nextElementSibling) {
                    e.target.nextElementSibling.style.display = "block";
                  }
                }}
              />
              <span
                style={{
                  display: "none",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "rgba(108, 123, 255, 0.9)",
                }}
              >
                {issuer.charAt(0)}
              </span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>
              {title}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(0, 240, 255, 0.9)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              ✔ Verified
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

export default CertificateCard3D;
