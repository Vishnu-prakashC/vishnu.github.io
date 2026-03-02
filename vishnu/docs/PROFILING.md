# Deep Profiling Instructions — Chrome DevTools

Use these steps to find main-thread blocking, long tasks, FPS drops, layout thrashing, re-renders, and memory leaks.

---

## 1. Chrome Performance tab (main thread & long tasks)

1. Open the site, then open DevTools → **Performance**.
2. Click **Record** (circle), interact with the page (scroll, hover, click), then stop after 5–10 seconds.
3. **Find long tasks**
   - In the main thread timeline, look for **tasks longer than ~50ms** (often red or orange).
   - Long tasks block input and can drop frames. Click a long task to see the **bottom-up** or **call tree** panel.
4. **Identify what runs every frame**
   - Look for repeated blocks (e.g. every 16ms). That’s usually `requestAnimationFrame`, scroll handlers, or animation ticks.
   - Before the radical changes: look for Lenis `raf`, GSAP ticks, and R3F `useFrame`. After: you should see much less per-frame work.
5. **Check “Rendering”**
   - In the Performance panel, enable **Rendering** (three-dot menu → More tools → Rendering). Use “Frame Rendering Stats” to see GPU/CPU time per frame.

---

## 2. FPS and frame drops

1. **Frame Rendering Stats (Rendering panel)**
   - Shows current FPS and frame time. Keep FPS at 60 and frame time &lt; ~16ms during scroll and hover.
2. **Performance recording**
   - After recording, check the **Frames** row. Brown/yellow bars = dropped or slow frames. Zoom into those moments and see which script ran (long task or many small tasks).
3. **Disable “Disable frame rate limits”**
   - In Performance, leave “Disable frame rate limits” off so you see real 60fps behavior.

---

## 3. Layout thrashing (layout / reflow)

1. **Performance → Experience**
   - Enable “Web Vitals” or look for **Layout** (purple) and **Recalc Style** (green) in the main thread. Many layout recalculations in a short time = thrashing.
2. **Layout thrashing pattern**
   - Alternating “read layout” (e.g. `getBoundingClientRect`, `offsetTop`) and “write layout” (e.g. `style.transform`) in a loop or frequent handler. Fix by batching reads, then writes, or moving work off the hot path.
3. **Before vs after**
   - Before: MagneticButton did `getBoundingClientRect` + `style.transform` on every mousemove. After: no mousemove layout reads. Lenis and scroll-driven 3D also triggered layout/scroll reads every frame; those are removed.

---

## 4. Re-render frequency (React)

1. **React DevTools Profiler**
   - Install React DevTools, open **Profiler**, start recording, interact with the page, stop. Check “Ranked” or “Flamegraph” to see which components re-rendered and how often.
2. **Why it matters**
   - Even with memo/useCallback, continuous work (rAF, scroll, mousemove) can keep the main thread busy. Profiler shows React re-renders; Performance tab shows script time. For this app, the main issue was script work (Lenis, 3D, GSAP), not excessive React re-renders.

---

## 5. Memory leaks

1. **Memory panel**
   - DevTools → **Memory**. Take a **Heap snapshot**. Navigate or interact, then take another snapshot. Switch to “Comparison” and compare to the first to see what grew.
2. **Detached DOM / listeners**
   - Look for growing number of detached DOM nodes or event listeners. Ensure `useEffect` cleanups remove listeners and cancel rAF/timeouts.
3. **After removals**
   - No Lenis rAF loop, no Three.js contexts, so fewer long-lived objects. If you re-add 3D or smooth scroll later, verify cleanup in `useEffect` return.

---

## 6. Quick checklist (performance-first build)

| Check | How |
|-------|-----|
| No continuous rAF | Performance recording → no single function running every frame (except browser paint). |
| No scroll listeners on hot path | Search codebase for `scroll`, `addEventListener('scroll')`; only native scroll + Framer `whileInView` (IntersectionObserver) is fine. |
| Long tasks &lt; 50ms | Performance → main thread; no red blocks &gt; 50ms during scroll/hover. |
| FPS ~60 | Rendering → Frame Rendering Stats; scroll and hover stay green. |
| Layout thrashing | No repeated getBoundingClientRect/offsetTop in mousemove or scroll handlers. |
| Bundle size | Build → no three/gsap/lenis chunks; main vendor chunks &lt; ~200 kB (e.g. react + framer-motion). |
