import { Hero } from "@/components/sections/Hero"
import { FeaturedProjects } from "@/components/sections/FeaturedProjects"
import { TechnicalEcosystem } from "@/components/sections/TechnicalEcosystem"
import { InteractiveDemos } from "@/components/sections/InteractiveDemos"

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <InteractiveDemos />
      <TechnicalEcosystem />
    </>
  )
}
