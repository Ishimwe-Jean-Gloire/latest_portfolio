import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiDownload, FiArrowDown } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { profile } from "../../data/profile";

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
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 1800);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 400);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), 40);
      } else {
        setTimeout(() => {
          setWordIdx((i) => (i + 1) % words.length);
          setPhase("typing");
        }, 0);
      }
    }

    return () => clearTimeout(timeout);
  }, [display, phase, wordIdx, words]);

  return (
    <span className="typewriter">
      {display}
      <span className="cursor" aria-hidden="true">|</span>
    </span>
  );
}

/* ── Dot Grid Canvas ────────────────────────────────────── */
function DotGrid() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, dots;

    const DOT_SPACING = 28;
    const DOT_RADIUS = 1.2;
    const GLOW_RADIUS = 130;
    const BASE_OPACITY = 0.15;
    const GLOW_OPACITY = 0.75;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      const cols = Math.ceil(W / DOT_SPACING) + 1;
      const rows = Math.ceil(H / DOT_SPACING) + 1;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: c * DOT_SPACING, y: r * DOT_SPACING });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const d of dots) {
        const dist = Math.hypot(d.x - mx, d.y - my);
        const t = Math.max(0, 1 - dist / GLOW_RADIUS);
        const opacity = BASE_OPACITY + (GLOW_OPACITY - BASE_OPACITY) * t * t;
        const r = DOT_RADIUS + t * 1.4;

        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,202,183,${opacity})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }}
    />
  );
}

/* ── Main Hero ──────────────────────────────────────────── */
export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg">
        <DotGrid />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="scanline" />
      </div>

      <div className="hero-content">
        <motion.div
          className="hero-inner"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <div className="avail-badge">
              <span className="avail-dot" />
              <span>Available for remote work</span>
              <span className="avail-tz">· UTC+2</span>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <h1 className="hero-name">
              <span className="name-hi">Hi, I'm</span>
              <br />
              <span className="name-main">{profile.name}</span>
            </h1>
          </motion.div>

          <motion.div variants={item}>
            <p className="hero-role">
              <span className="role-prefix">{"// "}</span>
              <Typewriter words={profile.roles} />
            </p>
          </motion.div>

          <motion.div variants={item}>
            <p className="hero-tagline">{profile.tagline}</p>
          </motion.div>

          <motion.div variants={item} className="hero-ctas">
            <button className="btn-primary" onClick={scrollToProjects}>
              <BsStars size={16} />
              See my work
            </button>
            <button className="btn-secondary" onClick={scrollToContact}>
              Hire me
            </button>
            <a href={profile.cv} download className="btn-ghost">
              <FiDownload size={16} />
              CV
            </a>
          </motion.div>

          <motion.div variants={item} className="hero-socials">
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub size={18} />
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin size={18} />
            </a>
            <div className="social-divider" />
            <span className="hero-location">📍 {profile.location}</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-deco"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="code-card">
            <div className="code-card-bar">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
              <span className="code-card-title">profile.js</span>
            </div>
            <pre className="code-card-body"><code>
<span className="c-keyword">const</span> <span className="c-var">developer</span> = {"{"}{"\n"}
{"  "}<span className="c-prop">name</span>:{" "}<span className="c-str">"Jean Gloire"</span>,{"\n"}
{"  "}<span className="c-prop">stack</span>:{" "}[{"\n"}
{"    "}<span className="c-str">"React"</span>,{" "}<span className="c-str">"Node.js"</span>,{"\n"}
{"    "}<span className="c-str">"TypeScript"</span>,{"\n"}
{"    "}<span className="c-str">"Tailwind"</span>{"\n"}
{"  "}],{"\n"}
{"  "}<span className="c-prop">remote</span>:{" "}<span className="c-bool">true</span>,{"\n"}
{"  "}<span className="c-prop">available</span>:{" "}<span className="c-bool">true</span>,{"\n"}
{"}"};
            </code></pre>
          </div>

          <motion.div
            className="float-tag tag-react"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >⚛ React</motion.div>

          <motion.div
            className="float-tag tag-node"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >🟢 Node.js</motion.div>

          <motion.div
            className="float-tag tag-ui"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >🎨 UI/UX</motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiArrowDown size={18} />
        </motion.div>
        <span>scroll</span>
      </motion.div>
    </section>
  );
}
