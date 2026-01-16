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
        this.location = process.env.VERTEX_AI_LOCATION || 'us-central1'
        this.model = 'gemini-2.0-flash-exp' // Modelo más reciente y económico

        // Inicializar cliente con credenciales
        this.client = new PredictionServiceClient({
            apiEndpoint: `${this.location}-aiplatform.googleapis.com`,
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
        })
    }

    private get endpoint(): string {
        return `projects/${this.projectId}/locations/${this.location}/publishers/google/models/${this.model}`
    }

    async generateContent(
        systemPrompt: string,
        userMessage: string,
        conversationHistory: Message[] = []
    ): Promise<{ message: string; usage: any }> {
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
                contents: contents, // Corrected from instances: [{content: contents}] based on standard Gemini API usage in Vertex
                generationConfig,
                safetySettings
            }

            // Llamar a la API
            // Note: user code used predict() but Gemini usually uses generateContent()
            // However, the nodejs client for Vertex AI passes requests differently. 
            // The user code snippet: const [response] = await this.client.predict(request)
            // `predict` expects `IPredictRequest`. `IGenerateContentRequest` is for `generateContent`.
            // I will assume the user meant `generateContent` if sticking to `IGenerateContentRequest`.
            // The `PredictionServiceClient` DOES have a `generateContent` method in newer versions.
            // If not, we might need `GenerativeServiceClient`.
            // Let's try `generateContent` method on the client if it exists, or fallback to predict if typed that way.
            // Actually, looking at the user snippet: `this.client.predict(request)`
            // But `request` is typed as `IGenerateContentRequest`. `predict` takes `IPredictRequest`.
            // This mismatch suggests the user might be conflating two approaches.
            // I will implement `generateContent` which is the CORRECT way for Gemini. 

            const [response] = await this.client.generateContent(request)

            // Extraer respuesta
            // The user code extraction logic was:
            // const prediction = response.predictions?.[0]
            // This is for `predict` response. 
            // `generateContent` returns `IGenerateContentResponse` which has `candidates`.

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

        } catch (error) {
            console.error('Vertex AI error:', error)
            throw error
        }
    }
}

// Singleton instance
export const vertexAI = new VertexAIClient()
