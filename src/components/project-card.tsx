import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
    title: string
    description: string
    image: string
    tags: string[]
    metrics: string[]
    githubUrl?: string
    liveUrl?: string
    slug: string
}

export function ProjectCard({
    title,
    description,
    image,
    tags,
    metrics,
    githubUrl,
    liveUrl,
    slug,
}: ProjectCardProps) {
    return (
        <Card className="overflow-hidden bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 border-border group">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {githubUrl && (
                        <Button variant="secondary" size="icon" asChild>
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                    {liveUrl && (
                        <Button variant="secondary" size="icon" asChild>
                            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>
            <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] uppercase tracking-wider">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {description}
                </p>
                <div className="space-y-2">
                    {metrics.map((metric, index) => (
                        <div key={index} className="flex items-center text-xs font-medium text-primary">
                            <span className="mr-2">✓</span>
                            {metric}
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="ghost" className="w-full text-foreground hover:text-primary" asChild>
                    <Link href={`/projects/${slug}`}>View Case Study</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
