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

  return {
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
