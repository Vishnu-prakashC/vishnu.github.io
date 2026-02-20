export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
        <a href="#" className="text-lg font-semibold tracking-tight text-white hover:text-white/90 transition-colors">
          Vishnu
        </a>
        <div className="flex gap-8 sm:gap-10 text-sm">
          <a href="#about" className="text-white/70 hover:text-white transition-colors duration-200">
            About
          </a>
          <a href="#projects" className="text-white/70 hover:text-white transition-colors duration-200">
            Projects
          </a>
          <a href="#contact" className="text-white/70 hover:text-white transition-colors duration-200">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
