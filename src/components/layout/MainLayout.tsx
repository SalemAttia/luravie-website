"use client";

import React, { useState } from 'react';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/navbar';
import { CartDrawer } from '@/components/cart-drawer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Instagram, Facebook } from 'lucide-react';
import logoImg from "@/assets/9fa13cb21775809b44829beac6f211643ef2d854.png";
import { useTranslations, useLocale } from 'next-intl';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const tCommon = useTranslations('common');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const { cartCount, favorites, cartItems, updateQuantity, removeFromCart } = useApp();
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="min-h-screen font-sans bg-background text-foreground flex flex-col" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <Navbar
                cartCount={cartCount}
                favoritesCount={favorites.length}
                onCartClick={() => setIsCartOpen(true)}
                onFavoritesClick={() => router.push('/shop?category=Favorites' as any)}
                currentPage={pathname === '/' ? 'home' : pathname.substring(1)}
            />

            <main className="flex-grow">
                {children}
            </main>

            <footer className="bg-teal text-white/90 pt-20 pb-10 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-6">
                            <Link href="/">
                                <ImageWithFallback src={logoImg} alt={tCommon('brandName')} width={56} height={56} className="h-14 w-auto brightness-0 invert" />
                            </Link>
                            <p className="text-sm text-rose/80">{tCommon('description')}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-rose mb-6 text-xs uppercase tracking-widest">{tCommon('shop')}</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link href="/shop" className="hover:text-coral transition-colors">{tCommon('allProducts')}</Link></li>
                                <li><Link href="/shop?category=Bra" className="hover:text-coral transition-colors">{tCommon('categories.bra')}</Link></li>
                                <li><Link href="/shop?category=Lingerie" className="hover:text-coral transition-colors">{tCommon('categories.lingerie')}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-rose mb-6 text-xs uppercase tracking-widest">{tCommon('support')}</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link href="/policy" className="hover:text-coral transition-colors">{tCommon('policy')}</Link></li>
                                <li><Link href="/refund" className="hover:text-coral transition-colors">{tCommon('refundPolicy')}</Link></li>
                                <li><Link href="/shipping" className="hover:text-coral transition-colors">{tCommon('shippingPolicy')}</Link></li>
                                <li><Link href="/contact" className="hover:text-coral transition-colors">{tCommon('contact')}</Link></li>
                                <li><Link href="/about" className="hover:text-coral transition-colors">{tCommon('about')}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-rose mb-6 text-xs uppercase tracking-widest">{tCommon('stayConnected')}</h4>
                            <div className="flex gap-4">
                                <a href="https://www.instagram.com/luravie" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <Instagram className="cursor-pointer hover:text-coral transition-colors" />
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=61587971859017" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <Facebook className="cursor-pointer hover:text-coral transition-colors" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="pt-10 border-t border-white/10 text-xs text-rose/60 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p>{tCommon('copyright')} {tCommon('allRightsReserved')}</p>
                        <div className="flex gap-8">
                            <span>{tCommon('cod')}</span>
                            <span>{tCommon('discreetShipping')}</span>
                        </div>
                    </div>
                </div>
            </footer >

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onCheckout={() => {
                    setIsCartOpen(false);
                    router.push('/checkout' as any);
                }}
            />
            <WhatsAppButton />
        </div >
    );
};
