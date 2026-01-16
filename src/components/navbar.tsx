"use client"

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            Juan Lucas Gordillo
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/#projects"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Projects
                        </Link>
                        <Link
                            href="/about"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            About
                        </Link>
                        <Link
                            href="/blog"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/#skills"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Skills
                        </Link>
                        <Link
                            href="/#experience"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Experience
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/contact">Hire Me</Link>
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
