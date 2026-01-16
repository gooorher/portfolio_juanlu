"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import { Play, RotateCcw, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { motion } from "motion/react"

const DEFAULT_CODE = `// Experiment with the LangChain/OpenAI logic

async function generateResponse(prompt) {
  const model = "gpt-4o";
  
  // Simulate API call
  console.log(\`Sending request to \${model}...\`);
  
  const response = {
    content: "This is a simulated response based on: " + prompt,
    usage: { tokens: 42 }
  };
  
  return response;
}

// Run the function
const result = await generateResponse("Explain quantum computing");
console.log(result);
`

export function CodePlayground() {
    const [code, setCode] = useState(DEFAULT_CODE)
    const [output, setOutput] = useState<string[]>([])
    const [isRunning, setIsRunning] = useState(false)

    const handleRun = async () => {
        setIsRunning(true)
        setOutput([])

        // Capture console.log
        const logs: string[] = []
        const originalLog = console.log
        console.log = (...args) => {
            logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' '))
            setOutput([...logs])
        }

        try {
            // Execute code (Safe-ish eval for demo)
            // Note: In a real app, use a sandboxed environment / WebContainer
            const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor
            const func = new AsyncFunction(code)
            await func()
        } catch (error: any) {
            console.log("Error:", error.message)
        } finally {
            console.log = originalLog
            setIsRunning(false)
        }
    }

    const handleReset = () => {
        setCode(DEFAULT_CODE)
        setOutput([])
    }

    return (
        <div className="w-full h-full min-h-[500px] border rounded-xl overflow-hidden glass-card flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b bg-muted/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-sm font-medium text-muted-foreground">playground.js</span>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleReset} title="Reset Code">
                        <RotateCcw className="w-4 h-4 mr-2" /> Reset
                    </Button>
                    <Button size="sm" onClick={handleRun} disabled={isRunning} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        {isRunning ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                <RotateCcw className="w-4 h-4" />
                            </motion.div>
                        ) : (
                            <>
                                <Play className="w-4 h-4 mr-2" /> Run
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row h-full">
                {/* Editor */}
                <div className="flex-1 h-[300px] md:h-auto border-b md:border-b-0 md:border-r border-border relative">
                    <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        theme="vs-dark"
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            padding: { top: 16 }
                        }}
                    />
                </div>

                {/* Console Output */}
                <div className="flex-1 h-[200px] md:h-auto bg-[#1e1e1e] border-t md:border-t-0 border-border overflow-hidden relative">
                    <div className="absolute top-2 left-4 z-10 text-muted-foreground select-none uppercase text-xs tracking-wider bg-[#1e1e1e] px-2 rounded">
                        Terminal Output
                    </div>
                    <Editor
                        height="100%"
                        defaultLanguage="json"
                        value={output.join('\n') || "// Check console output here..."}
                        theme="vs-dark"
                        options={{
                            minimap: { enabled: false },
                            fontSize: 13,
                            readOnly: true,
                            scrollBeyondLastLine: false,
                            padding: { top: 32 },
                            lineNumbers: 'off',
                            glyphMargin: false,
                            folding: false,
                            renderLineHighlight: 'none'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
