import { memo } from "react";

function Hero3D() {
  return (
    <div className="aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#050505]">
      <img
        src="/images/profile.jpeg"
        alt="Profile"
        className="h-full w-full object-contain object-center"
        loading="eager"
        decoding="async"
        draggable="false"
      />
    </div>
  );
}

export default memo(Hero3D);
