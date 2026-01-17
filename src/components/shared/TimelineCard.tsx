"use client"

import { Experience } from "@/types"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface TimelineCardProps {
    experience: Experience
    index: number
}

export function TimelineCard({ experience, index }: TimelineCardProps) {
    const isEven = index % 2 === 0

    return (
        <div className={`mb-8 flex justify-between items-center w-full ${isEven ? "flex-row-reverse" : ""}`}>
            <div className="order-1 w-5/12"></div>

            <div className="z-20 flex items-center order-1 bg-gray-900 shadow-xl w-8 h-8 rounded-full border-2 border-[var(--primary)]">
                <h1 className="mx-auto font-semibold text-lg text-white"></h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="order-1 w-5/12 px-6 py-4 bg-[hsl(var(--timeline-card))] border border-border rounded-lg shadow-xl"
            >
                <div className="mb-3">
                    <span className="text-sm font-bold text-[var(--primary)]">{experience.period}</span>
                    <span className="mx-2 text-muted-foreground">|</span>
                    <span className="text-sm text-muted-foreground">{experience.location}</span>
                </div>
                <h3 className="mb-1 font-bold text-foreground text-xl">{experience.title}</h3>
                <h4 className="mb-3 text-lg text-muted-foreground font-semibold">{experience.company}</h4>

                <ul className="list-disc pl-4 space-y-1 mb-4">
                    {experience.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-muted-foreground text-sm">{highlight}</li>
                    ))}
                </ul>

                <Badge variant="secondary" className="bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20">
                    {experience.type}
                </Badge>
            </motion.div>
        </div>
    )
}
