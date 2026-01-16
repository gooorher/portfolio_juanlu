"use client"

import { CaseStudyLayout } from "@/components/templates/CaseStudyLayout"

export default function FacturizedPage() {
    return (
        <CaseStudyLayout
            project={{
                title: "Facturized",
                tagline: "AI-powered SaaS for intelligent invoice extraction",
                heroImage: "/images/facturized.png",
                badges: ["Hero Project", "Production System"],
                description: "Spanish utility bills are complex, multi-page PDFs with non-standard layouts. I built an AI-powered SaaS to convert these documents into structured JSON with production-grade reliability.",
                techStack: ["Python", "FastAPI", "LLMs", "OCR", "React", "Docker", "MongoDB"],
                githubUrl: "https://github.com/juanlugordillo/facturized",
                liveUrl: "https://facturized.com", // Updated as per PRD/projects.ts
                metrics: [
                    { label: "Extraction Accuracy", value: "95%" },
                    { label: "Processing Time", value: "15 min → 30s" },
                    { label: "Monthly Requests", value: "1K+" }
                ]
            }}
            content={{
                challenge: {
                    description: "Utility companies in Spain use wildly different PDF formats. Traditional template-based OCR systems frequently fail when layouts shift even slightly. The core challenge was building a system that could handle these variations without manual intervention while maintaining 95%+ accuracy for financial data.",
                    points: [
                        {
                            title: "Technical Solution",
                            description: "Implemented a multi-stage pipeline: OCR for text layer extraction, followed by a compressed LLM (GPT-4o-mini/Claude-3-Haiku) for intelligent field mapping and semantic understanding of complex tables."
                        },
                        {
                            title: "Product Support Angle",
                            description: "Designed a comprehensive monitoring dashboard to track extraction failures in real-time. Created L3 support flows for re-processing \"orphaned\" invoices and documenting API integration guides for enterprise clients."
                        }
                    ]
                },
                architecture: {
                    image: "/images/facturized_arch.png",
                    flowSteps: [
                        "<span class=\"font-bold text-foreground\">1. User Ingestion:</span> PDFs are uploaded via REST API or Dashboard.",
                        "<span class=\"font-bold text-foreground\">2. Intelligent OCR:</span> Context-aware extraction of raw text layers.",
                        "<span class=\"font-bold text-foreground\">3. LLM Refinement:</span> Semantic parsing of fields (CUPS, Amount, Dates).",
                        "<span class=\"font-bold text-foreground\">4. Cross-Validation:</span> Confidence scoring and data normalization.",
                        "<span class=\"font-bold text-foreground\">5. Society Association:</span> Logic to link invoices to existing client accounts."
                    ]
                },
                support: {
                    title: "Support Engineer Insights",
                    description: "Building the system was only half the battle. Supporting it meant building tools that allowed us to troubleshoot why a specific invoice failed to map and providing clients with 'API Integration Guides' that reduced onboarding time by 60%.",
                    integrationGuide: true
                }
            }}
        />
    )
}
