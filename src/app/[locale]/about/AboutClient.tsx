"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Heart, Shield, Sparkles } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function AboutClient() {
    const t = useTranslations('about');
    const locale = useLocale();

    const features = [
        {
            icon: <Shield className="text-coral" />,
            title: t('qualityTitle'),
            text: t('qualityText')
        },
        {
            icon: <Heart className="text-coral" />,
            title: t('confTitle'),
            text: t('confText')
        },
        {
            icon: <Sparkles className="text-coral" />,
            title: t('aestheticTitle'),
            text: t('aestheticText')
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-20"
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-teal/5 z-0" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-bold text-coral uppercase tracking-[0.3em] mb-4 block"
                    >
                        {t('ourStory')}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-teal mb-8"
                    >
                        {t('title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-teal/70 leading-relaxed"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-20 items-center ${locale === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1886&auto=format&fit=crop"
                                alt="Brand philosophy"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className={`absolute -bottom-10 ${locale === 'ar' ? '-left-10' : '-right-10'} w-48 h-48 bg-blush rounded-full flex items-center justify-center p-8 border-8 border-white shadow-xl`}>
                            <p className="text-teal font-bold text-center leading-tight">{t('cottonComfort')}</p>
                        </div>
                    </div>
                    <div className="space-y-10">
                        <h2 className={`text-4xl font-bold text-teal ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('modernWoman')}</h2>
                        <div className="space-y-8">
                            {features.map((item, i) => (
                                <div key={i} className={`flex gap-6 ${locale === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                                    <div className="flex-shrink-0 w-12 h-12 bg-blush rounded-2xl flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-teal text-lg mb-2">{item.title}</h3>
                                        <p className="text-teal/60 leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}

