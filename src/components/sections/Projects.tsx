"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const projects = [
    {
        title: "Portfolio",
        description: "A showcase of my work and skills, built with Next.js 15, Tailwind CSS, and React Three Fiber.",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind", "R3F"],
        links: { github: "https://github.com/gooorher/portfolio_juanlu", live: "#" },
    },
    {
        title: "AI Billing Automation",
        description: "Automating billing processes using OCR and LLMs to extract and validate data.",
        technologies: ["Python", "LLMs", "OCR", "REST APIs"],
        links: { github: "#", live: "#" },
    },
    {
        title: "Network Malware Detection",
        description: "Machine Learning model to detect malware in network traffic patterns.",
        technologies: ["Python", "Scikit-learn", "Network Analysis"],
        links: { github: "#", live: "#" },
    },
];

function ProjectCard({ project, index }: { project: any, index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const springConfig = { damping: 25, stiffness: 100 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                perspective: 1000,
            }}
        >
            <motion.div
                className="group relative rounded-2xl overflow-hidden bg-card border hover:border-accent/50 transition-colors flex flex-col h-full transform-gpu"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                }}
            >
                <div className="aspect-video bg-muted relative overflow-hidden">
                    {/* Placeholder for Project Image */}
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted group-hover:scale-105 transition-transform duration-500">
                        Project Preview
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-medium">View Details</span>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-1 bg-card/95 backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech: string) => (
                            <span key={tech} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <Button variant="outline" size="sm" asChild className="z-20">
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" /> Code
                            </a>
                        </Button>
                        <Button size="sm" asChild className="z-20">
                            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                                Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function Projects() {
    return (
        <section id="projects" className="py-24 bg-secondary/50">
            <Container>
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-lg text-muted-foreground">Some of the things I've built.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button variant="link" asChild>
                        <a href="https://github.com/gooorher" target="_blank" rel="noopener noreferrer" className="text-lg">
                            View all projects on GitHub <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
