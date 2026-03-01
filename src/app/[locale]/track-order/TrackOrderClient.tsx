"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, AlertCircle, Phone, Hash } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { getStatusConfig } from '@/lib/order-status';

interface TrackedOrder {
    id: number;
    number: string;
    status: string;
    date_created: string;
    total: string;
    shipping_total: string;
    currency: string;
    line_items: {
        name: string;
        quantity: number;
        total: string;
        subtotal: string;
        price: number;
        image?: string;
    }[];
    shipping: {
        city: string;
    };
}

export default function TrackOrderClient() {
    const t = useTranslations('trackOrder');
    const locale = useLocale();
    const [searchType, setSearchType] = useState<'order_id' | 'phone'>('order_id');
    const [searchValue, setSearchValue] = useState('');
    const [orders, setOrders] = useState<TrackedOrder[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchValue.trim()) return;

        setIsLoading(true);
        setError(null);
        setHasSearched(true);

        try {
            const param = searchType === 'order_id' ? `order_id=${searchValue.trim()}` : `phone=${searchValue.trim()}`;
            const response = await fetch(`/api/orders/track?${param}`);
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 404) {
                    setOrders([]);
                } else {
                    throw new Error(data.error || 'Failed to look up order');
                }
            } else {
                setOrders(data.orders || []);
            }
        } catch (err: any) {
            setError(err.message);
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusLabel = (status: string) => {
        return t(`statuses.${status}`, { defaultValue: status });
    };

    return (
        <div className="min-h-[80vh] max-w-2xl mx-auto px-4 py-16" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="text-teal" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-teal mb-3">{t('title')}</h1>
                    <p className="text-teal/60">{t('subtitle')}</p>
                </div>

                {/* Search Type Toggle */}
                <div className="flex gap-2 mb-6 bg-blush p-1 rounded-2xl">
                    <button
                        onClick={() => { setSearchType('order_id'); setSearchValue(''); setHasSearched(false); }}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${searchType === 'order_id' ? 'bg-teal text-white shadow-lg' : 'text-teal/60 hover:text-teal'} ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                    >
                        <Hash size={16} />
                        {t('byOrderId')}
                    </button>
                    <button
                        onClick={() => { setSearchType('phone'); setSearchValue(''); setHasSearched(false); }}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${searchType === 'phone' ? 'bg-teal text-white shadow-lg' : 'text-teal/60 hover:text-teal'} ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                    >
                        <Phone size={16} />
                        {t('byPhone')}
                    </button>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-10">
                    <div className="flex gap-3">
                        <input
                            type={searchType === 'phone' ? 'tel' : 'text'}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={searchType === 'order_id' ? t('orderIdPlaceholder') : t('phonePlaceholder')}
                            className={`flex-1 p-4 bg-white border border-teal/10 rounded-2xl focus:ring-2 ring-teal/20 outline-none transition-all ${locale === 'ar' ? 'text-right' : ''}`}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !searchValue.trim()}
                            className={`px-6 py-4 bg-teal text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-teal/20 hover:bg-teal/90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                            ) : (
                                <Search size={20} />
                            )}
                            {t('search')}
                        </button>
                    </div>
                </form>

                {/* Error */}
                {error && (
                    <div className={`mb-6 p-4 bg-coral/10 border border-coral/20 rounded-2xl text-coral text-sm font-medium flex items-center gap-2 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {/* Results */}
                {hasSearched && !isLoading && !error && orders.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                        <Package className="mx-auto text-teal/20 mb-4" size={48} />
                        <p className="text-teal/60 font-bold">{t('noOrders')}</p>
                        <p className="text-teal/40 text-sm mt-2">{t('noOrdersSub')}</p>
                    </motion.div>
                )}

                {orders.length > 0 && (
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const statusConfig = getStatusConfig(order.status);
                            const currencyLabel = order.currency === 'EGP' ? (locale === 'ar' ? 'ج.م' : 'EGP') : order.currency;
                            return (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-3xl p-6 shadow-sm border border-teal/5"
                                >
                                    <div className={`flex items-center justify-between mb-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('orderNumber')}</p>
                                            <p className="text-xl font-mono font-bold text-teal">#{order.id}</p>
                                        </div>
                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-sm ${statusConfig.colorClass} ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                            {statusConfig.icon}
                                            {getStatusLabel(order.status)}
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-4 text-sm text-muted-foreground mb-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                        <span>{new Date(order.date_created).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        <span className="w-1 h-1 bg-teal/20 rounded-full" />
                                        <span className="font-bold text-teal">{order.total} {currencyLabel}</span>
                                    </div>

                                    {order.line_items && order.line_items.length > 0 && (
                                        <div className="space-y-3 pt-4 border-t border-teal/5">
                                            {order.line_items.map((item, idx) => {
                                                const itemTotal = parseFloat(item.total) || parseFloat(item.subtotal) || (item.price * item.quantity) || 0;
                                                return (
                                                    <div key={idx} className={`flex items-center justify-between text-sm ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                                        <span className="text-gray-700">{item.name} x{item.quantity}</span>
                                                        <span className="font-bold text-teal">{itemTotal.toFixed(0)} {currencyLabel}</span>
                                                    </div>
                                                );
                                            })}
                                            {parseFloat(order.shipping_total) > 0 && (
                                                <div className={`flex items-center justify-between text-sm ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                                    <span className="text-gray-700">{t('shipping')}</span>
                                                    <span className="font-bold text-teal">{parseFloat(order.shipping_total).toFixed(0)} {currencyLabel}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
