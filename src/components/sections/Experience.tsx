"use client"

import { experience } from "@/data/experience"
import { TimelineCard } from "@/components/shared/TimelineCard"
import { motion } from "framer-motion"

export function Experience() {
    return (
        <section id="experience" className="py-20 bg-transparent">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-cyan-400 mb-4">
                        Professional Experience
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        My journey through complex technical landscapes, delivering production-grade AI solutions.
                    </p>
                </motion.div>

                <div className="relative wrap overflow-hidden p-4 h-full">
                    {/* Vertical timeline line */}
                    <div className="border-2-2 absolute border-opacity-20 border-[var(--primary)] h-full border text-[var(--primary)]" style={{ left: '50%' }}></div>

                    <div className="flex flex-col w-full md:grid-cols-9 mx-auto">
                        {experience.map((job, index) => (
                            <TimelineCard key={job.id} experience={job} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
