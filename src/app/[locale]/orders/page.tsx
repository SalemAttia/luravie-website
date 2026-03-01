import type { Metadata } from 'next';
import OrdersClient from './OrdersClient';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Your Orders | Luravie',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrdersPage() {
  return <OrdersClient />;
}
