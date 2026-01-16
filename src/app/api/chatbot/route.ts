import { NextResponse } from 'next/server'
import { vertexAI, type Message } from '@/lib/vertex-ai'

// System prompt personalizado
const SYSTEM_PROMPT = `AI assistant for Juanlu Gordillo's portfolio.

PROFILE: Product Support Engineer | LLM Integration Specialist
Location: Málaga, Spain | Email: juaaanlu@gmail.com

EXPERTISE:
- AI/ML: LangChain, OpenAI, Vertex AI, RAG, Fine-tuning
- Backend: Python/FastAPI, Node.js, TypeScript
- Cloud: AWS, GCP, Docker, K8s

KEY PROJECTS:
1. MLOps Cyber-Defense Dashboard (50M+ daily transactions)
2. NLP Global Analytics (8-language RAG system)

LINKS:
- LinkedIn: linkedin.com/in/jgordilloh
- GitHub: github.com/gooorher

INSTRUCTIONS:
- Keep responses under 100 words
- Professional yet friendly tone
- Direct to email for hiring: juaaanlu@gmail.com
- Only use information provided above`

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
        model: 'gemini-2.5-flash-lite',
        provider: 'Google Vertex AI'
    })
}
