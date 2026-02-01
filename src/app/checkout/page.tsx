"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, CreditCard, ChevronRight, Package, Info, ChevronLeft, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Product } from '@/data';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useApp } from '@/context/AppContext';

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
    const { cartItems, clearCart } = useApp();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<ShippingFormData>();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const navigate = (path: string) => {
        router.push(path);
    };

    const onComplete = () => {
        clearCart();
        navigate('/success');
    };

    const onSubmitShipping = (data: ShippingFormData) => {
        setShippingData(data);
        setStep(2);
    };

    if (cartItems.length === 0) {
        return (
            <div className="py-40 text-center max-w-lg mx-auto px-4">
                <h2 className="text-3xl font-bold text-teal mb-4">Your bag is empty</h2>
                <p className="text-teal/60 mb-8">Add some essentials to your bag before checking out.</p>
                <button
                    onClick={() => navigate('/shop')}
                    className="px-10 py-4 bg-coral text-white rounded-2xl font-bold shadow-lg shadow-coral/20 cursor-pointer"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Checkout Flow */}
                <div className="lg:col-span-7">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
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
                                className="text-sm font-bold text-muted-foreground hover:text-teal flex items-center gap-1 cursor-pointer"
                            >
                                <ChevronLeft size={16} /> Back
                            </button>
                        )}
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-teal/5">
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <Info className="text-teal" />
                                    Shipping Information
                                </h2>
                                <form onSubmit={handleSubmit(onSubmitShipping)}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <div className="space-y-1">
                                            <input
                                                {...register("fullName", { required: "Full name is required" })}
                                                placeholder="Full Name"
                                                className={`w-full p-4 bg-blush border rounded-2xl focus:ring-2 ring-teal/20 outline-none transition-all ${errors.fullName ? 'border-coral/50 bg-coral/5' : 'border-teal/5'
                                                    }`}
                                            />
                                            {errors.fullName && (
                                                <p className="text-xs text-coral font-medium flex items-center gap-1 mt-1 px-1">
                                                    <AlertCircle size={12} /> {errors.fullName.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <input
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address"
                                                    }
                                                })}
                                                placeholder="Email Address"
                                                className={`w-full p-4 bg-blush border rounded-2xl focus:ring-2 ring-teal/20 outline-none transition-all ${errors.email ? 'border-coral/50 bg-coral/5' : 'border-teal/5'
                                                    }`}
                                            />
                                            {errors.email && (
                                                <p className="text-xs text-coral font-medium flex items-center gap-1 mt-1 px-1">
                                                    <AlertCircle size={12} /> {errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <input
                                                {...register("phone", {
                                                    required: "Phone number is required",
                                                    pattern: {
                                                        value: /^(010|011|012|015)[0-9]{8}$/,
                                                        message: "Enter a valid Egyptian mobile number (e.g. 01012345678)"
                                                    }
                                                })}
                                                placeholder="Phone Number (01x...)"
                                                className={`w-full p-4 bg-blush border rounded-2xl focus:ring-2 ring-teal/20 outline-none transition-all ${errors.phone ? 'border-coral/50 bg-coral/5' : 'border-teal/5'
                                                    }`}
                                            />
                                            {errors.phone && (
                                                <p className="text-xs text-coral font-medium flex items-center gap-1 mt-1 px-1">
                                                    <AlertCircle size={12} /> {errors.phone.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <select
                                                {...register("city", { required: "Please select a city" })}
                                                className={`w-full p-4 bg-blush border rounded-2xl focus:ring-2 ring-teal/20 outline-none transition-all appearance-none cursor-pointer ${errors.city ? 'border-coral/50 bg-coral/5' : 'border-teal/5'
                                                    }`}
                                                defaultValue=""
                                            >
                                                <option value="" disabled>Select City</option>
                                                {EGYPTIAN_CITIES.map(city => (
                                                    <option key={city} value={city}>{city}</option>
                                                ))}
                                            </select>
                                            {errors.city && (
                                                <p className="text-xs text-coral font-medium flex items-center gap-1 mt-1 px-1">
                                                    <AlertCircle size={12} /> {errors.city.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-1 md:col-span-2">
                                            <input
                                                {...register("address", { required: "Shipping address is required" })}
                                                placeholder="Full Address (Building, Street, Area)"
                                                className={`w-full p-4 bg-blush border rounded-2xl focus:ring-2 ring-teal/20 outline-none transition-all ${errors.address ? 'border-coral/50 bg-coral/5' : 'border-teal/5'
                                                    }`}
                                            />
                                            {errors.address && (
                                                <p className="text-xs text-coral font-medium flex items-center gap-1 mt-1 px-1">
                                                    <AlertCircle size={12} /> {errors.address.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-teal text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal/20 cursor-pointer hover:bg-teal/90 transition-all"
                                    >
                                        Continue to Shipping <ChevronRight size={20} />
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <Truck className="text-teal" />
                                    Shipping Method
                                </h2>
                                <div className="space-y-4 mb-8">
                                    <div className="p-6 border-2 border-teal bg-teal/5 rounded-2xl flex justify-between items-center">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal shadow-sm">
                                                <Package />
                                            </div>
                                            <div>
                                                <p className="font-bold">Standard Delivery (2-4 Days)</p>
                                                <p className="text-sm text-muted-foreground italic">Discreet packaging included</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-teal">Free</span>
                                    </div>
                                </div>
                                <div className="bg-blush p-4 rounded-2xl mb-8 border border-teal/5">
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">Delivery To:</p>
                                    <p className="text-sm font-medium">{shippingData?.fullName}</p>
                                    <p className="text-sm text-muted-foreground">{shippingData?.address}, {shippingData?.city}</p>
                                </div>
                                <button
                                    onClick={() => setStep(3)}
                                    className="w-full py-4 bg-teal text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal/20 cursor-pointer hover:bg-teal/90 transition-all"
                                >
                                    Confirm Order Details <ChevronRight size={20} />
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <CreditCard className="text-teal" />
                                    Order Confirmation (COD)
                                </h2>
                                <div className="p-6 border-2 border-teal bg-teal/5 rounded-2xl flex justify-between items-center mb-8">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal shadow-sm">
                                            <ShieldCheck />
                                        </div>
                                        <div>
                                            <p className="font-bold">Cash on Delivery (COD)</p>
                                            <p className="text-sm text-muted-foreground">Pay only when you receive and inspect your items</p>
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-4 border-teal flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-teal" />
                                    </div>
                                </div>
                                <div className="bg-rose/30 p-4 rounded-2xl border border-teal/10 mb-8 flex gap-3 text-sm text-gray-700">
                                    <ShieldCheck className="text-teal flex-shrink-0" size={18} />
                                    <p>Luravie currently exclusively accepts Cash on Delivery. This allows you to inspect the quality and fit before completing your purchase at your doorstep.</p>
                                </div>
                                <button
                                    onClick={onComplete}
                                    className="w-full py-4 bg-teal text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-teal/20 cursor-pointer hover:bg-teal/90 transition-all"
                                >
                                    Place Order (COD)
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-5">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-teal/5 sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                        <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-teal/10">
                            {cartItems.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-blush flex-shrink-0">
                                        <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs bg-teal/5 text-teal px-2 py-0.5 rounded-full font-bold">
                                                {item.selectedSize}
                                            </span>
                                            <div className="flex items-center gap-1.5">
                                                <div
                                                    className="w-2.5 h-2.5 rounded-full border border-black/5"
                                                    style={{ backgroundColor: item.selectedColor.hex }}
                                                />
                                                <span className="text-xs text-muted-foreground">{item.selectedColor.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                            <p className="font-bold text-teal">{(item.price * item.quantity).toFixed(0)} EGP</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-6 border-t border-teal/5">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal</span>
                                <span>{subtotal.toFixed(0)} EGP</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Shipping</span>
                                <span className="text-teal font-bold">Free</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-4 border-t border-teal/5">
                                <span>Total</span>
                                <span className="text-teal">{subtotal.toFixed(0)} EGP</span>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-teal/5 rounded-2xl border border-teal/10">
                            <div className="flex items-center gap-3 text-xs text-teal font-bold">
                                <ShieldCheck size={16} />
                                <span>100% Secure & Discreet Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
