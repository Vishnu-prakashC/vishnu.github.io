import { motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";

function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
        <About />
        <Projects />
      </motion.div>
    </div>
  );
}

export default App;
