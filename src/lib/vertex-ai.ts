import { PredictionServiceClient } from '@google-cloud/aiplatform'
import { google } from '@google-cloud/aiplatform/build/protos/protos'

// Tipos
type IGenerateContentRequest = google.cloud.aiplatform.v1.IGenerateContentRequest
type IContent = google.cloud.aiplatform.v1.IContent

export interface Message {
    role: 'user' | 'model'
    content: string
}

class VertexAIClient {
    private client: PredictionServiceClient
    private projectId: string
    private location: string
    private model: string

    constructor() {
        this.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || ''
        this.location = 'us-central1' // Revert to us-central1 for stable endpoint
        this.model = 'gemini-2.5-flash-lite' // Reemplazo directo y optimizado de 1.5 Flash with better stability

        // Sanitize environment to prevent library from crashing on placeholder
        if (process.env.GOOGLE_APPLICATION_CREDENTIALS && process.env.GOOGLE_APPLICATION_CREDENTIALS.includes('path/to/your')) {
            console.warn('Detected placeholder GOOGLE_APPLICATION_CREDENTIALS. Unsetting to prevent crash.')
            delete process.env.GOOGLE_APPLICATION_CREDENTIALS
        }

        // Inicializar cliente con credenciales
        const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
        const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS

        const clientConfig: any = {
            apiEndpoint: `${this.location}-aiplatform.googleapis.com`,
        }

        let loadedCredentials: any = null

        if (credentialsJson) {
            try {
                loadedCredentials = JSON.parse(credentialsJson)
                clientConfig.credentials = loadedCredentials
            } catch (e) {
                console.error('Failed to parse GOOGLE_APPLICATION_CREDENTIALS_JSON', e)
            }
        } else if (keyFilename && !keyFilename.includes('path/to/your')) {
            clientConfig.keyFilename = keyFilename
        }

        // Auto-detect project ID from credentials if env var is placeholder or missing
        if ((!this.projectId || this.projectId.includes('your-project-id')) && loadedCredentials?.project_id) {
            this.projectId = loadedCredentials.project_id
        }

        if (!clientConfig.keyFilename && !clientConfig.credentials) {
            console.warn('No valid Google Cloud credentials found. Using default application credentials.')
        }

        this.client = new PredictionServiceClient(clientConfig)
    }

    private get endpoint(): string {
        return `projects/${this.projectId}/locations/${this.location}/publishers/google/models/${this.model}`
    }

    async generateContent(
        systemPrompt: string,
        userMessage: string,
        conversationHistory: Message[] = []
    ): Promise<{ message: string; usage: any }> {
        const maxRetries = 3
        let lastError: any

        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                // Construir historial de conversación
                const contents: IContent[] = []

                // Añadir system instruction como primer mensaje del modelo
                contents.push({
                    role: 'model',
                    parts: [{ text: systemPrompt }]
                })

                // Añadir historial previo
                for (const msg of conversationHistory) {
                    contents.push({
                        role: msg.role,
                        parts: [{ text: msg.content }]
                    })
                }

                // Añadir mensaje actual del usuario
                contents.push({
                    role: 'user',
                    parts: [{ text: userMessage }]
                })

                // Configuración de generación
                const generationConfig = {
                    temperature: 0.7,
                    topP: 0.95,
                    topK: 40,
                    maxOutputTokens: 200,
                    candidateCount: 1,
                }

                // Safety settings (más permisivo para portfolio profesional)
                const safetySettings = [
                    {
                        category: 'HARM_CATEGORY_HATE_SPEECH',
                        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                    },
                    {
                        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                    },
                    {
                        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                    },
                    {
                        category: 'HARM_CATEGORY_HARASSMENT',
                        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                    }
                ] as unknown as google.cloud.aiplatform.v1.ISafetySetting[]

                const request: IGenerateContentRequest = {
                    model: this.endpoint,
                    contents: contents,
                    generationConfig,
                    safetySettings
                }

                // Llamar a la API
                const [response] = await this.client.generateContent(request)

                // Extraer respuesta
                const candidate = response.candidates?.[0]
                const part = candidate?.content?.parts?.[0]
                const text = part?.text

                if (!text) {
                    throw new Error('No response generated')
                }

                // Extraer metadata de uso (para tracking)
                const metadata = response.usageMetadata
                const usage = {
                    promptTokenCount: metadata?.promptTokenCount || 0,
                    candidatesTokenCount: metadata?.candidatesTokenCount || 0,
                    totalTokenCount: metadata?.totalTokenCount || 0
                }

                return {
                    message: text,
                    usage
                }

            } catch (error: any) {
                lastError = error

                // Retry on quota/rate limit errors (code 8: RESOURCE_EXHAUSTED or 429)
                const shouldRetry = (error.code === 8 || error.code === 429) && attempt < maxRetries - 1

                if (shouldRetry) {
                    const delayMs = Math.pow(2, attempt) * 1000 // 1s, 2s, 4s
                    console.log(`Vertex AI retry ${attempt + 1}/${maxRetries} after ${delayMs}ms - Error: ${error.message}`)
                    await new Promise(resolve => setTimeout(resolve, delayMs))
                    continue
                }

                console.error('Vertex AI error:', error)
                throw error
            }
        }

        throw lastError
    }
}

// Singleton instance
export const vertexAI = new VertexAIClient()
