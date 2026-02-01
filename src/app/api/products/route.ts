import { getWooProducts } from '@/lib/woocommerce';
import { PRODUCTS } from '@/data';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const wooProducts = await getWooProducts();
        const products = wooProducts.length > 0 ? wooProducts : PRODUCTS;
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json(PRODUCTS);
    }
}
