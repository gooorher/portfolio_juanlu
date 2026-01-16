import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Rocket, HeartHandshake } from "lucide-react"
import Link from "next/link"

const pillars = [
    {
        title: "I Build AI Systems",
        icon: <BrainCircuit className="h-10 w-10 text-primary" />,
        points: [
            "Hands-on LLM integration (Facturized)",
            "Production API development",
            "MLOps pipeline experience",
        ],
    },
    {
        title: "I Deploy & Monitor Them",
        icon: <Rocket className="h-10 w-10 text-primary" />,
        points: [
            "Real-time monitoring experience",
            "CI/CD automation",
            "Performance optimization",
        ],
    },
    {
        title: "I Support Customers",
        icon: <HeartHandshake className="h-10 w-10 text-primary" />,
        points: [
            "L3 incident management background",
            "Technical documentation expertise",
            "Clear communication with stakeholders",
        ],
    },
]

export function WhyHireMe() {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Hire Me</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl">
                        Bridging the gap between complex AI engineering and exceptional customer success.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar) => (
                        <Card key={pillar.title} className="text-center border-none bg-transparent shadow-none">
                            <CardHeader className="flex flex-col items-center">
                                <div className="mb-4 p-4 bg-primary/10 rounded-full animate-pulse-slow">
                                    {pillar.icon}
                                </div>
                                <CardTitle className="text-xl font-bold">{pillar.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {pillar.points.map((point) => (
                                        <li key={point} className="text-sm text-muted-foreground">
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button size="lg" className="rounded-full px-12" asChild>
                        <Link href="/contact">
                            Ready to support cutting-edge AI products
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
