"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { Terminal, Minus, X, Square } from "lucide-react"

interface Command {
    input: string
    output: string | React.ReactNode
}

const commands: Command[] = [
    {
        input: "whoami",
        output: "Juan Lucas Gordillo"
    },
    {
        input: "cat role.conf",
        output: "AI Product Support Engineer L3"
    },
    {
        input: "ls skills/",
        output: "Python  LLMs  RAG  FastAPI  Kubernetes  AWS  Docker"
    },
    {
        input: "cat location.txt",
        output: "Málaga, Spain (Ready for Global Support)"
    },
    {
        input: "uptime",
        output: "Up since 1996 | High availability for complex systems"
    },
    {
        input: "ls interests/",
        output: "Reading  Padel  Tennis  Electronic_Music"
    },
    {
        input: "./current_status.sh",
        output: <span className="text-green-400">● Systems Online | Available for new challenges</span>
    }
]

export function TerminalWindow() {
    // ... existing state ...
    const [history, setHistory] = useState<Command[]>([])
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [currentCharIndex, setCurrentCharIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(true)

    useEffect(() => {
        if (currentLineIndex >= commands.length) {
            setIsTyping(false)
            return
        }

        const currentCommand = commands[currentLineIndex]

        if (currentCharIndex < currentCommand.input.length) {
            const timeout = setTimeout(() => {
                setCurrentCharIndex(prev => prev + 1)
            }, Math.random() * 30 + 30) // Faster typing for longer content
            return () => clearTimeout(timeout)
        } else {
            const timeout = setTimeout(() => {
                setHistory(prev => [...prev, currentCommand])
                setCurrentLineIndex(prev => prev + 1)
                setCurrentCharIndex(0)
            }, 600)
            return () => clearTimeout(timeout)
        }
    }, [currentCharIndex, currentLineIndex])

    return (
        <div className="w-full max-w-2xl mx-auto bg-[#0d0d0d] rounded-lg overflow-hidden shadow-2xl border border-white/10 font-mono text-sm leading-relaxed">
            {/* Header */}
            <div className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-primary" />
                    <span className="text-gray-400 text-xs">juanlu@portfolio: ~</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 h-[440px] overflow-y-auto scrollbar-hide text-gray-300 space-y-3 bg-black/40 backdrop-blur-md">
                {/* History */}
                {history.map((cmd, idx) => (
                    <div key={idx} className="space-y-1.5 animate-in fade-in duration-300">
                        <div className="flex items-center gap-2">
                            <span className="text-primary">➜</span>
                            <span className="text-cyan-400">~</span>
                            <span className="font-semibold text-white/90">{cmd.input}</span>
                        </div>
                        <div className="pl-6 text-gray-400 border-l border-white/5 ml-2 transition-all">
                            {cmd.output}
                        </div>
                    </div>
                ))}

                {/* Current Active Line */}
                {isTyping && commands[currentLineIndex] && (
                    <div className="flex items-center gap-2">
                        <span className="text-primary">➜</span>
                        <span className="text-cyan-400">~</span>
                        <span className="text-white/90 font-semibold">
                            {commands[currentLineIndex].input.substring(0, currentCharIndex)}
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block w-2 h-4 bg-primary align-middle ml-1"
                            />
                        </span>
                    </div>
                )}

                {!isTyping && (
                    <div className="flex items-center gap-2">
                        <span className="text-primary">➜</span>
                        <span className="text-cyan-400">~</span>
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="inline-block w-2 h-4 bg-primary align-middle"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
