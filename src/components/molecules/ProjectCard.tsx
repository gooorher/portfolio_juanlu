"use client"

import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { ArrowRight, Code, ExternalLink } from "lucide-react"

import { Project } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
    project: Project
    index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        x.set(clientX - left - width / 2)
        y.set(clientY - top - height / 2)
    }

    function onMouseLeave() {
        x.set(0)
        y.set(0)
    }

    const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-full"
            style={{ perspective: 1000 }}
        >
            <motion.div
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative h-full transition-all duration-200 ease-out"
            >
                <div className="relative flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm glass-card hover:shadow-lg hover:border-primary/50 transition-colors">
                    {/* Image Area */}
                    {/* Image Area */}
                    <div className="relative aspect-video w-full overflow-hidden bg-muted/50">
                        {project.image?.thumbnail ? (
                            <img
                                src={project.image.thumbnail}
                                alt={project.title}
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-6xl font-bold">
                                {project.title.charAt(0)}
                            </div>
                        )}
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />

                        {/* Floating Tech Stack */}
                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map(tag => (
                                <Badge key={tag} variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {project.description}
                        </p>

                        {/* Metrics Preview */}
                        <div className="flex gap-4 mb-6 border-t pt-4 border-border/50">
                            {project.metrics.slice(0, 2).map((metric, i) => (
                                <div key={i}>
                                    <div className="text-lg font-bold text-foreground">{metric.value}</div>
                                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                            <Button variant="ghost" size="sm" className="gap-2 p-0 hover:bg-transparent hover:text-primary" asChild>
                                <Link href={project.caseStudyPath}>
                                    Case Study <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            {project.githubUrl && (
                                <Link href={project.githubUrl} className="text-muted-foreground hover:text-foreground">
                                    <Code className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
