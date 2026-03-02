import { Experience } from "@/types"

export const experience: Experience[] = [
    {
        id: "nfq-data-engineer",
        title: "Data Engineer / Backend Developer",
        company: "Nfq Advisory, Solutions, Outsourcing",
        location: "Madrid, Spain",
        period: "Jan 2026 - Present",
        type: "Full-time",
        highlights: [
            "Spearheaded backend development for Reference Data Repository (RDR) @ BBVA CIB, a centralized Master Data Management (MDM) system",
            "Built robust Java/SQL pipelines for real-time and batch XML data ingestion from external vendors (BDI)",
            "Optimized Oracle schemas and implemented automated validation (Java Rules) to ensure data integrity for Trading/Risk engines",
            "Managed full lifecycle of critical reference data (Counterparties, Legal Agreements) using an Event-Driven Architecture"
        ]
    },
    {
        id: "ey-santander-support",
        title: "Financial Systems Engineer (AI)",
        company: "EY / Santander",
        location: "Málaga, Spain",
        period: "Mar 2025 - Jan 2026",
        type: "Full-time",
        highlights: [
            "Provided L3 technical support for critical fraud detection systems (OFSAA) using Dynatrace and Kibana",
            "Optimized SQL processes and ETL workflows (Python/Control-M), achieving €400K in annual cost savings",
            "Developed and deployed ML algorithms for fraud detection, collaborating with engineers and stakeholders"
        ]
    },
    {
        id: "ey-santander-fullstack",
        title: "Full Stack Engineer",
        company: "EY / Santander",
        location: "Málaga, Spain",
        period: "Jun 2024 - Mar 2025",
        type: "Full-time",
        highlights: [
            "Built RESTful APIs (Django/Python) and automated CI/CD pipelines (GitHub Actions) for regulatory compliance platforms",
            "Designed Python pipelines for Oracle SQL ingestion, processing complex Excel datasets with high data integrity",
            "Deployed cloud infrastructure on AWS (ECS/Fargate, RDS) and developed responsive Angular UIs for data visualization"
        ]
    }
]
