"use client"

import { CaseStudyLayout } from "@/components/templates/CaseStudyLayout"
import { Activity, Zap, TrendingDown } from "lucide-react"

export default function MLOpsCyberDefensePage() {
    return (
        <CaseStudyLayout
            project={{
                title: "MLOps Cyber-Defense Dashboard",
                tagline: "Real-time fraud detection powered by automated ML pipelines",
                heroImage: "/images/mlops.png",
                badges: ["Hero Project", "Production System"],
                description: "Financial institutions process millions of transactions daily. I architected an automated ML pipeline that detects fraudulent patterns in real-time while explaining decisions to L1 analysts using LLM-powered insights.",
                techStack: ["Python", "LangChain", "OpenAI", "Scikit-learn", "FastAPI", "Docker", "Prometheus"],
                githubUrl: "https://github.com/gooorher/mlops-cybersecurity-project",
                metrics: [
                    { label: "Daily Transactions", value: "50M+", icon: <Activity className="h-4 w-4" /> },
                    { label: "Detection Latency", value: "<50ms", icon: <Zap className="h-4 w-4" /> },
                    { label: "False Positive Reduction", value: "40%", icon: <TrendingDown className="h-4 w-4" /> }
                ]
            }}
            content={{
                challenge: {
                    description: "Traditional rule-based fraud detection systems generate thousands of false positives daily, overwhelming analyst teams. The challenge was building an ML system that not only detected threats accurately but could explain its decisions in plain language for non-technical operators.",
                    points: [
                        { title: "Scale", description: "Process 50M+ transactions per day with <50ms latency." },
                        { title: "Automation", description: "Automated model retraining when drift is detected." },
                        { title: "Explainability", description: "Real-time alerting with LLM-powered explanations." },
                        { title: "Reliability", description: "Zero-downtime deployments during model updates." }
                    ]
                },
                architecture: {
                    flowSteps: [
                        "<span class=\"font-bold text-foreground\">Transaction Ingestion:</span> Kafka streaming pipeline for real-time data.",
                        "<span class=\"font-bold text-foreground\">Feature Engineering:</span> Real-time feature calculation and vectorization.",
                        "<span class=\"font-bold text-foreground\">Model Serving:</span> FastAPI inference endpoint with <50ms latency.",
                        "<span class=\"font-bold text-foreground\">Explanation Layer:</span> LangChain retrieving context for LLM capability.",
                        "<span class=\"font-bold text-foreground\">Monitoring:</span> Prometheus + Grafana tracking model drift.",
                        "<span class=\"font-bold text-foreground\">Retraining:</span> Automated GitHub Actions workflows."
                    ]
                },
                support: {
                    title: "Product Support Strategy",
                    description: "Supporting this system meant building comprehensive observability. I created L3 runbooks for model degradation, built API integration guides, designed alerting thresholds, and developed an 'explainability dashboard' so L1 analysts could understand model predictions. This led to a 40% reduction in false positives and 60% faster incident resolution.",
                    integrationGuide: false
                }
            }}
        />
    )
}
