"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function ContactPage() {
    const t = useTranslations('contact');
    const locale = useLocale();

    const contactItems = [
        {
            icon: <Mail size={24} />,
            title: t('emailUs'),
            subtitle: t('emailSubtitle'),
            link: "mailto:support@luravie.com",
            linkText: "support@luravie.com"
        },
        {
            icon: <MessageCircle size={24} />,
            title: t('whatsapp'),
            subtitle: t('whatsappSubtitle'),
            link: "https://wa.me/201234567890",
            linkText: "+20 123 456 7890"
        },
        {
            icon: <Clock size={24} />,
            title: t('hours'),
            subtitle: t('saturdayThursday'),
            detail: t('time')
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20"
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <span className="text-xs font-bold text-coral uppercase tracking-[0.3em] mb-4 block">{t('getInTouch')}</span>
                    <h1 className="text-5xl font-bold text-teal mb-6">{t('title')}</h1>
                    <p className="text-teal/60 text-lg max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-10">
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-teal/5 space-y-12">
                            {contactItems.map((item, i) => (
                                <div key={i} className={`flex gap-6 ${locale === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                                    <div className="w-14 h-14 bg-blush rounded-2xl flex items-center justify-center text-coral flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-teal text-xl mb-1">{item.title}</h3>
                                        <p className="text-teal/60 mb-3">{item.subtitle}</p>
                                        {item.link ? (
                                            <a href={item.link} className="text-coral font-bold hover:underline">{item.linkText}</a>
                                        ) : (
                                            <p className="text-teal font-medium">{item.detail}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-teal text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
                            <h3 className={`text-2xl font-bold mb-4 ${locale === 'ar' ? 'text-right' : ''}`}>{t('onlineOnly')}</h3>
                            <p className={`text-white/70 leading-relaxed mb-8 ${locale === 'ar' ? 'text-right' : ''}`}>
                                {t('onlineOnlyText')}
                            </p>
                            <div className={`flex items-center gap-3 text-coral ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <MapPin size={20} />
                                <span className="font-bold">{t('location')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[3rem] shadow-lg border border-teal/5">
                        <h3 className={`text-3xl font-bold text-teal mb-8 ${locale === 'ar' ? 'text-right' : ''}`}>{t('sendMessage')}</h3>
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert(t('successMessage')); }}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className={`text-xs font-bold text-teal uppercase tracking-widest ml-1 ${locale === 'ar' ? 'mr-1 block text-right' : ''}`}>{t('fullName')}</label>
                                    <input
                                        type="text"
                                        placeholder={t('placeholderName')}
                                        className={`w-full px-6 py-4 bg-blush border border-teal/5 rounded-2xl focus:outline-none focus:ring-2 ring-coral/50 transition-all ${locale === 'ar' ? 'text-right' : ''}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-xs font-bold text-teal uppercase tracking-widest ml-1 ${locale === 'ar' ? 'mr-1 block text-right' : ''}`}>{t('email')}</label>
                                    <input
                                        type="email"
                                        placeholder={t('placeholderEmail')}
                                        className={`w-full px-6 py-4 bg-blush border border-teal/5 rounded-2xl focus:outline-none focus:ring-2 ring-coral/50 transition-all ${locale === 'ar' ? 'text-right' : ''}`}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className={`text-xs font-bold text-teal uppercase tracking-widest ml-1 ${locale === 'ar' ? 'mr-1 block text-right' : ''}`}>{t('subject')}</label>
                                <select className={`w-full px-6 py-4 bg-blush border border-teal/5 rounded-2xl focus:outline-none focus:ring-2 ring-coral/50 transition-all appearance-none ${locale === 'ar' ? 'text-right' : ''}`}>
                                    <option>{t('orderSupport')}</option>
                                    <option>{t('sizeGuide')}</option>
                                    <option>{t('wholesale')}</option>
                                    <option>{t('feedback')}</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className={`text-xs font-bold text-teal uppercase tracking-widest ml-1 ${locale === 'ar' ? 'mr-1 block text-right' : ''}`}>{t('message')}</label>
                                <textarea
                                    rows={5}
                                    placeholder={t('placeholderMessage')}
                                    className={`w-full px-6 py-4 bg-blush border border-teal/5 rounded-2xl focus:outline-none focus:ring-2 ring-coral/50 transition-all resize-none ${locale === 'ar' ? 'text-right' : ''}`}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-5 bg-coral text-white rounded-2xl font-bold text-lg shadow-lg shadow-coral/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                            >
                                {t('send')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
