import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Github, Linkedin, MessageSquare } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container px-4 py-24 mx-auto max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-6">Let's Connect</h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            I'm always open to discussing new opportunities, technical challenges, or the future of AI support.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Email</p>
                                    <p className="font-medium text-foreground">juanlu@example.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <Linkedin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">LinkedIn</p>
                                    <a href="https://linkedin.com/in/juanlugordillo" className="font-medium text-foreground hover:text-primary transition-colors">
                                        juanlugordillo
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <Github className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">GitHub</p>
                                    <a href="https://github.com/juanlugordillo" className="font-medium text-foreground hover:text-primary transition-colors">
                                        juanlugordillo
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-8 bg-muted/50 rounded-2xl border border-border">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                                Direct Support
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                In a Product Support role, responsiveness is key. I aim to reply to all inquiries within 24 business hours.
                            </p>
                        </div>
                    </div>

                    <div className="bg-card p-8 rounded-2xl border border-border">
                        <ContactForm />
                    </div>
                </div>
            </main>
            <footer className="border-t py-12 bg-muted/20">
                <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Juan Lucas Gordillo. Let's build something together.
                </div>
            </footer>
        </div>
    )
}

function ContactForm() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        }

        const response = await fetch("/api/send", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.ok) {
            setSuccess(true)
        }

        setIsLoading(false)
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 text-center h-[400px]">
                <div className="p-4 rounded-full bg-green-500/10 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you shortly.</p>
                <Button variant="outline" onClick={() => setSuccess(false)}>Send Another</Button>
            </div>
        )
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" placeholder="Juan" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" placeholder="Gordillo" required />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="juan@example.com" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="Potential Collaboration" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="How can I help you?" className="min-h-[150px]" required />
            </div>
            <Button className="w-full py-6 text-lg font-semibold rounded-xl" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Message"}
            </Button>
        </form>
    )
}
