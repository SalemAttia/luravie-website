import React from 'react';
import { ProductClient } from './ProductClient';
import { PRODUCTS } from '@/data';
import { getWooProductBySlug, getWooProducts } from '@/lib/woocommerce';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { localePath, localizedAlternates, stripHtml, truncate, getSiteUrl } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

const categoryKeywords: Record<string, { en: string[]; ar: string[] }> = {
    bra: {
        en: ["women's bra Egypt", 'seamless bra', 'everyday bra', 'comfortable bra', 'buy bra online Egypt'],
        ar: ['سوتيان نسائي', 'سوتيان سيملس', 'سوتيان يومي', 'سوتيان مريح', 'شراء سوتيان اون لاين مصر'],
    },
    pants: {
        en: ["women's panties Egypt", 'cotton briefs', 'everyday panties', 'comfortable underwear women'],
        ar: ['كلوت نسائي', 'كلوت قطن', 'ملابس داخلية نسائية مريحة', 'كلوت يومي'],
    },
    lingerie: {
        en: ['lingerie set Egypt', 'silk lingerie', "women's lingerie", 'affordable lingerie Egypt'],
        ar: ['طقم لانجيري', 'لانجيري حرير', 'لانجيري نسائي', 'لانجيري بسعر مناسب مصر'],
    },
    socks: {
        en: ["women's socks Egypt", 'ankle socks women', 'comfortable socks'],
        ar: ['شرابات نسائية', 'شرابات قصيرة نسائية', 'شرابات مريحة'],
    },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const isAr = locale === 'ar';
    let product = await getWooProductBySlug(slug);

    if (!product) {
        product = PRODUCTS.find(p => p.slug === slug) || null;
    }

    if (!product) return { title: isAr ? 'المنتج غير موجود' : 'Product Not Found' };

    const productName = isAr && product.nameAr ? product.nameAr : product.name;
    const productDesc = isAr && product.descriptionAr ? product.descriptionAr : product.description;
    const description = truncate(stripHtml(productDesc), 160);
    const canonical = localePath(locale, `/product/${slug}`);

    const category = product.category?.toLowerCase() || '';
    const catKeywords = categoryKeywords[category];
    const keywords = [
        'Luravie', 'لورافي', productName,
        ...(catKeywords ? (isAr ? catKeywords.ar : catKeywords.en) : []),
        ...(isAr
            ? ['ملابس داخلية نسائية مصر', 'الدفع عند الاستلام', 'شحن مجاني']
            : ["women's underwear Egypt", 'cash on delivery', 'free shipping Egypt']
        ),
    ];

    return {
        title: isAr
            ? `${productName} – اشتري أونلاين من لورافي`
            : `${productName} – Buy Online at Luravie`,
        description,
        keywords,
        alternates: {
            canonical,
            ...localizedAlternates(`/product/${slug}`),
        },
        openGraph: {
            title: productName,
            description,
            url: canonical,
            images: [product.image],
        },
        twitter: {
            card: 'summary_large_image',
            title: productName,
            description,
            images: [product.image],
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params;
    const t = await getTranslations({ locale, namespace: 'product' });
    const siteUrl = getSiteUrl();

    let [product, allProducts] = await Promise.all([
        getWooProductBySlug(slug),
        getWooProducts(),
    ]);

    if (!product) {
        product = PRODUCTS.find(p => p.slug === slug) || null;
    }

    if (allProducts.length === 0) {
        allProducts = PRODUCTS;
    }

    if (!product) {
        return (
            <div className="py-20 text-center">
                <p>{t('notFound')}</p>
                <a href={`/${locale}/shop`} className="text-coral font-bold mt-4 inline-block">{t('backToShop')}</a>
            </div>
        );
    }

    const relatedProducts = allProducts.filter(p => p.id !== product!.id).slice(0, 4);

    const localizedName = locale === 'ar' && product.nameAr ? product.nameAr : product.name;
    const localizedDesc = locale === 'ar' && product.descriptionAr ? product.descriptionAr : product.description;

    const isInStock = !product.outOfStock;
    const isLowStock = isInStock && product.stockQuantity != null && product.stockQuantity > 0 && product.stockQuantity <= 10;
    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: localizedName,
        description: stripHtml(localizedDesc),
        image: product.image,
        brand: {
            '@type': 'Brand',
            name: 'Luravie',
        },
        category: product.category || undefined,
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'EGP',
            availability: !isInStock
                ? 'https://schema.org/OutOfStock'
                : isLowStock
                    ? 'https://schema.org/LimitedAvailability'
                    : 'https://schema.org/InStock',
            url: `${siteUrl}/${locale}/product/${slug}`,
            seller: {
                '@type': 'Organization',
                name: 'Luravie',
            },
            shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingDestination: {
                    '@type': 'DefinedRegion',
                    addressCountry: 'EG',
                },
                deliveryTime: {
                    '@type': 'ShippingDeliveryTime',
                    handlingTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 1,
                        maxValue: 2,
                        unitCode: 'DAY',
                    },
                    transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 1,
                        maxValue: 4,
                        unitCode: 'DAY',
                    },
                },
            },
        },
    };

    const localizedHome = locale === 'ar' ? 'الرئيسية' : 'Home';
    const localizedShop = locale === 'ar' ? 'المتجر' : 'Shop';
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: localizedHome,
                item: `${siteUrl}/${locale}`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: localizedShop,
                item: `${siteUrl}/${locale}/shop`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: localizedName,
                item: `${siteUrl}/${locale}/product/${slug}`,
            },
        ],
    };

    return (
        <>
            <JsonLd data={productJsonLd} />
            <JsonLd data={breadcrumbJsonLd} />
            <ProductClient product={product} relatedProducts={relatedProducts} />
        </>
    );
}
