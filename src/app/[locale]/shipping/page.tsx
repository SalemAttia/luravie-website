import type { Metadata } from 'next';
import ShippingClient from './ShippingClient';
import { localePath, localizedAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = localePath(locale, '/shipping');

  return {
    title: 'Shipping Information',
    description: 'Delivery timelines, shipping costs, and discreet packaging at Luravie.',
    alternates: {
      canonical,
      ...localizedAlternates('/shipping'),
    },
    openGraph: {
      url: canonical,
    },
  };
}

export default function ShippingPage() {
  return <ShippingClient />;
}
