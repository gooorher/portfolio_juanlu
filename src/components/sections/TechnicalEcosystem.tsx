"use client"

import { motion } from "motion/react"
import { Cpu, Server, Cloud, Users } from "lucide-react"

import { technologies } from "@/data/technologies"
import { cn } from "@/lib/utils"

const categories = [
    { id: "AI/ML", label: "AI & ML", icon: Cpu, description: "LLM Orchestration, RAG, Fine-tuning" },
    { id: "API", label: "Backend & API", icon: Server, description: "FastAPI, PostgreSQL, Vector DBs" },
    { id: "Cloud", label: "Cloud & DevOps", icon: Cloud, description: "AWS, Docker, CI/CD" },
    { id: "Customer Success", label: "Product & Support", icon: Users, description: "Technical Leadership, Documentation" },
]

export function TechnicalEcosystem() {
    return (
        <section className="py-24 bg-muted/20 relative overflow-hidden">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Technical Ecosystem</h2>
                    <p className="mt-4 text-lg text-muted-foreground">My toolkit for building robust, scalable AI solutions.</p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category, i) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="group relative overflow-hidden rounded-2xl border bg-background p-6 hover:shadow-lg transition-all"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <category.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">{category.label}</h3>
                            <p className="mb-6 text-sm text-muted-foreground">{category.description}</p>

                            <div className="space-y-3">
                                {technologies.filter(t => t.category === category.id).map(tech => (
                                    <div key={tech.id} className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{tech.name}</span>
                                        <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${tech.proficiency}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="h-full bg-primary"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
