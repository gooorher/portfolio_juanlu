import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Clock, Calendar } from "lucide-react"
import Link from "next/link"

const posts = [
    {
        title: "5 Lessons from Deploying LLMs in Production",
        excerpt: "Reflections on the Facturized project: handling hallucinations, optimizing latency, and the critical importance of a validation layer.",
        date: "May 15, 2025",
        readTime: "8 min read",
        tag: "Case Study",
        slug: "llm-production-lessons",
    },
    {
        title: "The Product Support Engineer's AI Toolkit",
        excerpt: "Essential strategies for troubleshooting LLM-powered systems and bridging the technical gap with enterprise customers.",
        date: "April 22, 2025",
        readTime: "6 min read",
        tag: "Support Strategy",
        slug: "ai-support-toolkit",
    },
    {
        title: "From Full Stack to AI Support: My Journey",
        excerpt: "Why I transitioned from building feature sets to building robust, supportable AI ecosystems and what I learned along the way.",
        date: "March 10, 2025",
        readTime: "5 min read",
        tag: "Career",
        slug: "career-transition",
    },
]

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container px-4 py-24 mx-auto max-w-5xl">
                <div className="flex flex-col items-center text-center mb-16">
                    <BookOpen className="h-12 w-12 text-primary mb-6" />
                    <h1 className="text-4xl font-bold tracking-tight mb-4 sm:text-5xl">Insights & Engineering</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Thought leadership at the intersection of AI production systems and customer success.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Card key={post.slug} className="flex flex-col bg-card/50 border-border group hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <div className="flex justify-between items-center mb-4">
                                    <Badge variant="secondary">{post.tag}</Badge>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {post.readTime}
                                    </div>
                                </div>
                                <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                    {post.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground line-clamp-4">
                                    {post.excerpt}
                                </p>
                            </CardContent>
                            <CardFooter className="flex flex-col items-start border-t pt-6 bg-muted/5">
                                <div className="flex items-center text-xs text-muted-foreground mb-4">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {post.date}
                                </div>
                                <Button variant="link" className="px-0 h-auto font-semibold group-hover:translate-x-1 transition-transform" asChild>
                                    <Link href={`/blog/${post.slug}`}>
                                        Read Article
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-24 p-12 bg-primary/5 rounded-3xl border border-primary/10 text-center">
                    <h2 className="text-2xl font-bold mb-4">Want more insights?</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        I regularly share deep dives into MLOps, AI troubleshooting, and production reliability.
                    </p>
                    <Button size="lg" className="rounded-full">
                        Subscribe to Newsletter
                    </Button>
                </div>
            </main>
            <footer className="border-t py-12 bg-muted/20">
                <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Juan Lucas Gordillo. Sharing knowledge for a better AI future.
                </div>
            </footer>
        </div>
    )
}
