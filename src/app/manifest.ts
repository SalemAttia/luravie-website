import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Luravie – Women\'s Everyday Essentials',
        short_name: 'Luravie',
        description: "Shop premium women's bras, lingerie, panties & socks at Luravie. Affordable luxury with cash on delivery, discreet packaging & free shipping across Egypt. تسوقي مستلزمات نسائية يومية فاخرة من لورافي.",
        categories: ['shopping', 'lifestyle'],
        lang: 'en',
        dir: 'ltr',
        start_url: '/',
        display: 'standalone',
        background_color: '#FFFFFF',
        theme_color: '#0B5D5E',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
