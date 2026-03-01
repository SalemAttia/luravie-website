import type { Metadata } from 'next';
import TrackOrderClient from './TrackOrderClient';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Track Your Order | Luravie',
  description: 'Track your Luravie order status by order ID or phone number.',
};

export default function TrackOrderPage() {
  return <TrackOrderClient />;
}
