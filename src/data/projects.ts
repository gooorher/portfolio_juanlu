import { Project } from "@/types"

export const projects: Project[] = [
    {
        id: "mlops-cyber-defense",
        slug: "mlops-cyber-defense",
        title: "MLOps Cyber-Defense Dashboard",
        role: "Product Support Engineer",
        company: "Financial Services Corp",
        period: "Mar 2023 - Present",
        description: "Real-time threat detection system processing 50M+ daily transactions",
        longDescription: "Built a comprehensive dashboard for monitoring ML model performance in fraud detection, reducing false positives by 40%.",
        tags: ["Python", "LangChain", "OpenAI", "RAG", "FastAPI"],
        image: {
            thumbnail: "/images/mlops-thumb.png", // specific image paths will be needed later
            hero: "/images/mlops-hero.png"
        },
        metrics: [
            { label: "Daily Transactions", value: "50M+" },
            { label: "Latency", value: "<50ms" },
            { label: "Detection Rate", value: "99.9%" }
        ],
        caseStudyPath: "/projects/mlops-cyber-defense",
        codeSnippet: `def detect_threat(transaction):
    embedding = model.encode(transaction)
    score = classifier.predict(embedding)
    return score > THRESHOLD`
    },
    {
        id: "nlp-analytics",
        slug: "nlp-global-analytics",
        title: "NLP Global Analytics Platform",
        role: "AI Engineer",
        company: "Tech Solutions Inc",
        period: "Jan 2022 - Feb 2023",
        description: "Multi-language sentiment analysis pipeline processing 1M+ customer feedbacks daily.",
        longDescription: "Developed an end-to-end NLP pipeline for analyzing customer feedback across 12 languages using Transformers.",
        tags: ["Python", "PyTorch", "Hugging Face", "React", "PostgreSQL"],
        image: {
            thumbnail: "/images/nlp-thumb.png",
            hero: "/images/nlp-hero.png"
        },
        metrics: [
            { label: "Languages", value: "12" },
            { label: "Accuracy", value: "94%" },
            { label: "Throughput", value: "1M/day" }
        ],
        caseStudyPath: "/projects/nlp-global-analytics",
        codeSnippet: `from transformers import pipeline

classifier = pipeline("sentiment-analysis")
result = classifier("I love this product!")
# [{'label': 'POSITIVE', 'score': 0.99}]`
    }
]
