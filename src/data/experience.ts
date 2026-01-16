import { Experience } from "@/types"

export const experience: Experience[] = [
    {
        id: "product-support-engineer",
        role: "Product Support Engineer",
        company: "Financial Services Corp",
        period: "Mar 2023 - Present",
        description: [
            "Specializing in LLM integration and API troubleshooting for AI-powered financial products.",
            "Reduced support ticket volume by 30% through improved documentation and automated diagnostics.",
            "Collaborated with engineering to resolve critical production issues in the vector database infrastructure."
        ],
        skills: ["Python", "FastAPI", "Datadog", "OpenAI API"]
    },
    {
        id: "ai-engineer",
        role: "AI Engineer",
        company: "Tech Solutions Inc",
        period: "Jan 2022 - Feb 2023",
        description: [
            "Developed and deployed NLP models for sentiment analysis on customer feedback.",
            "Optimized inference latency by 50% using model quantization and caching strategies.",
            "Built a scalable data pipeline for training data ingestion using Apache Airflow."
        ],
        skills: ["PyTorch", "Hugging Face", "Docker", "AWS"]
    }
]
