"use client"

import { ChatbotDemo } from "@/components/sections/ChatbotDemo"
import { CodePlayground } from "@/components/sections/CodePlayground"
import { motion } from "motion/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function InteractiveDemos() {
    return (
        <section className="py-24 bg-muted/20 relative overflow-hidden" id="demos">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Interactive AI Demos</h2>
                    <p className="text-lg text-muted-foreground max-w-[800px] mx-auto">
                        Experience the power of LLMs directly in your browser. Ask the chatbot or experiment with code logic.
                    </p>
                </motion.div>

                <div className="flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-5xl"
                    >
                        <Tabs defaultValue="chatbot" className="w-full">
                            <div className="flex justify-center mb-8">
                                <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                                    <TabsTrigger value="chatbot">AI Chatbot</TabsTrigger>
                                    <TabsTrigger value="playground">Code Playground</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="chatbot">
                                <div className="flex justify-center">
                                    <div className="w-full max-w-lg">
                                        <ChatbotDemo />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="playground">
                                <div className="h-[600px]">
                                    <CodePlayground />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
