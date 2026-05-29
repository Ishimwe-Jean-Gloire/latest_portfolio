import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiDownload, FiArrowDown, FiSun, FiMoon } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";
import { profile } from "../../data/profile";
import { useTheme } from "../../hooks/useTheme";

/* ── Typewriter ─────────────────────────────────────────── */
function Typewriter({ words }) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState("typing");

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
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, dots;
    const GAP = 30, R = 1.1, GLOW = 140;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      dots = [];
      for (let r = 0; r <= Math.ceil(H / GAP); r++)
        for (let c = 0; c <= Math.ceil(W / GAP); c++)
          dots.push({ x: c * GAP, y: r * GAP });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouse.current;
      const accentColor = isDark ? "99,202,183" : "14,130,110";
      for (const d of dots) {
        const dist = Math.hypot(d.x - mx, d.y - my);
        const t = Math.max(0, 1 - dist / GLOW);
        const opacity = (isDark ? 0.12 : 0.18) + (isDark ? 0.7 : 0.6) * t * t;
        ctx.beginPath();
        ctx.arc(d.x, d.y, R + t * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentColor},${opacity})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    resize();
    draw();
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

/* ── Theme Toggle Button ────────────────────────────────── */
function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <motion.button
      className="theme-toggle"
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
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
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" className="hero-section">

      {/* Background */}
      <div className="hero-bg">
        <DotGrid isDark={isDark} />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="noise" />
      </div>

      {/* Theme toggle — top right */}
      <div className="hero-topbar">
        <div className="topbar-brand">
          <span className="brand-bracket">&lt;</span>
          <span className="brand-name">JG</span>
          <span className="brand-bracket">/&gt;</span>
        </div>
        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="hero-content">

        {/* Left side */}
        <motion.div className="hero-left" variants={container} initial="hidden" animate="show">

          {/* Badge */}
          <motion.div variants={item}>
            <div className="avail-badge">
              <span className="avail-dot" />
              <span>Open to remote · UTC+2</span>
              <HiSparkles size={13} className="badge-icon" />
            </div>
          </motion.div>

          {/* Greeting line */}
          <motion.div variants={item}>
            <p className="hero-greeting">
              <span className="greeting-line" />
              Hello, world
            </p>
          </motion.div>

          {/* Name */}
          <motion.div variants={item}>
            <h1 className="hero-name">
              I'm <span className="name-highlight">Jean Gloire</span>
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={item}>
            <div className="hero-role-wrap">
              <span className="role-tag">const role =</span>
              <span className="role-quote">"</span>
              <Typewriter words={profile.roles} />
              <span className="role-quote">"</span>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={item}>
            <p className="hero-tagline">{profile.tagline}</p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="hero-stats">
            <StatCard value="3+" label="Years Coding" />
            <StatCard value="10+" label="Projects Built" />
            <StatCard value="3" label="Languages" />
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="hero-ctas">
            <button className="btn-primary"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              <BsStars size={15} />
              See my work
            </button>
            <button className="btn-secondary"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Hire me
            </button>
            <a href={profile.cv} download className="btn-ghost">
              <FiDownload size={15} />
              Resume
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} className="hero-socials">
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <FaGithub size={17} />
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <FaLinkedin size={17} />
            </a>
            <div className="social-divider" />
            <span className="hero-location">📍 {profile.location}</span>
          </motion.div>
        </motion.div>

        {/* Right side — code card */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 50, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {/* Glow ring behind card */}
          <div className="card-glow" />

          <div className="code-card">
            <div className="code-card-bar">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
              <span className="code-card-title">developer.config.js</span>
            </div>
            <div className="code-card-tabs">
              <span className="tab active">profile</span>
              <span className="tab">skills</span>
              <span className="tab">contact</span>
            </div>
            <pre className="code-card-body"><code>
<span className="c-comment">{"/** Jean Gloire — Portfolio */"}</span>{"\n"}
<span className="c-keyword">export default</span> {"{"}{"\n"}
{"  "}<span className="c-prop">name</span>: <span className="c-str">"Jean Gloire Ishimwe"</span>,{"\n"}
{"  "}<span className="c-prop">role</span>: <span className="c-str">"Full Stack + UI/UX"</span>,{"\n"}
{"  "}<span className="c-prop">stack</span>: [{"\n"}
{"    "}<span className="c-str">"React"</span>, <span className="c-str">"Node.js"</span>,{"\n"}
{"    "}<span className="c-str">"TypeScript"</span>, <span className="c-str">"Tailwind"</span>,{"\n"}
{"    "}<span className="c-str">"Firebase"</span>, <span className="c-str">"MongoDB"</span>{"\n"}
{"  "}],{"\n"}
{"  "}<span className="c-prop">remote</span>: <span className="c-bool">true</span>,{"\n"}
{"  "}<span className="c-prop">available</span>: <span className="c-bool">true</span>,{"\n"}
{"  "}<span className="c-prop">timezone</span>: <span className="c-str">"UTC+2"</span>,{"\n"}
{"}"};<span className="c-cursor">█</span>
            </code></pre>
          </div>

          {/* Floating tags */}
          <motion.div className="float-tag tag-react"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
            <span>⚛</span> React
          </motion.div>
          <motion.div className="float-tag tag-node"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
            <span>🟢</span> Node.js
          </motion.div>
          <motion.div className="float-tag tag-ui"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
            <span>🎨</span> UI/UX
          </motion.div>
          <motion.div className="float-tag tag-ts"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
            <span>📘</span> TypeScript
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="scroll-indicator"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <FiArrowDown size={16} />
        </motion.div>
        <span>scroll</span>
      </motion.div>

    </section>
  );
}
