"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingBag, Search, Trash2, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface SavedOrder {
    id: number;
    date: string;
    total: number;
    status: string;
    items: {
        name: string;
        nameAr?: string;
        quantity: number;
        price: number;
        image: string;
        selectedSize?: string;
        selectedColor?: { name: string; hex: string };
    }[];
    phone: string;
}

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; colorClass: string }> = {
    pending: { icon: <Clock size={16} />, colorClass: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
    processing: { icon: <Package size={16} />, colorClass: 'text-blue-600 bg-blue-50 border-blue-200' },
    'on-hold': { icon: <Clock size={16} />, colorClass: 'text-orange-600 bg-orange-50 border-orange-200' },
    completed: { icon: <CheckCircle2 size={16} />, colorClass: 'text-green-600 bg-green-50 border-green-200' },
    cancelled: { icon: <AlertCircle size={16} />, colorClass: 'text-red-600 bg-red-50 border-red-200' },
    shipped: { icon: <Truck size={16} />, colorClass: 'text-teal bg-teal/5 border-teal/20' },
};

export default function OrdersClient() {
    const t = useTranslations('orders');
    const tCommon = useTranslations('common');
    const locale = useLocale();
    const [orders, setOrders] = useState<SavedOrder[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('luravie-orders');
        if (saved) {
            try {
                setOrders(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse orders from localStorage', e);
            }
        }
        setIsMounted(true);
    }, []);

    const clearOrders = () => {
        setOrders([]);
        localStorage.removeItem('luravie-orders');
    };

    const getStatusConfig = (status: string) => {
        return STATUS_CONFIG[status] || STATUS_CONFIG.processing;
    };

    const getStatusLabel = (status: string) => {
        return t(`statuses.${status}`, { defaultValue: status });
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-[80vh] max-w-2xl mx-auto px-4 py-16" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="text-teal" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-teal mb-3">{t('title')}</h1>
                    <p className="text-teal/60">{t('subtitle')}</p>
                </div>

                {orders.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="mx-auto text-teal/20 mb-4" size={48} />
                        <p className="text-teal/60 font-bold mb-2">{t('noOrders')}</p>
                        <p className="text-teal/40 text-sm mb-8">{t('noOrdersSub')}</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/shop"
                                className={`px-6 py-3 bg-teal text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal/20 hover:bg-teal/90 transition-all ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                            >
                                <ShoppingBag size={18} />
                                {t('startShopping')}
                            </Link>
                            <Link
                                href="/track-order"
                                className={`px-6 py-3 bg-white text-teal border border-teal/20 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-teal/5 transition-all ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                            >
                                <Search size={18} />
                                {t('trackExisting')}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={`flex items-center justify-between mb-6 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <p className="text-sm text-muted-foreground font-bold">
                                {t('orderCount', { count: orders.length })}
                            </p>
                            <div className={`flex gap-2 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <Link
                                    href="/track-order"
                                    className={`text-xs font-bold text-teal hover:text-teal/80 flex items-center gap-1 transition-colors ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                                >
                                    <Search size={14} />
                                    {t('trackOrder')}
                                </Link>
                                <button
                                    onClick={clearOrders}
                                    className={`text-xs font-bold text-coral/60 hover:text-coral flex items-center gap-1 transition-colors cursor-pointer ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                                >
                                    <Trash2 size={14} />
                                    {t('clearAll')}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {orders.map((order, index) => {
                                const statusConfig = getStatusConfig(order.status);
                                return (
                                    <motion.div
                                        key={`${order.id}-${index}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white rounded-2xl p-5 shadow-sm border border-teal/5"
                                    >
                                        <div className={`flex items-center justify-between mb-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                            <div>
                                                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{t('order')} #{order.id}</p>
                                                <p className="text-xs text-teal/40 mt-0.5">
                                                    {new Date(order.date).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
                                                        year: 'numeric', month: 'long', day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${statusConfig.colorClass} ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                                {statusConfig.icon}
                                                {getStatusLabel(order.status)}
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-3">
                                            {order.items.map((item, idx) => {
                                                const itemName = locale === 'ar' && item.nameAr ? item.nameAr : item.name;
                                                return (
                                                    <div key={idx} className={`flex items-center gap-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-blush flex-shrink-0">
                                                            <ImageWithFallback src={item.image} alt={itemName} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className={`flex-1 min-w-0 ${locale === 'ar' ? 'text-right' : ''}`}>
                                                            <p className="text-sm font-medium text-gray-700 truncate">{itemName}</p>
                                                            <div className={`flex items-center gap-2 text-xs text-muted-foreground ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                                                <span>x{item.quantity}</span>
                                                                {item.selectedSize && <span className="bg-teal/5 text-teal px-1.5 py-0.5 rounded-full">{item.selectedSize}</span>}
                                                                {item.selectedColor && (
                                                                    <div className={`flex items-center gap-1 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                                                        <div className="w-2 h-2 rounded-full border border-black/5" style={{ backgroundColor: item.selectedColor.hex }} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="text-sm font-bold text-teal">{(item.price * item.quantity).toFixed(0)} {tCommon('currency')}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className={`flex items-center justify-between pt-3 border-t border-teal/5 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                            <span className="text-xs font-bold text-muted-foreground uppercase">{t('total')}</span>
                                            <span className="font-bold text-teal">{order.total.toFixed(0)} {tCommon('currency')}</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
}
