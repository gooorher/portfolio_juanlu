"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Send, User, Bot, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
}

export function ChatbotDemo() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: "Hi! I'm Juanlu's AI assistant. Ask me anything about his experience with LLMs, APIs, or his projects."
        }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [demoStatus, setDemoStatus] = useState({ remaining: 10, total: 10 })
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    // Load demo status from local storage on mount
    useEffect(() => {
        const savedStatus = localStorage.getItem('chatbot_demo_status')
        if (savedStatus) {
            try {
                setDemoStatus(JSON.parse(savedStatus))
            } catch (e) {
                console.error("Failed to parse demo status", e)
            }
        }
    }, [])

    // Save demo status to local storage whenever it updates
    useEffect(() => {
        localStorage.setItem('chatbot_demo_status', JSON.stringify(demoStatus))
    }, [demoStatus])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage.content,
                    conversationHistory: messages.map(m => ({
                        role: m.role,
                        content: m.content
                    }))
                })
            })

            const data = await response.json()

            if (response.ok) {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: data.message
                }])
                if (data.demo) {
                    setDemoStatus({ remaining: data.demo.remaining, total: 10 })
                }
            } else {
                if (response.status === 429 || response.status === 503) {
                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: 'assistant',
                        content: data.error
                    }])
                    if (data.remaining !== undefined) {
                        setDemoStatus(prev => ({ ...prev, remaining: 0 }))
                    }
                } else {
                    throw new Error(data.error || 'Failed to fetch')
                }
            }
        } catch (error) {
            console.error('Chat error:', error)
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: "I'm having trouble connecting right now. Please try again later."
            }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto h-[500px] border rounded-xl bg-card shadow-lg flex flex-col overflow-hidden glass-card">
            {/* Header */}
            <div className="p-4 border-b bg-muted/50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                        <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">AI Assistant</h3>
                        <p className="text-xs text-muted-foreground">Powered by Gemini 2.0 Flash</p>
                    </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${demoStatus.remaining <= 2
                    ? 'bg-red-500/10 text-red-500 border-red-500/20'
                    : 'bg-primary/10 text-primary border-primary/20'
                    }`}>
                    Demo: {demoStatus.remaining}/{demoStatus.total}
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`p-2 rounded-full shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div
                                className={`rounded-lg px-3 py-2 text-sm max-w-[80%] ${msg.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-foreground'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-start gap-2"
                        >
                            <div className="p-2 rounded-full bg-muted shrink-0">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-muted rounded-lg px-4 py-3 flex gap-1">
                                <motion.div className="w-1.5 h-1.5 rounded-full bg-foreground/40" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                                <motion.div className="w-1.5 h-1.5 rounded-full bg-foreground/40" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                                <motion.div className="w-1.5 h-1.5 rounded-full bg-foreground/40" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t bg-background/50 backdrop-blur-sm">
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about my projects..."
                        disabled={isLoading}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                </div>
            </form>
        </div>
    )
}
