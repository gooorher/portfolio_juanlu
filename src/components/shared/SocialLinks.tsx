"use client"

import { socialLinks } from "@/data/social-links"
import { SocialLink } from "@/types"
import { Github, Linkedin, Mail, Instagram, Book, Activity, Music } from "lucide-react"

const icons = {
    Github,
    Linkedin,
    Mail,
    Instagram,
    Book,
    Activity,
    Music
}

export function SocialLinks({ className = "", iconSize = 20 }: { className?: string, iconSize?: number }) {
    return (
        <div className={`flex gap-4 ${className}`}>
            {socialLinks.map((link: SocialLink) => {
                const Icon = icons[link.icon as keyof typeof icons] || Github

                return (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                        title={link.name}
                        style={{ "--hover-color": link.color } as React.CSSProperties}
                    >
                        <div className="p-2 rounded-full hover:bg-[var(--hover-color)]/10 transition-colors duration-200">
                            <Icon size={iconSize} className="hover:text-[var(--hover-color)] transition-colors duration-200" />
                        </div>
                    </a>
                )
            })}
        </div>
    )
}
