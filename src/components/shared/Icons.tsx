import React from "react"

export function Spotify({ size = 20, className = "" }: { size?: number, className?: string }) {
    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="currentColor"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.492 17.306c-.215.353-.673.465-1.026.25-2.853-1.745-6.444-2.138-10.672-1.171-.403.093-.81-.157-.903-.56-.092-.403.157-.81.56-.903 4.63-1.06 8.6-1.61 11.791.334.353.215.465.673.25 1.026zm1.464-3.258c-.27.44-.846.58-1.285.31-3.266-2.008-8.24-2.59-12.1-1.417-.497.15-1.02-.13-1.17-.63-.15-.497.13-1.02.63-1.17 4.41-1.34 9.9-1.68 13.633.61.44.27.58.847.31 1.287h-.008zm.135-3.376c-3.916-2.325-10.37-2.54-14.137-1.396-.6.18-1.238-.16-1.42-.763-.18-.6.16-1.237.76-1.42 4.316-1.31 11.45-1.05 15.98 1.636.538.318.716 1.012.398 1.55-.318.538-1.012.716-1.55.398z" />
        </svg>
    )
}

export function Strava({ size = 20, className = "" }: { size?: number, className?: string }) {
    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="currentColor"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.608h4.171L10.379 0 0 20.431h4.171l6.208-12.336" />
        </svg>
    )
}
