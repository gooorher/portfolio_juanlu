"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { useTheme } from "next-themes"

interface Node extends d3.SimulationNodeDatum {
    id: string
    group: number
    radius: number
}

interface Link extends d3.SimulationLinkDatum<Node> {
    source: string | Node
    target: string | Node
    value: number
}

const data = {
    nodes: [
        { id: "AI Engineering", group: 1, radius: 40 },
        { id: "Large Language Models", group: 2, radius: 30 },
        { id: "RAG Systems", group: 2, radius: 25 },
        { id: "Fine-tuning", group: 2, radius: 25 },
        { id: "Computer Vision", group: 2, radius: 25 },
        { id: "Backend", group: 3, radius: 35 },
        { id: "FastAPI", group: 3, radius: 20 },
        { id: "Django", group: 3, radius: 20 },
        { id: "Node.js", group: 3, radius: 20 },
        { id: "Infrastructure", group: 4, radius: 35 },
        { id: "AWS", group: 4, radius: 25 },
        { id: "Docker", group: 4, radius: 25 },
        { id: "Kubernetes", group: 4, radius: 25 },
        { id: "Terraform", group: 4, radius: 25 },
        { id: "Databases", group: 5, radius: 30 },
        { id: "PostgreSQL", group: 5, radius: 20 },
        { id: "MongoDB", group: 5, radius: 20 },
        { id: "Vector DBs", group: 5, radius: 20 },
    ],
    links: [
        { source: "AI Engineering", target: "Large Language Models", value: 1 },
        { source: "AI Engineering", target: "RAG Systems", value: 1 },
        { source: "AI Engineering", target: "Fine-tuning", value: 1 },
        { source: "AI Engineering", target: "Computer Vision", value: 1 },
        { source: "Backend", target: "FastAPI", value: 1 },
        { source: "Backend", target: "Django", value: 1 },
        { source: "Backend", target: "Node.js", value: 1 },
        { source: "Infrastructure", target: "AWS", value: 1 },
        { source: "Infrastructure", target: "Docker", value: 1 },
        { source: "Infrastructure", target: "Kubernetes", value: 1 },
        { source: "Infrastructure", target: "Terraform", value: 1 },
        { source: "Databases", target: "PostgreSQL", value: 1 },
        { source: "Databases", target: "MongoDB", value: 1 },
        { source: "Databases", target: "Vector DBs", value: 1 },
        { source: "RAG Systems", target: "Vector DBs", value: 1 },
        { source: "RAG Systems", target: "Large Language Models", value: 1 },
        { source: "FastAPI", target: "AI Engineering", value: 1 }, // Relationship
    ]
}

export function SkillTree() {
    const svgRef = useRef<SVGSVGElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const { theme } = useTheme()
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        if (!containerRef.current) return

        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                })
            }
        }

        updateDimensions()
        window.addEventListener("resize", updateDimensions)
        return () => window.removeEventListener("resize", updateDimensions)
    }, [])

    useEffect(() => {
        if (!svgRef.current || dimensions.width === 0) return

        const svg = d3.select(svgRef.current)
        svg.selectAll("*").remove() // Clear previous

        const width = dimensions.width
        const height = dimensions.height

        const isDark = theme === "dark"
        const primaryColor = isDark ? "#6366f1" : "#3b82f6" // Indigo vs Blue
        const textColor = isDark ? "#fff" : "#000"
        const lineColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"

        const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

        const simulation = d3.forceSimulation<Node>(JSON.parse(JSON.stringify(data.nodes))) // Deep copy to avoid mutating original
            .force("link", d3.forceLink<Node, Link>(JSON.parse(JSON.stringify(data.links))).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collide", d3.forceCollide().radius(d => (d as Node).radius + 10))

        const link = svg.append("g")
            .attr("stroke", lineColor)
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(JSON.parse(JSON.stringify(data.links)))
            .join("line")
            .attr("stroke-width", d => Math.sqrt((d as Link).value))

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(JSON.parse(JSON.stringify(data.nodes)))
            .join("circle")
            .attr("r", (d: any) => d.radius)
            .attr("fill", (d: any) => colorScale(String(d.group)))
            .attr("cursor", "grab")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended) as any)

        const labels = svg.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(JSON.parse(JSON.stringify(data.nodes)))
            .join("text")
            .text(d => (d as Node).id)
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .attr("fill", textColor)
            .attr("font-size", d => Math.max(10, (d as Node).radius / 3) + "px")
            .attr("pointer-events", "none")
            .style("user-select", "none")


        simulation.on("tick", () => {
            link
                .attr("x1", d => (d.source as Node).x!)
                .attr("y1", d => (d.source as Node).y!)
                .attr("x2", d => (d.target as Node).x!)
                .attr("y2", d => (d.target as Node).y!)

            node
                .attr("cx", d => d.x!)
                .attr("cy", d => d.y!)

            labels
                .attr("x", d => d.x!)
                .attr("y", d => d.y!)
        })

        function dragstarted(event: any) {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            event.subject.fx = event.subject.x
            event.subject.fy = event.subject.y
        }

        function dragged(event: any) {
            event.subject.fx = event.x
            event.subject.fy = event.y
        }

        function dragended(event: any) {
            if (!event.active) simulation.alphaTarget(0)
            event.subject.fx = null
            event.subject.fy = null
        }

        return () => {
            simulation.stop()
        }
    }, [dimensions, theme]) // Re-run on resize or theme change

    return (
        <div ref={containerRef} className="w-full h-[600px] border rounded-xl bg-card overflow-hidden shadow-sm">
            <svg ref={svgRef} width="100%" height="100%" />
        </div>
    )
}
