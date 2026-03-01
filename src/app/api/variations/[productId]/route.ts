import { getWooProductVariations } from '@/lib/woocommerce';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ productId: string }> }
) {
    const { productId } = await params;
    const variations = await getWooProductVariations(productId);
    return NextResponse.json(variations);
}
