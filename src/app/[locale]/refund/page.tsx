"use client";

import React from 'react';
import { Eye, Ban, AlertCircle, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function RefundPage() {
    const t = useTranslations('refundPage');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const sections = [
        {
            icon: <Eye size={20} />,
            title: t('sections.inspection.title'),
            text: t('sections.inspection.text')
        },
        {
            icon: <Ban size={20} />,
            title: t('sections.noReturn.title'),
            text: t('sections.noReturn.text')
        },
        {
            icon: <AlertCircle size={20} />,
            title: t('sections.defects.title'),
            text: t('sections.defects.text')
        }
    ];

    return (
        <div className={`py-12 px-4 max-w-4xl mx-auto ${locale === 'ar' ? 'text-right' : 'text-left'}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-teal">{t('title')}</h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-teal/5 mb-12 text-lg text-gray-700 leading-relaxed font-medium"
            >
                {t('intro')}
            </motion.div>

            <div className="grid gap-8 mb-12">
                {sections.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: locale === 'en' ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-8 rounded-3xl shadow-sm border border-teal/5 relative overflow-hidden group hover:shadow-md transition-all"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-teal group-hover:scale-110 transition-transform duration-700">
                            {React.cloneElement(section.icon as React.ReactElement, { size: 120 })}
                        </div>
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-12 h-12 bg-teal/10 rounded-2xl flex items-center justify-center text-teal">
                                {section.icon}
                            </div>
                            <h2 className="text-xl font-bold text-teal">{section.title}</h2>
                        </div>
                        <div className="text-gray-600 leading-relaxed relative z-10">
                            {section.text}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center bg-teal/5 p-8 rounded-3xl border border-teal/10"
            >
                <div className="space-y-4">
                    <p>{t('outro.text')}</p>
                    <p className="font-bold text-teal">{t('outro.tagline')}</p>
                </div>
            </motion.div>
        </div>
    );
}
