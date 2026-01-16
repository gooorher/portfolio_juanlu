import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-32 lg:pb-40">
            <div className="container relative z-10 mx-auto px-4">
                <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-2xl text-center lg:text-left">
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Product Support Engineer
                            <span className="block text-primary">
                                LLM Integration & API Specialist
                            </span>
                        </h1>
                        <p className="mt-6 text-xl text-muted-foreground">
                            I build, deploy, and support AI-powered products in production—bridging technical complexity with customer success.
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                            <Button size="lg" className="px-8" asChild>
                                <Link href="#projects">
                                    View Featured Projects
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="px-8" asChild>
                                <Link href="#contact">Contact Me</Link>
                            </Button>
                        </div>

                        <div className="mt-12 flex items-center justify-center gap-6 lg:justify-start">
                            <div className="flex flex-col items-center lg:items-start">
                                <span className="text-2xl font-bold text-foreground">95%</span>
                                <span className="text-sm text-muted-foreground uppercase tracking-wider">Extraction Accuracy</span>
                            </div>
                            <div className="h-10 w-[1px] bg-border" />
                            <div className="flex flex-col items-center lg:items-start">
                                <span className="text-2xl font-bold text-foreground">1K+</span>
                                <span className="text-sm text-muted-foreground uppercase tracking-wider">Monthly API Requests</span>
                            </div>
                            <div className="h-10 w-[1px] bg-border" />
                            <div className="flex flex-col items-center lg:items-start">
                                <span className="text-2xl font-bold text-foreground">L3</span>
                                <span className="text-sm text-muted-foreground uppercase tracking-wider">Incident Support</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-16 scale-110 lg:mt-0 lg:ml-12">
                        <div className="relative h-[400px] w-[400px] lg:h-[500px] lg:w-[500px]">
                            <div className="absolute -inset-4 rounded-full bg-primary/20 blur-3xl" />
                            <Image
                                src="/images/hero_visual.png"
                                alt="AI Model & Code Visualization"
                                fill
                                className="relative rounded-2xl object-cover shadow-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative gradient background */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        </section>
    )
}
