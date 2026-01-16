import { Project } from "@/types"

export const projects: Project[] = [
    {
        id: "facturized",
        slug: "facturized",
        title: "Facturized - AI Invoice Extraction",
        role: "Full Stack AI Engineer",
        company: "Personal Project",
        period: "2024 - Present",
        description: "AI-powered SaaS for intelligent invoice extraction from Spanish utility PDFs",
        longDescription: "Built a production-grade FastAPI backend with LLM integration for automated data extraction from complex PDF invoices. Implements OCR preprocessing, entity recognition, and structured data recovery with 95% accuracy.",
        tags: ["FastAPI", "OpenAI", "OCR", "React", "Docker", "PostgreSQL"],
        image: {
            thumbnail: "/images/facturized.png",
            hero: "/images/facturized.png"
        },
        metrics: [
            { label: "Extraction Accuracy", value: "95%" },
            { label: "Processing Time", value: "30s" },
            { label: "Monthly Requests", value: "1K+" }
        ],
        githubUrl: null, // Private repo
        liveUrl: "https://facturized.com",
        caseStudyPath: "/projects/facturized",
        highlights: [
            "Reduced manual processing from 15 minutes to 30 seconds",
            "Multi-tenant SaaS architecture with usage-based pricing",
            "Automated PDF parsing with fallback OCR pipeline",
            "Real-time extraction status updates via WebSockets"
        ],
        techStack: {
            frontend: ["React", "TypeScript", "Tailwind CSS"],
            backend: ["FastAPI", "Python", "Celery"],
            ai: ["OpenAI GPT-4", "Tesseract OCR", "PDF parsing"],
            infrastructure: ["Docker", "AWS ECS", "PostgreSQL", "Redis"]
        }
    },
    {
        id: "mlops-cyber-defense",
        slug: "mlops-cyber-defense",
        title: "MLOps Cyber-Defense Dashboard",
        role: "Product Support Engineer",
        company: "EY / Santander",
        period: "Mar 2023 - Present",
        description: "Real-time threat detection system processing 50M+ daily transactions",
        longDescription: "Architected and deployed a production-grade ML pipeline for fraud detection with automated model retraining, drift detection, and real-time alerting. Integrated LangChain for LLM-powered anomaly explanation.",
        tags: ["Python", "LangChain", "OpenAI", "Scikit-learn", "FastAPI", "Docker"],
        image: {
            thumbnail: "/images/mlops.png",
            hero: "/images/mlops.png"
        },
        metrics: [
            { label: "Daily Transactions", value: "50M+" },
            { label: "Detection Latency", value: "<50ms" },
            { label: "False Positive Reduction", value: "40%" }
        ],
        githubUrl: "https://github.com/gooorher/mlops-cybersecurity-project",
        caseStudyPath: "/projects/mlops-cybersecurity",
        highlights: [
            "Automated CI/CD pipeline with GitHub Actions",
            "Real-time model drift monitoring with Prometheus",
            "LLM-powered threat explanation for L1 analysts",
            "99.9% pipeline uptime with automated rollback"
        ],
        techStack: {
            ml: ["Scikit-learn", "XGBoost", "Feature engineering"],
            backend: ["FastAPI", "Python", "Celery workers"],
            monitoring: ["Prometheus", "Grafana", "Datadog"],
            infrastructure: ["Docker", "Kubernetes", "AWS ECS"]
        }
    },
    {
        id: "nlp-analytics",
        slug: "nlp-global-analytics",
        title: "NLP Global Analytics Platform",
        role: "AI Engineer",
        company: "Universidad de Málaga (Thesis)",
        period: "2024 - 2025",
        description: "Large-scale NLP engine processing 4M+ records for sentiment analysis",
        longDescription: "Developed end-to-end NLP pipeline for analyzing Ukrainian crisis tweets. Built Flask API with MongoDB for storing and querying 4M+ processed records. Implemented custom NLP models for entity extraction and sentiment classification.",
        tags: ["Python", "Flask", "MongoDB", "NLTK", "Transformers", "Docker"],
        image: {
            thumbnail: "/images/nlp.png",
            hero: "/images/nlp.png"
        },
        metrics: [
            { label: "Records Processed", value: "4M+" },
            { label: "Languages Supported", value: "8" },
            { label: "Sentiment Accuracy", value: "94%" }
        ],
        githubUrl: "https://github.com/gooorher/Ukraine-Crisis-Tweets-Analysis",
        caseStudyPath: "/projects/nlp-analysis",
        highlights: [
            "Custom NLP pipeline for Spanish entity recognition",
            "Real-time analytics dashboard with geospatial visualization",
            "Optimized MongoDB queries with sharding (4M+ records)",
            "Multi-language sentiment analysis (English, Spanish, Ukrainian)"
        ],
        techStack: {
            nlp: ["NLTK", "spaCy", "Hugging Face Transformers"],
            backend: ["Flask", "Python", "MongoDB"],
            frontend: ["React", "D3.js for visualizations"],
            infrastructure: ["Docker", "MongoDB Atlas", "Heroku"]
        }
    },
    {
        id: "portfolio-v3",
        slug: "portfolio-v3",
        title: "AI-Powered Portfolio",
        role: "Full Stack Developer",
        company: "Personal Project",
        period: "2026",
        description: "Modern portfolio with AI chatbot and interactive code playground",
        longDescription: "Built with Next.js 15, featuring Gemini-powered chatbot for portfolio Q&A, live code playground with Monaco Editor, and particle morphing background animations.",
        tags: ["Next.js", "TypeScript", "Gemini AI", "Motion", "Tailwind"],
        image: {
            thumbnail: "/images/hero_visual.png",
            hero: "/images/hero_visual.png"
        },
        metrics: [
            { label: "Lighthouse Score", value: "98" },
            { label: "Load Time", value: "<1s" },
            { label: "Chatbot Response", value: "<2s" }
        ],
        githubUrl: "https://github.com/gooorher/portfolio_juanlu",
        liveUrl: "https://juanlugordillo.com",
        caseStudyPath: "/projects/portfolio-v3",
        highlights: [
            "Gemini Flash API integration for AI chatbot",
            "Interactive code playground with real-time execution",
            "Particle morphing background with 60fps performance",
            "Fully responsive with glassmorphism design"
        ]
    }
]
