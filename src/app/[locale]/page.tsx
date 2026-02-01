import { PRODUCTS } from "@/data";
import { getWooProducts } from "@/lib/woocommerce";
import { HomeClient } from "./HomeClient";

export default async function Home() {
  const wooProducts = await getWooProducts();
  const products = wooProducts.length > 0 ? wooProducts : PRODUCTS;

  return <HomeClient initialProducts={products} />;
}
