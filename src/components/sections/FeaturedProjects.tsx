"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/molecules/ProjectCard"
import { TechFilter } from "@/components/projects/TechFilter"

export function FeaturedProjects() {
    const [activeFilter, setActiveFilter] = useState("All")

    // Extract all unique technologies from projects
    const allTechnologies = ["All", ...Array.from(new Set(projects.flatMap(p => p.tags)))]

    // Filter projects based on active filter
    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.tags.includes(activeFilter))

    // Bento Grid Logic:
    // Pattern: Large (2x2) - Normal (1x1) - Normal (1x1) - Wide (2x1)
    const getBentoClass = (index: number) => {
        if (activeFilter !== "All") return "col-span-1 md:col-span-1 lg:col-span-1" // Regular grid when filtering

        const patternIndex = index % 4
        switch (patternIndex) {
            case 0: return "col-span-1 md:col-span-2 lg:col-span-2 row-span-2" // Large item
            case 3: return "col-span-1 md:col-span-2 lg:col-span-1" // Wide item or normal depending on layout needs, let's keep it simple for now standard grid with variation
            default: return "col-span-1"
        }
    }

    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl opacity-30" />

            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center gap-4 mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Featured Work
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-[800px]">
                        End-to-end AI applications focusing on production stability, scalability, and seamless user experience.
                    </p>
                </motion.div>

                <TechFilter
                    technologies={allTechnologies} // Show all filters
                    activeFilters={[activeFilter]}
                    onFilterChange={setActiveFilter}
                />

                {/* Bento Grid Layout */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project, i) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={i}
                                className={getBentoClass(i)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
