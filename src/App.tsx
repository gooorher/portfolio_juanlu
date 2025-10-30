import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import ParticleBackground from "./components/ParticleBackground";
import CustomCursor from "./components/CustomCursor";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CustomCursor />
        <ParticleBackground />
        <Layout>
          <Hero />
          <About />
          <Experience />
          <Education />
          <Projects />
          <Contact />
        </Layout>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
