import "./components/layout/Navbar.css";
import "./components/layout/Footer.css";
import "./components/sections/Hero.css";
import "./components/sections/About.css";
import "./components/sections/Projects.css";
import "./components/sections/Contact.css";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
