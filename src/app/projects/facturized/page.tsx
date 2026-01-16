import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink, FileText, CheckCircle2 } from "lucide-react"

export default function FacturizedPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container px-4 py-12 mx-auto max-w-5xl">
                <Link href="/#projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <Badge className="mb-4">Hero Project</Badge>
                        <h1 className="text-4xl font-bold tracking-tight mb-6 sm:text-5xl">Facturized</h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Spanish utility bills are complex, multi-page PDFs with non-standard layouts.
                            I built an AI-powered SaaS to convert these documents into structured JSON with production-grade reliability.
                        </p>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {["Python", "FastAPI", "LLMs", "OCR", "React", "Docker", "MongoDB"].map((tech) => (
                                <Badge key={tech} variant="secondary">{tech}</Badge>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <Button asChild>
                                <a href="https://github.com/juanlugordillo/facturized" target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" />
                                    GitHub Repo
                                </a>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Live Demo
                                </a>
                            </Button>
                        </div>
                    </div>
                    <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-2xl border border-border">
                        <Image
                            src="/images/facturized.png"
                            alt="Facturized Dashboard"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-card p-6 rounded-xl border border-border text-center">
                        <span className="text-3xl font-bold text-primary block mb-2">95%</span>
                        <span className="text-sm text-muted-foreground uppercase tracking-widest">Extraction Accuracy</span>
                    </div>
                    <div className="bg-card p-6 rounded-xl border border-border text-center">
                        <span className="text-3xl font-bold text-primary block mb-2">15 min → 30s</span>
                        <span className="text-sm text-muted-foreground uppercase tracking-widest">Processing Time</span>
                    </div>
                    <div className="bg-card p-6 rounded-xl border border-border text-center">
                        <span className="text-3xl font-bold text-primary block mb-2">1K+</span>
                        <span className="text-sm text-muted-foreground uppercase tracking-widest">Monthly Requests</span>
                    </div>
                </div>

                <div className="space-y-24">
                    <section>
                        <h2 className="text-3xl font-bold mb-8">The Challenge</h2>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p className="text-lg leading-relaxed mb-6">
                                Utility companies in Spain use wildly different PDF formats. Traditional template-based OCR systems frequently fail when layouts shift even slightly.
                                The core challenge was building a system that could handle these variations without manual intervention while maintaining 95%+ accuracy for financial data.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-foreground flex items-center">
                                        <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                                        Technical Solution
                                    </h3>
                                    <p>
                                        Implemented a multi-stage pipeline: OCR for text layer extraction, followed by a compressed LLM (GPT-4o-mini/Claude-3-Haiku)
                                        for intelligent field mapping and semantic understanding of complex tables.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-foreground flex items-center">
                                        <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                                        Product Support Angle
                                    </h3>
                                    <p>
                                        Designed a comprehensive monitoring dashboard to track extraction failures in real-time. Created L3 support flows
                                        for re-processing "orphaned" invoices and documenting API integration guides for enterprise clients.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-8">Technical Architecture</h2>
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border mb-12">
                            <Image
                                src="/images/facturized_arch.png"
                                alt="Technical Architecture Diagram"
                                fill
                                className="object-contain bg-muted/20 p-8"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Pipeline Flow</h3>
                                <ol className="space-y-4 text-muted-foreground">
                                    <li><span className="font-bold text-foreground">1. User Ingestion:</span> PDFs are uploaded via REST API or Dashboard.</li>
                                    <li><span className="font-bold text-foreground">2. Intelligent OCR:</span> Context-aware extraction of raw text layers.</li>
                                    <li><span className="font-bold text-foreground">3. LLM Refinement:</span> Semantic parsing of fields (CUPS, Amount, Dates).</li>
                                    <li><span className="font-bold text-foreground">4. Cross-Validation:</span> Confidence scoring and data normalization.</li>
                                    <li><span className="font-bold text-foreground">5. Society Association:</span> Logic to link invoices to existing client accounts.</li>
                                </ol>
                            </div>
                            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
                                <h3 className="text-xl font-bold mb-4 text-primary">Support Engineer Insights</h3>
                                <p className="text-sm text-muted-foreground italic mb-6">
                                    "Building the system was only half the battle. Supporting it meant building tools that allowed us to
                                    troubleshoot why a specific invoice failed to map and providing clients with 'API Integration Guides'
                                    that reduced onboarding time by 60%."
                                </p>
                                <Button variant="outline" className="w-full" asChild>
                                    <a href="#" className="flex items-center">
                                        <FileText className="mr-2 h-4 w-4" />
                                        View API Integration Guide (Sample)
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <footer className="border-t py-12 mt-24 bg-muted/20">
                <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Juan Lucas Gordillo. Product Support Excellence.
                </div>
            </footer>
        </div>
    )
}
