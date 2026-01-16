import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, Activity, ShieldAlert, GitBranch, BarChart3 } from "lucide-react"

export default function MLOpsPage() {
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
                        <Badge className="mb-4">Operational Excellence</Badge>
                        <h1 className="text-4xl font-bold tracking-tight mb-6 sm:text-5xl">MLOps Cyber-Defense</h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            A production-ready machine learning pipeline designed for real-time threat detection,
                            featuring automated retraining, drift monitoring, and robust CI/CD integration.
                        </p>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {["Scikit-learn", "GitHub Actions", "Docker", "Prometheus", "FastAPI", "Python"].map((tech) => (
                                <Badge key={tech} variant="secondary">{tech}</Badge>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <Button asChild>
                                <a href="https://github.com/juanlugordillo/mlops-cyber" target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" />
                                    GitHub Repo
                                </a>
                            </Button>
                        </div>
                    </div>
                    <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-2xl border border-border">
                        <Image
                            src="/images/mlops.png"
                            alt="MLOps Dashboard"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-card p-6 rounded-xl border border-border text-center">
                        <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
                        <span className="text-sm text-muted-foreground uppercase tracking-widest">Real-time Monitoring</span>
                    </div>
                    <div className="bg-card p-6 rounded-xl border border-border text-center">
                        <GitBranch className="h-8 w-8 text-primary mx-auto mb-2" />
                        <span className="text-sm text-muted-foreground uppercase tracking-widest">Automated CI/CD</span>
                    </div>
                    <div className="bg-card p-6 rounded-xl border border-border text-center">
                        <ShieldAlert className="h-8 w-8 text-primary mx-auto mb-2" />
                        <span className="text-sm text-muted-foreground uppercase tracking-widest">Drift Detection</span>
                    </div>
                </div>

                <div className="space-y-24">
                    <section>
                        <h2 className="text-3xl font-bold mb-8">Core Implementation</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="p-6 bg-muted/50 rounded-xl border border-border">
                                    <h3 className="text-xl font-bold mb-4 flex items-center">
                                        <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                                        Monitoring & Alerting
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Implemented an observability stack using Prometheus and Grafana. The system tracks statistical
                                        model drift and data distribution shifts, triggering alerts when model accuracy falls below
                                        production thresholds.
                                    </p>
                                </div>
                                <div className="p-6 bg-muted/50 rounded-xl border border-border">
                                    <h3 className="text-xl font-bold mb-4 flex items-center">
                                        <GitBranch className="mr-2 h-5 w-5 text-primary" />
                                        Automated Retraining
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Designed GitHub Actions workflows that automatically initiate model retraining when new
                                        labeled datasets are available, followed by shadow deployments to validate performance
                                        before production promotion.
                                    </p>
                                </div>
                            </div>
                            <div className="prose prose-invert text-muted-foreground">
                                <h3 className="text-foreground">Why this matters for Support</h3>
                                <p>
                                    Supporting an AI product means being proactive. By building automated monitoring, we move from
                                    reactive troubleshooting ("Why is the model failing now?") to proactive management
                                    ("The model's performance on this specific segment is degrading; let's investigate").
                                </p>
                                <ul className="mt-6 space-y-4">
                                    <li><span className="font-bold text-foreground">Root Cause Analysis:</span> Logs are structured to allow L3 engineers to quickly identify if an issue is due to infrastructure, data quality, or model logic.</li>
                                    <li><span className="font-bold text-foreground">Security-First:</span> The system includes a 'kill-switch' and fallback to heuristic-based rules in case of high-confidence model failure.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <footer className="border-t py-12 mt-24 bg-muted/20">
                <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Juan Lucas Gordillo. MLOps Excellence.
                </div>
            </footer>
        </div>
    )
}
