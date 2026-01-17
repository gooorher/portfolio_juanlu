"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Project } from "@/types"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ImageReveal } from "@/components/projects/ImageReveal"

interface ProjectCardProps {
    project: Project
    index?: number
    className?: string
}

export function ProjectCard({ project, index = 0, className }: ProjectCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={cn(
                "group relative flex flex-col h-full overflow-hidden rounded-2xl border bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md",
                className
            )}
        >
            {/* Image Section */}
            <div className="relative w-full aspect-video overflow-hidden bg-muted/50">
                <ImageReveal className="h-full">
                    {project.image?.thumbnail ? (
                        <Image
                            src={project.image.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-6xl font-bold bg-muted/30">
                            {project.title.charAt(0)}
                        </div>
                    )}
                </ImageReveal>

                {/* Status Badge */}
                <div className="absolute top-3 right-3 z-10">
                    <Badge variant="secondary" className="backdrop-blur-md bg-background/80 border-primary/20 text-xs font-medium flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        Case Study
                    </Badge>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-6">
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs bg-muted/50">
                            {tag}
                        </Badge>
                    ))}
                    {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-muted/50">
                            +{project.tags.length - 3}
                        </Badge>
                    )}
                </div>

                {/* Footer / CTA */}
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                        {project.metrics[0] && (
                            <span>{project.metrics[0].value} {project.metrics[0].label.split(' ')[0]}</span>
                        )}
                    </div>

                    <Link
                        href={project.caseStudyPath}
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline hover:text-primary/80 transition-colors"
                    >
                        Read More <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
