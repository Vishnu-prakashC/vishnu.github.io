import { memo, lazy, Suspense, useRef, useState } from "react";
import Navbar from "./components/layout/Navbar";
import WaveTransition from "./components/WaveTransition";
import IntroLoader from "./components/ui/IntroLoader";
import ScrollProgress from "./components/ui/ScrollProgress";
import SectionIndicators from "./components/ui/SectionIndicators";
import FloatingShapes from "./components/ui/FloatingShapes";
import ThemeFloating from "./components/ui/ThemeFloating";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProjectCaseStudy = lazy(() => import("./pages/ProjectCaseStudy"));

function App() {
  const waveRef = useRef(null);
  const [isWaveBusy, setIsWaveBusy] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <IntroLoader onFinish={() => setIntroDone(true)} />
      {introDone && (
        <>
          <FloatingShapes />
          <ScrollProgress />
          <SectionIndicators />
          <ThemeFloating />
          <WaveTransition ref={waveRef} onBusyChange={setIsWaveBusy} />
          <Navbar />
          <Suspense fallback={<section className="min-h-screen" aria-hidden />}>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    triggerWaveRef={waveRef}
                    isWaveBusy={isWaveBusy}
                  />
                }
              />
              <Route path="/project/:slug" element={<ProjectCaseStudy />} />
            </Routes>
          </Suspense>
        </>
      )}
    </div>
  );
}

export default memo(App);
