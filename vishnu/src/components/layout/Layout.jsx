import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="bg-[#0B0B0F] text-white min-h-screen antialiased">
      <Navbar />
      <div className="relative min-h-screen">
        {/* Glowing background orbs - no overrides, Tailwind only */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-500/25 blur-[140px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/15 blur-[100px] rounded-full" />
        </div>
        {children}
      </div>
    </div>
  );
}
