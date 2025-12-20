import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
});

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const body = contactSchema.parse(json);

        if (!process.env.RESEND_API_KEY) {
            console.warn("Missing RESEND_API_KEY. Simulating email send.");
            return Response.json({ success: true, simulated: true });
        }

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['juaaanlu@gmail.com'], // Deliver to your email
            subject: `New message from ${body.name}`,
            text: `
        Name: ${body.name}
        Email: ${body.email}
        Message: ${body.message}
      `,
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json({ data });
    } catch (error) {
        return Response.json({ error }, { status: 400 });
    }
}
