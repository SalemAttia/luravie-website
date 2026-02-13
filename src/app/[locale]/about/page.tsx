import type { Metadata } from 'next';
import AboutClient from './AboutClient';
import { localePath, localizedAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = localePath(locale, '/about');

  return {
    title: 'About Luravie',
    description: 'Learn about Luravie and our commitment to quality, comfort, and confidence.',
    alternates: {
      canonical,
      ...localizedAlternates('/about'),
    },
    openGraph: {
      url: canonical,
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
