"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from "recharts";

const skillData = [
    { name: "Frontend", x: 100, fill: "#00d4ff" },
    { name: "Backend", x: 90, fill: "#e23670" },
    { name: "Cloud", x: 85, fill: "#e88c30" },
    { name: "AI/ML", x: 80, fill: "#af57db" },
    { name: "Data", x: 75, fill: "#2eb88a" },
];

const skillCategories = [
    {
        title: "Financial Systems & Data",
        skills: ["Control-M", "Oracle SQL", "Bash", "Python ETLs", "Data Processing"],
    },
    {
        title: "Cloud & Full Stack",
        skills: ["AWS (ECS, Lambda, RDS)", "Django", "Angular", "Docker", "CI/CD"],
    },
    {
        title: "AI & MLOps",
        skills: ["Machine Learning", "Scikit-learn", "MLOps", "Dynatrace", "Kibana"],
    },
    {
        title: "Frontend & Tools",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Git"],
    },
];

export function Skills() {
    return (
        <section id="skills" className="py-24">
            <Container>
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
                    <p className="text-lg text-muted-foreground">Technologies and tools I work with.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Interactive Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="h-[400px] w-full bg-card/50 rounded-2xl border p-6 flex items-center justify-center"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={skillData}>
                                <RadialBar
                                    label={{ position: 'insideStart', fill: '#fff' }}
                                    background
                                    dataKey="x"
                                />
                                <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0, top: '50%', transform: 'translate(0, -50%)' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1f3a', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Skill Lists */}
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            {skillCategories.map((category, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-6 rounded-2xl bg-card border hover:border-accent/50 transition-colors"
                                >
                                    <h3 className="font-bold text-lg mb-4 text-accent">{category.title}</h3>
                                    <ul className="space-y-2">
                                        {category.skills.map((skill) => (
                                            <li key={skill} className="flex items-center gap-2 text-muted-foreground text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
