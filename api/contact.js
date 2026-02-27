import { Resend } from 'resend';

// Vercel Serverless Function
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Initialize Resend with Vercel Environment Variable
        const resend = new Resend(process.env.RESEND_API_KEY);

        const data = await resend.emails.send({
            from: 'İletişim Formu <onboarding@resend.dev>', // Resend test domain (update when verified)
            to: ['meltemgoren94@gmail.com'],
            subject: `Yeni Proje Talebi: ${name}`,
            text: `Ad: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`,
            html: `
                <h3>ACRTECH Web Sitesinden Yeni İletişim Formu Mesajı</h3>
                <p><strong>Ad:</strong> ${name}</p>
                <p><strong>E-posta:</strong> ${email}</p>
                <p><strong>Mesaj:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
            reply_to: email,
        });

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Resend Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
