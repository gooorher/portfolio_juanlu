"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

interface Node {
    id: number
    x: number
    y: number
}

interface Connection {
    from: Node
    to: Node
    id: string
}

export function NeuralNetwork() {
    const [nodes, setNodes] = useState<Node[]>([])
    const [connections, setConnections] = useState<Connection[]>([])

    useEffect(() => {
        // Generate nodes in layers
        const layers = [3, 4, 4, 2] // structure of the network
        const newNodes: Node[] = []
        const width = 400
        const height = 300
        const layerWidth = width / (layers.length - 1)

        let nodeId = 0
        layers.forEach((count, layerIndex) => {
            const layerHeight = height / count
            for (let i = 0; i < count; i++) {
                newNodes.push({
                    id: nodeId++,
                    x: layerIndex * layerWidth + 50,
                    y: i * layerHeight + (height - (count - 1) * layerHeight) / 2
                })
            }
        })

        // Generate connections between layers
        const newConnections: Connection[] = []
        let currentId = 0
        let nodeIndex = 0

        layers.forEach((count, layerIndex) => {
            if (layerIndex === layers.length - 1) return

            const currentLayerNodes = newNodes.slice(nodeIndex, nodeIndex + count)
            const nextLayerCount = layers[layerIndex + 1]
            const nextLayerNodes = newNodes.slice(nodeIndex + count, nodeIndex + count + nextLayerCount)

            currentLayerNodes.forEach(fromNode => {
                nextLayerNodes.forEach(toNode => {
                    // Randomly drop some connections for visual interest
                    if (Math.random() > 0.3) {
                        newConnections.push({
                            id: `conn-${currentId++}`,
                            from: fromNode,
                            to: toNode
                        })
                    }
                })
            })
            nodeIndex += count
        })

        setNodes(newNodes)
        setConnections(newConnections)
    }, [])

    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center pointer-events-none">
            <svg className="w-full h-full absolute inset-0 text-primary">
                {connections.map((conn, i) => (
                    <motion.path
                        key={conn.id}
                        d={`M ${conn.from.x} ${conn.from.y} C ${conn.from.x + 50} ${conn.from.y}, ${conn.to.x - 50} ${conn.to.y}, ${conn.to.x} ${conn.to.y}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeOpacity="0.2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.2 }}
                        transition={{
                            duration: 1.5,
                            delay: i * 0.05 + 0.5,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Active pulses traveling connections */}
                {connections.map((conn, i) => (
                    <motion.circle
                        key={`pulse-${conn.id}`}
                        r="3"
                        fill="currentColor"
                    >
                        <animateMotion
                            dur={`${2 + Math.random() * 2}s`}
                            repeatCount="indefinite"
                            path={`M ${conn.from.x} ${conn.from.y} C ${conn.from.x + 50} ${conn.from.y}, ${conn.to.x - 50} ${conn.to.y}, ${conn.to.x} ${conn.to.y}`}
                        />
                    </motion.circle>
                ))}

                {nodes.map((node, i) => (
                    <motion.circle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r="6"
                        className="fill-background stroke-primary stroke-2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                    />
                ))}
            </svg>
        </div>
    )
}
