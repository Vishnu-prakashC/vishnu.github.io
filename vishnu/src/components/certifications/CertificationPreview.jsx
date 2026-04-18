import { memo, useMemo, useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  scrollRevealGentle,
  viewportOnceSmooth,
  motionTransitionGentle,
} from "../../utils/motion";
import { certifications } from "../../data/certifications";

const sectionVariants = {
  initial: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: motionTransitionGentle.staggerNormal,
      delayChildren: motionTransitionGentle.delayChildren,
    },
  },
};

const laneTransition = {
  type: "spring",
  stiffness: 150,
  damping: 28,
  mass: 0.8,
};

function CertificationCard({ cert, cardState, onViewCertificate, onSelect }) {
  const {
    title,
    issuer,
    description,
    date,
    skills,
    verifyUrl,
    credentialId,
    logo,
    logoAlt,
    logoZoom = 1,
  } = cert;
  const [isHovered, setIsHovered] = useState(false);
  const isCenter = cardState === "center";
  const stateClass =
    cardState === "center"
      ? "z-30 opacity-100 scale-100"
      : "z-10 opacity-50 scale-[0.84] saturate-[0.85]";

  return (
    <motion.div
      className={`certification-preview-card group relative w-full max-w-xl overflow-hidden rounded-3xl border bg-white/4 backdrop-blur-xl transition-all duration-300 ${stateClass} ${
        isCenter
          ? "border-white/20"
          : "border-white/8"
      }`}
      style={{
        boxShadow: isCenter
          ? isHovered
            ? "0 0 0 1px rgba(255,255,255,0.12), 0 26px 52px -16px rgba(0,0,0,0.62), 0 0 34px rgba(0,240,255,0.24)"
            : "0 0 0 1px rgba(255,255,255,0.06), 0 22px 42px -14px rgba(0,0,0,0.52), 0 0 24px rgba(0,240,255,0.14)"
          : "0 0 0 1px rgba(255,255,255,0.03), 0 14px 28px -12px rgba(0,0,0,0.45)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={!isCenter ? onSelect : undefined}
      animate={isCenter ? { y: isHovered ? -6 : -2 } : { y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      whileHover={!isCenter ? { y: -2, opacity: 0.64, scale: 0.86 } : undefined}
      aria-hidden={false}
      role={!isCenter ? "button" : undefined}
      tabIndex={!isCenter ? 0 : undefined}
      onKeyDown={
        !isCenter
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect?.();
              }
            }
          : undefined
      }
    >
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          isCenter ? "opacity-100" : "opacity-30"
        }`}
        style={{
          background: "radial-gradient(ellipse 75% 70% at 50% 112%, rgba(0,240,255,0.16), transparent 72%)",
        }}
      />
      <div className="relative p-8 md:p-10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/80 ring-1 ring-white/10">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white">
              {logo ? (
                <img
                  src={logo}
                  alt={logoAlt || `${issuer} logo`}
                  className="h-full w-full object-contain p-0.5"
                  loading="lazy"
                  decoding="async"
                  style={{
                    transform: `scale(${logoZoom})`,
                    filter: "brightness(1.05) contrast(1.06)",
                    transformOrigin: "center",
                  }}
                />
              ) : (
                <span className="font-heading text-xs font-semibold text-black/80">
                  {issuer.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text)]/50">
              CERTIFICATION
            </span>
            <span className="font-heading text-lg font-semibold text-[var(--color-text)]">
              {title}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-sm text-[var(--color-text)]/60">Issued by {issuer}</p>
          {description && (
            <p className="text-sm text-[var(--color-text)]/70">{description}</p>
          )}
          <p className="font-mono text-xs text-[var(--color-text)]/50">
            {date}
            {credentialId && ` · ${credentialId}`}
          </p>
        </div>

        {skills?.length > 0 && (
          <div className="mt-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-text)]/50">
              Skills
            </span>
            <p className="mt-2 text-sm text-[var(--color-text)]/80">
              {skills.join(" · ")}
            </p>
          </div>
        )}

        <motion.div
          className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-accent-cyan)]/35 bg-[var(--color-accent-cyan)]/12 px-4 py-2.5 shadow-[0_0_26px_rgba(0,240,255,0.15)]"
          animate={{
            boxShadow: [
              "0 0 18px rgba(0,240,255,0.10)",
              "0 0 32px rgba(0,240,255,0.22)",
              "0 0 18px rgba(0,240,255,0.10)",
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[var(--color-accent-cyan)]" aria-hidden>
            ✔
          </span>
          <span className="font-mono text-sm font-semibold text-[var(--color-accent-cyan)]">
            Verified Credential
          </span>
        </motion.div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => onViewCertificate(cert)}
            className="flex-1 rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-center font-mono text-sm font-medium text-[var(--color-text)]/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_10px_24px_rgba(0,0,0,0.35)] hover:text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!isCenter}
          >
            View Certificate
          </button>
          {verifyUrl && (
            <a
              href={verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 rounded-xl border border-white/12 px-4 py-3 text-center font-mono text-xs font-medium text-[var(--color-text)]/70 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                isCenter
                  ? "hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/5 hover:text-[var(--color-text)]"
                  : "pointer-events-none opacity-45"
              }`}
            >
              View Official Credential
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function CertificationPreview() {
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = certifications.length;
  const safeIndex = ((activeIndex % count) + count) % count;
  const wheelDeltaRef = useRef(0);
  const wheelResetTimerRef = useRef(null);

  const getWrapped = useCallback(
    (idx) => certifications[((idx % count) + count) % count],
    [count]
  );

  const lanes = useMemo(
    () => [
      { key: "left", cert: getWrapped(safeIndex - 1), offset: -1 },
      { key: "center", cert: getWrapped(safeIndex), offset: 0 },
      { key: "right", cert: getWrapped(safeIndex + 1), offset: 1 },
    ],
    [getWrapped, safeIndex]
  );

  const paginate = useCallback((dir) => {
    setActiveIndex((prev) => prev + dir);
  }, []);

  const jumpTo = useCallback((idx) => setActiveIndex(idx), []);

  const handleWheel = useCallback(
    (e) => {
      const horizontalIntent =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.9
          ? e.deltaX
          : e.shiftKey
            ? e.deltaY
            : 0;
      if (!horizontalIntent) return;

      e.preventDefault();
      wheelDeltaRef.current += horizontalIntent;

      if (wheelResetTimerRef.current) {
        window.clearTimeout(wheelResetTimerRef.current);
      }
      wheelResetTimerRef.current = window.setTimeout(() => {
        wheelDeltaRef.current = 0;
      }, 140);

      const threshold = 58;
      if (wheelDeltaRef.current > threshold) {
        paginate(1);
        wheelDeltaRef.current = 0;
      } else if (wheelDeltaRef.current < -threshold) {
        paginate(-1);
        wheelDeltaRef.current = 0;
      }
    },
    [paginate]
  );

  useEffect(() => {
    return () => {
      if (wheelResetTimerRef.current) {
        window.clearTimeout(wheelResetTimerRef.current);
      }
    };
  }, []);

  return (
    <motion.section
      id="certifications"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
      initial="initial"
      whileInView="visible"
      viewport={viewportOnceSmooth}
      variants={sectionVariants}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") paginate(-1);
        if (e.key === "ArrowRight") paginate(1);
      }}
      tabIndex={0}
    >
      <div className="section-content flex w-full max-w-6xl flex-col items-center">
        <motion.h2
          className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-3"
          variants={scrollRevealGentle}
        >
          Certifications
        </motion.h2>
        <motion.p
          className="text-[var(--color-text)]/50 mb-16 max-w-lg text-center text-base tracking-wide md:text-lg"
          variants={scrollRevealGentle}
        >
          Verified credentials and professional certifications
        </motion.p>

        <motion.div
          className="relative mt-1 h-[540px] w-full overflow-visible md:h-[560px]"
          variants={scrollRevealGentle}
          onWheel={handleWheel}
        >
          <div className="relative mx-auto h-full w-full max-w-6xl px-2 md:px-0">
            <AnimatePresence mode="popLayout">
              {lanes.map((lane) => (
              <motion.div
                key={`${lane.key}-${lane.cert.id}-${safeIndex}`}
                className="absolute left-1/2 top-0 w-full max-w-xl -translate-x-1/2"
                animate={{
                  x:
                    lane.offset === 0
                      ? "0%"
                      : lane.offset < 0
                        ? "-74%"
                        : "74%",
                  opacity: lane.offset === 0 ? 1 : 0.52,
                  scale: lane.offset === 0 ? 1 : 0.86,
                  zIndex: lane.offset === 0 ? 30 : 10,
                }}
                transition={laneTransition}
                drag={lane.offset === 0 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (lane.offset !== 0) return;
                  if (info.offset.x > 70) paginate(-1);
                  if (info.offset.x < -70) paginate(1);
                }}
              >
                <CertificationCard
                  cert={lane.cert}
                  cardState={lane.offset === 0 ? "center" : "side"}
                  onViewCertificate={setActiveCertificate}
                  onSelect={() => paginate(lane.offset)}
                />
              </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div className="mt-8 flex items-center gap-2.5" variants={scrollRevealGentle}>
          {certifications.map((cert, idx) => (
            <button
              key={cert.id}
              type="button"
              onClick={() => jumpTo(idx)}
              aria-label={`Go to certification ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === safeIndex
                  ? "w-8 bg-[var(--color-primary)] shadow-[0_0_14px_rgba(108,123,255,0.65)]"
                  : "w-2.5 bg-white/25 hover:bg-white/45"
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Full certificate image overlay with Close button */}
      <AnimatePresence>
        {activeCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6"
          >
            <button
              type="button"
              onClick={() => setActiveCertificate(null)}
              className="absolute right-6 top-6 rounded-xl border border-white/10 bg-black/60 px-4 py-2 font-mono text-xs text-white/80 backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              Close
            </button>
            <div className="flex w-full items-center justify-center">
              <img
                src={activeCertificate.image}
                alt={activeCertificate.title}
                className="block h-auto max-h-[90vh] w-auto max-w-[96vw] rounded-3xl border border-white/10 object-contain bg-white"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default memo(CertificationPreview);
