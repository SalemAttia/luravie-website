import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import { localePath, localizedAlternates, getSiteUrl, ARABIC_BRAND_VARIANTS } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import { JsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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
      ? 'تواصلي مع لوراڤيه (Luravie) – خدمة العملاء والاستفسارات'
      : 'Contact Luravie – Customer Support & Inquiries',
    description: isAr
      ? 'تواصلي مع لوراڤيه (لورافي - Luravie) عبر البريد الإلكتروني أو الواتساب أو نموذج الاتصال. خدمة العملاء متاحة من السبت إلى الخميس، ١٠ صباحاً – ٨ مساءً. نحن هنا لمساعدتك في الطلبات والمقاسات والمزيد.'
      : "Get in touch with Luravie via email, WhatsApp, or our contact form. Customer support available Saturday–Thursday, 10 AM–8 PM EET. We're here to help with orders, sizing, and more.",
    keywords: isAr
      ? [...ARABIC_BRAND_VARIANTS, 'Luravie', 'تواصل لوراڤيه', 'تواصل لورافي', 'خدمة عملاء لوراڤيه', 'واتساب لوراڤيه', 'دعم لوراڤيه']
      : ['contact Luravie', 'Luravie support', 'Luravie WhatsApp', 'Luravie customer service', 'Luravie Egypt contact'],
    alternates: {
      canonical,
      ...localizedAlternates('/contact'),
    },
    openGraph: {
      url: canonical,
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
  const isAr = locale === 'ar';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isAr ? 'الرئيسية' : 'Home',
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isAr ? 'تواصلي معنا' : 'Contact',
        item: `${siteUrl}/${locale}/contact`,
      },
    ],
  };

  const contactPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: isAr ? 'تواصلي مع لورافي' : 'Contact Luravie',
    description: isAr
      ? 'تواصلي مع لورافي عبر البريد الإلكتروني أو الواتساب أو نموذج الاتصال.'
      : 'Get in touch with Luravie via email, WhatsApp, or our contact form.',
    url: `${siteUrl}/${locale}/contact`,
    inLanguage: isAr ? 'ar' : 'en',
    mainEntity: {
      '@type': 'Organization',
      name: 'Luravie',
      alternateName: ['لورافي', 'لُوراڤيه'],
      email: 'support@luravie.com',
      telephone: '+201505555388',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+201505555388',
        email: 'support@luravie.com',
        contactType: 'customer service',
        areaServed: 'EG',
        availableLanguage: ['English', 'Arabic'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '10:00',
          closes: '20:00',
        },
      },
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={contactPageJsonLd} />
      <ContactClient />
    </>
  );
}
