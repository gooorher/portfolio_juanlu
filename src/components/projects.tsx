import { ProjectCard } from "./project-card"

const projects = [
    {
        title: "Facturized",
        slug: "facturized",
        description: "AI-powered SaaS for intelligent invoice extraction and structured data recovery from complex Spanish utility PDFs.",
        image: "/images/facturized.png",
        tags: ["FastAPI", "LLMs", "OCR", "React", "Docker"],
        metrics: [
            "95% data extraction accuracy",
            "Processed 1K+ monthly requests",
            "Reduced time from 15 min to 30s per document",
        ],
        githubUrl: "https://github.com/juanlugordillo/facturized",
    },
    {
        title: "MLOps Cyber-Defense",
        slug: "mlops-cybersecurity",
        description: "Production-grade ML pipeline for real-time threat detection with automated CI/CD and drift monitoring.",
        image: "/images/mlops.png",
        tags: ["Scikit-learn", "GitHub Actions", "Docker", "Prometheus"],
        metrics: [
            "Automated retraining pipeline",
            "Real-time alerting for model drift",
            "99.9% pipeline uptime",
        ],
        githubUrl: "https://github.com/juanlugordillo/mlops-cyber",
    },
    {
        title: "NLP Global Analytics",
        slug: "nlp-analysis",
        description: "Large-scale NLP engine processing 1M+ data points for sentiment analysis and entity extraction.",
        image: "/images/nlp.png",
        tags: ["Python", "Flask", "MongoDB", "NLTK", "Transformers"],
        metrics: [
            "Handled 1M+ concurrent records",
            "Custom NLP pipeline for Spanish entities",
            "Real-time analytics dashboard",
        ],
        githubUrl: "https://github.com/juanlugordillo/nlp-analytics",
    },
]

export function Projects() {
    return (
        <section id="projects" className="py-24 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl">
                        A selection of production-ready systems bridging AI engineering with operational excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.slug} {...project} />
                    ))}
                </div>
            </div>
        </section>
    )
}
