"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, Line, ScrollControls, Scroll, useScroll } from "@react-three/drei"
import * as THREE from "three"
import { experience } from "@/data/experience"

// Experience Item Component
function ExperienceItem({ position, title, company, period, index }: { position: [number, number, number], title: string, company: string, period: string, index: number }) {
    const group = useRef<THREE.Group>(null)
    const isEven = index % 2 === 0

    useFrame((state) => {
        if (!group.current) return
        // Gentle floating animation
        group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1
    })

    return (
        <group ref={group} position={position}>
            {/* Connector Line to Center */}
            <Line
                points={[[0, 0, 0], [isEven ? -1.5 : 1.5, 0, 0]]}
                color="#6366f1"
                lineWidth={1}
                transparent
                opacity={0.3}
            />

            {/* Timeline Node */}
            <mesh>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshStandardMaterial color="#6366f1" emissive="#4f46e5" emissiveIntensity={2} />
            </mesh>

            {/* Text Content */}
            <group position={[isEven ? -2 : 2, 0, 0]}>
                <Text
                    position={[isEven ? -1.5 : 1.5, 0.3, 0]}
                    fontSize={0.25}
                    color="white"
                    anchorX={isEven ? "right" : "left"}
                    anchorY="middle"
                    outlineWidth={0.01}
                    outlineColor="#000"
                >
                    {company}
                </Text>
                <Text
                    position={[isEven ? -1.5 : 1.5, 0, 0]}
                    fontSize={0.2}
                    color="#cbd5e1"
                    anchorX={isEven ? "right" : "left"}
                    anchorY="middle"
                    maxWidth={3}
                >
                    {title}
                </Text>
                <Text
                    position={[isEven ? -1.5 : 1.5, -0.25, 0]}
                    fontSize={0.15}
                    color="#94a3b8"
                    anchorX={isEven ? "right" : "left"}
                    anchorY="middle"
                >
                    {period}
                </Text>
            </group>
        </group>
    )
}

function Scene() {
    const scroll = useScroll()
    const contentRef = useRef<THREE.Group>(null)

    useFrame(() => {
        if (!contentRef.current) return
        // Move content up as we scroll
        // Total height based on items. Spacing 3 units per item.
        const totalHeight = experience.length * 3
        contentRef.current.position.y = scroll.offset * totalHeight
    })

    const points = useMemo(() => {
        return experience.map((_, i) => new THREE.Vector3(0, -i * 3, 0))
    }, [])

    return (
        <group ref={contentRef} position={[0, 1, 0]}>
            {/* Central Timeline Path */}
            <Line
                points={points}
                color="#6366f1"
                lineWidth={2}
                transparent
                opacity={0.5}
            />

            {experience.map((job, i) => (
                <ExperienceItem
                    key={job.id}
                    index={i}
                    position={[0, -i * 3, 0]}
                    title={job.title}
                    company={job.company}
                    period={job.period}
                />
            ))}
        </group>
    )
}

export function Experience3D() {
    return (
        <div className="w-full h-[600px] border border-gray-800 rounded-xl bg-black/50 overflow-hidden relative">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <ScrollControls pages={experience.length} damping={0.2}>
                    <Scene />
                </ScrollControls>
            </Canvas>
            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground pointer-events-none">
                Scroll to explore
            </div>
        </div>
    )
}
