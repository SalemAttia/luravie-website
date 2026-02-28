import { PRODUCTS } from "@/data";
import { getWooProducts } from "@/lib/woocommerce";
import { FeaturedProductsClient } from "./FeaturedProductsClient";

export async function FeaturedProductsServer() {
    const wooProducts = await getWooProducts();
    const products = wooProducts.length > 0 ? wooProducts : PRODUCTS;

    return <FeaturedProductsClient initialProducts={products} />;
}
