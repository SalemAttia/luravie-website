"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/navbar';
import { CartDrawer } from '@/components/cart-drawer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Instagram, Facebook } from 'lucide-react';
import logoImg from "@/assets/9fa13cb21775809b44829beac6f211643ef2d854.png";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { cartCount, favorites, cartItems, updateQuantity, removeFromCart } = useApp();
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Helper for navigation that mimics react-router-dom's navigate
    const navigate = (path: string) => {
        router.push(path);
    };

    return (
        <div className="min-h-screen font-sans bg-background text-foreground flex flex-col">
            <Navbar
                cartCount={cartCount}
                favoritesCount={favorites.length}
                onCartClick={() => setIsCartOpen(true)}
                onFavoritesClick={() => navigate('/shop?category=Favorites')}
                onCategoryClick={(cat) => navigate(`/shop?category=${cat}`)}
                onSearch={(q) => navigate(`/shop?search=${q}`)}
                searchQuery=""
                onNavigate={(p) => navigate(p === 'home' ? '/' : `/${p}`)}
                currentPage={pathname === '/' ? 'home' : pathname.substring(1)}
            />

            <main className="flex-grow">
                <AnimatePresence mode="wait">
                    {children}
                </AnimatePresence>
            </main>

            <footer className="bg-teal text-white/90 pt-20 pb-10 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-6">
                            <button onClick={() => navigate('/')} className="cursor-pointer">
                                <ImageWithFallback src={logoImg} alt="Luravie" className="h-14 w-auto brightness-0 invert" />
                            </button>
                            <p className="text-sm text-rose/80">Your Confidence Starts Within.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-rose mb-6 text-xs uppercase tracking-widest">Shop</h4>
                            <ul className="space-y-4 text-sm">
                                <li><button onClick={() => navigate('/shop')} className="hover:text-coral transition-colors cursor-pointer text-left">All Products</button></li>
                                <li><button onClick={() => navigate('/shop?category=Bra')} className="hover:text-coral transition-colors cursor-pointer text-left">Bras</button></li>
                                <li><button onClick={() => navigate('/shop?category=Lingerie')} className="hover:text-coral transition-colors cursor-pointer text-left">Lingerie</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-rose mb-6 text-xs uppercase tracking-widest">Support</h4>
                            <ul className="space-y-4 text-sm">
                                <li><button onClick={() => navigate('/policy')} className="hover:text-coral transition-colors cursor-pointer text-left">Shipping & Returns</button></li>
                                <li><button onClick={() => navigate('/contact')} className="hover:text-coral transition-colors cursor-pointer text-left">Contact Us</button></li>
                                <li><button onClick={() => navigate('/about')} className="hover:text-coral transition-colors cursor-pointer text-left">Our Story</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-rose mb-6 text-xs uppercase tracking-widest">Stay Connected</h4>
                            <div className="flex gap-4">
                                <Instagram className="cursor-pointer hover:text-coral transition-colors" />
                                <Facebook className="cursor-pointer hover:text-coral transition-colors" />
                            </div>
                        </div>
                    </div>
                    <div className="pt-10 border-t border-white/10 text-xs text-rose/60 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p>© 2026 Luravie. All rights reserved.</p>
                        <div className="flex gap-8">
                            <span>Cash on Delivery Only</span>
                            <span>Discreet Shipping</span>
                        </div>
                    </div>
                </div>
            </footer>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onCheckout={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                }}
            />
            <WhatsAppButton />
        </div>
    );
};
