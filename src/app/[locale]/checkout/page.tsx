import type { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';
import { getShippingCost } from '@/lib/woocommerce';

export const metadata: Metadata = {
  title: 'Checkout',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CheckoutPage() {
  const shipping = await getShippingCost();
  return <CheckoutClient shippingCost={shipping.cost} />;
}
