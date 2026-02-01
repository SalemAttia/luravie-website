import { MetadataRoute } from 'next';
import { getWooProducts } from '@/lib/woocommerce';
import { routing } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://luravie.com';
    const products = await getWooProducts();

    const locales = routing.locales;
    const staticPages = ['', '/shop', '/about', '/contact', '/checkout'];

    const routes = locales.flatMap((locale) =>
        staticPages.map((page) => ({
            url: `${baseUrl}/${locale}${page}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: page === '' ? 1 : 0.8,
        }))
    );

    const productRoutes = locales.flatMap((locale) =>
        products.map((product) => ({
            url: `${baseUrl}/${locale}/product/${product.id}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.6,
        }))
    );

    return [...routes, ...productRoutes];
}
