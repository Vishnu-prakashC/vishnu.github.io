# Deep Performance Audit — Root Cause & Bundle Analysis

## STEP 1 — Root cause diagnosis

### 1. Main thread blocking

| Source | Impact | Location |
|--------|--------|----------|
| **Lenis smooth scroll** | **Critical.** Runs an infinite `requestAnimationFrame` loop. Every frame it reads scroll position, computes lerp, writes to scroll — main thread + style/layout work every 16ms. | `SmoothScrollProvider.jsx` |
| **GSAP Hero parallax** | **High.** On every throttled mousemove: `gsap.to(..., { x, y })` runs. Plus optional rAF callback. Continuous work while mouse moves. | `Hero.jsx` |
| **MagneticButton** | **Medium.** Every `mousemove`: `getBoundingClientRect()` (layout read) + `el.style.transform` write. Causes read/write alternation if combined with other layout reads. | `MagneticButton.jsx` |
| **GSAP ScrollTrigger (About)** | **Medium.** Registers scroll listener(s), recalculates on scroll. Overlaps with Lenis (both react to scroll). | `About.jsx` + `gsapConfig.js` |

### 2. Largest bundles (from build)

| Chunk | Size (min) | Gzip | Note |
|-------|------------|------|------|
| **three** (R3F + drei + postprocessing + three) | **~1,140 kB** | ~314 kB | Single largest; decorative only. |
| **framer-motion** | ~131 kB | ~43 kB | Keep; single animation system. |
| **gsap** | ~70 kB | ~27 kB | Remove; duplicate of Framer. |
| **lenis** | ~11 kB | ~3 kB | Remove; native scroll is enough. |
| **index** (app) | ~51 kB | ~21 kB | Will shrink after removals. |

### 3. Re-renders

- **StrictMode** in dev double-invokes render (expected; not a bug).
- **useReducedMotion()** in Hero causes one extra state update when media query is first resolved.
- No heavy context or global state; re-renders are not the primary bottleneck. Main cost is **continuous work** (rAF, scroll, mousemove), not React tree updates.

### 4. Continuous requestAnimationFrame loops

| Loop | File | Runs |
|------|------|------|
| **Lenis** | `SmoothScrollProvider.jsx` | Forever: `raf(time) → lenis.raf(time) → requestAnimationFrame(raf)`. |
| **Background3DScene** | `ScrollScene.jsx`, `FloatingElements.jsx` | Every frame: camera + mesh rotation + position. |
| **FloatingSphere (Hero)** | `FloatingSphere.jsx` | Every frame: rotation, position.y, camera.position.z from `window.scrollY`. |
| **Hero parallax** | `Hero.jsx` | rAF only when throttled mousemove fires (not a tight loop, but coupled with mousemove). |

### 5. Scroll listeners

- **Lenis**: Intercepts scroll and drives it via rAF → effective scroll listener every frame.
- **GSAP ScrollTrigger**: Registers its own scroll listener(s) for About section.
- **FloatingSphere**: Reads `window.scrollY` inside **useFrame** (every frame), not a listener but same effect.
- **ScrollScene**: Same — `window.scrollY` every frame inside useFrame.

Result: Scroll is read every frame by Lenis + by two Three.js useFrame loops. Redundant and expensive.

### 6. Three.js GPU / main thread load

- **Two Canvases**: (1) Background3DScene (lazy), (2) FloatingSphere in Hero. Two WebGL contexts, two render loops.
- **Post-processing**: Bloom in both (EffectComposer + Bloom). Expensive.
- **MeshDistortMaterial** (FloatingSphere): Shader-heavy.
- **ScrollScene**: Reads `window.scrollY` every frame and updates camera → layout/scroll read every frame.
- **Verdict**: Three.js is **decorative only**. It is the largest bundle and causes continuous GPU + main-thread work. **Remove entirely** for a performance-first build.

### 7. Lenis and layout thrashing

- Lenis updates scroll position (or transform) every frame. That can trigger layout/repaint and composite.
- Combined with GSAP ScrollTrigger (which also depends on scroll), you get **two systems** reacting to scroll. **Remove Lenis**; use native scroll + CSS `scroll-behavior: smooth` for anchor links.

### 8. Hydration / StrictMode

- No SSR in this project; no hydration.
- StrictMode double-render in dev only; not the cause of production lag.

### 9. Tailwind

- No `backdrop-blur`, `blur()`, or heavy `box-shadow` in components.
- **index.css**: `background-attachment: fixed` on body can cause extra repaint/composite on scroll. **Remove** for performance-first.

### 10. IntersectionObserver

- Framer Motion `whileInView` uses IntersectionObserver. Used in Projects section (stagger) and possibly AnimatedReveal. Count is low (one per section/card). **Not a bottleneck**.

---

## STEP 2 — Bundle analysis: what to do

| Item | Action | Reason |
|------|--------|--------|
| **Three.js + R3F + drei + postprocessing** | **Remove entirely** | Decorative; ~1.14 MB + continuous useFrame + Bloom. |
| **Lenis** | **Remove entirely** | Infinite rAF + scroll interception; native scroll is enough. |
| **GSAP** | **Remove entirely** | Duplicates Framer; Hero parallax + About scroll reveal can be Framer only. |
| **Background3DScene, ScrollScene, FloatingElements** | **Delete** | Part of Three removal. |
| **FloatingSphere** | **Delete** | Part of Three removal. |
| **Hero parallax (GSAP + mousemove + rAF)** | **Remove** | Constant work; replace with static layout + Framer entrance only. |
| **MagneticButton** | **Remove** | Mousemove + getBoundingClientRect every move. Replace with simple button + CSS/Framer hover scale. |
| **SmoothScrollProvider** | **Remove** | Lenis removal. |
| **Background3DWrapper** | **Remove** | 3D removal. |
| **gsapConfig.js** | **Delete** | GSAP removal. |
| **useLenis.js** | **Delete** | Lenis removal. |
| **background-attachment: fixed** | **Remove** | Avoids extra composite/repaint. |
| **Heavy radial gradient** | **Simplify** | Use solid or simple gradient to reduce paint cost. |

**Keep:** React, Vite, Tailwind, **Framer Motion only**, Navbar, Hero (simplified), About (Framer only), Projects (already Framer), PageTransition, minimal motion system (≤350ms, transform + opacity only).

---

## STEP 3–5 and final output

See implementation in codebase:

- **Radical Performance Mode**: Lenis/3D/GSAP/parallax/magnetic removed; Framer-only; minimal motion.
- **60 FPS plan**: Animations ≤350ms; transform + opacity only; will-change only on hover where used.
- **Profiling**: See `docs/PROFILING.md` for Chrome Performance tab, long tasks, FPS, layout thrashing, re-renders, memory.

**Exact root cause (summary):**  
Continuous main-thread and GPU work from **(1) Lenis rAF loop**, **(2) Two Three.js Canvases with useFrame + Bloom + scroll reads**, **(3) GSAP parallax + ScrollTrigger**, and **(4) MagneticButton mousemove layout reads**. Largest bundle is Three.js (~1.14 MB). Removing these and keeping only Framer Motion with minimal animations guarantees the largest gain and a stable 60 FPS on typical devices.
