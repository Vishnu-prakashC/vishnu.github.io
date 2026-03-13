import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { motionEasingGentle } from "../../utils/motion";
import { certifications } from "../../data/certifications";
import CertificationVaultScene from "./CertificationVaultScene";
import CertificateDetailsModal from "./CertificateDetailsModal";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: motionEasingGentle.inOut },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

function CertificationVaultContent2D({ certifications: certs, onSelect }) {
  return (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {certs.map((cert) => (
        <motion.button
          key={cert.id}
          type="button"
          onClick={() => onSelect(cert)}
          className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-[0_0_40px_rgba(108,123,255,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
            <img
              src={cert.image}
              alt=""
              className="h-7 w-7 object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                const next = e.target.nextElementSibling;
                if (next) next.classList.remove("hidden");
              }}
            />
            <span className="hidden font-heading text-lg font-bold text-[var(--color-primary)]/80">
              {cert.issuer.charAt(0)}
            </span>
          </div>
          <h3 className="font-heading text-lg font-semibold text-[var(--color-text)]">
            {cert.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-[var(--color-accent-cyan)]">
            ✔ Verified Credential
          </p>
        </motion.button>
      ))}
    </div>
  );
}

function CertificationVault({ onClose }) {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [use3D, setUse3D] = useState(true);
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const narrow = window.matchMedia("(max-width: 767px)");
    const check = () => setUse3D(!mq.matches && !coarse.matches && !narrow.matches);
    check();
    mq.addEventListener("change", check);
    coarse.addEventListener("change", check);
    narrow.addEventListener("change", check);
    return () => {
      mq.removeEventListener("change", check);
      coarse.removeEventListener("change", check);
      narrow.removeEventListener("change", check);
    };
  }, []);

  const handlePointerMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseRef.current = {
      x: (x - 0.5) * 2,
      y: (0.5 - y) * 2,
    };
  }, []);

  const handleSelect = useCallback((cert) => setSelectedCertificate(cert), []);
  const handleCloseDetail = useCallback(() => setSelectedCertificate(null), []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black/60 p-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={overlayVariants}
      onPointerMove={handlePointerMove}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 z-10 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm text-[var(--color-text)]/80 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        aria-label="Close certifications"
      >
        Close
      </button>

      <div className="absolute inset-0 flex items-center justify-center">
        {use3D ? (
          <div className="certification-vault-canvas h-full w-full max-h-[90vh] max-w-6xl">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              gl={{ alpha: true, antialias: true }}
              dpr={[1, 2]}
            >
              <CertificationVaultScene
                certifications={certifications}
                onSelectCertificate={handleSelect}
                selectedCertificate={selectedCertificate}
                mouseRef={mouseRef}
              />
            </Canvas>
          </div>
        ) : (
          <div className="w-full overflow-y-auto py-12">
            <CertificationVaultContent2D
              certifications={certifications}
              onSelect={handleSelect}
            />
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedCertificate && (
          <CertificateDetailsModal
            certificate={selectedCertificate}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CertificationVault;
