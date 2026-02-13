import type { Metadata } from 'next';
import PolicyClient from './PolicyClient';
import { localePath, localizedAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = localePath(locale, '/policy');

  return {
    title: 'Shipping & Privacy Policy',
    description: "Read Luravie's shipping, payment, and privacy policies.",
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
