import * as React from 'react';

interface ContactTemplateProps {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

export const ContactTemplate: React.FC<Readonly<ContactTemplateProps>> = ({
    firstName,
    lastName,
    email,
    subject,
    message,
}) => (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
        <h1>New Message from Portfolio</h1>
        <p><strong>From:</strong> {firstName} {lastName} ({email})</p>
        <p><strong>Subject:</strong> {subject}</p>
        <hr />
        <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
    </div>
);
