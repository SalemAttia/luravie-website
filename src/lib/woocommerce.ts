import { Product } from '@/data';

const WOO_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;
const WOO_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WOO_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

export async function getWooProducts(): Promise<Product[]> {
    if (!WOO_URL || !WOO_KEY || !WOO_SECRET) {
        console.warn('WooCommerce credentials not found. Using fallback data.');
        return []; // Return empty or fallback to static data
    }

    try {
        const auth = Buffer.from(`${WOO_KEY}:${WOO_SECRET}`).toString('base64');
        const response = await fetch(`${WOO_URL}/wp-json/wc/v3/products?per_page=100`, {
            headers: {
                'Authorization': `Basic ${auth}`,
            },
            next: { revalidate: 60 } // Reduced to 1 minute for easier debugging
        });

        if (!response.ok) {
            console.error(`WooCommerce API error: ${response.status} ${response.statusText}`);
            return [];
        }

        const wooProducts = await response.json();
        console.log(wooProducts.filter(p => p.attributes.length > 0));

        return wooProducts.map((p: any) => {
            const findAttr = (name: string) => p.attributes?.find((a: any) =>
                a.name.toLowerCase() === name.toLowerCase() ||
                a.name.toLowerCase() === `${name.toLowerCase()}s`
            );

            return {
                id: p.id.toString(),
                name: p.name,
                price: parseFloat(p.price || p.regular_price || '0'),
                category: mapCategory(p.categories[0]?.name),
                image: p.images[0]?.src || 'https://via.placeholder.com/600x800?text=No+Image',
                description: p.short_description || p.description,
                features: findAttr('feature')?.options || [],
                materials: findAttr('material')?.options[0] || '',
                sizes: findAttr('size')?.options || [],
                colors: findAttr('color')?.options.map((c: string) => {
                    if (c.includes('|')) {
                        const [name, hex] = c.split('|');
                        return { name: name.trim(), hex: hex.trim() };
                    }
                    return {
                        name: c,
                        hex: mapColorToHex(c)
                    };
                }) || [],
                images: p.images?.map((img: any) => img.src) || [],
            };
        });
    } catch (error) {
        console.error('Error fetching WooCommerce products:', error);
        return [];
    }
}

export async function getWooProductById(id: string): Promise<Product | null> {
    if (!WOO_URL || !WOO_KEY || !WOO_SECRET) return null;

    try {
        const auth = Buffer.from(`${WOO_KEY}:${WOO_SECRET}`).toString('base64');
        const response = await fetch(`${WOO_URL}/wp-json/wc/v3/products/${id}`, {
            headers: {
                'Authorization': `Basic ${auth}`,
            },
            next: { revalidate: 60 }
        });

        if (!response.ok) return null;

        const p = await response.json();

        const findAttr = (name: string) => p.attributes?.find((a: any) =>
            a.name.toLowerCase() === name.toLowerCase() ||
            a.name.toLowerCase() === `${name.toLowerCase()}s`
        );

        return {
            id: p.id.toString(),
            name: p.name,
            price: parseFloat(p.price || p.regular_price || '0'),
            category: mapCategory(p.categories[0]?.name),
            image: p.images[0]?.src || 'https://via.placeholder.com/600x800?text=No+Image',
            description: p.short_description || p.description,
            features: findAttr('feature')?.options || [],
            materials: findAttr('material')?.options[0] || '',
            sizes: findAttr('size')?.options || [],
            colors: findAttr('color')?.options.map((c: string) => {
                if (c.includes('|')) {
                    const [name, hex] = c.split('|');
                    return { name: name.trim(), hex: hex.trim() };
                }
                return {
                    name: c,
                    hex: mapColorToHex(c)
                };
            }) || [],
            images: p.images?.map((img: any) => img.src) || [],
        };
    } catch (error) {
        console.error(`Error fetching WooCommerce product ${id}:`, error);
        return null;
    }
}

export async function createWooOrder(orderData: any): Promise<any> {
    if (!WOO_URL || !WOO_KEY || !WOO_SECRET) {
        throw new Error('WooCommerce credentials not found');
    }

    const auth = Buffer.from(`${WOO_KEY}:${WOO_SECRET}`).toString('base64');
    const response = await fetch(`${WOO_URL}/wp-json/wc/v3/orders`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`WooCommerce API error: ${error.message || response.statusText}`);
    }

    return await response.json();
}

function mapCategory(name: string): Product['category'] {
    const n = name?.toLowerCase();
    if (n?.includes('bra')) return 'Bra';
    if (n?.includes('pants') || n?.includes('briefs')) return 'Pants';
    if (n?.includes('lingerie')) return 'Lingerie';
    if (n?.includes('socks')) return 'Socks';
    return 'Bra'; // Default
}

function mapColorToHex(color: string): string {
    const colors: Record<string, string> = {
        'Black': '#1A1A1A',
        'Midnight Black': '#1A1A1A',
        'Nude': '#E3C5AF',
        'Soft Nude': '#E3C5AF',
        'Teal': '#5B7B7C',
        'Luravie Teal': '#5B7B7C',
        'Coral': '#E59595',
        'Soft Coral': '#E59595',
        'Rose': '#FCE4E4',
        'Pearl Rose': '#FCE4E4',
    };
    return colors[color] || '#000000';
}
