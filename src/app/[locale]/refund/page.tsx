import type { Metadata } from 'next';
import RefundClient from './RefundClient';
import { localePath, localizedAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = localePath(locale, '/refund');

  return {
    title: 'Refund & Return Policy',
    description: "Learn about Luravie's return, refund, and defect policies.",
    alternates: {
      canonical,
      ...localizedAlternates('/refund'),
    },
    openGraph: {
      url: canonical,
    },
  };
}

export default function RefundPage() {
  return <RefundClient />;
}
