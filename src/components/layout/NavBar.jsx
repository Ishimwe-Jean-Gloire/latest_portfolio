import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme.js";

const navLinks = [
  { id: "home",     label: "Home"     },
  { id: "about",    label: "About"    },
  { id: "projects", label: "Projects" },
  { id: "contact",  label: "Contact"  },
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <motion.button
      className="nav-theme-btn"
      onClick={toggle}
      whileTap={{ scale: 0.88 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex" }}
        >
          {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export default function Navbar() {
  const [active, setActive]     = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const indicatorRef            = useRef(null);
  const navRef                  = useRef(null);
  const linkRefs                = useRef({});

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => document.getElementById(l.id));
      const current = [...sections].reverse().find((s) => s && s.getBoundingClientRect().top <= 120);
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el  = linkRefs.current[active];
    const ind = indicatorRef.current;
    const nav = navRef.current;
    if (!el || !ind || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect  = el.getBoundingClientRect();
    ind.style.left  = `${elRect.left - navRect.left}px`;
    ind.style.width = `${elRect.width}px`;
  }, [active]);

  return (
    <>
      {/* Brand — fixed top left, completely separate from navbar */}
      <motion.div
        className="brand-fixed"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <button onClick={() => scrollTo("home")} className="brand-btn">
          <span className="brand-bracket">&lt;</span>
          <span className="brand-name">JG</span>
          <span className="brand-bracket">/&gt;</span>
        </button>
      </motion.div>

      {/* Theme toggle — fixed top right */}
<div className="theme-toggle-fixed">
  <ThemeToggle />
</div>

      {/* Navbar pill — centered */}
      <motion.nav
        className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar-glass" />
        <div className="navbar-inner">

          {/* Desktop links */}
          <div className="navbar-links" ref={navRef}>
            <span className="nav-indicator" ref={indicatorRef} />
            {navLinks.map((link) => (
              <button
                key={link.id}
                ref={(el) => (linkRefs.current[link.id] = el)}
                className={`nav-link ${active === link.id ? "active" : ""}`}
                onClick={() => { scrollTo(link.id); setActive(link.id); }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            <button className="nav-cta" onClick={() => scrollTo("contact")}>
              Hire me
            </button>
            <button className="nav-hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
              <AnimatePresence mode="wait">
                <motion.span
                  key={menuOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: "flex" }}
                >
                  {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            <div className="mobile-menu-glass" />
            <div className="mobile-menu-content">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  className={`mobile-link ${active === link.id ? "active" : ""}`}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055 }}
                  onClick={() => { scrollTo(link.id); setActive(link.id); setMenuOpen(false); }}
                >
                  <span className="mobile-label">{link.label}</span>
                  {active === link.id && <span className="mobile-active-dot" />}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
