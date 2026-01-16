"use client"

import { CaseStudyLayout } from "@/components/templates/CaseStudyLayout"
import { Database, Globe, Target } from "lucide-react"

export default function NLPAnalysisPage() {
    return (
        <CaseStudyLayout
            project={{
                title: "NLP Global Analytics Platform",
                tagline: "Large-scale sentiment analysis for 4M+ Ukrainian crisis tweets",
                heroImage: "/images/nlp.png",
                badges: ["Master's Thesis", "Big Data"],
                description: "Analyzing 4 million tweets requires robust infrastructure and intelligent NLP pipelines. I built an end-to-end system with Flask API, MongoDB sharding, and custom transformers for multi-language sentiment analysis.",
                techStack: ["Python", "Flask", "MongoDB", "NLTK", "Transformers", "Docker", "React"],
                githubUrl: "https://github.com/gooorher/Ukraine-Crisis-Tweets-Analysis",
                metrics: [
                    { label: "Records Processed", value: "4M+", icon: <Database className="h-4 w-4" /> },
                    { label: "Languages Supported", value: "8", icon: <Globe className="h-4 w-4" /> },
                    { label: "Sentiment Accuracy", value: "94%", icon: <Target className="h-4 w-4" /> }
                ]
            }}
            content={{
                challenge: {
                    description: "Processing millions of social media posts at scale requires careful system design. Traditional relational databases couldn't handle this scale cost-effectively. The main challenges were handling 4M+ tweets with metadata, supporting multiple languages (English, Spanish, Ukrainian, Polish), and ensuring sub-second response times for the dashboard.",
                    points: [
                        { title: "Volume", description: "4M+ tweets with metadata, images, and engagement metrics." },
                        { title: "Variety", description: "Support for English, Spanish, Ukrainian, Polish, and more." },
                        { title: "Velocity", description: "Dashboard needs sub-second response times for real-time queries." },
                        { title: "Storage", description: "MongoDB sharding to handle massive document collections." }
                    ]
                },
                architecture: {
                    flowSteps: [
                        "<span class=\"font-bold text-foreground\">Data Ingestion:</span> Twitter API streaming to preprocessing pipeline.",
                        "<span class=\"font-bold text-foreground\">NLP Processing:</span> NLTK & Hugging Face Transformers for sentiment/entity extraction.",
                        "<span class=\"font-bold text-foreground\">Storage Layer:</span> MongoDB sharded cluster handling 4M+ documents.",
                        "<span class=\"font-bold text-foreground\">API Layer:</span> Flask REST API with caching for high-performance queries.",
                        "<span class=\"font-bold text-foreground\">Visualization:</span> React dashboard with geospatial maps and D3 charts."
                    ]
                },
                solution: {
                    title: "Database Optimization Strategy",
                    description: "MongoDB was critical for handling unstructured tweet data. I implemented hash-based sharding on tweet_id for even distribution and compound indexes on (timestamp, sentiment, language). Aggregation pipelines were optimized to reduce response time from 8s to 400ms, with a Redis layer caching frequently accessed summaries. This achieved <500ms query latency and 60% cost savings compared to PostgreSQL."
                },
                support: {
                    title: "Research & Support Focus",
                    description: "Supporting a research project meant different challenges: creating comprehensive API documentation for other researchers, building data export tools for statistical analysis in Python/R, designing error handling for malformed tweets, and providing troubleshooting guides for MongoDB replication lag. The thesis achieved 9.5/10 and is now used as reference material.",
                    integrationGuide: false
                }
            }}
        />
    )
}
