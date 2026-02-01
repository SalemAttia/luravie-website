"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';

export default function SuccessPage() {
    const t = useTranslations('checkout.success');
    const locale = useLocale();
    const router = useRouter();
    const orderNumber = Math.floor(Math.random() * 900000) + 100000;

    const navigate = (path: string) => {
        router.push(path as any);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-20" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full text-center"
            >
                <div className="mb-10 relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1
                        }}
                        className="w-24 h-24 bg-teal rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-teal/30 z-10 relative"
                    >
                        <CheckCircle2 className="text-white" size={48} />
                    </motion.div>

                    {/* Decorative elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-teal/5 rounded-full blur-3xl -z-0" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-coral/5 rounded-full blur-3xl -z-0" />
                </div>

                <h1 className="text-4xl font-bold text-teal mb-4">{t('title')}</h1>
                <p className="text-teal/60 mb-8 leading-relaxed">
                    {t('subtitle')}
                </p>

                <div className="bg-white rounded-3xl p-8 shadow-xl shadow-teal/5 border border-teal/5 mb-10">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">{t('orderNumber')}</p>
                    <p className="text-3xl font-mono font-bold text-teal">#{orderNumber}</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/shop')}
                        className={`w-full py-4 bg-teal text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal/20 cursor-pointer hover:bg-teal/90 transition-all ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                    >
                        {t('backToShop')}
                        <ShoppingBag size={20} />
                    </button>

                    <div className={`flex items-center justify-center gap-3 text-xs text-muted-foreground font-bold ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <ShieldCheck size={16} className="text-teal" />
                        <span>{locale === 'ar' ? 'سيصلك طلبك في غضون 2-4 أيام عمل' : 'Delivery expected in 2-4 business days'}</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
