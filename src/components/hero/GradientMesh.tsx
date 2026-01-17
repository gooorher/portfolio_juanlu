"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface GradientMeshProps {
    intensity?: number
    speed?: number
}

const GRADIENT_PALETTES = {
    dark: [
        'rgba(99, 102, 241, 0.15)',  // Indigo
        'rgba(168, 85, 247, 0.1)',   // Purple
        'rgba(236, 72, 153, 0.1)',   // Pink
    ],
    light: [
        'rgba(10, 132, 255, 0.4)',  // Primary Blue (0A84FF)
        'rgba(10, 132, 255, 0.25)', // Softer Blue
        'rgba(60, 160, 255, 0.3)',  // Sky Blue
    ]
}

export const GradientMesh: React.FC<GradientMeshProps> = ({
    intensity = 0.7,
    speed = 1.0
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { theme } = useTheme()
    const animationRef = useRef<number | null>(null)

    // Use a ref to track current theme colors to avoid re-creating the loop on theme change
    // causing jitters, although re-creation is safer for consistency.

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', {
            alpha: true,
            // desynchronized: true // Caution: Can cause flickering on some devices
        })
        if (!ctx) return

        let width = canvas.width = window.innerWidth
        let height = canvas.height = window.innerHeight

        const particles: { x: number, y: number, vx: number, vy: number, radius: number, color: string }[] = []

        // Choose palette
        const palette = theme === 'light' ? GRADIENT_PALETTES.light : GRADIENT_PALETTES.dark

        // Initialize particles (blobs)
        for (let i = 0; i < 6; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                radius: Math.min(width, height) * (0.4 + Math.random() * 0.2),
                color: palette[i % palette.length]
            })
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height)

            // Blur effect for mesh look
            // We can either use filter here or CSS blur on canvas. CSS blur is often more performant.
            // ctx.filter = 'blur(60px)' 

            particles.forEach(p => {
                p.x += p.vx
                p.y += p.vy

                // Bounce off walls
                if (p.x < -p.radius) p.vx = Math.abs(p.vx)
                if (p.x > width + p.radius) p.vx = -Math.abs(p.vx)
                if (p.y < -p.radius) p.vy = Math.abs(p.vy)
                if (p.y > height + p.radius) p.vy = -Math.abs(p.vy)

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx.fillStyle = p.color
                ctx.fill()
            })

            animationRef.current = requestAnimationFrame(render)
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }

        window.addEventListener('resize', handleResize)
        render()

        return () => {
            window.removeEventListener('resize', handleResize)
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [theme, speed]) // Re-run when theme changes

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 -z-10 blur-[80px] opacity-80"
            aria-hidden="true"
        />
    )
}
