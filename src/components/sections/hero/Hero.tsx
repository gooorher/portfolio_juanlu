"use client";

import { motion } from "framer-motion";
import { Background3D } from "./Background3D";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <Background3D />

            <Container className="relative z-10 pt-20">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-accent font-medium tracking-wide uppercase text-sm md:text-base mb-4">
                            Financial Systems Engineer & Full Stack Developer
                        </h2>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
                            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Digital Experiences</span> that Matter.
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            I'm Juan Lucas Gordillo. I specialize in cloud architecture, AI integration, and modern web development. Currently leveraging technology at EY to solve complex financial challenges.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button size="lg" className="h-12 px-8 text-base bg-accent hover:bg-accent/90 text-white rounded-full transition-transform hover:scale-105" asChild>
                            <Link href="#projects">
                                View Projects <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 transition-transform hover:scale-105" asChild>
                            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                                Download CV <Download className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex justify-center gap-6 pt-8"
                    >
                        <a href="https://github.com/gooorher" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                            <Github className="h-6 w-6" />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a href="https://linkedin.com/in/juan-lucas-gordillo" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                            <Linkedin className="h-6 w-6" />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
