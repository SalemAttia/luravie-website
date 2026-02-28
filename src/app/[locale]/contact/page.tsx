import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import { localePath, localizedAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = localePath(locale, '/contact');
  const isAr = locale === 'ar';

  return {
    title: isAr
      ? 'تواصلي مع لورافي – خدمة العملاء والاستفسارات'
      : 'Contact Luravie – Customer Support & Inquiries',
    description: isAr
      ? 'تواصلي مع لورافي عبر البريد الإلكتروني أو الواتساب أو نموذج الاتصال. خدمة العملاء متاحة من السبت إلى الخميس، ١٠ صباحاً – ٨ مساءً. نحن هنا لمساعدتك في الطلبات والمقاسات والمزيد.'
      : "Get in touch with Luravie via email, WhatsApp, or our contact form. Customer support available Saturday–Thursday, 10 AM–8 PM EET. We're here to help with orders, sizing, and more.",
    alternates: {
      canonical,
      ...localizedAlternates('/contact'),
    },
    openGraph: {
      url: canonical,
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
