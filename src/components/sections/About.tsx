"use client"

import { about } from "@/data/about"
import { socialLinks } from "@/data/social-links"
import { motion } from "framer-motion"
import { Download, Book } from "lucide-react"
import { Spotify, Strava } from "@/components/shared/Icons"
import { Button } from "@/components/ui/button"

const interestIcons = {
    Book,
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
                <div className="flex flex-col lg:flex-row gap-12 items-center">

                    {/* Left Column: Bio & Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2 space-y-8"
                    >
                        <div>
                            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-cyan-400 mb-6">
                                About Me
                            </h2>
                            <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                                <p>{about.professionalBio}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {about.stats.map((stat, idx) => (
                                <div key={idx} className="glass-card p-4 rounded-xl text-center">
                                    <h4 className="text-2xl font-bold text-[var(--primary)] mb-1">{stat.value}</h4>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10">
                                <Download className="mr-2 h-4 w-4" />
                                Download Resume
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Column: Interests & Personal */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="glass-card p-8 rounded-2xl border border-white/5 relative">
                            <div className="absolute top-0 right-0 p-8 opacity-20">
                                {/* Abstract decoration could go here */}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-6">Personal Interests</h3>

                            <div className="space-y-6">
                                {about.personalInterests.map((interest, idx) => {
                                    const Icon = interestIcons[interest.icon as keyof typeof interestIcons] || Book
                                    return (
                                        <a
                                            key={idx}
                                            href={interest.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
                                        >
                                            <div className="p-3 bg-[var(--primary)]/10 rounded-lg text-[var(--primary)] group-hover:scale-110 transition-transform">
                                                <Icon size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-white group-hover:text-[var(--primary)] transition-colors">
                                                    {interest.title}
                                                </h4>
                                                <p className="text-sm text-gray-400">{interest.description}</p>
                                            </div>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
