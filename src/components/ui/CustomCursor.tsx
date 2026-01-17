"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { useUIStore } from "@/store/ui-store"
import { cn } from "@/lib/utils"

export function CustomCursor() {
    const { cursorVariant } = useUIStore()
    const [isVisible, setIsVisible] = useState(false)

    // Mouse position
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring animation
    const springConfig = { damping: 25, stiffness: 700 }
    const cursorX = useSpring(mouseX, springConfig)
    const cursorY = useSpring(mouseY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16)
            mouseY.set(e.clientY - 16)
            setIsVisible(true)
        }

        const handleMouseDown = () => useUIStore.setState({ cursorVariant: "click" })
        const handleMouseUp = () => useUIStore.setState({ cursorVariant: "default" })

        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mouseup", handleMouseUp)
        document.body.addEventListener("mouseleave", handleMouseLeave)
        document.body.addEventListener("mouseenter", handleMouseEnter)

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll("a, button, input, textarea, [role='button']")

        const handleElementEnter = () => useUIStore.setState({ cursorVariant: "hover" })
        const handleElementLeave = () => useUIStore.setState({ cursorVariant: "default" })

        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", handleElementEnter)
            el.addEventListener("mouseleave", handleElementLeave)
        })

        // Use a mutation observer to attach listeners to dynamic elements
        const observer = new MutationObserver(() => {
            const newElements = document.querySelectorAll("a, button, input, textarea, [role='button']")
            newElements.forEach(el => {
                el.removeEventListener("mouseenter", handleElementEnter)
                el.removeEventListener("mouseleave", handleElementLeave)
                el.addEventListener("mouseenter", handleElementEnter)
                el.addEventListener("mouseleave", handleElementLeave)
            })
        })

        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("mouseup", handleMouseUp)
            document.body.removeEventListener("mouseleave", handleMouseLeave)
            document.body.removeEventListener("mouseenter", handleMouseEnter)
            observer.disconnect()
        }
    }, [mouseX, mouseY])

    // Hide on mobile
    if (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
        return null
    }

    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9999]",
                !isVisible && "opacity-0"
            )}
            style={{
                x: cursorX,
                y: cursorY,
                borderColor: "hsl(var(--primary))"
            }}
            animate={cursorVariant}
            variants={{
                default: {
                    height: 32,
                    width: 32,
                    scale: 1,
                    backgroundColor: "transparent"
                },
                hover: {
                    height: 64,
                    width: 64,
                    x: -16,
                    y: -16,
                    backgroundColor: "var(--primary-hover-bg)",
                    borderColor: "transparent"
                },
                click: {
                    height: 16,
                    width: 16,
                    scale: 0.8,
                    backgroundColor: "hsl(var(--primary))"
                }
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm opacity-0 hover:opacity-100 transition-opacity" />
        </motion.div>
    )
}
