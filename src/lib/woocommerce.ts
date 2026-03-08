import { Product, ProductVariation } from '@/data';
import * as Sentry from "@sentry/nextjs";

const WOO_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;
const WOO_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WOO_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

const getMeta = (p: any, key: string): string | undefined =>
    p.meta_data?.find((m: any) => m.key === key)?.value || undefined;

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
            next: { revalidate: 300 }
        });

        if (!response.ok) {
            Sentry.captureMessage(`WooCommerce API error: ${response.status} ${response.statusText}`, {
                level: "warning",
                tags: { service: "woocommerce", operation: "getProducts" },
                extra: { status: response.status, statusText: response.statusText },
            });
            console.error(`WooCommerce API error: ${response.status} ${response.statusText}`);
            return [];
        }

        const wooProducts = await response.json();

        return wooProducts.map((p: any) => {
            const findAttr = (name: string) => p.attributes?.find((a: any) => {
                const n = (a.name || '').toLowerCase();
                const s = (a.slug || '').toLowerCase();

                if (name === 'size') {
                    const sizeNames = ['size', 'sizes', 'المقاس', 'مقاس', 'الأحجام', 'حجم', 'sizing', 'length'];
                    return sizeNames.some(sn => n.includes(sn)) || s.includes('size');
                }
                if (name === 'color') {
                    const colorNames = ['color', 'colors', 'اللون', 'لون', 'الألوان', 'shade', 'finish'];
                    return colorNames.some(cn => n.includes(cn)) || s.includes('color');
                }
                return n.includes(name.toLowerCase());
            });

            return {
                id: p.id.toString(),
                slug: p.slug,
                name: p.name,
                price: parseFloat(p.price || p.regular_price || '0'),
                category: mapCategory(p.categories[0]?.name),
                image: p.images[0]?.src || '/placeholder-product.svg',
                description: p.short_description || p.description,
                features: findAttr('feature')?.options || [],
                materials: findAttr('material')?.options[0] || '',
                sizes: findAttr('size')?.options || p.tags?.filter((t: any) =>
                    ['S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44'].includes(t.name.toUpperCase())
                ).map((t: any) => t.name) || [],
                colors: (findAttr('color')?.options.map((c: string) => {
                    if (c.includes('|')) {
                        const [name, hex] = c.split('|');
                        return { name: name.trim(), hex: hex.trim() };
                    }
                    return {
                        name: c,
                        hex: mapColorToHex(c)
                    };
                }) || p.tags?.filter((t: any) =>
                    ['Black', 'Nude', 'Teal', 'Coral', 'Rose', 'White', 'Grey', 'Red', 'Blue', 'Green', 'Pink', 'Purple', 'Navy', 'Burgundy', 'Wine', 'Charcoal', 'Ivory', 'Cream', 'Beige', 'Champagne', 'Blush', 'Hot Pink', 'Lavender', 'Lilac', 'Plum', 'Emerald', 'Olive', 'Sage', 'Matcha', 'Royal Blue', 'Sky Blue', 'Light Blue', 'Light Green', 'Light Grey', 'Dark Red', 'Multicolor', 'Floral', 'Leopard Print', 'Lace', 'Skin (Nude)', 'أسود', 'بيج', 'تيل', 'وردي', 'أبيض', 'كورال', 'رمادي'].some(cn => t.name.includes(cn))
                ).map((t: any) => ({
                    name: t.name,
                    hex: mapColorToHex(t.name)
                }))) || [],
                images: p.images?.map((img: any) => img.src) || [],
                outOfStock: p.stock_status === 'outofstock',
                stockQuantity: p.stock_quantity ?? null,
                nameAr: getMeta(p, 'title_ar'),
                descriptionAr: getMeta(p, 'description_ar'),
                productType: p.type || 'simple',
            };
        });
    } catch (error) {
        Sentry.captureException(error, {
            tags: { service: "woocommerce", operation: "getProducts" },
        });
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

        const findAttr = (name: string) => p.attributes?.find((a: any) => {
            const n = (a.name || '').toLowerCase();
            const s = (a.slug || '').toLowerCase();

            if (name === 'size') {
                const sizeNames = ['size', 'sizes', 'المقاس', 'مقاس', 'الأحجام', 'حجم', 'sizing', 'length'];
                return sizeNames.some(sn => n.includes(sn)) || s.includes('size');
            }
            if (name === 'color') {
                const colorNames = ['color', 'colors', 'اللون', 'لون', 'الألوان', 'shade', 'finish'];
                return colorNames.some(cn => n.includes(cn)) || s.includes('color');
            }
            return n.includes(name.toLowerCase());
        });

        const product: Product = {
            id: p.id.toString(),
            slug: p.slug,
            name: p.name,
            price: parseFloat(p.price || p.regular_price || '0'),
            category: mapCategory(p.categories[0]?.name),
            image: p.images[0]?.src || '/placeholder-product.svg',
            description: p.short_description || p.description,
            features: findAttr('feature')?.options || [],
            materials: findAttr('material')?.options[0] || '',
            sizes: findAttr('size')?.options || p.tags?.filter((t: any) =>
                ['S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44'].includes(t.name.toUpperCase())
            ).map((t: any) => t.name) || [],
            colors: (findAttr('color')?.options.map((c: string) => {
                if (c.includes('|')) {
                    const [name, hex] = c.split('|');
                    return { name: name.trim(), hex: hex.trim() };
                }
                return {
                    name: c,
                    hex: mapColorToHex(c)
                };
            }) || p.tags?.filter((t: any) =>
                ['Black', 'Nude', 'Teal', 'Coral', 'Rose', 'White', 'Grey', 'Red', 'Blue', 'Green', 'Pink', 'Purple', 'Navy', 'Burgundy', 'Wine', 'Charcoal', 'Ivory', 'Cream', 'Beige', 'Champagne', 'Blush', 'Hot Pink', 'Lavender', 'Lilac', 'Plum', 'Emerald', 'Olive', 'Sage', 'Matcha', 'Royal Blue', 'Sky Blue', 'Light Blue', 'Light Green', 'Light Grey', 'Dark Red', 'Multicolor', 'Floral', 'Leopard Print', 'Lace', 'Skin (Nude)', 'أسود', 'بيج', 'تيل', 'وردي', 'أبيض', 'كورال', 'رمادي'].some(cn => t.name.includes(cn))
            ).map((t: any) => ({
                name: t.name,
                hex: mapColorToHex(t.name)
            }))) || [],
            images: p.images?.map((img: any) => img.src) || [],
            outOfStock: p.stock_status === 'outofstock',
            stockQuantity: p.stock_quantity ?? null,
            nameAr: getMeta(p, 'title_ar'),
            descriptionAr: getMeta(p, 'description_ar'),
            productType: p.type || 'simple',
        };

        if (p.type === 'variable') {
            product.variations = await getWooProductVariations(p.id.toString());
        }

        return product;
    } catch (error) {
        Sentry.captureException(error, {
            tags: { service: "woocommerce", operation: "getProductById" },
            extra: { productId: id },
        });
        console.error(`Error fetching WooCommerce product ${id}:`, error);
        return null;
    }
}

export async function getWooProductBySlug(slug: string): Promise<Product | null> {
    if (!WOO_URL || !WOO_KEY || !WOO_SECRET) return null;

    try {
        const auth = Buffer.from(`${WOO_KEY}:${WOO_SECRET}`).toString('base64');
        const response = await fetch(`${WOO_URL}/wp-json/wc/v3/products?slug=${encodeURIComponent(slug)}`, {
            headers: {
                'Authorization': `Basic ${auth}`,
            },
            next: { revalidate: 60 }
        });

        if (!response.ok) return null;

        const products = await response.json();
        if (!products.length) return null;

        const p = products[0];

        const findAttr = (name: string) => p.attributes?.find((a: any) => {
            const n = (a.name || '').toLowerCase();
            const s = (a.slug || '').toLowerCase();

            if (name === 'size') {
                const sizeNames = ['size', 'sizes', 'المقاس', 'مقاس', 'الأحجام', 'حجم', 'sizing', 'length'];
                return sizeNames.some(sn => n.includes(sn)) || s.includes('size');
            }
            if (name === 'color') {
                const colorNames = ['color', 'colors', 'اللون', 'لون', 'الألوان', 'shade', 'finish'];
                return colorNames.some(cn => n.includes(cn)) || s.includes('color');
            }
            return n.includes(name.toLowerCase());
        });

        const product: Product = {
            id: p.id.toString(),
            slug: p.slug,
            name: p.name,
            price: parseFloat(p.price || p.regular_price || '0'),
            category: mapCategory(p.categories[0]?.name),
            image: p.images[0]?.src || '/placeholder-product.svg',
            description: p.short_description || p.description,
            features: findAttr('feature')?.options || [],
            materials: findAttr('material')?.options[0] || '',
            sizes: findAttr('size')?.options || p.tags?.filter((t: any) =>
                ['S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44'].includes(t.name.toUpperCase())
            ).map((t: any) => t.name) || [],
            colors: (findAttr('color')?.options.map((c: string) => {
                if (c.includes('|')) {
                    const [name, hex] = c.split('|');
                    return { name: name.trim(), hex: hex.trim() };
                }
                return { name: c, hex: mapColorToHex(c) };
            }) || p.tags?.filter((t: any) =>
                ['Black', 'Nude', 'Teal', 'Coral', 'Rose', 'White', 'Grey', 'Red', 'Blue', 'Green', 'Pink', 'Purple', 'Navy', 'Burgundy', 'Wine', 'Charcoal', 'Ivory', 'Cream', 'Beige', 'Champagne', 'Blush', 'Hot Pink', 'Lavender', 'Lilac', 'Plum', 'Emerald', 'Olive', 'Sage', 'Matcha', 'Royal Blue', 'Sky Blue', 'Light Blue', 'Light Green', 'Light Grey', 'Dark Red', 'Multicolor', 'Floral', 'Leopard Print', 'Lace', 'Skin (Nude)', 'أسود', 'بيج', 'تيل', 'وردي', 'أبيض', 'كورال', 'رمادي'].some(cn => t.name.includes(cn))
            ).map((t: any) => ({ name: t.name, hex: mapColorToHex(t.name) }))) || [],
            images: p.images?.map((img: any) => img.src) || [],
            outOfStock: p.stock_status === 'outofstock',
            stockQuantity: p.stock_quantity ?? null,
            nameAr: getMeta(p, 'title_ar'),
            descriptionAr: getMeta(p, 'description_ar'),
            productType: p.type || 'simple',
        };

        if (p.type === 'variable') {
            product.variations = await getWooProductVariations(p.id.toString());
        }

        return product;
    } catch (error) {
        Sentry.captureException(error, {
            tags: { service: "woocommerce", operation: "getProductBySlug" },
            extra: { slug },
        });
        console.error(`Error fetching WooCommerce product by slug "${slug}":`, error);
        return null;
    }
}

export async function getWooProductVariations(productId: string): Promise<ProductVariation[]> {
    if (!WOO_URL || !WOO_KEY || !WOO_SECRET) return [];

    try {
        const auth = Buffer.from(`${WOO_KEY}:${WOO_SECRET}`).toString('base64');
        const response = await fetch(
            `${WOO_URL}/wp-json/wc/v3/products/${productId}/variations?per_page=100`,
            {
                headers: { 'Authorization': `Basic ${auth}` },
                next: { revalidate: 60 }
            }
        );

        if (!response.ok) return [];

        const variations = await response.json();

        return variations.map((v: any) => {
            const attrs: { size?: string; color?: string } = {};
            for (const attr of v.attributes || []) {
                const name = (attr.name || '').toLowerCase();
                const slug = (attr.slug || '').toLowerCase();
                const sizeNames = ['size', 'sizes', 'المقاس', 'مقاس', 'الأحجام', 'حجم', 'sizing', 'length'];
                const colorNames = ['color', 'colors', 'اللون', 'لون', 'الألوان', 'shade', 'finish'];

                if (sizeNames.some(sn => name.includes(sn)) || slug.includes('size')) {
                    attrs.size = attr.option;
                }
                if (colorNames.some(cn => name.includes(cn)) || slug.includes('color')) {
                    const option = attr.option || '';
                    attrs.color = option.includes('|') ? option.split('|')[0].trim() : option;
                }
            }

            return {
                variationId: v.id,
                attributes: attrs,
                stockStatus: v.stock_status || 'instock',
                stockQuantity: v.stock_quantity ?? null,
                price: v.price ? parseFloat(v.price) : undefined,
                image: v.image?.src || undefined,
            };
        });
    } catch (error) {
        Sentry.captureException(error, {
            tags: { service: "woocommerce", operation: "getProductVariations" },
            extra: { productId },
        });
        console.error(`Error fetching variations for product ${productId}:`, error);
        return [];
    }
}

export async function createWooOrder(orderData: any): Promise<any> {
    if (!WOO_URL || !WOO_KEY || !WOO_SECRET) {
        const error = new Error('WooCommerce credentials not found');
        Sentry.captureException(error, {
            tags: { service: "woocommerce", operation: "createOrder" },
            level: "fatal",
        });
        throw error;
    }

    Sentry.addBreadcrumb({
        category: "woocommerce",
        message: "Creating WooCommerce order",
        level: "info",
        data: {
            itemCount: orderData.line_items?.length,
            paymentMethod: orderData.payment_method,
        },
    });

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
        const errorData = await response.json();
        const orderError = new Error(`WooCommerce API error: ${errorData.message || response.statusText}`);
        Sentry.captureException(orderError, {
            tags: { service: "woocommerce", operation: "createOrder" },
            extra: { status: response.status, wooError: errorData.message },
        });
        throw orderError;
    }

    return await response.json();
}

export interface ShippingInfo {
    method: string;
    cost: number;
}

const DEFAULT_SHIPPING: ShippingInfo = { method: 'Standard', cost: 75 };

export async function getShippingCost(): Promise<ShippingInfo> {
    if (!WOO_URL || !WOO_KEY || !WOO_SECRET) return DEFAULT_SHIPPING;

    try {
        const auth = Buffer.from(`${WOO_KEY}:${WOO_SECRET}`).toString('base64');
        const headers = { 'Authorization': `Basic ${auth}` };

        const zonesRes = await fetch(`${WOO_URL}/wp-json/wc/v3/shipping/zones`, {
            headers,
            next: { revalidate: 3600 },
        });
        if (!zonesRes.ok) return DEFAULT_SHIPPING;

        const zones = await zonesRes.json();

        for (const zone of zones) {
            const methodsRes = await fetch(`${WOO_URL}/wp-json/wc/v3/shipping/zones/${zone.id}/methods`, {
                headers,
                next: { revalidate: 3600 },
            });
            if (!methodsRes.ok) continue;

            const methods = await methodsRes.json();
            const flatRate = methods.find((m: any) => m.method_id === 'flat_rate' && m.enabled);
            if (flatRate) {
                return {
                    method: flatRate.title || 'Standard',
                    cost: parseFloat(flatRate.settings?.cost?.value || '0') || DEFAULT_SHIPPING.cost,
                };
            }
        }

        return DEFAULT_SHIPPING;
    } catch (error) {
        Sentry.captureException(error, {
            tags: { service: 'woocommerce', operation: 'getShippingCost' },
        });
        return DEFAULT_SHIPPING;
    }
}

function mapCategory(name: string): Product['category'] {
    const n = name?.toLowerCase();
    if (n?.includes('bra')) return 'Bra';
    if (n?.includes('pants') || n?.includes('panties') || n?.includes('briefs')) return 'Panties';
    if (n?.includes('lingerie')) return 'Lingerie';
    if (n?.includes('socks')) return 'Socks';
    return 'Bra'; // Default
}

function mapColorToHex(color: string): string {
    const colors: Record<string, string> = {
        // Blacks & Greys
        'black': '#1A1A1A',
        'midnight black': '#1A1A1A',
        'aswad': '#1A1A1A',
        'أسود': '#1A1A1A',
        'charcoal': '#36454F',
        'gray': '#808080',
        'grey': '#808080',
        'رمادي': '#808080',
        'light-grey': '#D3D3D3',
        'light grey': '#D3D3D3',
        // Whites & Neutrals
        'white': '#FFFFFF',
        'أبيض': '#FFFFFF',
        'ivory': '#FFFFF0',
        'cream': '#FFFDD0',
        'champagne': '#F7E7CE',
        'beige': '#F5F5DC',
        'nude': '#E3C5AF',
        'soft nude': '#E3C5AF',
        'بيج': '#E3C5AF',
        'skin-nude': '#E3C5AF',
        'skin (nude)': '#E3C5AF',
        'lace': '#FDF5E6',
        // Pinks & Reds
        'pink': '#FFC0CB',
        'hot-pink': '#FF69B4',
        'hot pink': '#FF69B4',
        'blush': '#DE5D83',
        'rose': '#FCE4E4',
        'pearl rose': '#FCE4E4',
        'وردي': '#FCE4E4',
        'coral': '#E59595',
        'soft coral': '#E59595',
        'كورال': '#E59595',
        'red': '#DC143C',
        'dark-red': '#8B0000',
        'dark red': '#8B0000',
        'wine': '#722F37',
        'burgundy': '#800020',
        // Purples
        'purple': '#800080',
        'plum': '#8E4585',
        'lavender': '#E6E6FA',
        'lilac': '#C8A2C8',
        // Blues
        'blue': '#4169E1',
        'royal-blue': '#4169E1',
        'royal blue': '#4169E1',
        'sky-blue': '#87CEEB',
        'sky blue': '#87CEEB',
        'light-blue': '#ADD8E6',
        'light blue': '#ADD8E6',
        'navy': '#000080',
        'teal': '#5B7B7C',
        'luravie teal': '#5B7B7C',
        'تيل': '#5B7B7C',
        // Greens
        'green': '#228B22',
        'light-green': '#90EE90',
        'light green': '#90EE90',
        'emerald': '#50C878',
        'sage': '#BCB88A',
        'olive': '#808000',
        'matcha': '#B5C98E',
        // Patterns & Multi
        'multicolor': '#FF6B6B',
        'floral': '#FFB7C5',
        'leopard-print': '#C8A951',
        'leopard print': '#C8A951',
    };
    return colors[color.toLowerCase()] || color;
}
