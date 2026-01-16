import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Experience } from "@/components/sections/Experience"
import { Education } from "@/components/sections/Education"
import { Skills } from "@/components/sections/Skills"
import { FeaturedProjects } from "@/components/sections/FeaturedProjects"
import { InteractiveDemos } from "@/components/sections/InteractiveDemos"
import { TechnicalEcosystem } from "@/components/sections/TechnicalEcosystem"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <FeaturedProjects />
      <InteractiveDemos />
      <TechnicalEcosystem />
    </>
  )
}
