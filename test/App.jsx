import "./components/sections/Hero.css";
import Hero from "./components/sections/Hero";

export default function App() {
  return (
    <main>
      <Hero />
      <section id="about"    style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#556070", fontFamily: "monospace" }}>// About — coming next</section>
      <section id="projects" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#556070", fontFamily: "monospace" }}>// Projects — coming next</section>
      <section id="contact"  style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#556070", fontFamily: "monospace" }}>// Contact — coming next</section>
    </main>
  );
}
