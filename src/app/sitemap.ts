import { MetadataRoute } from 'next';
import { getWooProducts } from '@/lib/woocommerce';
import { routing } from '@/i18n/routing';
import { getSiteUrl } from '@/lib/seo';

// Page priority map: home > shop > about/contact > policies
const pagePriority: Record<string, number> = {
    '': 1.0,
    '/shop': 0.9,
    '/about': 0.7,
    '/contact': 0.7,
    '/policy': 0.5,
    '/refund': 0.5,
    '/shipping': 0.6,
};

// Page change frequency map
const pageFrequency: Record<string, 'daily' | 'weekly' | 'monthly'> = {
    '': 'weekly',
    '/shop': 'daily',
    '/about': 'monthly',
    '/contact': 'monthly',
    '/policy': 'monthly',
    '/refund': 'monthly',
    '/shipping': 'monthly',
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = getSiteUrl();
    const products = await getWooProducts();
    const locales = routing.locales;
    const staticPages = ['', '/shop', '/about', '/contact', '/policy', '/refund', '/shipping'];

    const routes = locales.flatMap((locale) =>
        staticPages.map((page) => ({
            url: `${baseUrl}/${locale}${page}`,
            lastModified: new Date(),
            changeFrequency: pageFrequency[page] ?? ('weekly' as const),
            priority: pagePriority[page] ?? 0.8,
            alternates: {
                languages: Object.fromEntries(
                    locales.map((l) => [l, `${baseUrl}/${l}${page}`])
                ),
            },
        }))
    );

    const productRoutes = locales.flatMap((locale) =>
        products.map((product) => ({
            url: `${baseUrl}/${locale}/product/${product.slug || product.id}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
            alternates: {
                languages: Object.fromEntries(
                    locales.map((l) => [l, `${baseUrl}/${l}/product/${product.slug || product.id}`])
                ),
            },
        }))
    );

    return [...routes, ...productRoutes];
}
