"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { ScrollProgress } from "@/components/animations/ScrollProgress"

const navItems = [
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
]

export function Navigation() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const pathname = usePathname()

    // Handle scroll effect
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close mobile menu on route change
    React.useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Lock body scroll when mobile menu is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <>
            <ScrollProgress />
            <header
                className={cn(
                    "fixed top-0 z-50 w-full border-b transition-all duration-300",
                    isScrolled
                        ? "bg-background/80 backdrop-blur-md border-border/40 shadow-sm"
                        : "bg-transparent border-transparent"
                )}
            >
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="font-bold text-lg tracking-tight"
                        >
                            Juan Lucas Gordillo
                        </motion.span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.path ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <ModeToggle />
                        <Button asChild className="ml-4">
                            <Link href="/contact">Let's Build</Link>
                        </Button>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center md:hidden space-x-4">
                        <ModeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-foreground focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "100vh" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-xl border-t"
                        >
                            <div className="container flex flex-col items-center justify-center h-full gap-8 pb-32">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            href={item.path}
                                            className="text-2xl font-semibold hover:text-primary transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: navItems.length * 0.1 }}
                                >
                                    <Button size="lg" asChild className="mt-4">
                                        <Link href="/contact">Let's Build Something</Link>
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    )
}
