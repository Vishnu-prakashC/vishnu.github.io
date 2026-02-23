import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";

function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <About />
    </div>
  );
}

export default App;
