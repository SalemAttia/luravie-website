import { Suspense } from "react";
import { Hero, CategorySection } from "@/components/hero-and-cats";
import { TrustSection } from "@/components/trust-section";
import { ProductsSkeleton } from "@/components/products-skeleton";
import { FeaturedProductsServer } from "./FeaturedProductsServer";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { localePath, localizedAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = localePath(locale, "");
  const isAr = locale === "ar";

  return {
    title: isAr
      ? "لورافي | مستلزمات نسائية يومية – سوتيانات ولانجيري في مصر"
      : "Luravie | Women's Everyday Essentials – Bras, Lingerie & More in Egypt",
    description: isAr
      ? "تسوقي أفضل السوتيانات واللانجيري والمستلزمات النسائية اليومية من لورافي. جودة عالية بأسعار مناسبة مع الدفع عند الاستلام وشحن سري ومجاني في جميع أنحاء مصر."
      : "Shop premium women's bras, lingerie, and everyday essentials at Luravie. Affordable luxury with cash on delivery, discreet packaging, and free shipping across Egypt.",
    alternates: {
      canonical,
      ...localizedAlternates(""),
    },
    openGraph: {
      url: canonical,
    },
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <Suspense fallback={<ProductsSkeleton />}>
        <FeaturedProductsServer />
      </Suspense>
      <TrustSection />
    </>
  );
}
