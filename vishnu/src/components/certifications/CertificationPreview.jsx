import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  scrollRevealGentle,
  viewportOnceSmooth,
  motionTransitionGentle,
} from "../../utils/motion";
import { previewCertification } from "../../data/certifications";

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

function CertificationPreview() {
  const cert = previewCertification;
  const { title, issuer, date, skills, image, verifyUrl, credentialId } = cert;
  const [showImage, setShowImage] = useState(false);

  return (
    <motion.section
      id="certifications"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
      initial="initial"
      whileInView="visible"
      viewport={viewportOnceSmooth}
      variants={sectionVariants}
    >
      <div className="section-content flex w-full max-w-xl flex-col items-center">
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
          className="w-full max-w-xl"
          variants={scrollRevealGentle}
        >
        {/* Card: no movement / swipe, only subtle border + shadow change */}
        <div
          className="certification-preview-card relative w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-white/20 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--color-bg)]"
          style={{
            boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 40px -12px rgba(0,0,0,0.4)",
          }}
        >
          <div className="relative p-8 md:p-10">
            {/* Oracle logo row (no big certificate image in front) */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/80 ring-1 ring-white/10">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white">
                  <img
                    src="/certificates/Oracle%20LOGO.jpg"
                    alt="Oracle Cloud logo"
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text)]/50">
                  Certification
                </span>
                <span className="font-heading text-lg font-semibold text-[var(--color-text)]">
                  {title}
                </span>
              </div>
            </div>

            {/* Meta info */}
            <div className="mt-4 space-y-1">
              <p className="text-sm text-[var(--color-text)]/60">
                Issued by {issuer}
              </p>
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

            {/* Verified badge */}
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-[var(--color-accent-cyan)]/20 bg-[var(--color-accent-cyan)]/5 px-4 py-3">
              <span className="text-[var(--color-accent-cyan)]" aria-hidden>
                ✔
              </span>
              <span className="font-mono text-sm font-semibold text-[var(--color-accent-cyan)]">
                Verified Credential
              </span>
            </div>

            {/* Actions: view certificate image + official URL */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowImage(true)}
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center font-mono text-sm font-medium text-[var(--color-text)]/90 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              >
                View Certificate
              </button>
              {verifyUrl && (
                <a
                  href={verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl border border-white/5 px-4 py-3 text-center font-mono text-xs font-medium text-[var(--color-text)]/60 transition-colors hover:border-white/20 hover:text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                >
                  View Official Credential
                </a>
              )}
            </div>
          </div>
        </div>
        </motion.div>
      </div>

      {/* Full certificate image overlay with Close button */}
      <AnimatePresence>
        {showImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6"
          >
            <button
              type="button"
              onClick={() => setShowImage(false)}
              className="absolute right-6 top-6 rounded-xl border border-white/10 bg-black/60 px-4 py-2 font-mono text-xs text-white/80 backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              Close
            </button>
            <div className="flex w-full items-center justify-center">
              <img
                src={image}
                alt={title}
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
