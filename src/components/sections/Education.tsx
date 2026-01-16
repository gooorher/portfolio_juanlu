"use client"

import { education } from "@/data/education"
import { EducationCard } from "@/components/shared/EducationCard"
import { motion } from "framer-motion"

export function Education() {
    return (
        <section id="education" className="py-20 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-cyan-400 mb-4">
                        Academic Background
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Foundational knowledge in engineering and specialized research in AI and Distributed Systems.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {education.map((edu, index) => (
                        <EducationCard key={edu.id} education={edu} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
