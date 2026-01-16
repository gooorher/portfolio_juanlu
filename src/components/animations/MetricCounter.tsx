"use client"

import { useEffect, useState, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "motion/react"

interface MetricCounterProps {
    value: number
    suffix?: string
    prefix?: string
    duration?: number
}

export function MetricCounter({
    value,
    suffix = "",
    prefix = "",
    duration = 2
}: MetricCounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
        damping: 50,
        stiffness: 100,
        duration: duration * 1000
    })
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    useEffect(() => {
        if (isInView) {
            motionValue.set(value)
        }
    }, [isInView, value, motionValue])

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${latest.toFixed(0)}${suffix}`
            }
        })
    }, [springValue, prefix, suffix])

    return <span ref={ref} />
}
