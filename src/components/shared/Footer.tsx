"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SocialLinks } from "@/components/shared/SocialLinks"

export function Footer() {
    return (
        <footer className="border-t bg-background/50 backdrop-blur-xl">
            <div className="container flex flex-col items-center justify-between gap-8 py-12 md:flex-row md:py-16">
                <div className="flex flex-col items-center gap-2 md:items-start">
                    <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
                        Juan Lucas Gordillo
                    </Link>
                    <p className="text-center text-sm text-muted-foreground md:text-left">
                        Built with Next.js 16, Motion.dev, and Tailwind CSS.
                    </p>
                </div>

                <div className="flex gap-4">
                    <SocialLinks iconSize={20} />
                </div>
            </div>
        </footer>
    )
}
