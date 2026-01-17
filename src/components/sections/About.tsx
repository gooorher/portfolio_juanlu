"use client"

import { about } from "@/data/about"
import { socialLinks } from "@/data/social-links"
import { motion } from "motion/react"
import { Download, Book } from "lucide-react"
import { Spotify, Strava, Goodreads } from "@/components/shared/Icons"
import { Button } from "@/components/ui/button"
import { TerminalWindow } from "@/components/about/TerminalWindow"

const interestIcons = {
    Goodreads,
    Spotify,
    Strava
}

export function About() {
    return (
        <section id="about" className="py-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--primary)]/5 blur-[100px] pointer-events-none" />
            {/* Subtle Hero Visual Background */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-5 pointer-events-none mix-blend-overlay">
                <img src="/images/hero_visual.png" alt="" className="object-contain w-full h-full" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary mb-6 py-1">
                        About Me
                    </h2>
                    <Button variant="outline" className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10">
                        <Download className="mr-2 h-4 w-4" />
                        Download Resume
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full"
                    >
                        <TerminalWindow />
                    </motion.div>

                    {/* Right Column: Interests */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full h-full"
                    >
                        <div className="bg-[hsl(var(--about-card))] p-8 rounded-2xl border border-border relative shadow-sm h-full flex flex-col">
                            <h3 className="text-2xl font-bold text-[hsl(var(--about-text))] mb-8 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                    <Book size={18} />
                                </span>
                                Personal Interests
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                                {about.personalInterests.map((interest, idx) => {
                                    const Icon = interestIcons[interest.icon as keyof typeof interestIcons] || Book
                                    return (
                                        <motion.a
                                            key={idx}
                                            href={interest.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -5 }}
                                            className="flex flex-col p-5 rounded-xl bg-background/50 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />

                                            <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4 group-hover:scale-110 transition-transform relative z-10">
                                                <Icon size={20} />
                                            </div>

                                            <div className="relative z-10">
                                                <h4 className="text-lg font-semibold text-[hsl(var(--about-text))] group-hover:text-primary transition-colors mb-1">
                                                    {interest.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground line-clamp-2">{interest.description}</p>
                                            </div>
                                        </motion.a>
                                    )
                                })}

                                {/* Decorative "More" card */}
                                <div className="border border-dashed border-border rounded-xl p-5 flex items-center justify-center text-muted-foreground/50 italic text-sm">
                                    Exploring more daily...
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
