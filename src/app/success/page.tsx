"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CheckCircle, Truck, Package, MessageCircle } from 'lucide-react';

export default function SuccessPage() {
    const router = useRouter();

    const onContinue = () => {
        router.push('/');
    };

    return (
        <div className="py-20 px-4 min-h-[80vh] flex items-center justify-center">
            <div className="max-w-xl w-full text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                    className="w-24 h-24 bg-coral/10 rounded-full flex items-center justify-center text-coral mx-auto mb-10"
                >
                    <CheckCircle size={48} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl font-bold text-teal mb-6"
                >
                    Thank you for your order
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-teal/60 text-lg mb-12 leading-relaxed"
                >
                    We've received your order and we're already preparing it for you.
                    You'll receive a confirmation WhatsApp message shortly with your order details.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
                >
                    <div className="bg-blush p-6 rounded-[2rem] text-left border border-teal/5">
                        <Truck className="text-coral mb-4" size={24} />
                        <h3 className="font-bold text-teal mb-1">Fast Delivery</h3>
                        <p className="text-xs text-teal/50 leading-relaxed">Delivered to your door in Cairo within 2-4 business days.</p>
                    </div>
                    <div className="bg-blush p-6 rounded-[2rem] text-left border border-teal/5">
                        <Package className="text-coral mb-4" size={24} />
                        <h3 className="font-bold text-teal mb-1">Discreet Packaging</h3>
                        <p className="text-xs text-teal/50 leading-relaxed">Your order will arrive in a plain, unmarked package for your privacy.</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-6"
                >
                    <button
                        onClick={onContinue}
                        className="w-full py-5 bg-teal text-white rounded-2xl font-bold text-lg shadow-xl shadow-teal/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                        Continue Shopping
                    </button>
                    <a
                        href="https://wa.me/201234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-teal font-bold hover:text-coral transition-colors"
                    >
                        <MessageCircle size={18} />
                        Need help? Chat with us on WhatsApp
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
