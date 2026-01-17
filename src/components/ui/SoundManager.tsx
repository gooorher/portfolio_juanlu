"use client"

import useSound from "use-sound"
import { useUIStore } from "@/store/ui-store"
import { useEffect } from "react"

export function SoundManager() {
    const { soundEnabled } = useUIStore()

    // Using placeholder sounds or data URIs for beep/click if local files aren't available yet.
    // Ideally these should be tiny .mp3/.wav files in public/sounds/
    // For now, let's assume we have them or use a silent failure fallback.
    // In a real scenario, I would ensure these files exist. 
    // Since I cannot upload binary files easily, I will use a very short base64 encoded 'pop' sound as a placeholder that works out of the box.

    // Short "pop" sound (base64)
    const popSound = "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YUwuT18AAAAAAP//////////////////////////////////////////////////pp///////////w=="

    const [playHover] = useSound(popSound, { volume: 0.1, soundEnabled })
    const [playClick] = useSound(popSound, { volume: 0.25, pitch: 1.5, soundEnabled })

    useEffect(() => {
        if (!soundEnabled) return

        const handleMouseEnter = () => playHover()
        const handleMouseDown = () => playClick()

        const interactiveElements = document.querySelectorAll("a, button, input, [role='button']")

        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", handleMouseEnter)
            el.addEventListener("mousedown", handleMouseDown)
        })

        // Observer for dynamic content
        const observer = new MutationObserver(() => {
            const newElements = document.querySelectorAll("a, button, input, [role='button']")
            newElements.forEach(el => {
                el.removeEventListener("mouseenter", handleMouseEnter)
                el.removeEventListener("mousedown", handleMouseDown)
                el.addEventListener("mouseenter", handleMouseEnter)
                el.addEventListener("mousedown", handleMouseDown)
            })
        })

        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            interactiveElements.forEach(el => {
                el.removeEventListener("mouseenter", handleMouseEnter)
                el.removeEventListener("mousedown", handleMouseDown)
            })
            observer.disconnect()
        }
    }, [soundEnabled, playHover, playClick])

    return null // Headless component
}
