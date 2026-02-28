import type { Metadata } from 'next';
import PolicyClient from './PolicyClient';
import { localePath, localizedAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = localePath(locale, '/policy');
  const isAr = locale === 'ar';

  return {
    title: isAr
      ? 'سياسات الخصوصية والشحن والدفع – لورافي'
      : 'Privacy, Shipping & Payment Policies – Luravie',
    description: isAr
      ? 'اقرأي سياسات الشحن والدفع والخصوصية من لورافي. تغليف سري، دفع عند الاستلام، وحماية بياناتك الشخصية في جميع أنحاء مصر.'
      : "Read Luravie's shipping, payment, and privacy policies. Discreet packaging, cash on delivery, and secure handling of your personal information across Egypt.",
    alternates: {
      canonical,
      ...localizedAlternates('/policy'),
    },
    openGraph: {
      url: canonical,
    },
  };
}

export default function PolicyPage() {
  return <PolicyClient />;
}
