import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, Database, Search, Zap, PieChart } from "lucide-react"

export default function NLPPage() {
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
                        <Badge className="mb-4">Data at Scale</Badge>
                        <h1 className="text-4xl font-bold tracking-tight mb-6 sm:text-5xl">NLP Global Analytics</h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Large-scale natural language processing engine that processed 1M+ tweets and news articles
                            to extract sentiment trends and entity relationships in real-time.
                        </p>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {["Python", "Flask", "MongoDB", "NLTK", "Transformers", "Redis"].map((tech) => (
                                <Badge key={tech} variant="secondary">{tech}</Badge>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <Button asChild>
                                <a href="https://github.com/juanlugordillo/nlp-analytics" target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" />
                                    GitHub Repo
                                </a>
                            </Button>
                        </div>
                    </div>
                    <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-2xl border border-border">
                        <Image
                            src="/images/nlp.png"
                            alt="NLP Dashboard"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-card p-6 rounded-xl border border-border text-center">
                        <Database className="h-8 w-8 text-primary mx-auto mb-2" />
                        <span className="text-sm text-muted-foreground uppercase tracking-widest">1M+ Records</span>
                    </div>
                    <div className="bg-card p-6 rounded-xl border border-border text-center">
                        <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                        <span className="text-sm text-muted-foreground uppercase tracking-widest">Real-time Pipeline</span>
                    </div>
                    <div className="bg-card p-6 rounded-xl border border-border text-center">
                        <Search className="h-8 w-8 text-primary mx-auto mb-2" />
                        <span className="text-sm text-muted-foreground uppercase tracking-widest">Entity Extraction</span>
                    </div>
                </div>

                <div className="space-y-24">
                    <section>
                        <h2 className="text-3xl font-bold mb-8">The Engineering Challenge</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="prose prose-invert text-muted-foreground">
                                <p>
                                    Built a distributed system capable of handling high-velocity social media data.
                                    The primary focus was on scalability and ensuring the NLP models could keep up with
                                    incoming streams without significant latency.
                                </p>
                                <h3 className="text-foreground mt-8">Technical Highlights</h3>
                                <ul className="space-y-4">
                                    <li><span className="font-bold text-foreground">Asynchronous Processing:</span> Used Redis as a message broker to decouple data ingestion from the computationally expensive NLP inference stage.</li>
                                    <li><span className="font-bold text-foreground">Storage Optimization:</span> Implemented MongoDB with optimized indexing to allow for sub-second queries over millions of records for the analytics dashboard.</li>
                                </ul>
                            </div>
                            <div className="bg-muted/50 p-8 rounded-2xl border border-border">
                                <h3 className="text-xl font-bold mb-6 flex items-center">
                                    <PieChart className="mr-2 h-5 w-5 text-primary" />
                                    Performance Metrics
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Inference Latency</span>
                                            <span className="text-primary font-mono">&lt;200ms</span>
                                        </div>
                                        <div className="h-2 bg-background rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[85%]" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Concurrent Request Handling</span>
                                            <span className="text-primary font-mono">500 req/sec</span>
                                        </div>
                                        <div className="h-2 bg-background rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[92%]" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Entity Accuracy</span>
                                            <span className="text-primary font-mono">91%</span>
                                        </div>
                                        <div className="h-2 bg-background rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[91%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <footer className="border-t py-12 mt-24 bg-muted/20">
                <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Juan Lucas Gordillo. NLP Engineering.
                </div>
            </footer>
        </div>
    )
}
