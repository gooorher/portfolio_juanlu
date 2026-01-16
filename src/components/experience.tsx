import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Calendar, MapPin } from "lucide-react"

const experiences = [
    {
        title: "Financial Systems Support Engineer (AI)",
        company: "EY / Santander",
        location: "Madrid, Spain",
        period: "Mar 2025 - Present",
        type: "Full-time",
        description: "Leading technical support and operational excellence for AI-driven fraud detection systems and financial platforms.",
        highlights: [
            "Providing L3 technical support for production ML models and real-time processing pipelines.",
            "Optimized cloud resource allocation, resulting in €400K annual cost savings.",
            "Managing production incidents using Dynatrace and Kibana for root cause analysis.",
            "Bridging the gap between data science teams and end-users to resolve model integration issues.",
        ],
    },
    {
        title: "Full Stack Engineer",
        company: "EY / Santander",
        location: "Madrid, Spain",
        period: "Jun 2024 - Mar 2025",
        type: "Full-time",
        description: "Developed and deployed cloud-native applications and REST APIs for complex financial compliance systems.",
        highlights: [
            "Built resilient REST APIs using Django and Python for regulatory reporting platforms.",
            "Implemented automated CI/CD pipelines with GitHub Actions and AWS ECS.",
            "Provided technical guidance to stakeholders on API integration and system architecture.",
            "Collaborated on the transition from legacy monoliths to scalable microservices.",
        ],
    },
]

export function Experience() {
    return (
        <section id="experience" className="py-24 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Professional Journey</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl">
                        From building complex systems to supporting high-stakes AI products in production.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical line */}
                    <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2 hidden lg:block" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <div key={index} className="relative flex flex-col lg:flex-row items-center">
                                {/* Timeline dot */}
                                <div className="absolute left-0 lg:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10 hidden lg:block" />

                                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:ml-auto"}`}>
                                    <Card className="bg-card/50 border-border">
                                        <CardHeader>
                                            <div className={`flex flex-col ${index % 2 === 0 ? "lg:items-end" : "lg:items-start"}`}>
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <Badge variant="outline">{exp.period}</Badge>
                                                    <Badge variant="secondary">{exp.type}</Badge>
                                                </div>
                                                <CardTitle className="text-xl font-bold">{exp.title}</CardTitle>
                                                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                                                    <Briefcase className="h-4 w-4 mr-1" />
                                                    {exp.company}
                                                    <span className="mx-2">•</span>
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    {exp.location}
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-foreground/80 mb-4">{exp.description}</p>
                                            <ul className={`space-y-2 text-sm text-muted-foreground ${index % 2 === 0 ? "lg:list-none" : "list-disc lg:list-inside"}`}>
                                                {exp.highlights.map((item, i) => (
                                                    <li key={i} className={index % 2 === 0 ? "lg:flex lg:flex-row-reverse" : "flex"}>
                                                        <span className={index % 2 === 0 ? "lg:ml-2" : "mr-2"}>•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
