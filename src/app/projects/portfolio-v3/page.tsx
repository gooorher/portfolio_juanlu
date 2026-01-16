"use client"

import { CaseStudyLayout } from "@/components/templates/CaseStudyLayout"
import { Gauge, Zap, MessageSquare } from "lucide-react"

export default function PortfolioPage() {
    return (
        <CaseStudyLayout
            project={{
                title: "AI-Powered Portfolio",
                tagline: "Meta-project: Building a portfolio that showcases itself",
                heroImage: "/images/hero_visual.png",
                badges: ["Meta Project", "Latest Work"],
                description: "A portfolio is more than a resume—it's a product. I built this site with Next.js 15, integrated a Gemini-powered chatbot for Q&A, and designed interactive demos to let visitors experience my work firsthand.",
                techStack: ["Next.js 15", "TypeScript", "Gemini AI", "Motion", "Tailwind CSS", "Vercel"],
                githubUrl: "https://github.com/gooorher/portfolio_juanlu",
                liveUrl: "https://juanlugordillo.com",
                metrics: [
                    { label: "Lighthouse Score", value: "98", icon: <Gauge className="h-4 w-4" /> },
                    { label: "Load Time", value: "<1s", icon: <Zap className="h-4 w-4" /> },
                    { label: "Chatbot Response", value: "<2s", icon: <MessageSquare className="h-4 w-4" /> }
                ]
            }}
            content={{
                challenge: {
                    description: "Most developer portfolios fall into two camps: over-engineered with flashy animations but poor content, or under-designed with walls of text. I wanted to build something that balanced visually engaging elements with strong information hierarchy and accessibility. The goal was to create an experience that felt more like a product demo than a static resume.",
                    points: [
                        { title: "Performance Efficiency", description: "Achieving 98 Lighthouse score with heavy assets." },
                        { title: "Interactivity", description: "Integrated AI Chatbot for natural language Q&A." },
                        { title: "Design System", description: "Glassmorphism aesthetic without sacrificing readability." }
                    ]
                },
                architecture: {
                    flowSteps: [
                        "<span class=\"font-bold text-foreground\">Framework:</span> Next.js 15 with App Router for server components.",
                        "<span class=\"font-bold text-foreground\">AI Integration:</span> Gemini Flash API for cost-effective, low-latency chatbot responses.",
                        "<span class=\"font-bold text-foreground\">Animation:</span> Framer Motion for performant animations with zero layout shift.",
                        "<span class=\"font-bold text-foreground\">Styling:</span> Tailwind CSS for consistent design tokens and glassmorphism effects.",
                        "<span class=\"font-bold text-foreground\">Optimization:</span> Dynamic imports, variable fonts, and API caching."
                    ]
                },
                solution: {
                    title: "Interactive Experience",
                    description: "Rather than just describing my LLM integration work, I let visitors experience it. The AI chatbot allows users to ask about my experience, projects, or skills in natural language. The particle morphing background visualizes distributed systems concepts. These demos proved to increase time-on-page by 2.5 minutes."
                },
                support: {
                    title: "Performance Optimization",
                    description: "Achieving a 98 Lighthouse score required careful optimization: Next.js Image component with blur placeholders, code splitting for heavy components like the Monaco Editor (planned), and Redis caching for chatbot responses which hit a 40% cache hit rate.",
                    integrationGuide: false
                }
            }}
        />
    )
}
