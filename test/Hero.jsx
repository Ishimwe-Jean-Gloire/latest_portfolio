import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiDownload, FiArrowDown } from "react-icons/fi";
import {
  SiReact, SiNodedotjs, SiTypescript, SiTailwindcss,
  SiFirebase, SiMongodb, SiFigma, SiNextdotjs,
} from "react-icons/si";
import { profile } from "../../data/profile";
import { useTheme } from "../../hooks/useTheme.js";

/* ── Typewriter ─────────────────────────────────────────── */
function Typewriter({ words }) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase]     = useState("typing");

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (phase === "typing") {
      if (display.length < word.length) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), 75);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 2000);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 400);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), 35);
      } else {
        setTimeout(() => { setWordIdx((i) => (i + 1) % words.length); setPhase("typing"); }, 0);
      }
    }
    return () => clearTimeout(timeout);
  }, [display, phase, wordIdx, words]);

  return (
    <span className="typewriter">
      {display}
      <span className="cursor">|</span>
    </span>
  );
}

/* ── Dot Grid ───────────────────────────────────────────── */
function DotGrid({ isDark }) {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let W, H, dots;
    const GAP = 32, R = 1, GLOW = 120;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      dots = [];
      for (let r = 0; r <= Math.ceil(H / GAP); r++)
        for (let c = 0; c <= Math.ceil(W / GAP); c++)
          dots.push({ x: c * GAP, y: r * GAP });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouse.current;
      const col = isDark ? "99,202,183" : "14,130,110";
      for (const d of dots) {
        const dist = Math.hypot(d.x - mx, d.y - my);
        const t    = Math.max(0, 1 - dist / GLOW);
        const op   = (isDark ? 0.08 : 0.12) + (isDark ? 0.45 : 0.4) * t * t;
        ctx.beginPath();
        ctx.arc(d.x, d.y, R + t * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${op})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const onMove  = (e) => { const r = canvas.getBoundingClientRect(); mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = ()  => { mouse.current = { x: -9999, y: -9999 }; };

    resize(); draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [isDark]);

  return (
    <canvas ref={canvasRef} aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "auto" }}
    />
  );
}

/* ── Tech icon pills ────────────────────────────────────── */
const techIcons = [
  { Icon: SiReact,       label: "React",      color: "#61dafb", delay: 0 },
  { Icon: SiNodedotjs,   label: "Node.js",    color: "#68a063", delay: 0.1 },
  { Icon: SiTypescript,  label: "TypeScript", color: "#3178c6", delay: 0.2 },
  { Icon: SiTailwindcss, label: "Tailwind",   color: "#38bdf8", delay: 0.3 },
  { Icon: SiFirebase,    label: "Firebase",   color: "#ffca28", delay: 0.4 },
  { Icon: SiMongodb,     label: "MongoDB",    color: "#4db33d", delay: 0.5 },
  { Icon: SiFigma,       label: "Figma",      color: "#a259ff", delay: 0.6 },
  { Icon: SiNextdotjs,   label: "Next.js",    color: "#fff",    delay: 0.7 },
];

function TechPill({ Icon, label, color, delay }) {
  return (
    <motion.div
      className="tech-pill"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8 + delay }}
    >
      <Icon size={14} style={{ color, flexShrink: 0 }} />
      <span>{label}</span>
    </motion.div>
  );
}

/* ── Stat Card ──────────────────────────────────────────── */
function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

/* ── Main Hero ──────────────────────────────────────────── */
export default function Hero() {
  const { isDark } = useTheme();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" className="hero-section">

      <div className="hero-bg">
        <DotGrid isDark={isDark} />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <div className="hero-content">

        {/* ── Left ── */}
        <motion.div className="hero-left" variants={container} initial="hidden" animate="show">

          <motion.div variants={item}>
            <p className="hero-greeting">Hello, I'm</p>
          </motion.div>

          <motion.div variants={item}>
            <h1 className="hero-name">Jean Gloire</h1>
          </motion.div>

          <motion.div variants={item}>
            <p className="hero-role">
              <Typewriter words={profile.roles} />
            </p>
          </motion.div>

          <motion.div variants={item}>
            <p className="hero-tagline">{profile.tagline}</p>
          </motion.div>

          <motion.div variants={item} className="hero-stats">
            <StatCard value="3+" label="Years Experience" />
            <StatCard value="10+" label="Projects" />
            <StatCard value="3"   label="Languages" />
          </motion.div>

          <motion.div variants={item} className="hero-ctas">
            <button className="btn-primary"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View My Work
            </button>
            <a href={profile.cv} download className="btn-secondary">
              <FiDownload size={15} />
              Download CV
            </a>
          </motion.div>

          <motion.div variants={item} className="hero-socials">
            <a href={profile.social.github}   target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <FaGithub size={17} />
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <FaLinkedin size={17} />
            </a>
            <div className="social-divider" />
            <span className="hero-location">📍 {profile.location}</span>
          </motion.div>

        </motion.div>

        {/* ── Right — Photo + tech pills ── */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Photo */}
          <div className="photo-stack">
            <div className="photo-bg-blur">
              <div className="code-bg-pattern">
                {[
                  "const dev = () => {",
                  "  return <Portfolio />;",
                  "};",
                  "import React from 'react';",
                  "export default function App() {",
                  "  const [theme] = useState('dark');",
                  "  useEffect(() => {}, []);",
                  "  return <main>{children}</main>",
                  "npm run dev",
                  "git commit -m 'feat: hero'",
                  "const stack = ['React','Node'];",
                  "// building something great...",
                ].map((line, i) => (
                  <span key={i} className="code-bg-line" style={{ animationDelay: `${i * 0.22}s` }}>
                    {line}
                  </span>
                ))}
              </div>
            </div>
            <div className="photo-frame">
              <img src="/images/profile.jpg" alt="Jean Gloire" className="profile-photo" />
              <div className="photo-fade-bottom" />
              <div className="photo-border-glow" />
            </div>
          </div>

          {/* Tech pills grid below photo */}
          <div className="tech-pills-grid">
            {techIcons.map((t) => (
              <TechPill key={t.label} {...t} />
            ))}
          </div>

        </motion.div>
      </div>

      <motion.div className="scroll-indicator"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <FiArrowDown size={15} />
        </motion.div>
        <span>scroll</span>
      </motion.div>

    </section>
  );
}
