# Animation & performance – architecture and samples

## Optimized architecture

```
main.jsx
  └─ SmoothScrollProvider (memo) → Lenis RAF
       └─ PageTransition (AnimatePresence + motion.div, motion system)
            └─ Background3DWrapper (lazy Background3DScene)
                 └─ App (memo)
                      ├─ Navbar (memo, motion hover)
                      └─ motion.div (page variants + transition)
                           ├─ Hero (Framer entrance + throttled parallax)
                           └─ Suspense
                                ├─ lazy(About) – GSAP scroll reveal
                                └─ lazy(Projects) – Framer stagger + card hover
```

- **Single registration**: GSAP + ScrollTrigger in `utils/gsapConfig.js`; all sections import from there.
- **Motion system**: One place for durations, easings, and variants in `utils/motion.js`.
- **Lazy chunks**: About and Projects are code-split; 3D scene is lazy-loaded.
- **Vite**: `manualChunks` split react, framer-motion, gsap, three, lenis for better caching.

---

## Reusable animation utility

**File:** `src/utils/motion.js`

- **Timing:** `motionDurations` (fast 150ms, medium 250ms, slow 400ms).
- **Easing:** `motionEasing` (cubic-bezier arrays) and `easingStrings` for CSS.
- **Transitions:** `motionTransition.fast | .medium | .slow | .page` for Framer.
- **Variants:** `variants.fadeIn | .fadeUp | .fadeUpLarge | .fadeInScale`, `heroTitle`, `heroSubtitle`, `scrollReveal`, `hoverScale`, `hoverScaleSubtle`, `navLinkUnderline`.
- **Viewport:** `viewportOnce` for `whileInView` (once, margin, amount).
- **Reduced motion:** `getPrefersReducedMotion()`; use with `useReducedMotion()` in components.

---

## Sample: Hero animation

Hero uses the motion system for entrance and throttled parallax (disabled when `prefers-reduced-motion`):

```jsx
// Title and subtitle use variants from motion.js
<motion.h1 variants={heroTitle} initial="initial" animate="animate" transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
  Hi, I'm <span className="text-indigo-400">Vishnu</span>
</motion.h1>
<motion.p variants={heroSubtitle} initial="initial" animate="animate" transition={motionTransition.medium}>
  ...
</motion.p>
```

Parallax: mousemove is throttled (~15fps), only `transform` is applied via GSAP, and the effect is skipped when `useReducedMotion()` is true.

---

## Sample: Page transition

In `main.jsx`, `PageTransition` wraps the app:

```jsx
<PageTransition>
  <Background3DWrapper>
    <App />
  </Background3DWrapper>
</PageTransition>
```

`PageTransition` uses `motionTransition.page` (0.35s, easeOut) and only animates `opacity` for a GPU-friendly fade.

---

## Sample: Scroll reveal with stagger (Projects)

Section uses `whileInView` and stagger so cards reveal in sequence:

```jsx
const sectionVariants = {
  initial: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const itemVariants = { initial: scrollReveal.initial, visible: scrollReveal.visible };

<motion.section variants={sectionVariants} initial="initial" whileInView="visible" viewport={viewportOnce}>
  <motion.h2 variants={itemVariants}>Projects</motion.h2>
  {PROJECTS.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      <ProjectCard item={item} />
    </motion.div>
  ))}
</motion.section>
```

Cards use `hoverScaleSubtle` for hover/tap micro-interactions (scale only).

---

## Performance checklist and mistakes

See **`docs/PERFORMANCE_CHECKLIST.md`** for:

- Implemented optimizations (lazy, memo, callbacks, build, CSS, motion, mobile).
- Lighthouse-oriented tips (LCP, CLS, INP).
- Common mistakes (layout properties, box-shadow, duplicate GSAP, inline objects, will-change, throttling).

---

## Mobile and reduced motion

- **Reduced motion:** `index.css` disables `scroll-behavior: smooth` when `prefers-reduced-motion: reduce`. Hero parallax is disabled via `useReducedMotion()`.
- **Mobile:** Hero 3D sphere is hidden on small screens (`hidden md:block`) to improve performance; parallax and Framer entrance still run.
- **60fps:** Animations use only `transform` and `opacity`; no layout thrashing or heavy shadows.
