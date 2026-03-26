import { NextRequest, NextResponse } from 'next/server';
import { createWooOrder, getWooStockInfo } from '@/lib/woocommerce';
import * as Sentry from "@sentry/nextjs";

export async function POST(req: NextRequest) {
    try {
        const orderData = await req.json();

        // Basic validation
        if (!orderData.line_items || orderData.line_items.length === 0) {
            return NextResponse.json({ error: 'Order must contain at least one item' }, { status: 400 });
        }

        // Stock validation: check each line item against real-time WooCommerce stock
        const stockChecks = await Promise.all(
            orderData.line_items.map((item: any) =>
                getWooStockInfo(item.product_id, item.variation_id)
            )
        );

        const stockErrors: string[] = [];
        for (let i = 0; i < orderData.line_items.length; i++) {
            const item = orderData.line_items[i];
            const stock = stockChecks[i];

            if (!stock) continue; // If we can't fetch stock info, let WooCommerce handle it

            if (stock.stockStatus === 'outofstock') {
                stockErrors.push(`"${stock.name}" is out of stock`);
                continue;
            }

            if (stock.stockQuantity !== null && item.quantity > stock.stockQuantity) {
                stockErrors.push(
                    `"${stock.name}" only has ${stock.stockQuantity} in stock (requested ${item.quantity})`
                );
            }
        }

        if (stockErrors.length > 0) {
            return NextResponse.json(
                { error: stockErrors.join('. ') },
                { status: 400 }
            );
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
