"use client"

import { motion } from "motion/react"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ImageRevealProps {
    children: ReactNode
    className?: string
}

export function ImageReveal({ children, className }: ImageRevealProps) {
    return (
        <div className={cn("relative overflow-hidden", className)}>
            <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0 0 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="h-full w-full"
            >
                {children}
            </motion.div>
        </div>
    )
}
