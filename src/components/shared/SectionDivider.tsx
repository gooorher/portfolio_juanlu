"use client"

export function SectionDivider() {
    return (
        <div className="relative h-24 overflow-hidden w-full">
            {/* Gradient fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

            {/* Decorative line with glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

            {/* Dot accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary/30 rounded-full blur-sm shadow-[0_0_10px_var(--primary)]" />
        </div>
    )
}
