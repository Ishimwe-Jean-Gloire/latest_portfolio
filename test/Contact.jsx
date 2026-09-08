import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiClock, FiSend, FiGithub, FiLinkedin, FiCheck, FiAlertCircle } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { profile } from "../../data/profile";

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

function InfoCard({ icon, label, value, href }) {
  const inner = (
    <div className="info-card">
      <div className="info-icon">{icon}</div>
      <div className="info-text">
        <span className="info-label">{label}</span>
        <span className="info-value">{value}</span>
      </div>
    </div>
  );
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" className="info-card-link">{inner}</a>
    : inner;
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus]     = useState("idle");
  const [errors, setErrors]     = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim())    e.name    = "Name is required";
    if (!formData.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  const infoItems = [
    { icon: <FiMail size={16} />,    label: "Email",    value: profile.email,    href: `mailto:${profile.email}` },
    { icon: <FiMapPin size={16} />,  label: "Location", value: profile.location },
    { icon: <FiClock size={16} />,   label: "Timezone", value: `${profile.timezone} · Open to remote` },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-top-border" />
      <div className="contact-wrap">

        {/* Header */}
        <FadeIn>
          <div className="contact-header">
            <span className="contact-label">
              <span className="label-line" />Contact<span className="label-line" />
            </span>
            <h2 className="contact-heading">Let's Work Together</h2>
            <p className="contact-subtitle">
              Have a project in mind or want to hire me for remote work?
              I'd love to hear from you — I typically respond within 24 hours.
            </p>
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="contact-grid">

          {/* Left */}
          <FadeIn delay={0.1} y={0}>
            <div className="contact-left">

              {/* Availability card */}
              <div className="avail-card">
                <div className="avail-card-glow" />
                <div className="avail-card-top">
                  <span className="avail-pulse-dot" />
                  <span className="avail-card-title">Currently Available</span>
                </div>
                <p className="avail-card-desc">
                  Open to freelance projects, remote full-time roles, and collaborations.
                  Let's build something great together.
                </p>
                <div className="avail-tags">
                  <span className="avail-tag">🌍 Remote worldwide</span>
                  <span className="avail-tag">⚡ Fast responses</span>
                  <span className="avail-tag">🤝 Open to contracts</span>
                </div>
              </div>

              {/* Info */}
              <div className="info-cards">
                {infoItems.map((item, i) => (
                  <FadeIn key={i} delay={0.15 + i * 0.08}>
                    <InfoCard {...item} />
                  </FadeIn>
                ))}
              </div>

              {/* Socials */}
              <div className="contact-socials">
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="social-card">
                  <FiGithub size={18} />
                  <div className="social-card-text">
                    <span className="social-card-name">GitHub</span>
                    <span className="social-card-handle">@Ishimwe-Jean-Gloire</span>
                  </div>
                </a>
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-card">
                  <FiLinkedin size={18} />
                  <div className="social-card-text">
                    <span className="social-card-name">LinkedIn</span>
                    <span className="social-card-handle">ishimwe-jean-gloire</span>
                  </div>
                </a>
              </div>

            </div>
          </FadeIn>

          {/* Right — form */}
          <FadeIn delay={0.2} y={0}>
            <div className="contact-form-card">
              <div className="form-card-glow" />
              <div className="form-card-header">
                <BsStars size={15} className="form-header-icon" />
                <h3 className="form-card-title">Send a Message</h3>
              </div>

              <div className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input className={`form-input ${errors.name ? "input-error" : ""}`}
                      type="text" name="name" placeholder="Your name"
                      value={formData.name} onChange={handleChange} />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className={`form-input ${errors.email ? "input-error" : ""}`}
                      type="email" name="email" placeholder="you@example.com"
                      value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject <span className="form-optional">(optional)</span></label>
                  <input className="form-input" type="text" name="subject"
                    placeholder="Project inquiry, job opportunity..."
                    value={formData.subject} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className={`form-input form-textarea ${errors.message ? "input-error" : ""}`}
                    name="message" placeholder="Tell me about your project or opportunity..."
                    value={formData.message} onChange={handleChange} rows={5} />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <motion.button
                  className={`form-submit ${status}`}
                  onClick={handleSubmit}
                  disabled={status === "sending" || status === "success"}
                  whileTap={{ scale: 0.97 }}
                >
                  {status === "idle"    && <><FiSend size={15} /> Send Message</>}
                  {status === "sending" && <><span className="spinner" /> Sending...</>}
                  {status === "success" && <><FiCheck size={15} /> Message Sent!</>}
                  {status === "error"   && <><FiAlertCircle size={15} /> Failed — Try Again</>}
                </motion.button>

                <p className="form-note">
                  💡 Replace <code>YOUR_FORM_ID</code> in Contact.jsx with your free{" "}
                  <a href="https://formspree.io" target="_blank" rel="noopener noreferrer">Formspree</a> ID to activate the form.
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
