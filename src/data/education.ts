import { Education } from "@/types"

export const education: Education[] = [
    {
        id: "master-big-data",
        degree: "MSc Big Data & Artificial Intelligence",
        institution: "Universidad de Málaga",
        location: "Málaga, Spain",
        period: "2023 - 2025",
        gpa: "8.1/10",
        logo: "/images/uma-logo.png",
        specializations: [
            "Machine Learning, LLMs & Production AI Systems",
            "Machine & Deep Learning (Neural Networks, GPU Optimization)",
            "Large Language Models & NLP (LLM Integration, Text Analysis)",
            "Big Data Processing (Spark, Hadoop) & Real-Time Analytics",
            "MLOps & Model Deployment (Production AI, Performance Monitoring)",
            "Database Optimization (Sharding, Caching, Indexing)",
            "Cloud Computing for AI/ML Workloads (AWS, Docker, CI/CD)"
        ],
        thesis: "Large-Scale NLP Analysis with Flask API & MongoDB (4M+ records)",
        highlights: [
            "Focus on production-ready AI systems",
            "Hands-on MLOps and model monitoring",
            "Cloud-native architecture design"
        ]
    },
    {
        id: "erasmus-exchange",
        degree: "Erasmus+ Exchange Program",
        institution: "Universitatea POLITEHNICA din București",
        location: "Bucharest, Romania",
        period: "2022 - 2023",
        logo: "/images/upb-logo.png",
        specializations: [
            "Machine Learning for Economics (Econometrics, Predictive Modeling)",
            "Financial Data Analysis & Quantitative Methods",
            "Game Theory & Strategic Decision Making",
            "Advanced Algorithms & Data Structures",
            "Distributed Systems Architecture",
            "Neural Networks & Deep Learning Foundations"
        ]
    },
    {
        id: "bachelor-telecom",
        degree: "BSc Telecommunications Engineering (Telematics)",
        institution: "Universidad de Málaga",
        location: "Málaga, Spain",
        period: "2018 - 2023",
        gpa: "7.3/10",
        logo: "/images/uma-logo.png",
        specializations: [
            "Network Systems & Distributed Architecture",
            "Programming: Python, Java, C++ | API Development",
            "Machine Learning & AI Foundations",
            "Databases (SQL/NoSQL) & Data Pipeline Engineering",
            "Cloud Infrastructure & DevOps (Docker, CI/CD)",
            "Real-Time Systems & Performance Optimization"
        ],
        thesis: "ML-based Network Malware Detection System",
        highlights: []
    }
]
