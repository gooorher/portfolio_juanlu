import { render, screen } from '@testing-library/react'
import { Button } from './button'
import { describe, it, expect } from 'vitest'

describe('Button', () => {
    it('renders button with text', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('renders button as a link when asChild is present', () => {
        render(
            <Button asChild>
                <a href="/test">Link Button</a>
            </Button>
        )
        expect(screen.getByRole('link', { name: /link button/i })).toBeInTheDocument()
    })
})
