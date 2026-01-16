import {
    Cpu,
    Terminal,
    Activity,
    Cloud,
    Users,
    Code2,
    Search,
    Zap,
    Database,
    MessageSquare
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const skillCategories = [
    {
        title: "AI/ML & LLM Integration",
        icon: <Cpu className="h-6 w-6 text-primary" />,
        skills: [
            "Large Language Models (GPT, Claude)",
            "Model Optimization & Compression",
            "OCR Pipeline Integration",
            "Machine Learning (Scikit-learn)",
            "Prompt Engineering",
        ],
    },
    {
        title: "API & Troubleshooting",
        icon: <Terminal className="h-6 w-6 text-primary" />,
        skills: [
            "REST API (FastAPI, Django, Flask)",
            "API Debugging & Performance Tuning",
            "Postman/Swagger Documentation",
            "Error Handling & Logging",
            "Rate Limiting & Authentication",
        ],
    },
    {
        title: "Production & Monitoring",
        icon: <Activity className="h-6 w-6 text-primary" />,
        skills: [
            "Real-Time Monitoring (Dynatrace)",
            "Incident Management (L3 Support)",
            "Root Cause Analysis",
            "CI/CD Pipelines (GitHub Actions)",
            "Performance Optimization",
        ],
    },
    {
        title: "Cloud & Infrastructure",
        icon: <Cloud className="h-6 w-6 text-primary" />,
        skills: [
            "AWS (ECS, Lambda, RDS, S3)",
            "Docker & Containerization",
            "MongoDB & PostgreSQL",
            "Redis for Caching",
            "Terraform / Infrastructure as Code",
        ],
    },
    {
        title: "Customer Success",
        icon: <Users className="h-6 w-6 text-primary" />,
        skills: [
            "Technical Documentation",
            "API Integration Guides",
            "Customer Issue Resolution",
            "Cross-functional Collaboration",
            "Technical Communication",
        ],
    },
]

export function Skills() {
    return (
        <section id="skills" className="py-24 bg-background">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Technical Ecosystem</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl">
                        A comprehensive stack built for deploying and supporting robust AI products at scale.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category) => (
                        <Card key={category.title} className="bg-card/50 border-border hover:border-primary/50 transition-colors">
                            <CardHeader className="flex flex-row items-center space-x-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    {category.icon}
                                </div>
                                <CardTitle className="text-lg">{category.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {category.skills.map((skill) => (
                                        <li key={skill} className="flex items-center text-sm text-muted-foreground">
                                            <Zap className="h-3 w-3 mr-2 text-primary/60" />
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
