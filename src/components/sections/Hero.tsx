"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MetricCounter } from "@/components/animations/MetricCounter"
import { NeuralNetwork } from "@/components/animations/NeuralNetwork"
import { cn } from "@/lib/utils"

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    // Mouse gradient effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e
        const { left, top } = e.currentTarget.getBoundingClientRect()
        setMousePosition({ x: clientX - left, y: clientY - top })
    }

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        >
            {/* Animated Background Gradient */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(10, 132, 255, 0.08), transparent 40%)`
                }}
            />

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="container relative z-10 grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                {/* Text Content */}
                <div className="flex flex-col items-start gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4">
                            Available for new projects
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-2">
                            Juan Lucas Gordillo
                        </h1>
                        <h2 className="text-2xl font-bold tracking-tight text-muted-foreground lg:text-3xl">
                            Product Support Engineer
                        </h2>
                        <div className="h-8 mt-2">
                            <Typewriter text="LLM Integration & API Specialist" />
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-[600px] leading-relaxed"
                    >
                        I build, deploy, and support AI-powered products. Specializing in bridging the gap between complex LLM architectures and reliable production systems.
                    </motion.p>

                    {/* Metrics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="grid grid-cols-3 gap-8 w-full max-w-md my-6"
                    >
                        <div className="text-center md:text-left">
                            <div className="text-3xl font-bold text-foreground">
                                <MetricCounter value={95} suffix="%" />
                            </div>
                            <div className="text-sm text-muted-foreground">Satisfaction</div>
                        </div>
                        <div className="text-center md:text-left">
                            <div className="text-3xl font-bold text-foreground">
                                <MetricCounter value={1000} suffix="+" prefix="" />
                            </div>
                            <div className="text-sm text-muted-foreground">API Requests</div>
                        </div>
                        <div className="text-center md:text-left">
                            <div className="text-3xl font-bold text-foreground">
                                <span className="inline-block">L3</span>
                            </div>
                            <div className="text-sm text-muted-foreground">Support Level</div>
                        </div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Button size="lg" className="gap-2" asChild>
                            <Link href="/projects">
                                View Work <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2" asChild>
                            <Link href="/contact">
                                Contact Me <Mail className="w-4 h-4" />
                            </Link>
                        </Button>
                        <div className="flex gap-2 ml-2">
                            {/* Socials could go here or footer */}
                            <Button size="icon" variant="ghost" asChild>
                                <Link href="https://github.com" target="_blank"><Github className="w-5 h-5" /></Link>
                            </Button>
                            <Button size="icon" variant="ghost" asChild>
                                <Link href="https://linkedin.com" target="_blank"><Linkedin className="w-5 h-5" /></Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Visual/Graphic Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:flex items-center justify-center p-8 h-[500px]"
                >
                    {/* 3D/Neural network graphic */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse" />
                    <NeuralNetwork />

                    {/* Floating Elements Animation */}
                    <FloatingBadge delay={0} x={-140} y={-100} text="RAG Systems" />
                    <FloatingBadge delay={1} x={160} y={-60} text="Model Fine-tuning" />
                    <FloatingBadge delay={2} x={-120} y={120} text="API Design" />
                </motion.div>
            </div>
        </section>
    )
}

function Typewriter({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState("")

    useEffect(() => {
        let i = 0
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i))
                i++
            } else {
                clearInterval(timer)
            }
        }, 50)
        return () => clearInterval(timer)
    }, [text])

    return (
        <span className="text-xl md:text-2xl font-mono text-primary">
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
            >
                |
            </motion.span>
        </span>
    )
}

function FloatingBadge({ text, x, y, delay }: { text: string, x: number, y: number, delay: number }) {
    return (
        <motion.div
            initial={{ y: y, x: x }}
            animate={{ y: y + 10 }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay
            }}
            className="absolute bg-background/80 backdrop-blur border shadow-sm px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ left: "50%", top: "50%", marginLeft: x, marginTop: y }}
        >
            {text}
        </motion.div>
    )
}
