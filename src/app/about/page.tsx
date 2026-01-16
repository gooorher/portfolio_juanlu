import { Navbar } from "@/components/navbar"
import { Experience } from "@/components/experience"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Award, BookOpen } from "lucide-react"

const education = [
    {
        degree: "B.Sc. in Telecommunications Engineering",
        school: "Universidad de Extremadura",
        period: "2018 - 2023",
        highlights: ["Specialized in Signal Processing and Data Transmission", "Thesis on ML-based signal classification"],
    },
]

const certifications = [
    {
        name: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services",
    },
    {
        name: "Machine Learning Specialization",
        issuer: "DeepLearning.AI / Stanford",
    },
    {
        name: "Prompt Engineering for ChatGPT",
        issuer: "Vanderbilt University",
    },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container px-4 py-24 mx-auto max-w-5xl">
                <div className="flex flex-col lg:flex-row gap-16 items-start mb-24">
                    <div className="lg:w-2/3">
                        <h1 className="text-4xl font-bold mb-8">About Me</h1>
                        <div className="prose prose-invert text-muted-foreground text-lg space-y-6">
                            <p>
                                I am a passionate engineer dedicated to bridging the gap between technical complexity and business value.
                                With a background in Telecommunications Engineering and deep experience in full-stack development,
                                I have transitioned into the AI Product Support space, where I focus on ensuring advanced AI/ML systems
                                deliver real-world impact.
                            </p>
                            <p>
                                My philosophy centers on <strong>production reliability</strong>. I don't just build models; I build the pipelines
                                that deploy them, the dashboards that monitor them, and the support frameworks that sustain them.
                                I thrive in environments where I can troubleshoot complex API issues, optimize LLM outputs,
                                and advocate for the customer's technical success.
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-1/3 w-full">
                        <Card className="bg-primary/5 border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Award className="mr-2 h-5 w-5 text-primary" />
                                    Certifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {certifications.map((cert) => (
                                        <li key={cert.name} className="flex flex-col">
                                            <span className="font-semibold text-sm">{cert.name}</span>
                                            <span className="text-xs text-muted-foreground">{cert.issuer}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <section className="mb-24">
                    <Experience />
                </section>

                <section>
                    <div className="flex flex-col items-center text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight">Education</h2>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-8">
                        {education.map((edu) => (
                            <Card key={edu.degree} className="bg-card/50 border-border">
                                <CardHeader className="flex flex-row items-center space-x-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <GraduationCap className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-bold">{edu.degree}</CardTitle>
                                        <p className="text-muted-foreground">{edu.school} | {edu.period}</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                                        {edu.highlights.map((h) => (
                                            <li key={h}>{h}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>
            <footer className="border-t py-12 bg-muted/20">
                <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Juan Lucas Gordillo. Built for the future of AI.
                </div>
            </footer>
        </div>
    )
}
