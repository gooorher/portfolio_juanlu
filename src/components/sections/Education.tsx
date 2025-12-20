"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const education = [
    {
        degree: "MSc in Big Data and AI",
        institution: "University of Málaga x Khaos Research",
        period: "2023 - 2025",
        description: "Specialized in advanced data analytics, machine learning, and artificial intelligence systems.",
    },
    {
        degree: "Erasmus+",
        institution: "University Politehnica of Bucharest",
        period: "2022 - 2023",
        description: "International study program focusing on telecommunications and computer science.",
    },
    {
        degree: "Bachelor of Telecommunications",
        institution: "University of Málaga",
        period: "2018 - 2023",
        description: "Solid foundation in engineering principles, networking, and signal processing.",
    },
];

export function Education() {
    return (
        <section id="education" className="py-24 bg-secondary/50">
            <Container>
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
                    <p className="text-lg text-muted-foreground">Academic background and qualifications.</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex gap-6 relative"
                        >
                            {/* Connector Line */}
                            {index !== education.length - 1 && (
                                <div className="absolute left-[19px] top-10 bottom-[-32px] w-0.5 bg-border" />
                            )}

                            <div className="relative z-10 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm shrink-0">
                                {edu.period.split(" - ")[0].slice(-2)}
                            </div>

                            <div className="pb-8">
                                <h3 className="text-xl font-bold">{edu.degree}</h3>
                                <p className="text-accent mb-2">{edu.institution}</p>
                                <p className="text-sm text-muted-foreground mb-3">{edu.period}</p>
                                <p className="text-muted-foreground">{edu.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
