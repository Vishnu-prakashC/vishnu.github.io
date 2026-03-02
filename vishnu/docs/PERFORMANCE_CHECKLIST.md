# Performance & Animation Checklist

## ✅ Implemented in this project

### React & re-renders
- [x] `React.lazy` for below-the-fold sections (About, Projects)
- [x] `Suspense` with minimal fallback for lazy chunks
- [x] `memo()` on App, Navbar, Projects, AnimatedReveal, MagneticButton
- [x] `useCallback` for event handlers (MagneticButton, Hero parallax)
- [x] `useMemo` for stable transition configs and variant objects (App, Projects)
- [x] No inline functions in JSX for frequently re-rendered lists

### Build & bundles
- [x] Vite `manualChunks`: react-vendor, framer-motion, gsap, three, lenis
- [x] `cssCodeSplit: true`, `minify: 'esbuild'`, `target: 'esnext'`
- [x] Single GSAP/ScrollTrigger registration in `gsapConfig.js`

### CSS & layout
- [x] Removed `background-position` animation (causes layout/paint)
- [x] Static gradient background; no continuous repaints
- [x] `scroll-behavior: smooth` with `prefers-reduced-motion` override
- [x] No box-shadow animations; only transform and opacity for motion

### Animations
- [x] Central motion system in `src/utils/motion.js` (timing, easing, variants)
- [x] All motion ≤ 400ms; cubic-bezier easings
- [x] Framer Motion: only `transform` and `opacity` (GPU-friendly)
- [x] Throttled mousemove parallax in Hero (~15fps)
- [x] Page transition uses motion system; no heavy exit animations

### Mobile & a11y
- [x] `viewportOnce` and `amount` to limit whileInView work
- [x] `useReducedMotion` hook available for future use
- [x] `@media (prefers-reduced-motion: reduce)` in `index.css` (smooth scroll disabled)
- [x] Hero sphere hidden on small screens (`hidden md:block`) to help mobile

---

## 🔍 Lighthouse & general tips

- **LCP**: Lazy load below-fold content; preconnect to Google Fonts (already in use).
- **CLS**: Reserve space for hero (e.g. min-height); avoid layout shift when 3D loads.
- **INP**: Throttle/debounce scroll and mouse handlers; use `passive: true` where possible.
- **Avoid**: Animating `width`, `height`, `top`, `left`, `box-shadow`, `filter` on hot paths.
- **Prefer**: `transform`, `opacity`; use `will-change` only on elements that are currently animating, and remove when idle.

---

## ❌ Common mistakes to avoid

1. **Animating layout properties**  
   Don’t animate `width`, `height`, `margin`, `padding`, `top`, `left`. Use `transform: scaleX/scaleY` or `translate` instead.

2. **Heavy box-shadow animation**  
   Animating `box-shadow` is expensive. Use a pseudo-element with opacity/transform or a static shadow.

3. **Duplicate GSAP registration**  
   Register ScrollTrigger once (e.g. in `gsapConfig.js`) and import that gsap everywhere.

4. **Inline objects/functions in JSX**  
   `transition={{ duration: 0.3 }}` or `onClick={() => setX(1)}` create new references every render. Use `useMemo`/`useCallback` or constants.

5. **Too many simultaneous scroll-driven animations**  
   Use `viewport={{ once: true }}` and stagger so not everything animates at once.

6. **will-change everywhere**  
   Use `will-change: transform` (or similar) only on elements that are actively animating; remove when idle to free GPU memory.

7. **Unthrottled mousemove/scroll**  
   Throttle or use `requestAnimationFrame` so handlers don’t run every frame.

8. **Large re-renders from context/state**  
   Split context or use selectors so only components that need the updated value re-render.

---

## 📁 Key files

| File | Purpose |
|------|--------|
| `src/utils/motion.js` | Timing scale, easings, Framer variants, viewport options |
| `src/utils/gsapConfig.js` | Single GSAP + ScrollTrigger registration |
| `src/hooks/useReducedMotion.js` | Prefers-reduced-motion hook for a11y |
| `src/index.css` | Global styles, smooth scroll, reduced-motion override |
| `vite.config.js` | manualChunks, build options |
