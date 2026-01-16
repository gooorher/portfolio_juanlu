"use client"

import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink, FileText, CheckCircle2 } from "lucide-react"

export interface CaseStudyProps {
    project: {
        title: string
        tagline?: string
        heroImage: string
        badges?: string[]
        description: string
        techStack: string[]
        githubUrl?: string
        liveUrl?: string
        metrics: {
            label: string
            value: string
            icon?: React.ReactNode
        }[]
    }
    content: {
        challenge: {
            description: string
            points?: { title: string; description: string }[]
        }
        solution?: {
            title: string
            description: string
        }
        support?: {
            title: string
            description: string
            integrationGuide?: boolean
        }
        architecture?: {
            image?: string
            flowSteps?: string[]
        }
    }
}

export function CaseStudyLayout({ project, content }: CaseStudyProps) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container px-4 py-12 mx-auto max-w-5xl">
                <Link href="/#projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                </Link>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        {project.badges?.map((badge) => (
                            <Badge key={badge} className="mb-4 mr-2">{badge}</Badge>
                        ))}
                        <h1 className="text-4xl font-bold tracking-tight mb-2 sm:text-5xl">{project.title}</h1>
                        {project.tagline && (
                            <p className="text-xl font-medium text-primary mb-6">{project.tagline}</p>
                        )}
                        <p className="text-lg text-muted-foreground mb-8">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {project.techStack.map((tech) => (
                                <Badge key={tech} variant="secondary">{tech}</Badge>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            {project.githubUrl && (
                                <Button asChild>
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 h-4 w-4" />
                                        GitHub Repo
                                    </a>
                                </Button>
                            )}
                            {project.liveUrl && (
                                <Button variant="outline" asChild>
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Live Demo
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted/20">
                        {project.heroImage ? (
                            <Image
                                src={project.heroImage}
                                alt={`${project.title} Dashboard`}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                No Hero Image
                            </div>
                        )}
                    </div>
                </div>

                {/* Metrics Section */}
                {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {project.metrics.map((metric, idx) => (
                            <div key={idx} className="bg-card p-6 rounded-xl border border-border text-center">
                                <span className="text-3xl font-bold text-primary block mb-2">{metric.value}</span>
                                <span className="text-sm text-muted-foreground uppercase tracking-widest">{metric.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-24">
                    {/* Challenge Section */}
                    <section>
                        <h2 className="text-3xl font-bold mb-8">The Challenge</h2>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p className="text-lg leading-relaxed mb-6">
                                {content.challenge.description}
                            </p>
                            {content.challenge.points && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                                    {content.challenge.points.map((point, idx) => (
                                        <div key={idx} className="space-y-4">
                                            <h3 className="text-xl font-semibold text-foreground flex items-center">
                                                <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                                                {point.title}
                                            </h3>
                                            <p>{point.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Technical Architecture Section */}
                    {(content.architecture || content.support) && (
                        <section>
                            {content.architecture && (
                                <>
                                    <h2 className="text-3xl font-bold mb-8">Technical Architecture</h2>
                                    {content.architecture.image && (
                                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border mb-12">
                                            <Image
                                                src={content.architecture.image}
                                                alt="Technical Architecture Diagram"
                                                fill
                                                className="object-contain bg-muted/20 p-8"
                                            />
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {content.architecture?.flowSteps && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-4">Pipeline Flow</h3>
                                        <ol className="space-y-4 text-muted-foreground">
                                            {content.architecture.flowSteps.map((step, idx) => (
                                                <li key={idx} dangerouslySetInnerHTML={{ __html: step }} />
                                            ))}
                                        </ol>
                                    </div>
                                )}

                                {content.support && (
                                    <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
                                        <h3 className="text-xl font-bold mb-4 text-primary">{content.support.title || "Support Engineer Insights"}</h3>
                                        <p className="text-sm text-muted-foreground italic mb-6">
                                            "{content.support.description}"
                                        </p>
                                        {content.support.integrationGuide && (
                                            <Button variant="outline" className="w-full" asChild>
                                                <a href="#" className="flex items-center">
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    View API Integration Guide (Sample)
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            <footer className="border-t py-12 mt-24 bg-muted/20">
                <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Juan Lucas Gordillo. Product Support Excellence.
                </div>
            </footer>
        </div>
    )
}
