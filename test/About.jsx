import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCode, FiLayers, FiGlobe, FiCalendar, FiBriefcase, FiBook } from "react-icons/fi";
import * as Si from "react-icons/si";
import { profile } from "../../data/profile";
import { skills, categories, timeline } from "../../data/skills";

const FadeIn = ({ children, delay = 0, x = 0, y = 20 }) => (
  <motion.div
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

function SectionTitle({ label, title, subtitle }) {
  return (
    <div className="about-section-title">
      <span className="about-label">
        <span className="about-label-line" />
        {label}
        <span className="about-label-line" />
      </span>
      <h2 className="about-heading">{title}</h2>
      {subtitle && <p className="about-subtitle">{subtitle}</p>}
    </div>
  );
}

function SkillChip({ skill, index }) {
  const IconComponent = Si[skill.icon] || null;
  return (
    <motion.div
      className="skill-chip"
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      whileHover={{ y: -3, scale: 1.04 }}
    >
      {IconComponent && (
        <IconComponent size={16} style={{ color: skill.color, flexShrink: 0 }} />
      )}
      <span className="chip-name">{skill.name}</span>
      <span className="chip-cat">{skill.category}</span>
    </motion.div>
  );
}

function TimelineItem({ item, index }) {
  const Icon = item.type === "work" ? FiBriefcase : FiBook;
  return (
    <motion.div
      className="tl-item"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="tl-left">
        <div className={`tl-icon ${item.type}`}><Icon size={13} /></div>
        <div className="tl-line" />
      </div>
      <div className="tl-body">
        <span className="tl-year"><FiCalendar size={10} />{item.year}</span>
        <h4 className="tl-title">{item.title}</h4>
        <span className="tl-org">{item.org}</span>
        <p className="tl-desc">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="about" className="about-section">
      <div className="about-top-border" />
      <div className="about-wrap">

        <FadeIn>
          <SectionTitle
            label="About me"
            title="The person behind the code"
            subtitle="I turn ideas into fast, beautiful, and scalable digital products — from the first pixel to the final deploy."
          />
        </FadeIn>

        <div className="about-grid">
          <FadeIn delay={0.1} x={-20} y={0}>
            <div className="bio-glass-card">
              <div className="bio-glow" />
              <div className="bio-header">
                <div className="bio-avatar-wrap">
                  <div className="bio-avatar">JG</div>
                  <span className="bio-avatar-ring" />
                  <span className="bio-status-dot" />
                </div>
                <div className="bio-header-text">
                  <p className="bio-fullname">{profile.fullName}</p>
                  <p className="bio-title-tag">Full Stack Developer · UI/UX Designer</p>
                </div>
              </div>
              <p className="bio-paragraph">
                Hey — I'm Jean Gloire, a self-driven developer and designer based in{" "}
                <span className="bio-hl">Rabat, Morocco</span>. I build end-to-end digital products
                that are fast, accessible, and look great on every screen.
              </p>
              <p className="bio-paragraph">
                I care deeply about the details — from pixel-perfect interfaces to clean,
                maintainable code. Whether it's a landing page or a complex full-stack app,
                I bring the same level of craft to every project.
              </p>
              <p className="bio-paragraph">
                Currently{" "}
                <span className="bio-hl bio-avail">
                  <span className="bio-avail-dot" />
                  open to remote opportunities
                </span>{" "}
                worldwide.
              </p>
              <div className="bio-chips">
                <span className="bio-chip">Fast learner</span>
                <span className="bio-chip">Detail-oriented</span>
                <span className="bio-chip">Remote-ready</span>
                <span className="bio-chip">Clean code</span>
              </div>
              <div className="bio-facts">
                {[
                  { icon: <FiGlobe size={14}/>,  label: "Languages", val: profile.languages.join(" · ") },
                  { icon: <FiCode size={14}/>,   label: "Specialty", val: "Full Stack + UI/UX" },
                  { icon: <FiLayers size={14}/>, label: "Available", val: "Remote · UTC+1" },
                ].map((f, i) => (
                  <div className="bio-fact-row" key={i}>
                    <span className="bio-fact-icon">{f.icon}</span>
                    <span className="bio-fact-label">{f.label}</span>
                    <span className="bio-fact-val">{f.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} x={20} y={0}>
            <div className="terminal-glass">
              <div className="terminal-glow" />
              <div className="terminal-bar">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
                <span className="terminal-label">~/jean-gloire — zsh</span>
              </div>
              <div className="terminal-body">
                {[
                  { cmd: "whoami",              out: "jean-gloire — fullstack dev & designer", color: "" },
                  { cmd: "cat location.txt",    out: "Rabat, Morocco 🌍",                      color: "" },
                  { cmd: "cat availability.txt",out: "✓ Open to remote opportunities",         color: "green" },
                  { cmd: "echo $TIMEZONE",      out: "Africa/Casablanca (UTC+1)",              color: "" },
                  { cmd: "ls ./languages/",     out: "English/  French/  Kinyarwanda/",        color: "" },
                  { cmd: "git log --oneline",   out: "a3f2c1e feat: corridor platform\nb7d9e4a feat: holiday planner\nc2a8f3d init: portfolio v2", color: "muted" },
                ].map((line, i) => (
                  <div key={i} className="terminal-line">
                    <p><span className="t-prompt">❯</span><span className="t-cmd">{line.cmd}</span></p>
                    <p className={`t-out ${line.color ? `t-${line.color}` : ""}`}>
                      {line.out.split("\n").map((l, j) => <span key={j} style={{ display: "block" }}>{l}</span>)}
                    </p>
                  </div>
                ))}
                <p className="t-blink"><span className="t-prompt">❯</span><span className="t-cursor">█</span></p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Skills */}
        <div className="about-skills">
          <FadeIn>
            <div className="skills-header">
              <h3 className="sub-heading">Tech Stack</h3>
              <div className="filter-pills">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="skills-grid"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.map((s, i) => <SkillChip key={s.name} skill={s} index={i} />)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timeline */}
        <div className="about-timeline">
          <FadeIn>
            <h3 className="sub-heading">
              <FiCalendar size={15} className="sub-icon" />
              My Journey
            </h3>
          </FadeIn>
          <div className="tl-list">
            {timeline.map((item, i) => <TimelineItem key={i} item={item} index={i} />)}
          </div>
        </div>

      </div>
    </section>
  );
}
