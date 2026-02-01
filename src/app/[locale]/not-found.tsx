"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    const router = useRouter();

    const navigate = (path: string) => {
        router.push(path);
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="w-24 h-24 bg-blush rounded-full flex items-center justify-center text-coral mx-auto mb-6">
                        <ShoppingBag size={48} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-8xl font-black text-teal/10 mb-[-2rem]">404</h1>
                    <h2 className="text-4xl font-bold text-teal mb-4 relative z-10">Oops! Page not found</h2>
                    <p className="text-teal/60 text-lg leading-relaxed">
                        The essentials you're looking for might have moved or doesn't exist anymore.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-teal text-white rounded-2xl font-bold shadow-lg shadow-teal/20 hover:scale-105 transition-all cursor-pointer"
                    >
                        <Home size={18} />
                        Back to Home
                    </button>
                    <button
                        onClick={() => navigate('/shop')}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-blush text-teal rounded-2xl font-bold border border-teal/5 hover:bg-white transition-all cursor-pointer"
                    >
                        <ArrowLeft size={18} />
                        Explore Shop
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
