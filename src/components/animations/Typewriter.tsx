"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

export function Typewriter({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState("")

    useEffect(() => {
        let i = 0
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i))
                i++
            } else {
                clearInterval(timer)
            }
        }, 50)
        return () => clearInterval(timer)
    }, [text])

    return (
        <span className="text-xl md:text-2xl font-mono text-primary">
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
            >
                |
            </motion.span>
        </span>
    )
}
