export const springConfig = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30
}

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
}

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

export const scaleOnHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
}

export const magneticEffect = {
    type: "spring" as const,
    stiffness: 150,
    damping: 15,
    mass: 0.1
}

// Duration tokens
export const durations = {
    fast: 0.15,
    base: 0.3,
    slow: 0.5
}
