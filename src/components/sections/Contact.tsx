"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to send message");

            setIsSuccess(true);
            reset();
            setTimeout(() => setIsSuccess(false), 5000); // Reset success after 5s
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24">
            <Container>
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-lg text-muted-foreground">Have a project in mind? Let's talk.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary rounded-lg">
                                <Mail className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">Email</h3>
                                <p className="text-muted-foreground">juaaanlu@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary rounded-lg">
                                <Phone className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">Phone</h3>
                                <p className="text-muted-foreground">+34 665 62 00 53</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary rounded-lg">
                                <MapPin className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">Location</h3>
                                <p className="text-muted-foreground">Málaga, Spain</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-card border rounded-2xl p-8"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <input
                                        {...register("name")}
                                        id="name"
                                        className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <input
                                        {...register("email")}
                                        id="email"
                                        type="email"
                                        className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <textarea
                                    {...register("message")}
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border bg-background resize-none focus:ring-2 focus:ring-accent outline-none transition-all"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                                {errors.message && <p className="text-destructive text-sm">{errors.message.message}</p>}
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                                    </>
                                ) : isSuccess ? (
                                    "Message Sent!"
                                ) : (
                                    "Send Message"
                                )}
                            </Button>
                            {error && <p className="text-destructive text-center text-sm">{error}</p>}
                            {isSuccess && <p className="text-green-500 text-center text-sm">Thanks for reaching out! I'll get back to you soon.</p>}
                        </form>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
