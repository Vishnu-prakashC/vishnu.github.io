import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { motionTransition, navLinkUnderline } from "../../utils/motion";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

function NavLink({ href, label }) {
  const isExternal = href.startsWith("http");
  const Comp = isExternal ? "a" : Link;
  const linkProps = isExternal ? { href } : { to: href };
  return (
    <li>
      <Comp
        {...linkProps}
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
      </Comp>
    </li>
  );
}

function Navbar() {
  return (
    <motion.nav
      className="flex justify-between items-center px-6 sm:px-10 py-6"
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { staggerChildren: 0.06, delayChildren: 0.1 },
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
            <NavLink href={link.href} label={link.label} />
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}

export default memo(Navbar);
