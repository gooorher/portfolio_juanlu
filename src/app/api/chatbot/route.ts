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

// Rate limiting simple (mejorar en producción con Redis/Vercel KV)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
    const now = Date.now()
    const limit = 20 // 20 mensajes por hora
    const windowMs = 60 * 60 * 1000 // 1 hora

    const record = requestCounts.get(ip)

    if (!record || now > record.resetTime) {
        requestCounts.set(ip, { count: 1, resetTime: now + windowMs })
        return true
    }

    if (record.count >= limit) {
        return false
    }

    record.count++
    return true
}

export async function POST(request: Request) {
    try {
        // Get IP for rate limiting
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown'

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again in an hour.' },
                { status: 429 }
            )
        }

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
            usage: result.usage
        })

    } catch (error) {
        console.error('Chatbot API error:', error)

        // Error específico de Vertex AI
        if (error instanceof Error) {
            if (error.message.includes('quota')) {
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
