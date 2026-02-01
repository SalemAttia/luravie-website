"use client";

import React, { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, CreditCard, ChevronRight, Package, Info, ChevronLeft, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Product } from '@/data';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useApp } from '@/context/AppContext';
import { useTranslations, useLocale } from 'next-intl';

interface ShippingFormData {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    address: string;
}

const EGYPTIAN_CITIES = [
    "Cairo", "Alexandria", "Giza", "Port Said", "Suez", "Luxor", "Mansoura",
    "Tanta", "Asyut", "Ismailia", "Fayyum", "Zagazig", "Aswan", "Damietta",
    "Damanhur", "Minya", "Beni Suef", "Qena", "Sohag", "Hurghada",
    "6th of October City", "Shibin El Kom", "Banha", "Kafr El Sheikh",
    "Arish", "Mallawi", "10th of Ramadan City", "Bilbais", "Marsa Matruh"
].sort();

export default function CheckoutPage() {
    const t = useTranslations('checkout');
    const locale = useLocale();
    const { cartItems, clearCart } = useApp();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [orderError, setOrderError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<ShippingFormData>();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const navigate = (path: string) => {
        router.push(path as any);
    };

    const onComplete = async () => {
        if (!shippingData) return;

        setIsLoading(true);
        setOrderError(null);

        try {
            const orderData = {
                payment_method: 'cod',
                payment_method_title: 'Cash on Delivery',
                set_paid: false,
                billing: {
                    first_name: shippingData.fullName.split(' ')[0],
                    last_name: shippingData.fullName.split(' ').slice(1).join(' ') || '.',
                    address_1: shippingData.address,
                    city: shippingData.city,
                    country: 'EG',
                    email: shippingData.email,
                    phone: shippingData.phone,
                },
                shipping: {
                    first_name: shippingData.fullName.split(' ')[0],
                    last_name: shippingData.fullName.split(' ').slice(1).join(' ') || '.',
                    address_1: shippingData.address,
                    city: shippingData.city,
                    country: 'EG',
                },
                line_items: cartItems.map(item => ({
                    product_id: parseInt(item.id),
                    quantity: item.quantity,
                    meta_data: [
                        ...(item.selectedSize ? [{ key: 'Size', value: item.selectedSize }] : []),
                        ...(item.selectedColor ? [{ key: 'Color', value: item.selectedColor.name }] : []),
                    ]
                }))
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to create order');
            }

            clearCart();
            navigate('/success');
        } catch (error: any) {
            console.error('Checkout error:', error);
            setOrderError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmitShipping = (data: ShippingFormData) => {
        setShippingData(data);
        setStep(2);
    };

    if (cartItems.length === 0) {
        return (
            <div className="py-40 text-center max-w-lg mx-auto px-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                <h2 className="text-3xl font-bold text-teal mb-4">{t('empty')}</h2>
                <p className="text-teal/60 mb-8">{t('emptySubtitle')}</p>
                <button
                    onClick={() => navigate('/shop')}
                    className="px-10 py-4 bg-coral text-white rounded-2xl font-bold shadow-lg shadow-coral/20 cursor-pointer"
                >
                    {t('startShopping')}
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Checkout Flow */}
                <div className="lg:col-span-7">
                    <div className={`flex items-center justify-between mb-12 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                            {[1, 2, 3].map((s) => (
                                <React.Fragment key={s}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-teal text-white' : 'bg-white border border-teal/10 text-gray-400'
                                        }`}>
                                        {s}
                                    </div>
                                    {s < 3 && <div className={`h-0.5 w-8 rounded ${step > s ? 'bg-teal' : 'bg-teal/10'}`} />}
                                </React.Fragment>
                            ))}
                        </div>
                        {step > 1 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className={`text-sm font-bold text-muted-foreground hover:text-teal flex items-center gap-1 cursor-pointer ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                            >
                                {locale === 'ar' ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                                {t('back')}
                            </button>
                        )}
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-teal/5">
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 className={`text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                    <Info className="text-teal" />
                                    {t('shippingInfo')}
                                </h2>
                                <form onSubmit={handleSubmit(onSubmitShipping)}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <div className="space-y-1">
                                            <input
                                                {...register("fullName", { required: t('errors.name') })}
                                                placeholder={t('fullName')}
                                                className={`w-full p-4 bg-blush border rounded-2xl focus:ring-2 ring-teal/20 outline-none transition-all ${locale === 'ar' ? 'text-right' : ''} ${errors.fullName ? 'border-coral/50 bg-coral/5' : 'border-teal/5'
                                                    }`}
                                            />
                                            {errors.fullName && (
                                                <p className={`text-xs text-coral font-medium flex items-center gap-1 mt-1 px-1 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                                    <AlertCircle size={12} /> {errors.fullName.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <input
                                                {...register("email", {
                                                    required: t('errors.email'),
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: t('errors.invalidEmail')
                                                    }
                                                })}
                                                placeholder={t('email')}
                                                className={`w-full p-4 bg-blush border rounded-2xl focus:ring-2 ring-teal/20 outline-none transition-all ${locale === 'ar' ? 'text-right' : ''} ${errors.email ? 'border-coral/50 bg-coral/5' : 'border-teal/5'
                                                    }`}
                                            />
                                            {errors.email && (
                                                <p className={`text-xs text-coral font-medium flex items-center gap-1 mt-1 px-1 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                                    <AlertCircle size={12} /> {errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <input
                                                {...register("phone", {
                                                    required: t('errors.phone'),
                                                    pattern: {
                                                        value: /^(010|011|012|015)[0-9]{8}$/,
                                                        message: t('errors.invalidPhone')
                                                    }
                                                })}
                                                placeholder={t('phone')}
                                                className={`w-full p-4 bg-blush border rounded-2xl focus:ring-2 ring-teal/20 outline-none transition-all ${locale === 'ar' ? 'text-right' : ''} ${errors.phone ? 'border-coral/50 bg-coral/5' : 'border-teal/5'
                                                    }`}
                                            />
                                            {errors.phone && (
                                                <p className={`text-xs text-coral font-medium flex items-center gap-1 mt-1 px-1 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                                    <AlertCircle size={12} /> {errors.phone.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <select
                                                {...register("city", { required: t('errors.city') })}
                                                className={`w-full p-4 bg-blush border rounded-2xl focus:ring-2 ring-teal/20 outline-none transition-all appearance-none cursor-pointer ${locale === 'ar' ? 'text-right' : ''} ${errors.city ? 'border-coral/50 bg-coral/5' : 'border-teal/5'
                                                    }`}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>{t('city')}</option>
                                                {EGYPTIAN_CITIES.map(city => (
                                                    <option key={city} value={city}>{locale === 'ar' ? t(`cities.${city}`) : city}</option>
                                                ))}
                                            </select>
                                            {errors.city && (
                                                <p className={`text-xs text-coral font-medium flex items-center gap-1 mt-1 px-1 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                                    <AlertCircle size={12} /> {errors.city.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-1 md:col-span-2">
                                            <input
                                                {...register("address", { required: t('errors.address') })}
                                                placeholder={t('address')}
                                                className={`w-full p-4 bg-blush border rounded-2xl focus:ring-2 ring-teal/20 outline-none transition-all ${locale === 'ar' ? 'text-right' : ''} ${errors.address ? 'border-coral/50 bg-coral/5' : 'border-teal/5'
                                                    }`}
                                            />
                                            {errors.address && (
                                                <p className={`text-xs text-coral font-medium flex items-center gap-1 mt-1 px-1 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                                    <AlertCircle size={12} /> {errors.address.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className={`w-full py-4 bg-teal text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal/20 cursor-pointer hover:bg-teal/90 transition-all ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                                    >
                                        {t('continueToShipping')} {locale === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 className={`text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3 ${locale === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                                    <Truck className="text-teal" />
                                    {t('shippingMethod')}
                                </h2>
                                <div className="space-y-4 mb-8">
                                    <div className={`p-6 border-2 border-teal bg-teal/5 rounded-2xl flex justify-between items-center ${locale === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                                        <div className={`flex gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal shadow-sm">
                                                <Package />
                                            </div>
                                            <div>
                                                <p className="font-bold">{t('standardDelivery')}</p>
                                                <p className="text-sm text-muted-foreground italic">{t('discreetPackaging')}</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-teal">{t('free')}</span>
                                    </div>
                                </div>
                                <div className={`bg-blush p-4 rounded-2xl mb-8 border border-teal/5 ${locale === 'ar' ? 'text-right' : ''}`}>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">{t('deliveryTo')}</p>
                                    <p className="font-medium">{shippingData?.fullName}</p>
                                    <p className="text-muted-foreground">{shippingData?.address}, {locale === 'ar' ? t(`cities.${shippingData?.city}`) : shippingData?.city}</p>
                                </div>
                                <button
                                    onClick={() => setStep(3)}
                                    className={`w-full py-4 bg-teal text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal/20 cursor-pointer hover:bg-teal/90 transition-all ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                                >
                                    {t('confirmDetails')} {locale === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 className={`text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3 ${locale === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                                    <CreditCard className="text-teal" />
                                    {t('orderConfirm')}
                                </h2>
                                <div className={`p-6 border-2 border-teal bg-teal/5 rounded-2xl flex justify-between items-center mb-8 ${locale === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                                    <div className={`flex gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal shadow-sm">
                                            <ShieldCheck />
                                        </div>
                                        <div>
                                            <p className="font-bold">{locale === 'ar' ? 'الدفع عند الاستلام (COD)' : 'Cash on Delivery (COD)'}</p>
                                            <p className="text-sm text-muted-foreground">{t('inspectNotice')}</p>
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-4 border-teal flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-teal" />
                                    </div>
                                </div>
                                <div className={`bg-rose/30 p-4 rounded-2xl border border-teal/10 mb-8 flex gap-3 text-sm text-gray-700 ${locale === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                                    <ShieldCheck className="text-teal flex-shrink-0" size={18} />
                                    <p>{t('codNotice')}</p>
                                </div>
                                {orderError && (
                                    <div className="mb-6 p-4 bg-coral/10 border border-coral/20 rounded-2xl text-coral text-sm font-medium flex items-center gap-2">
                                        <AlertCircle size={18} />
                                        {orderError}
                                    </div>
                                )}
                                <button
                                    onClick={onComplete}
                                    disabled={isLoading}
                                    className={`w-full py-4 bg-teal text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-teal/20 cursor-pointer hover:bg-teal/90 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            />
                                            {locale === 'ar' ? 'جاري تنفيذ طلبك...' : 'Processing Order...'}
                                        </>
                                    ) : (
                                        t('placeOrder')
                                    )}
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-5">
                    <div className={`bg-white rounded-3xl p-8 shadow-sm border border-teal/5 sticky top-24 ${locale === 'ar' ? 'text-right' : ''}`}>
                        <h3 className="text-xl font-bold mb-6">{t('summary')}</h3>
                        <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-teal/10">
                            {cartItems.map((item, idx) => (
                                <div key={`${item.id}-${item.selectedSize || idx}-${item.selectedColor?.name || ''}`} className={`flex gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-blush flex-shrink-0">
                                        <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                                        <div className={`flex items-center gap-2 mt-1 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                            {item.selectedSize && (
                                                <span className="text-xs bg-teal/5 text-teal px-2 py-0.5 rounded-full font-bold">
                                                    {item.selectedSize}
                                                </span>
                                            )}
                                            {item.selectedColor && (
                                                <div className={`flex items-center gap-1.5 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                                    <div
                                                        className="w-2.5 h-2.5 rounded-full border border-black/5"
                                                        style={{ backgroundColor: item.selectedColor.hex }}
                                                    />
                                                    <span className="text-xs text-muted-foreground">{item.selectedColor.name}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className={`flex justify-between items-center mt-2 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                            <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'الكمية:' : 'Qty:'} {item.quantity}</p>
                                            <p className="font-bold text-teal">{(item.price * item.quantity).toFixed(0)} {locale === 'ar' ? 'ج.م' : 'EGP'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-6 border-t border-teal/5">
                            <div className={`flex justify-between text-muted-foreground ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <span>{t('subtotal')}</span>
                                <span>{subtotal.toFixed(0)} {locale === 'ar' ? 'ج.م' : 'EGP'}</span>
                            </div>
                            <div className={`flex justify-between text-muted-foreground ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <span>{t('shipping')}</span>
                                <span className="text-teal font-bold">{t('free')}</span>
                            </div>
                            <div className={`flex justify-between text-xl font-bold pt-4 border-t border-teal/5 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <span>{t('total')}</span>
                                <span className="text-teal">{subtotal.toFixed(0)} {locale === 'ar' ? 'ج.م' : 'EGP'}</span>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-teal/5 rounded-2xl border border-teal/10">
                            <div className={`flex items-center gap-3 text-xs text-teal font-bold ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <ShieldCheck size={16} />
                                <span>{t('secure')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
