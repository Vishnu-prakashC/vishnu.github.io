import { memo } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "../ui/ThemeToggle";
import { motionTransition, navLinkUnderline } from "../../utils/motion";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function NavLink({ href, label }) {
  return (
    <li>
      <a
        href={href}
        className="relative py-2 text-[var(--color-text)]/90 hover:text-[var(--color-text)] focus:text-[var(--color-text)] focus:outline-none transition-colors duration-200"
      >
        <span className="relative z-10">{label}</span>
        <motion.span
          className="absolute bottom-0 left-0 right-0 h-px origin-left bg-[var(--color-primary)]"
          variants={navLinkUnderline}
          initial="rest"
          whileHover="hover"
          transition={{ duration: motionTransition.medium.duration, ease: motionTransition.medium.ease }}
        />
      </a>
    </li>
  );
}

function Navbar() {
  return (
    <motion.nav
      className="flex justify-between items-center px-6 sm:px-10 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <a href="#" className="font-heading text-xl font-bold text-[var(--color-text)] focus:outline-none hover:opacity-90 transition-opacity">
        Vichu
      </a>
      <ul className="flex items-center gap-6 sm:gap-8">
        {navLinks.map((link) => (
          <NavLink key={link.href} href={link.href} label={link.label} />
        ))}
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </motion.nav>
  );
}

export default memo(Navbar);
