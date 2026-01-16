"use client"

import { motion } from "motion/react"
import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/molecules/ProjectCard"

export function FeaturedProjects() {
    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-50" />

            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-start gap-4 mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Featured Work
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-[800px]">
                        Selected projects demonstrating end-to-end AI integration, from heavy lifting backend systems to polished user interfaces.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
