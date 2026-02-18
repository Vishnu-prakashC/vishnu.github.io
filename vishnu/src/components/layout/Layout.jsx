import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <Navbar />
      {children}
    </div>
  );
}
