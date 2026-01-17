"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { SocialLinks } from "@/components/shared/SocialLinks"

export function Footer() {
    return (
        <footer className="border-t bg-muted/30 py-12">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">

                    {/* Brand Column */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">Juan Lucas Gordillo</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Product Support Engineer specializing in LLM integration and API development.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</Link></li>
                            <li><Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
                            <li><Link href="/#experience" className="text-muted-foreground hover:text-primary transition-colors">Experience</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Social Links - Primary placement */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Connect</h4>
                        <div className="flex flex-wrap gap-3">
                            <SocialLinks
                                iconSize={20}
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        © {new Date().getFullYear()} Juan Lucas Gordillo. Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in Spain with Next.js, TypeScript & Tailwind CSS.
                    </p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
