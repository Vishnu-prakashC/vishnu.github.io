import { memo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { navLinkUnderline } from "../../utils/motion";
import { motionEasingGentle } from "../../utils/motion";
import { useScroll } from "../../contexts/ScrollContext";

const navLinkTransition = {
  duration: 0.35,
  ease: motionEasingGentle.inOut,
};

const navLinks = [
  { href: "/#about", id: "about", label: "About" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#projects", id: "projects", label: "Projects" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

function NavLink({ href, id, label }) {
  const { scrollToSection } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.hash === `#${id}`;

  const handleClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(href);
      return;
    }
    scrollToSection(id, { duration: 1.6, offset: -100 });
    window.history.replaceState(null, "", href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`relative py-2 focus:outline-none transition-colors duration-300 focus:text-[var(--color-text)] ${
        isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text)]/90 hover:text-[var(--color-text)]"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="relative z-10">{label}</span>
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-[var(--color-primary)]"
        variants={navLinkUnderline}
        initial="rest"
        whileHover="hover"
        animate={isActive ? "hover" : "rest"}
        transition={navLinkTransition}
      />
    </a>
  );
}

function Navbar() {
  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 flex justify-between items-center px-6 sm:px-10 py-6"
      style={{ background: "transparent" }}
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
      <motion.div variants={{ initial: { opacity: 0, y: -6 }, animate: { opacity: 1, y: 0 } }}>
        <Link to="/" className="font-heading text-xl font-bold text-[var(--color-text)] focus:outline-none hover:opacity-90 transition-opacity">
          Vichu
        </Link>
      </motion.div>
      <ul className="flex items-center gap-6 sm:gap-8">
        {navLinks.map((link) => (
          <motion.li key={link.href} variants={{ initial: { opacity: 0, y: -6 }, animate: { opacity: 1, y: 0 } }}>
            <NavLink href={link.href} id={link.id} label={link.label} />
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}

export default memo(Navbar);
