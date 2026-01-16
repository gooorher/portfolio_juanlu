import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactTemplate } from '@/components/email/ContactTemplate';

const resend = new Resend(process.env.RESEND_API_KEY || 're_missing_key');

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, subject, message } = body;

        // Simple validation
        if (!firstName || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Update this with your verified domain in production
            to: ['juaaanlu@gmail.com'], // Deliver to your personal email
            replyTo: email,
            subject: `Portfolio Contact: ${subject || 'New Message'}`,
            react: (
                <ContactTemplate
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    subject={subject}
                    message={message}
                />
            ),
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
