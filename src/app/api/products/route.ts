import { getWooProducts } from '@/lib/woocommerce';
import { PRODUCTS } from '@/data';
import { NextResponse } from 'next/server';
import * as Sentry from "@sentry/nextjs";

export async function GET() {
    try {
        const wooProducts = await getWooProducts();
        const products = wooProducts.length > 0 ? wooProducts : PRODUCTS;
        return NextResponse.json(products);
    } catch (error) {
        Sentry.captureException(error, {
            tags: { route: "api/products" },
            level: "warning",
        });
        return NextResponse.json(PRODUCTS);
    }
}
