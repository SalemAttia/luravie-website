"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Home, ShoppingBag } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';

export default function NotFound() {
    const t = useTranslations('notFound');
    const locale = useLocale();
    const router = useRouter();

    return (
        <div
            className="min-h-[75vh] flex items-center justify-center px-4 py-10 sm:py-20 relative overflow-hidden"
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
            {/* Decorative floating elements */}
            <motion.div
                className="absolute top-[15%] left-[10%] w-48 h-48 sm:w-72 sm:h-72 bg-coral/10 rounded-full blur-3xl"
                animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[10%] right-[5%] w-56 h-56 sm:w-80 sm:h-80 bg-teal/5 rounded-full blur-3xl"
                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-[30%] right-[20%] w-20 h-20 sm:w-32 sm:h-32 bg-rose/30 rounded-full blur-2xl"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-lg w-full text-center relative z-10">
                {/* Large 404 number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative mb-2 sm:mb-4"
                >
                    <h1 className="text-[8rem] sm:text-[12rem] font-black leading-none tracking-tight select-none">
                        <span className="text-teal/[0.06]">4</span>
                        <span className="relative">
                            <span className="text-teal/[0.06]">0</span>
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                            >
                                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blush rounded-full flex items-center justify-center shadow-lg border border-coral/10">
                                    <ShoppingBag size={32} strokeWidth={1.5} className="text-coral sm:w-10 sm:h-10" />
                                </div>
                            </motion.div>
                        </span>
                        <span className="text-teal/[0.06]">4</span>
                    </h1>
                </motion.div>

                {/* Heading and description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-8 sm:mb-10"
                >
                    <h2 className="text-2xl sm:text-4xl font-bold text-teal mb-3 sm:mb-4">
                        {t('heading')}
                    </h2>
                    <p className="text-teal/50 text-sm sm:text-lg leading-relaxed max-w-sm mx-auto">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
                >
                    <button
                        onClick={() => router.push('/' as never)}
                        className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-coral text-white rounded-2xl font-bold shadow-lg shadow-coral/20 hover:shadow-xl hover:shadow-coral/30 hover:-translate-y-0.5 transition-all cursor-pointer text-sm sm:text-base"
                    >
                        <Home size={18} />
                        {t('backHome')}
                    </button>
                    <button
                        onClick={() => router.push('/shop' as never)}
                        className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-teal rounded-2xl font-bold border border-teal/10 hover:border-teal/20 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer text-sm sm:text-base"
                    >
                        <ShoppingBag size={18} />
                        {t('exploreShop')}
                    </button>
                </motion.div>

                {/* Subtle brand line */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="mt-10 sm:mt-14 text-xs tracking-[0.25em] uppercase text-teal/25 font-bold"
                >
                    LURAVIE
                </motion.p>
            </div>
        </div>
    );
}
