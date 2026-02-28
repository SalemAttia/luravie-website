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
  const isAr = locale === 'ar';

  return {
    title: isAr
      ? 'سياسة الإرجاع والاستبدال – جربي قبل ما تشتري'
      : 'Return & Refund Policy – Try Before You Buy',
    description: isAr
      ? 'سياسة الإرجاع والاستبدال من لورافي. استمتعي بخدمة التجربة قبل الشراء. استبدال خلال ٢٤ ساعة للعيوب الصناعية. تسوقي بثقة.'
      : "Luravie's return and refund policy. Enjoy our Try Before You Buy service. Replacement within 24 hours for manufacturing defects. Shop with confidence.",
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
