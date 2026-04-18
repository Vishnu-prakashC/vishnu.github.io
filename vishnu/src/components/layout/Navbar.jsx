import { memo, useState, useRef, useEffect, useCallback, forwardRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useScroll } from "../../contexts/ScrollContext";

const navLinks = [
  { href: "/#about", id: "about", label: "About" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#certifications", id: "certifications", label: "Certifications" },
  { href: "/#projects", id: "projects", label: "Projects" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

const HOME_IDS = ["home", "hero"];

const NavLink = memo(forwardRef(function NavLink({ href, id, label, onNavClick, activeId }, ref) {
  const { scrollToSection, scrollToTop } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = activeId === id;

  const handleClick = (e) => {
    e.preventDefault();
    onNavClick?.();
    if (location.pathname !== "/") {
      scrollToTop();
      navigate({ pathname: "/", hash: id });
      return;
    }
    scrollToSection(id, { duration: 1.6 });
    navigate({ pathname: "/", hash: id });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`relative py-2 px-0.5 focus:outline-none transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]
        ${isActive
          ? "text-blue-400 [text-shadow:0_0_12px_rgba(59,130,246,0.5)]"
          : "text-white/70 hover:text-white hover:-translate-y-0.5 hover:scale-[1.03] hover:tracking-wide hover:[text-shadow:0_0_8px_rgba(255,255,255,0.3)]"
        }`}
      aria-current={isActive ? "page" : undefined}
    >
      <span ref={ref} className="relative z-10 inline-block w-max whitespace-nowrap">{label}</span>
    </a>
  );
}));

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollToSection, scrollToTop } = useScroll();
  const [hasNavigated, setHasNavigated] = useState(false);
  const [activeId, setActiveId] = useState(navLinks[0].id);
  const underlineRef = useRef(null);
  const navRefs = useRef({});
  const containerRef = useRef(null);
  const linksContainerRef = useRef(null);
  const isFirstMount = useRef(true);
  const tickingRef = useRef(false);
  const handleNavClick = useCallback(() => setHasNavigated(true), []);

  const handleBrandClick = useCallback(
    (e) => {
      e.preventDefault();
      setActiveId("");
      setHasNavigated(false);

      const heroId = HOME_IDS.find((id) => document.getElementById(id));

      if (location.pathname !== "/") {
        navigate({ pathname: "/", hash: heroId || "home" });
        return;
      }

      if (heroId) {
        scrollToSection(heroId, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [location.pathname, navigate, scrollToSection]
  );

  useEffect(() => {
    const hashId = (location.hash.slice(1) || "").toLowerCase();
    setActiveId(hashId || "");
  }, [location.hash]);

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;
    const hashId = (location.hash.slice(1) || "").toLowerCase();
    const isNavSection = navLinks.some((l) => l.id === hashId);
    if (isNavSection) return;
    const t = setTimeout(() => {
      const scrollY = window.scrollY ?? document.documentElement.scrollTop;
      if (scrollY < 150) {
        setActiveId("");
        setHasNavigated(false);
        window.scrollTo(0, 0);
        navigate(location.pathname + location.search, { replace: true });
      }
    }, 100);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash, location.search, navigate]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const sectionIds = navLinks.map((l) => l.id);
    const pathname = window.location.pathname || "/";

    const updateFromScroll = () => {
      tickingRef.current = false;
      const scrollY = window.scrollY ?? document.documentElement.scrollTop;
      const viewportRef = scrollY + window.innerHeight * 0.35;

      const heroEl = document.getElementById("hero");
      if (!heroEl) {
        setActiveId("");
        setHasNavigated(false);
        if (window.location.hash) navigate(pathname, { replace: true });
        return;
      }
      const heroRect = heroEl.getBoundingClientRect();
      const heroTop = heroRect.top + scrollY;
      const heroBottom = heroTop + heroRect.height;
      if (viewportRef >= heroTop && viewportRef <= heroBottom) {
        setActiveId("");
        setHasNavigated(false);
        if (window.location.hash) navigate(pathname, { replace: true });
        return;
      }

      let next = navLinks[0].id;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const bottom = top + rect.height;
        if (viewportRef >= top && viewportRef <= bottom) {
          next = sectionIds[i];
          break;
        }
        if (viewportRef < top) next = sectionIds[i];
      }
      const desiredHash = `#${next}`;
      if (window.location.hash !== desiredHash) {
        window.history.replaceState(null, "", `${pathname}${desiredHash}`);
      }
      setActiveId((prev) => (prev === next ? prev : next));
      setHasNavigated(true);
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(updateFromScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateFromScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const getTextRect = useCallback((el, container) => {
    if (!el || !container) return null;
    const textNode = el.firstChild;
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
      const er = el.getBoundingClientRect();
      const cr = container.getBoundingClientRect();
      return { x: er.left - cr.left, width: el.offsetWidth };
    }
    const range = document.createRange();
    range.setStart(textNode, 0);
    range.setEnd(textNode, textNode.length);
    const tr = range.getBoundingClientRect();
    const cr = container.getBoundingClientRect();
    return { x: tr.left - cr.left, width: tr.width };
  }, []);

  const updateUnderline = useCallback((el, underline, container, instant = false) => {
    if (!el || !underline || !container) return;
    const rect = getTextRect(el, container);
    if (!rect) return;
    const xR = Math.round(rect.x * 10) / 10;
    const wR = Math.round(rect.width);
    gsap.set(underline, { opacity: 1 });
    if (instant) {
      gsap.set(underline, { x: xR, width: wR });
    } else {
      gsap.to(underline, { x: xR, width: wR, duration: 0.45, ease: "power3.out", overwrite: true });
    }
  }, [getTextRect]);

  useEffect(() => {
    const underline = underlineRef.current;
    const container = linksContainerRef.current;
    if (!underline || !container) return;

    if (activeId === "" || !hasNavigated) {
      isFirstMount.current = false;
      gsap.set(underline, { width: 0, opacity: 0 });
      return;
    }

    const el = navRefs.current[activeId];
    if (!el) return;

    const run = () => {
      if (isFirstMount.current) {
        isFirstMount.current = false;
        updateUnderline(el, underline, container, true);
      } else {
        updateUnderline(el, underline, container, false);
      }
    };
    requestAnimationFrame(() => requestAnimationFrame(run));
  }, [activeId, hasNavigated, updateUnderline]);

  useEffect(() => {
    const container = linksContainerRef.current;
    const underline = underlineRef.current;
    if (!container || !underline) return;

    const onResize = () => {
      const el = navRefs.current[activeId];
      if (el) updateUnderline(el, underline, container, true);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId, updateUnderline]);

  const handleKeyDown = (e) => {
    const i = navLinks.findIndex((l) => l.id === activeId);
    if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      const prev = navLinks[i - 1];
      if (location.pathname !== "/") {
        scrollToTop();
        navigate({ pathname: "/", hash: prev.id });
      } else {
        scrollToSection(prev.id, { duration: 1.2 });
        navigate({ pathname: "/", hash: prev.id });
      }
    } else if (e.key === "ArrowRight" && i < navLinks.length - 1) {
      e.preventDefault();
      const next = navLinks[i + 1];
      if (location.pathname !== "/") {
        scrollToTop();
        navigate({ pathname: "/", hash: next.id });
      } else {
        scrollToSection(next.id, { duration: 1.2 });
        navigate({ pathname: "/", hash: next.id });
      }
    }
  };

  return (
    <motion.nav
      ref={containerRef}
      role="navigation"
      aria-label="Main"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="fixed left-0 right-0 top-0 z-50 w-full bg-transparent"
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.15 },
        },
      }}
    >
      <div className="relative z-0 max-w-6xl mx-auto flex justify-between items-center px-6 sm:px-10 pt-4 pb-4 w-full">
        <motion.div variants={{ initial: { opacity: 0, y: -6 }, animate: { opacity: 1, y: 0 } }}>
          <Link
            to="/"
            onClick={handleBrandClick}
            className="font-heading text-xl font-bold text-white focus:outline-none hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]"
          >
            Vichu
          </Link>
        </motion.div>
        <div ref={linksContainerRef} className="relative flex items-center gap-6 sm:gap-8">
        <ul className="flex items-center gap-6 sm:gap-8" role="menubar">
          {navLinks.map((link) => (
            <motion.li key={link.href} role="none" variants={{ initial: { opacity: 0, y: -6 }, animate: { opacity: 1, y: 0 } }}>
              <NavLink ref={(el) => (navRefs.current[link.id] = el)} href={link.href} id={link.id} label={link.label} onNavClick={handleNavClick} activeId={activeId} />
            </motion.li>
          ))}
        </ul>
        <span
          ref={underlineRef}
          className="absolute bottom-0 left-0 h-[3px] rounded-full bg-linear-to-r from-blue-500 to-blue-300 pointer-events-none will-change-transform opacity-0 transition-opacity duration-200"
          style={{
            width: 0,
            boxShadow: "0 0 12px rgba(59, 130, 246, 0.6), 0 0 24px rgba(96, 165, 250, 0.35)",
          }}
          aria-hidden
        />
        </div>
      </div>
    </motion.nav>
  );
}

export default memo(Navbar);
