"use client"

import { motion } from "motion/react"
import { Cpu, Terminal, Activity, Cloud, Users, CheckCircle2 } from "lucide-react"
import { competencies, integrations } from "@/data/technical-arsenal"
import { cn } from "@/lib/utils"

// Ported from Skills.tsx
const skillCategories = [
    {
        id: "ai-ml",
        title: "AI/ML & LLM Integration",
        icon: Cpu,
        description: "Building intelligent systems with State-of-the-Art models",
        skills: [
            "Large Language Models (GPT-4, Claude, Gemini)",
            "Model Optimization & Compression",
            "RAG & Vector Databases (Pinecone, ChromaDB)",
            "Prompt Engineering & Fine-tuning",
            "Machine Learning (Scikit-learn, TensorFlow)"
        ]
    },
    {
        id: "api-dev",
        title: "API Development & Troubleshooting",
        icon: Terminal,
        description: "Designing robust and scalable interfaces",
        skills: [
            "REST API (FastAPI, Django, Flask)",
            "API Debugging & Performance Tuning",
            "Postman/Swagger Documentation",
            "Error Handling & Logging (Sentry)",
            "Rate Limiting & Authentication (OAuth2, JWT)"
        ]
    },
    {
        id: "production",
        title: "Production & Monitoring",
        icon: Activity,
        description: "Ensuring reliability and performance at scale",
        skills: [
            "Real-Time Monitoring (Dynatrace, Datadog)",
            "Incident Management (L3 Support)",
            "Root Cause Analysis & Debugging",
            "CI/CD Pipelines (GitHub Actions, GitLab CI)",
            "Performance Optimization & Load Testing"
        ]
    },
    {
        id: "cloud",
        title: "Cloud & Infrastructure",
        icon: Cloud,
        description: "Architecting cloud-native solutions",
        skills: [
            "AWS (ECS, Lambda, RDS, S3, CloudWatch)",
            "Docker & Kubernetes",
            "MongoDB, PostgreSQL, Redis",
            "Terraform / Infrastructure as Code",
            "Serverless Architecture"
        ]
    },
    {
        id: "customer",
        title: "Customer Success & Support",
        icon: Users,
        description: "Bridging the gap between tech and people",
        skills: [
            "Technical Documentation (API Guides)",
            "Customer Issue Resolution (L3 Support)",
            "Cross-functional Collaboration",
            "Technical Communication & Training",
            "SLA Management & Escalation"
        ]
    }
]

export function TechnicalArsenal() {
    return (
        <section id="skills" className="py-24 relative overflow-hidden bg-background">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-start gap-4 mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Technical Arsenal
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-[700px]">
                        A comprehensive stack built for deploying and supporting production AI systems at scale.
                    </p>
                </motion.div>

                {/* PRIMARY SKILLS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {skillCategories.map((category, idx) => {
                        const Icon = category.icon
                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative overflow-hidden rounded-2xl border bg-card p-6 hovered-card transition-colors"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="font-bold text-lg">{category.title}</h3>
                                </div>
                                <ul className="space-y-3">
                                    {category.skills.map(skill => (
                                        <li key={skill} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50" />
                                            <span>{skill}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )
                    })}
                </div>

                {/* TOOL PROFICIENCY */}
                <div className="mb-24">
                    <h3 className="text-2xl font-bold mb-12">Core Competencies</h3>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                        {competencies.map((comp, idx) => (
                            <motion.div
                                key={comp.name}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="space-y-3"
                            >
                                <div className="flex justify-between items-end">
                                    <span className="font-medium">{comp.name}</span>
                                    <span className="text-sm text-muted-foreground">{comp.level}</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${comp.percentage}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                        className="h-full bg-gradient-to-r from-primary to-primary/60"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* INTEGRATION SHOWCASE */}
                <div>
                    <h3 className="text-2xl font-bold mb-12">Integration Experience</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {integrations.map((integration, idx) => {
                            const Icon = integration.icon
                            return (
                                <motion.div
                                    key={integration.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex flex-col items-center gap-4 p-6 rounded-xl border bg-card hover:border-primary/50 hover:bg-muted/50 transition-all duration-300 group"
                                >
                                    <Icon className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                                    <div className="text-center">
                                        <span className="block font-semibold mb-1 group-hover:text-primary transition-colors">{integration.name}</span>
                                        <span className="text-xs text-muted-foreground">{integration.context}</span>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
