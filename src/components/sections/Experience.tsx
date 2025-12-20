"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const experiences = [
    {
        title: "Financial Systems Engineer",
        company: "EY (Santander)",
        period: "2024 - Present",
        description: "Developing and optimizing financial systems using modern web technologies and cloud infrastructure.",
    },
    {
        title: "Full-Stack Engineer",
        company: "EY (Santander)",
        period: "Previous",
        description: "Built scalable web applications and microservices for banking operations.",
    },
    // Add more experience
];

export function Experience() {
    return (
        <section id="experience" className="py-24">
            <Container>
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
                    <p className="text-lg text-muted-foreground">My professional journey.</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-card border hover:border-accent/50 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                <div>
                                    <h3 className="text-xl font-bold">{exp.title}</h3>
                                    <p className="text-accent">{exp.company}</p>
                                </div>
                                <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full w-fit">{exp.period}</span>
                            </div>
                            <p className="text-muted-foreground">{exp.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
