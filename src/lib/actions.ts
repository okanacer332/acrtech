"use server";

import { getAllContent, getContentBySlug, ContentType } from './mdx';
import { Resend } from 'resend';

// --- İÇERİK YÖNETİMİ (MEVCUT KODLAR) ---

function normalizeLang(lang: string) {
  return lang.toLowerCase();
}

export async function fetchHubContent(type: ContentType, lang: string) {
  const normalizedLang = normalizeLang(lang);
  const items = await getAllContent(type, normalizedLang);
  return items;
}

export async function fetchHubDetail(type: ContentType, lang: string, slug: string) {
  const normalizedLang = normalizeLang(lang);
  const item = await getContentBySlug(type, normalizedLang, slug);
  return item;
}

// --- MAIL GÖNDERME İŞLEMİ (RESEND) ---

type ContactFormData = {
  plan: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  mode: string;
};

// HATA ÇÖZÜMÜ: Global tanımı kaldırdık.
// const resend = new Resend(process.env.RESEND_API_KEY); <-- BURADAN SİLDİK

export async function sendEmail(data: ContactFormData) {
  try {
    // ÇÖZÜM: Resend'i sadece bu fonksiyon çalıştığında, ihtiyaç anında başlatıyoruz.
    // Bu sayede /hub sayfasına girerken API Key kontrolü yapıp patlamıyor.
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      // Domain doğrulaması yapana kadar 'onboarding@resend.dev' kullanmak zorundasın.
      // Kendi domainini doğruladığında buraya 'info@acrtech.com' yazabilirsin.
      from: 'ACR Tech Form <onboarding@resend.dev>',
      
      // ALICILAR:
      to: ['acer.okanumut@gmail.com', 'meltemgoren94@gmail.com'],
      
      subject: `🚀 Yeni Proje Başvurusu: ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="color: #2563eb; margin-bottom: 20px;">Yeni Müşteri Başvurusu</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">📦 Seçilen Paket:</td>
              <td style="padding: 8px 0;">${data.plan}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">👤 Ad Soyad:</td>
              <td style="padding: 8px 0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">📞 Telefon:</td>
              <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">📧 E-Posta:</td>
              <td style="padding: 8px 0;">${data.email || 'Belirtilmedi'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">🎨 Mod:</td>
              <td style="padding: 8px 0;">${data.mode.toUpperCase()}</td>
            </tr>
          </table>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #2563eb;">
            <strong style="display: block; margin-bottom: 8px; color: #4b5563;">📝 Proje Detayı / Mesaj:</strong>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.5;">${data.message}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Hatası:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Beklenmeyen Hata:', error);
    return { success: false, error: 'Mail gönderilemedi.' };
  }
}