import { NextRequest, NextResponse } from 'next/server';
import { createWooOrder } from '@/lib/woocommerce';
import * as Sentry from "@sentry/nextjs";

export async function POST(req: NextRequest) {
    try {
        const orderData = await req.json();

        // Basic validation
        if (!orderData.line_items || orderData.line_items.length === 0) {
            return NextResponse.json({ error: 'Order must contain at least one item' }, { status: 400 });
        }

        Sentry.addBreadcrumb({
            category: "order",
            message: `Creating order with ${orderData.line_items.length} item(s)`,
            level: "info",
        });

        const order = await createWooOrder(orderData);
        return NextResponse.json(order, { status: 201 });
    } catch (error: any) {
        Sentry.captureException(error, {
            tags: { route: "api/orders", flow: "checkout" },
        });
        console.error('Order creation API error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
