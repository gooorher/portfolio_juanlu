"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface ParticleSystemProps {
    count?: number
    mouseInfluence?: number
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
    count = 60,
    mouseInfluence = 0.5
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { theme } = useTheme()
    const mouseRef = useRef({ x: 0, y: 0 })
    const animationRef = useRef<number | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = canvas.width = window.innerWidth
        let height = canvas.height = window.innerHeight

        // Particle class equivalent
        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.1
        }))

        const color = theme === 'dark' ? '255, 255, 255' : '0, 0, 0'

        const render = () => {
            ctx.clearRect(0, 0, width, height)

            particles.forEach((p, i) => {
                // Update position
                p.x += p.vx
                p.y += p.vy

                // Mouse interaction (repel/attract)
                const dx = mouseRef.current.x - p.x
                const dy = mouseRef.current.y - p.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const maxDist = 150

                if (distance < maxDist) {
                    const force = (maxDist - distance) / maxDist
                    const angle = Math.atan2(dy, dx)
                    // Gently move away
                    p.vx -= Math.cos(angle) * force * mouseInfluence * 0.5
                    p.vy -= Math.sin(angle) * force * mouseInfluence * 0.5
                }

                // Friction to return to normal speed
                // p.vx *= 0.99
                // p.vy *= 0.99
                // Boundaries (wrap around)
                if (p.x < 0) p.x = width
                if (p.x > width) p.x = 0
                if (p.y < 0) p.y = height
                if (p.y > height) p.y = 0

                // Draw particle
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${color}, ${p.alpha})`
                ctx.fill()

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < 100) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(${color}, ${0.1 * (1 - dist / 100)})`
                        ctx.lineWidth = 1
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                }
            })

            animationRef.current = requestAnimationFrame(render)
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)

        render()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [theme, count, mouseInfluence])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
        />
    )
}
