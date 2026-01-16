import { Technology } from "@/types"

export const technologies: Technology[] = [
    {
        id: "python",
        name: "Python",
        category: "AI/ML",
        icon: "python-icon", // replace with actual icon component or path later
        proficiency: 95
    },
    {
        id: "langchain",
        name: "LangChain",
        category: "AI/ML",
        icon: "langchain-icon",
        proficiency: 90
    },
    {
        id: "openai",
        name: "OpenAI API",
        category: "AI/ML",
        icon: "openai-icon",
        proficiency: 95
    },
    {
        id: "nextjs",
        name: "Next.js",
        category: "Customer Success", // As per PRD categorization example or just generic Web? PRD says "Cloud, Customer Success"
        // PRD says: AI/ML, API, Cloud, Customer Success
        icon: "nextjs-icon",
        proficiency: 85
    },
    {
        id: "react",
        name: "React",
        category: "Customer Success",
        icon: "react-icon",
        proficiency: 90
    },
    {
        id: "fastapi",
        name: "FastAPI",
        category: "API",
        icon: "fastapi-icon",
        proficiency: 90
    },
    {
        id: "aws",
        name: "AWS",
        category: "Cloud",
        icon: "aws-icon",
        proficiency: 80
    }
]
