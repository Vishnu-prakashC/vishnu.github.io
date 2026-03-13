import { memo } from "react";
import { motion } from "framer-motion";
import { motionEasingGentle } from "../../utils/motion";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: motionEasingGentle.inOut },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 8,
    transition: { duration: 0.25 },
  },
};

function CertificateDetailsModal({ certificate, onClose }) {
  if (!certificate) return null;

  const {
    title,
    issuer,
    date,
    skills,
    image,
    verifyUrl,
    credentialId,
  } = certificate;

  return (
    <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-detail-title"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={backdropVariants}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          aria-hidden
        />
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={panelVariants}
          className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[var(--color-bg)]/95 shadow-2xl backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 25px 50px -12px rgba(0,0,0,0.6), 0 0 80px -20px rgba(108,123,255,0.15)",
          }}
        >
          <div className="p-8">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 rounded-lg p-2 text-[var(--color-text)]/50 transition-colors hover:bg-white/5 hover:text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-start gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <img
                  src={image}
                  alt=""
                  className="h-8 w-8 object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    const fallback = e.target.nextElementSibling;
                    if (fallback) fallback.classList.remove("hidden");
                  }}
                />
                <span className="hidden font-heading text-xl font-bold text-[var(--color-primary)]/80">
                  {issuer.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 id="cert-detail-title" className="font-heading text-2xl font-bold text-[var(--color-text)]">
                  {title}
                </h2>
                <p className="mt-1 text-sm text-[var(--color-text)]/60">
                  Issued by {issuer}
                </p>
                <p className="mt-1 font-mono text-xs text-[var(--color-text)]/50">
                  {date}
                  {credentialId && ` · ${credentialId}`}
                </p>
              </div>
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

            <div className="mt-8 flex items-center gap-3 rounded-xl border border-[var(--color-accent-cyan)]/20 bg-[var(--color-accent-cyan)]/5 px-4 py-3">
              <span className="text-[var(--color-accent-cyan)]" aria-hidden>✔</span>
              <span className="font-mono text-sm font-semibold text-[var(--color-accent-cyan)]">
                Verified Credential
              </span>
            </div>

            {verifyUrl && (
              <a
                href={verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 font-mono text-sm font-medium text-[var(--color-text)]/90 transition-colors hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              >
                View Official Certificate
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </motion.div>
    </motion.div>
  );
}

export default memo(CertificateDetailsModal);
