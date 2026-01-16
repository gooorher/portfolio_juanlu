export interface Project {
    id: string
    slug: string
    title: string
    role: string
    company: string
    period: string
    description: string
    longDescription: string
    tags: string[]
    image: {
        thumbnail: string
        hero: string
    }
    metrics: {
        label: string
        value: string
        icon?: string
    }[]
    caseStudyPath: string
    githubUrl?: string
    liveUrl?: string
    codeSnippet?: string // Highlighted code shown on hover
}

export interface Technology {
    id: string
    name: string
    category: 'AI/ML' | 'API' | 'Cloud' | 'Customer Success'
    icon: string
    proficiency: number // 0-100
}

export interface Experience {
    id: string
    role: string
    company: string
    period: string
    description: string[]
    skills: string[]
}
