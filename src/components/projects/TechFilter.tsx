"use client"

import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"

interface TechFilterProps {
    technologies: string[]
    activeFilters: string[]
    onFilterChange: (tech: string) => void
}

export function TechFilter({ technologies, activeFilters, onFilterChange }: TechFilterProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {technologies.map((tech) => (
                <Badge
                    key={tech}
                    variant={activeFilters.includes(tech) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={() => onFilterChange(tech)}
                >
                    {tech}
                </Badge>
            ))}
        </div>
    )
}
