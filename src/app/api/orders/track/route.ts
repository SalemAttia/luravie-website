import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from "@sentry/nextjs";

const WOO_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;
const WOO_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WOO_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('order_id');
    const phone = searchParams.get('phone');

    if (!orderId && !phone) {
        return NextResponse.json({ error: 'Please provide an order ID or phone number' }, { status: 400 });
    }

    if (!WOO_URL || !WOO_KEY || !WOO_SECRET) {
        return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    try {
        const auth = Buffer.from(`${WOO_KEY}:${WOO_SECRET}`).toString('base64');
        const headers = { 'Authorization': `Basic ${auth}` };

        let orders: any[] = [];

        if (orderId) {
            // Look up by order ID
            const response = await fetch(`${WOO_URL}/wp-json/wc/v3/orders/${orderId}`, {
                headers,
                cache: 'no-store',
            });

            if (response.ok) {
                const order = await response.json();
                orders = [order];
            } else if (response.status === 404) {
                return NextResponse.json({ error: 'Order not found', orders: [] }, { status: 404 });
            } else {
                throw new Error(`WooCommerce API error: ${response.status}`);
            }
        } else if (phone) {
            // Look up by phone number - search in billing phone
            const response = await fetch(
                `${WOO_URL}/wp-json/wc/v3/orders?search=${encodeURIComponent(phone)}&per_page=20&orderby=date&order=desc`,
                { headers, cache: 'no-store' }
            );

            if (!response.ok) {
                throw new Error(`WooCommerce API error: ${response.status}`);
            }

            const allOrders = await response.json();
            // Filter to only orders matching the phone number in billing
            orders = allOrders.filter((o: any) =>
                o.billing?.phone?.replace(/\s/g, '') === phone.replace(/\s/g, '')
            );
        }

        // Return sanitized order data (don't expose sensitive details)
        const sanitizedOrders = orders.map((o: any) => ({
            id: o.id,
            number: o.number,
            status: o.status,
            date_created: o.date_created,
            total: o.total,
            currency: o.currency,
            line_items: o.line_items?.map((item: any) => ({
                name: item.name,
                quantity: item.quantity,
                total: item.total,
                image: item.image?.src,
            })),
            shipping: {
                city: o.shipping?.city,
            },
        }));

        return NextResponse.json({ orders: sanitizedOrders });
    } catch (error: any) {
        Sentry.captureException(error, {
            tags: { route: "api/orders/track", flow: "order-tracking" },
        });
        console.error('Order tracking API error:', error);
        return NextResponse.json({ error: 'Failed to look up order' }, { status: 500 });
    }
}
