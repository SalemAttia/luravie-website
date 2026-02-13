import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Luravie',
        short_name: 'Luravie',
        description: "Shop the latest in bras, lingerie, and more at Luravie. High-quality women's fashion designed for confidence.",
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
