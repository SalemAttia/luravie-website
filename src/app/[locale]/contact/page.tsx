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

  return {
    title: 'Contact Us',
    description: 'Get in touch with Luravie. Email, WhatsApp, or send us a message.',
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
