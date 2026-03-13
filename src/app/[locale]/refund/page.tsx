import type { Metadata } from 'next';
import RefundClient from './RefundClient';
import { localePath, localizedAlternates, ARABIC_BRAND_VARIANTS } from '@/lib/seo';
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
  const canonical = localePath(locale, '/refund');
  const isAr = locale === 'ar';

  return {
    title: isAr
      ? 'سياسة الإرجاع والاستبدال – لوراڤيه | جربي قبل ما تشتري'
      : 'Return & Refund Policy – Try Before You Buy | Luravie',
    description: isAr
      ? 'سياسة الإرجاع والاستبدال من لوراڤيه (لورافي - Luravie). استمتعي بخدمة التجربة قبل الشراء. استبدال خلال ٢٤ ساعة للعيوب الصناعية. تسوقي بثقة.'
      : "Luravie's return and refund policy. Enjoy our Try Before You Buy service. Replacement within 24 hours for manufacturing defects. Shop with confidence.",
    keywords: isAr
      ? [...ARABIC_BRAND_VARIANTS, 'Luravie', 'إرجاع لوراڤيه', 'استبدال لوراڤيه', 'جربي قبل ما تشتري']
      : ['Luravie refund', 'Luravie return policy', 'try before you buy Egypt'],
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
