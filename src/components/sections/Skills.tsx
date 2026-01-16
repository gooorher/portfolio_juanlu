"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, Database, Cloud, Code, Terminal, Layers, Activity, Users } from "lucide-react"
import { cn } from "@/lib/utils"

// New taxonomy based on PRD
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

export function Skills() {
    const [activeCategory, setActiveCategory] = useState(skillCategories[0].id)

    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--primary)]/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-cyan-400 mb-4">
                        Technical Arsenal
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        A comprehensive toolkit designed for building scalable AI-powered applications and robust infrastructure.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Category Selector */}
                    <div className="lg:col-span-4 space-y-4">
                        {skillCategories.map((category) => {
                            const isActive = activeCategory === category.id
                            const Icon = category.icon

                            return (
                                <motion.button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={cn(
                                        "w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all duration-300 border",
                                        isActive
                                            ? "bg-[var(--primary)]/10 border-[var(--primary)] shadow-[0_0_20px_rgba(0,217,177,0.1)]"
                                            : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"
                                    )}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className={cn(
                                        "p-2 rounded-lg transition-colors",
                                        isActive ? "bg-[var(--primary)] text-black" : "bg-white/10 text-gray-400"
                                    )}>
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className={cn("font-semibold", isActive ? "text-white" : "text-gray-400")}>
                                            {category.title}
                                        </h3>
                                    </div>
                                </motion.button>
                            )
                        })}
                    </div>

                    {/* Skills Display */}
                    <div className="lg:col-span-8">
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 min-h-[400px] relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {skillCategories.map((category) => (
                                    activeCategory === category.id && (
                                        <motion.div
                                            key={category.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full"
                                        >
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="p-3 bg-[var(--primary)]/20 rounded-xl text-[var(--primary)]">
                                                    <category.icon size={32} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white mb-1">{category.title}</h3>
                                                    <p className="text-gray-400">{category.description}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {category.skills.map((skill, idx) => (
                                                    <motion.div
                                                        key={skill}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: idx * 0.05 }}
                                                        className="group p-4 bg-white/5 rounded-xl border border-white/5 hover:border-[var(--primary)]/50 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-2 h-2 rounded-full bg-[var(--primary)] group-hover:shadow-[0_0_8px_var(--primary)] transition-shadow" />
                                                            <span className="text-gray-200 group-hover:text-white transition-colors">
                                                                {skill}
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
