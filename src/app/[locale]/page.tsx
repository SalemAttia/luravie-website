import { PRODUCTS } from "@/data";
import { getWooProducts } from "@/lib/woocommerce";
import { HomeClient } from "./HomeClient";
import type { Metadata } from "next";
import { localePath, localizedAlternates } from "@/lib/seo";

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

export default async function Home() {
  const wooProducts = await getWooProducts();
  const products = wooProducts.length > 0 ? wooProducts : PRODUCTS;

  return <HomeClient initialProducts={products} />;
}
