import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Experience } from "@/components/sections/Experience"
import { Education } from "@/components/sections/Education"
import { TechnicalArsenal } from "@/components/sections/TechnicalArsenal"
import { FeaturedProjects } from "@/components/sections/FeaturedProjects"
import { InteractiveDemos } from "@/components/sections/InteractiveDemos"
import { SectionDivider } from "@/components/shared/SectionDivider"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Education />
      <SectionDivider />
      <TechnicalArsenal />
      <SectionDivider />
      <FeaturedProjects />
      <SectionDivider />
      <InteractiveDemos />
    </>
  )
}
