import type { Metadata } from 'next';
import ShippingClient from './ShippingClient';
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
  const canonical = localePath(locale, '/shipping');
  const isAr = locale === 'ar';

  return {
    title: isAr
      ? 'معلومات الشحن والتوصيل – شحن مجاني وسري في مصر'
      : 'Shipping & Delivery – Free Discreet Shipping Across Egypt',
    description: isAr
      ? 'لورافي توصل في جميع أنحاء مصر بتغليف سري. القاهرة والجيزة خلال ٤٨ ساعة، باقي المحافظات خلال ٧٢ ساعة. شحن مجاني مع الدفع عند الاستلام.'
      : 'Luravie delivers across all of Egypt with discreet packaging. Cairo & Giza in 48 hours, other governorates in 72 hours. Free shipping with cash on delivery.',
    keywords: isAr
      ? ['شحن مجاني مصر', 'توصيل ملابس داخلية', 'شحن سري', 'الدفع عند الاستلام']
      : ['free shipping Egypt', 'discreet delivery underwear', 'cash on delivery Egypt', 'lingerie delivery Egypt'],
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
