"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

export function About() {
    return (
        <section id="about" className="py-24 bg-secondary/50">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                    <p className="text-lg text-muted-foreground">
                        Passionate about building scalable systems and intuitive user experiences.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="relative aspect-square rounded-2xl overflow-hidden bg-muted"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Placeholder for Image */}
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            Profile Image Placeholder
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <p className="text-muted-foreground">
                            I am a Financial Systems Engineer at EY, specializing in full-stack development and cloud architecture. With a background in Telecommunications Engineering and a Master's in Big Data & AI, I bridge the gap between complex data systems and user-friendly interfaces.
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-4 bg-background rounded-lg border">
                                <h3 className="text-2xl font-bold text-accent">2+</h3>
                                <p className="text-sm text-muted-foreground">Years Experience</p>
                            </div>
                            <div className="p-4 bg-background rounded-lg border">
                                <h3 className="text-2xl font-bold text-accent">10+</h3>
                                <p className="text-sm text-muted-foreground">Projects Completed</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
