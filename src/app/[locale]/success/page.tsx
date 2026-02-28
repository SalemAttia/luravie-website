import type { Metadata } from 'next';
import SuccessClient from './SuccessClient';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Order Confirmed',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessPage() {
  return <SuccessClient />;
}
