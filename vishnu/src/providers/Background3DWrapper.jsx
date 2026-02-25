import { lazy, Suspense } from "react";

const Background3DScene = lazy(() => import("../components/3d/Background3DScene"));

/**
 * Wraps the app with a fixed, non-interactive 3D background layer.
 * Scroll-reactive camera, subtle geometry, floating elements, and low bloom.
 * Does not capture pointer events; does not modify existing layout.
 */
export default function Background3DWrapper({ children }) {
  return (
    <>
      <div
        className="fixed inset-0 -z-10 overflow-hidden"
        style={{ pointerEvents: "none" }}
        aria-hidden
      >
        <Suspense fallback={null}>
          <Background3DScene />
        </Suspense>
      </div>
      {children}
    </>
  );
}
