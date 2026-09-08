import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiStar } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { projects, projectCategories } from "../../data/projects";

/* ── Fade-in wrapper ────────────────────── */
const FadeIn = ({ children, delay = 0, y = 24 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/* ── Tag pill ───────────────────────────── */
function Tag({ label }) {
  return <span className="proj-tag">{label}</span>;
}

/* ── Featured project card (large) ─────── */
function FeaturedCard({ project, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="featured-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image side */}
      <div className={`featured-img-wrap ${isEven ? "" : "order-last"}`}>
        <div className="featured-img-inner" style={{ "--proj-color": project.color }}>
          {project.image ? (
            <img src={project.image} alt={project.title} className="featured-img" />
          ) : (
            <div className="featured-img-placeholder">
              <span className="placeholder-icon">🚀</span>
              <span className="placeholder-label">{project.title}</span>
            </div>
          )}
          <div className="featured-img-overlay" />
          {/* Glow */}
          <div className="featured-glow" style={{ background: project.color }} />
        </div>
      </div>

      {/* Content side */}
      <div className="featured-content">
        <div className="featured-top">
          <span className="featured-badge">
            <FiStar size={11} />
            Featured Project
          </span>
          <span className="featured-category">{project.category}</span>
        </div>

        <h3 className="featured-title">{project.title}</h3>

        <div className="featured-desc-card">
          <p className="featured-desc">{project.description}</p>
        </div>

        <div className="featured-tags">
          {project.tags.map((t) => <Tag key={t} label={t} />)}
        </div>

        <div className="featured-links">
          {project.live && project.live !== "#" && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="proj-link-btn primary">
              <FiExternalLink size={14} />
              Live Demo
            </a>
          )}
          <a href={project.code} target="_blank" rel="noopener noreferrer" className="proj-link-btn ghost">
            <FiGithub size={14} />
            Source Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Regular project card (small grid) ─── */
function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="proj-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      {/* Top bar */}
      <div className="proj-card-top">
        <div className="proj-card-icon" style={{ "--proj-color": project.color }}>
          {project.image ? (
            <img src={project.image} alt={project.title} className="proj-card-img" />
          ) : (
            <span className="proj-card-emoji">💻</span>
          )}
        </div>
        <div className="proj-card-links">
          {project.live && project.live !== "#" && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="proj-icon-link" aria-label="Live demo">
              <FiExternalLink size={16} />
            </a>
          )}
          <a href={project.code} target="_blank" rel="noopener noreferrer" className="proj-icon-link" aria-label="Source code">
            <FiGithub size={16} />
          </a>
        </div>
      </div>

      <h4 className="proj-card-title">{project.title}</h4>
      <p className="proj-card-desc">{project.description}</p>

      <div className="proj-card-tags">
        {project.tags.slice(0, 3).map((t) => <Tag key={t} label={t} />)}
      </div>
    </motion.div>
  );
}

/* ── Projects Section ───────────────────── */
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => {
    if (!p.featured) {
      return activeCategory === "All" || p.category === activeCategory;
    }
    return false;
  });

  return (
    <section id="projects" className="projects-section">
      <div className="projects-top-border" />

      <div className="projects-wrap">

        {/* ── Header ── */}
        <FadeIn>
          <div className="projects-header">
            <span className="projects-label">
              <span className="label-line" />
              Projects
              <span className="label-line" />
            </span>
            <h2 className="projects-heading">Things I've Built</h2>
            <p className="projects-subtitle">
              A selection of projects I've designed and developed — from full-stack apps to polished frontends.
            </p>
          </div>
        </FadeIn>

        {/* ── Featured projects ── */}
        <div className="featured-list">
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* ── Other projects ── */}
        <div className="other-projects">
          <FadeIn>
            <div className="other-header">
              <h3 className="sub-heading">
                <BsStars size={15} className="sub-icon" />
                Other Projects
              </h3>
              <div className="filter-pills">
                {projectCategories.map((cat) => (
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
              className="proj-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              {rest.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── CTA ── */}
        <FadeIn>
          <div className="projects-cta">
            <p className="projects-cta-text">Want to see more of my work?</p>
            <a
              href="https://github.com/Ishimwe-Jean-Gloire"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <FiGithub size={15} />
              View GitHub Profile
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
