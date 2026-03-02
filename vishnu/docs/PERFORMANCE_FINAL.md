# Performance First — Final Output

## Exact root cause

1. **Lenis** — Infinite `requestAnimationFrame` loop plus scroll interception caused **continuous main-thread work every frame** and contributed to layout/scroll thrashing.
2. **Three.js** — Two WebGL Canvases (background scene + hero sphere), multiple `useFrame` loops, Bloom postprocessing, and **reading `window.scrollY` every frame** in 3D code caused **large bundle (~1.14 MB)** and **constant GPU + main-thread load**.
3. **GSAP** — Hero parallax (mousemove + rAF + `gsap.to`) and About ScrollTrigger duplicated Framer Motion and added **extra scroll/mouse work** and **~70 kB** bundle.
4. **MagneticButton** — **Layout read (`getBoundingClientRect`) on every mousemove** plus style write risked layout thrashing.
5. **background-attachment: fixed** and heavy radial gradient — Extra composite/repaint cost on scroll and resize.

**Single-sentence root cause:** Continuous per-frame work from Lenis + two Three.js scenes (with scroll-driven updates) and GSAP parallax/ScrollTrigger, plus mousemove-driven layout reads, blocked the main thread and GPU; the largest cost was the Three.js bundle and its render loops.

---

## Files edited

| File | Change |
|------|--------|
| `src/main.jsx` | Removed SmoothScrollProvider and Background3DWrapper; only PageTransition wraps App. |
| `src/index.css` | Solid background `#0b0b0f`; removed gradient and `background-attachment: fixed`; added `.hover-scale-on-hover:hover { will-change: transform }`. |
| `src/utils/motion.js` | Replaced with minimal system: durations ≤350ms, only transform + opacity variants, no hero long durations. |
| `src/components/sections/Hero.jsx` | Removed GSAP, parallax, MagneticButton, FloatingSphere; Framer-only entrance + simple `<motion.a>` CTA with hover scale; `hover-scale-on-hover` class. |
| `src/components/sections/About.jsx` | Removed GSAP/ScrollTrigger; Framer `whileInView` + stagger only. |
| `src/components/sections/Projects.jsx` | Added `hover-scale-on-hover` to card (no logic change). |
| `vite.config.js` | manualChunks: only `react-vendor` and `framer-motion`. |
| `package.json` | Removed gsap, @studio-freight/lenis, three, @react-three/fiber, @react-three/drei, @react-three/postprocessing. |

---

## Files deleted

| File | Reason |
|------|--------|
| `src/providers/SmoothScrollProvider.jsx` | Lenis removal. |
| `src/providers/Background3DWrapper.jsx` | 3D removal. |
| `src/utils/gsapConfig.js` | GSAP removal. |
| `src/hooks/useLenis.js` | Lenis removal. |
| `src/components/3d/Background3DScene.jsx` | 3D removal. |
| `src/components/3d/ScrollScene.jsx` | 3D removal. |
| `src/components/3d/FloatingElements.jsx` | 3D removal. |
| `src/components/three/FloatingSphere.jsx` | 3D removal. |
| `src/components/ui/MagneticButton.jsx` | Mousemove + layout reads removed; replaced by simple link/button. |

---

## Clean minimal architecture

```
main.jsx
  └─ PageTransition (opacity only, ≤350ms)
       └─ App (memo)
            ├─ Navbar (Framer fade + link underline hover)
            └─ motion.div (page fade)
                 ├─ Hero (Framer fadeUp title/subtitle + CTA with hover scale)
                 └─ Suspense
                      ├─ lazy(About)  — Framer whileInView + stagger
                      └─ lazy(Projects) — Framer whileInView + stagger + card hover scale
```

- **One animation system:** Framer Motion only.
- **No rAF loops**, no scroll listeners (except native + Framer’s IntersectionObserver for `whileInView`).
- **No 3D**, no Lenis, no GSAP.
- **Motion:** Only transform and opacity; max duration 350ms; `will-change: transform` only on hover via `.hover-scale-on-hover`.

---

## Code replacements (summary)

- **Hero CTA:** `<motion.a href="#projects" variants={hoverScaleSubtle} whileHover="hover" whileTap="tap" className="... hover-scale-on-hover">View Projects</motion.a>`.
- **About:** `<motion.section whileInView="visible" viewport={viewportOnce} variants={stagger}>` with `<motion.h2>` and `<motion.p>` using `scrollReveal`.
- **main.jsx:** No SmoothScrollProvider, no Background3DWrapper; only `PageTransition` → `App`.

---

## Final expected Lighthouse score (performance-first build)

- **Performance:** 90–98 (typical desktop), 85–95 (mid-tier mobile), depending on host and network. Main bottlenecks (Lenis, Three.js, GSAP) are removed; TBT and LCP should improve sharply.
- **Best practices:** 95–100 (no major issues if dependencies and CSP are in order).
- **Accessibility:** Unchanged from current (focus, semantics, contrast).
- **SEO:** Unchanged (single-page, same content).

Run `npm run build` and `npm run preview`, then run Lighthouse on the preview URL in incognito for a clean measurement. For 60 FPS during scroll and hover, use the steps in `docs/PROFILING.md` to confirm no long tasks and stable frame time.

**Actual build after radical changes (example):**
- `index` (app): ~186 kB gzip ~59 kB  
- `framer-motion`: ~131 kB gzip ~43 kB  
- `react-vendor`: ~4 kB (rest inlined)  
- No three, gsap, or lenis chunks. Total JS bundle is dramatically smaller than before (~1.3+ MB removed).
