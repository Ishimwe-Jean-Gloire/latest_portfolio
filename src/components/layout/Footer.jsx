import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { profile } from "../../data/profile";

const navLinks = [
  { id: "home",     label: "Home"     },
  { id: "about",    label: "About"    },
  { id: "projects", label: "Projects" },
  { id: "contact",  label: "Contact"  },
];

const socials = [
  { icon: <FiGithub size={18} />,   href: profile.social.github,   label: "GitHub"   },
  { icon: <FiLinkedin size={18} />, href: profile.social.linkedin, label: "LinkedIn" },
  { icon: <FiMail size={18} />,     href: `mailto:${profile.email}`, label: "Email"  },
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top-border" />

      {/* Back to top */}
      <motion.button
        className="back-to-top"
        onClick={() => scrollTo("home")}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Back to top"
      >
        <FiArrowUp size={16} />
      </motion.button>

      <div className="footer-wrap">

        {/* ── Brand block ── */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-bracket">&lt;</span>
            <span className="footer-logo-text">JG</span>
            <span className="footer-bracket">/&gt;</span>
          </div>
          <p className="footer-tagline">{profile.tagline}</p>
          <div className="footer-avail">
            <span className="footer-avail-dot" />
            <span>Open to remote opportunities · {profile.timezone}</span>
          </div>
        </div>

        {/* ── Nav links ── */}
        <div className="footer-nav">
          <p className="footer-col-title">Navigation</p>
          <ul className="footer-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button className="footer-link" onClick={() => scrollTo(link.id)}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact block ── */}
        <div className="footer-contact">
          <p className="footer-col-title">Get in Touch</p>
          <ul className="footer-links">
            <li>
              <a href={`mailto:${profile.email}`} className="footer-link">
                {profile.email}
              </a>
            </li>
            <li>
              <span className="footer-link-plain">📍 {profile.location}</span>
            </li>
          </ul>
          <div className="footer-socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copy">
            © {year} {profile.fullName}. All rights reserved.
          </p>
          <p className="footer-made">
            Built with <FiHeart size={12} className="footer-heart" /> using React & Tailwind
          </p>
        </div>
      </div>

    </footer>
  );
}
