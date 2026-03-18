import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from "react";
import gsap from "gsap";

const PATH = {
  initial: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
  expand: "M 0 100 V 50 Q 50 0 100 50 V 100 z",
  fullCover: "M 0 100 V 0 Q 50 0 100 0 V 100 z",
};

const DURATION = 0.9;
const EASE = "power2.inOut";

function WaveTransition({ onBusyChange }, ref) {
  const pathRef = useRef(null);
  const timelineRef = useRef(null);

  const triggerWave = useCallback((options = {}) => {
    const path = pathRef.current;
    if (!path || timelineRef.current?.isActive()) return false;

    const { onCover, onComplete: onCompleteOption } = options;
    const onCoverAction =
      typeof onCover === "function"
        ? onCover
        : () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

    onBusyChange?.(true);
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onBusyChange?.(false);
        timelineRef.current = null;
        onCompleteOption?.();
      },
    });

    timelineRef.current = tl;

    tl.set(path, { attr: { d: PATH.initial } })
      .to(path, {
        attr: { d: PATH.expand },
        duration: DURATION * 0.5,
        ease: EASE,
      })
      .to(path, {
        attr: { d: PATH.fullCover },
        duration: DURATION * 0.5,
        ease: EASE,
      })
      .add(() => {
        onCoverAction();
      })
      .to(
        path,
        {
          attr: { d: PATH.expand },
          duration: DURATION * 0.4,
          ease: EASE,
        },
        "-=0.1"
      )
      .to(path, {
        attr: { d: PATH.initial },
        duration: DURATION * 0.6,
        ease: EASE,
      });

    return true;
  }, [onBusyChange]);

  useImperativeHandle(ref, () => ({ triggerWave }), [triggerWave]);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none"
      aria-hidden
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          <linearGradient
            id="wave-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6C7BFF" />
            <stop offset="100%" stopColor="#FF4ECD" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={PATH.initial}
          fill="url(#wave-gradient)"
        />
      </svg>
    </div>
  );
}

export default forwardRef(WaveTransition);
