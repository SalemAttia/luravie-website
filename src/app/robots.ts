import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/checkout/', '/success/'],
        },
        sitemap: `${getSiteUrl()}/sitemap.xml`,
    };
}
