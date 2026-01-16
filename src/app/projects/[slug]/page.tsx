import { notFound } from "next/navigation"
import Link from "next/link"
import { projects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink, Calendar, Code, Activity, Cpu, Layers } from "lucide-react"

interface ProjectPageProps {
    params: {
        slug: string
    }
}

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const project = projects.find((p) => p.slug === params.slug)

    if (!project) {
        notFound()
    }

    return (
        <main className="min-h-screen pt-24 pb-16">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                {/* Back Link */}
                <Link
                    href="/#projects"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                </Link>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-cyan-400">
                                {project.title}
                            </h1>
                            <p className="text-xl text-muted-foreground font-light">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                                <Activity className="w-4 h-4 text-[var(--primary)]" />
                                <span>{project.role}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                                <Calendar className="w-4 h-4 text-[var(--primary)]" />
                                <span>{project.period}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                                <Layers className="w-4 h-4 text-[var(--primary)]" />
                                <span>{project.company}</span>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            {project.liveUrl && (
                                <Button className="gap-2 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-black">
                                    <ExternalLink className="w-4 h-4" />
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
                                </Button>
                            )}
                            {project.githubUrl && (
                                <Button variant="outline" className="gap-2 border-[var(--primary)]/20 hover:bg-[var(--primary)]/10 text-white">
                                    <Github className="w-4 h-4" />
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">Source Code</a>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Project Image/Hero */}
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-muted/20 group">
                        {project.image?.hero ? (
                            <img
                                src={project.image.hero}
                                alt={project.title}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-6xl font-bold">
                                {project.title.charAt(0)}
                            </div>
                        )}
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
                    </div>
                </div>

                {/* Metrics Grid */}
                {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {project.metrics.map((metric, i) => (
                            <div key={i} className="glass-card p-6 rounded-xl text-center border border-white/5">
                                <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                                <div className="text-sm text-gray-400">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <Activity className="text-[var(--primary)]" />
                                Project Overview
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {project.longDescription}
                            </p>
                        </section>

                        {/* Highlights */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Cpu className="text-[var(--primary)]" />
                                Key Highlights
                            </h2>
                            <div className="grid gap-4">
                                {project.highlights && project.highlights.map((highlight, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--primary)]/30 transition-colors">
                                        <div className="min-w-[24px] pt-1">
                                            <div className="w-2 h-2 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]" />
                                        </div>
                                        <p className="text-gray-300">{highlight}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Tech Stack */}
                    <div className="space-y-8">
                        <section className="glass-card p-6 rounded-xl border border-white/10 sticky top-24">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Code className="text-[var(--primary)]" />
                                Tech Stack
                            </h3>

                            {project.techStack ? (
                                <div className="space-y-6">
                                    {Object.entries(project.techStack).map(([category, techs]) => (
                                        <div key={category}>
                                            <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">
                                                {category}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {techs.map((tech) => (
                                                    <Badge key={tech} variant="secondary" className="bg-white/5 hover:bg-white/10 text-gray-300 border-none transition-colors">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-gray-300 border-none transition-colors">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}
