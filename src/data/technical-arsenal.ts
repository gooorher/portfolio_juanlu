import { Brain, Sparkles, Link, MessageSquare, Database, Activity, Workflow, Layers, Server, Layout, Cloud, GitBranch } from "lucide-react"

export const competencies = [
    { name: "LLM Integration & Optimization", level: "Expert", percentage: 95 },
    { name: "REST API Development (FastAPI/Django)", level: "Expert", percentage: 90 },
    { name: "Production Monitoring & L3 Support", level: "Advanced", percentage: 85 },
    { name: "Cloud Infrastructure (AWS/GCP)", level: "Advanced", percentage: 80 },
    { name: "Database Optimization (SQL/NoSQL)", level: "Advanced", percentage: 85 },
    { name: "CI/CD & DevOps Automation", level: "Intermediate", percentage: 75 }
]

export const integrations = [
    { name: "OpenAI API", icon: Brain, context: "GPT-4, Embeddings" },
    { name: "Gemini", icon: Sparkles, context: "Flash, Pro models" },
    { name: "LangChain", icon: Link, context: "RAG pipelines" },
    { name: "Anthropic", icon: MessageSquare, context: "Claude integration" },
    { name: "Pinecone", icon: Database, context: "Vector search" },
    { name: "MongoDB", icon: Database, context: "4M+ records" },
    { name: "Dynatrace", icon: Activity, context: "APM monitoring" },
    { name: "GitHub Actions", icon: Workflow, context: "CI/CD" }
]

// Determine if we need to export SkillCategories here or reuse existing `technologies.ts`.
// PRD implied merging "Skills Content".
// Let's assume we import the existing skillCategories from `technologies.ts` in the component, or redefine here if we want to consolidate data too.
// PRD says: "Primary Skills Cards (existing Skills content)".
// So I will just leave this file with the NEW data structures and import the old ones in the component.
