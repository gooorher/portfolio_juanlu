"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

export function CursorTrail() {
    const [isVisible, setIsVisible] = useState(false)

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
            // Show cursor only after first movement to prevent initial jump
            if (!isVisible) setIsVisible(true)
        }

        // Hide cursor when leaving window
        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mouseleave", handleMouseLeave)
        window.addEventListener("mouseenter", handleMouseEnter)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mouseleave", handleMouseLeave)
            window.removeEventListener("mouseenter", handleMouseEnter)
        }
    }, [cursorX, cursorY, isVisible])

    // Only show on desktop (coarse pointer check)
    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsVisible(false)
        }
    }, [])

    if (!isVisible) return null

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 rounded-full border border-primary z-[9999] pointer-events-none mix-blend-difference"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                x: -8, // center the cursor
                y: -8
            }}
        >
            <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full" />
        </motion.div>
    )
}
