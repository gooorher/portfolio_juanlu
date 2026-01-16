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
    githubUrl?: string | null
    liveUrl?: string
    codeSnippet?: string // Highlighted code shown on hover
    highlights: string[]
    techStack?: {
        frontend?: string[]
        backend?: string[]
        ai?: string[]
        ml?: string[]
        infrastructure?: string[]
        nlp?: string[]
        monitoring?: string[]
    }
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
    title: string
    company: string
    location: string
    period: string
    type: "Full-time" | "Part-time" | "Contract" | "Freelance"
    description?: string // Make optional if highlights are preferred
    highlights: string[]
    tags?: string[]
}

export interface Education {
    id: string
    degree: string
    institution: string
    location: string
    period: string
    gpa?: string
    logo?: string
    specializations?: string[]
    thesis?: string
    highlights: string[]
}

export interface SocialLink {
    name: string
    url: string
    icon: string
    color: string
    category: "professional" | "personal" | "creative"
}
