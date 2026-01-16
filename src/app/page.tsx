import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { WhyHireMe } from "@/components/why-hire-me";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <WhyHireMe />
        {/* Other sections will be added here */}
      </main>
      <footer className="border-t py-12 bg-muted/20">
        <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Juan Lucas Gordillo. Built for AI Support Excellence.
        </div>
      </footer>
    </div>
  );
}
