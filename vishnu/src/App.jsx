import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Layout from "./components/layout/Layout";
import Hero from "./components/sections/Hero";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ smooth: true });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Layout>
      <Hero />
    </Layout>
  );
}

export default App;
