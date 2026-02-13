import { MetadataRoute } from 'next';
import { getWooProducts } from '@/lib/woocommerce';
import { routing } from '@/i18n/routing';
import { getSiteUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = getSiteUrl();
    const products = await getWooProducts();
    const locales = routing.locales;
    const staticPages = ['', '/shop', '/about', '/contact', '/policy', '/refund', '/shipping'];

    const routes = locales.flatMap((locale) =>
        staticPages.map((page) => ({
            url: `${baseUrl}/${locale}${page}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: page === '' ? 1 : 0.8,
            alternates: {
                languages: Object.fromEntries(
                    locales.map((l) => [l, `${baseUrl}/${l}${page}`])
                ),
            },
        }))
    );

    const productRoutes = locales.flatMap((locale) =>
        products.map((product) => ({
            url: `${baseUrl}/${locale}/product/${product.id}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.6,
            alternates: {
                languages: Object.fromEntries(
                    locales.map((l) => [l, `${baseUrl}/${l}/product/${product.id}`])
                ),
            },
        }))
    );

    return [...routes, ...productRoutes];
}
