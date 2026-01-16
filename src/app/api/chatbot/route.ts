import { NextResponse } from 'next/server'
import { vertexAI, type Message } from '@/lib/vertex-ai'

// System prompt personalizado
const SYSTEM_PROMPT = `You are an AI assistant for Juanlu Gordillo's professional portfolio website.

PROFILE:
- Full Name: Juan Lucas Gordillo (goes by "Juanlu")
- Role: Product Support Engineer | LLM Integration & API Specialist
- Location: Pradollano, Andalucía, Spain
- Email: juaaanlu@gmail.com

PROFESSIONAL EXPERIENCE:
- Product Support Engineer (Mar 2023 - Present)
  • Built MLOps Cyber-Defense Dashboard processing 50M+ daily transactions
  • Developed NLP Global Analytics system with multi-language support
  • Achieved 95% customer satisfaction rate with 1K+ monthly API requests
  • Provides L3 technical support for AI-powered products

TECHNICAL SKILLS:
AI/ML Stack:
- LangChain, OpenAI API, Google Vertex AI, Gemini
- RAG (Retrieval-Augmented Generation), Fine-tuning
- Vector databases (Pinecone, ChromaDB)
- Prompt engineering and optimization

Backend Development:
- Python (FastAPI, Flask), Node.js, TypeScript
- RESTful API design, GraphQL
- Microservices architecture

Cloud & DevOps:
- AWS (Lambda, S3, EC2), Google Cloud Platform
- Docker, Kubernetes
- CI/CD pipelines, monitoring (Datadog, Grafana)

FEATURED PROJECTS:
1. MLOps Cyber-Defense Dashboard
   - Real-time threat detection using LLM analysis
   - Processes 50M+ transactions daily
   - Stack: Python, LangChain, OpenAI, FastAPI, React

2. NLP Global Analytics Platform
   - Multi-language documentation search (8 languages)
   - RAG-powered support system
   - Stack: Python, Gemini, Vector DB, Next.js

3. Factoried Platform
   - [Add specific details when available]

PERSONAL INTERESTS:
- Reading (Goodreads: goodreads.com/user/show/175064061)
- Running & Cycling (Strava: strava.app.link/3tso5WhgoRb)
- Music (Spotify: open.spotify.com/user/juaaanlu)

SOCIAL LINKS:
- LinkedIn: linkedin.com/in/jgordilloh
- GitHub: github.com/gooorher
- Instagram: instagram.com/__jgordillo

INSTRUCTIONS:
1. Answer questions about Juanlu's experience, skills, projects, and availability
2. Keep responses concise (max 150 words) but informative
3. Use a professional yet friendly tone
4. Include relevant links when helpful
5. If asked about availability/hiring, direct to email or contact form
6. If question is outside scope, politely redirect to relevant section
7. Never make up information - only use what's provided above

EXAMPLE INTERACTIONS:
Q: "What's your experience with LLMs?"
A: "Juanlu has hands-on production experience with LLMs. He built an MLOps Cyber-Defense Dashboard using LangChain and OpenAI that processes 50M+ transactions daily, and developed a RAG-powered NLP analytics platform with Gemini. His expertise covers prompt engineering, fine-tuning, vector search, and full-stack LLM integration. Check out his featured projects for detailed case studies!"

Q: "Are you available for hire?"
A: "Juanlu is open to discussing opportunities! The best way to reach him is via email at juaaanlu@gmail.com or connect on LinkedIn (linkedin.com/in/jgordilloh). You can also use the contact form on this site."

Q: "What technologies do you use?"
A: "Juanlu's tech stack spans AI/ML (LangChain, OpenAI, Gemini, RAG), backend (Python/FastAPI, Node.js), and cloud (AWS, GCP, Docker/K8s). He specializes in building production-grade AI systems with focus on reliability and customer success."

Now answer user questions following these guidelines.`

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { createHash } from "crypto"

// Initialize rate limiters
// Try to initialize Redis with Vercel KV or Upstash credentials
const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

let redis: Redis | null = null
let userRatelimit: Ratelimit | null = null
let globalRatelimit: Ratelimit | null = null

if (kvUrl && kvToken) {
    try {
        redis = new Redis({
            url: kvUrl,
            token: kvToken,
        })

        // User ratelimit: 10 messages per 24 hours
        userRatelimit = new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(10, "24 h"),
            analytics: true,
            prefix: "chatbot_user"
        })

        // Global ratelimit: 500 messages per 24 hours
        globalRatelimit = new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(500, "24 h"),
            prefix: "chatbot_global"
        })
    } catch (e) {
        console.warn("Failed to initialize Redis or Ratelimit:", e)
    }
} else {
    console.warn("KV_REST_API_URL or KV_REST_API_TOKEN not found. Rate limiting disabled.")
}

// Create fingerprint from request
function createFingerprint(request: Request): string {
    const ip = request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown'
    const userAgent = request.headers.get('user-agent') || ''
    const acceptLang = request.headers.get('accept-language') || ''

    return createHash('sha256')
        .update(ip + userAgent + acceptLang)
        .digest('hex')
        .slice(0, 16)
}

export async function POST(request: Request) {
    let limitCheck = { success: true, remaining: 10, reset: 0 }

    // Rate Limit Check (Fail Open)
    if (globalRatelimit && userRatelimit) {
        try {
            const fingerprint = createFingerprint(request)

            // 1. Check global quota first
            const globalCheck = await globalRatelimit.limit("global")
            if (!globalCheck.success) {
                return NextResponse.json(
                    {
                        error: 'Demo chatbot at capacity. Try again later or email juaaanlu@gmail.com',
                        resetAt: new Date(globalCheck.reset).toISOString()
                    },
                    { status: 503 }
                )
            }

            // 2. Check per-user limit
            const userCheck = await userRatelimit.limit(fingerprint)
            if (!userCheck.success) {
                return NextResponse.json(
                    {
                        error: 'Demo limit reached (10/10 messages). Contact juaaanlu@gmail.com for extended conversations.',
                        remaining: 0,
                        resetAt: new Date(userCheck.reset).toISOString()
                    },
                    { status: 429 }
                )
            }

            limitCheck = {
                success: true,
                remaining: userCheck.remaining,
                reset: userCheck.reset
            }

        } catch (error) {
            console.error('Rate limit error (Failing Open):', error)
            // Proceed even if rate limiting fails
        }
    }

    try {
        // Parse request
        const { message, conversationHistory = [] } = await request.json()

        // Validation
        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Invalid message format' },
                { status: 400 }
            )
        }

        if (message.length > 500) {
            return NextResponse.json(
                { error: 'Message too long. Please keep it under 500 characters.' },
                { status: 400 }
            )
        }

        if (conversationHistory.length > 10) {
            return NextResponse.json(
                { error: 'Conversation too long. Please start a new conversation.' },
                { status: 400 }
            )
        }

        // Convert history format
        const formattedHistory: Message[] = conversationHistory.map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            content: msg.content
        }))

        // Call Vertex AI
        const result = await vertexAI.generateContent(
            SYSTEM_PROMPT,
            message,
            formattedHistory
        )

        return NextResponse.json({
            message: result.message,
            usage: result.usage,
            demo: {
                remaining: limitCheck.remaining,
                resetAt: limitCheck.reset > 0 ? new Date(limitCheck.reset).toISOString() : new Date(Date.now() + 86400000).toISOString()
            }
        }, {
            headers: {
                'X-RateLimit-Remaining': limitCheck.remaining.toString(),
                'X-RateLimit-Reset': limitCheck.reset.toString()
            }
        })

    } catch (error) {
        console.error('Chatbot API error:', error)

        // Error específico de Vertex AI
        if (error instanceof Error) {
            // Check for code 8 (RESOURCE_EXHAUSTED) or quota messages
            if (error.message.includes('quota') || error.message.includes('Resource exhausted') || (error as any).code === 8) {
                return NextResponse.json(
                    { error: 'Service temporarily at capacity. Please try again shortly.' },
                    { status: 503 }
                )
            }

            if (error.message.includes('authentication')) {
                console.error('Authentication error - check GOOGLE_APPLICATION_CREDENTIALS')
                return NextResponse.json(
                    { error: 'Service configuration error. Please contact support.' },
                    { status: 500 }
                )
            }
        }

        return NextResponse.json(
            { error: 'An error occurred. Please try again or email juaaanlu@gmail.com.' },
            { status: 500 }
        )
    }
}

// Health check endpoint
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        model: 'gemini-2.0-flash-exp',
        provider: 'Google Vertex AI'
    })
}
