"use client"

import { useState } from "react"
import { experience } from "@/data/experience"
import { TimelineCard } from "@/components/shared/TimelineCard"
import { motion } from "motion/react"
import { Experience3D } from "@/components/experience/Experience3D"
import { cn } from "@/lib/utils"

export function Experience() {
    const [viewMode, setViewMode] = useState<"list" | "3d">("list")

    return (
        <section id="experience" className="py-20 bg-transparent">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary mb-4 py-1">
                        Professional Experience
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        My journey through complex technical landscapes, delivering production-grade AI solutions.
                    </p>

                    <div className="flex bg-muted/50 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode("list")}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-md transition-all",
                                viewMode === "list" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Standard
                        </button>
                        <button
                            onClick={() => setViewMode("3d")}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-md transition-all",
                                viewMode === "3d" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            3D Timeline
                        </button>
                    </div>
                </motion.div>

                {viewMode === "3d" ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Experience3D />
                    </motion.div>
                ) : (
                    <div className="relative wrap overflow-hidden p-4 h-full">
                        {/* Vertical timeline line */}
                        <div className="border-2-2 absolute border-opacity-20 border-[var(--primary)] h-full border text-[var(--primary)]" style={{ left: '50%' }}></div>

                        <div className="flex flex-col w-full md:grid-cols-9 mx-auto">
                            {experience.map((job, index) => (
                                <TimelineCard key={job.id} experience={job} index={index} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
