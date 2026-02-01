"use client";

import React, { useState } from 'react';
import { Shield, Truck, RefreshCw, Lock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PolicyPage() {
    const [lang, setLang] = useState<'en' | 'ar'>('en');

    const content = {
        en: {
            title: "Shipping & Privacy Policy",
            sections: [
                {
                    icon: <Lock size={20} />,
                    title: "Privacy & Discreet Packaging",
                    text: "Your privacy is our top priority. All orders are shipped in 100% discreet, plain packaging without any mention of the contents or the brand name on the outer label. We use secure servers to protect your personal information."
                },
                {
                    icon: <Truck size={20} />,
                    title: "Shipping & Delivery",
                    text: "We offer fast and reliable shipping. Most orders are processed within 24 hours and delivered within 2-4 business days. You will receive a tracking number as soon as your order is dispatched."
                },
                {
                    icon: <RefreshCw size={20} />,
                    title: "Exclusively COD",
                    text: "Luravie currently exclusively accepts Cash on Delivery (COD). This ensures you only pay when you have the product in your hands. You have the right to inspect the package upon delivery before making the payment. If you are not satisfied with the product at the moment of delivery, you can return it with the courier without any charges."
                }
            ]
        },
        ar: {
            title: "سياسة الشحن والخصوصية",
            sections: [
                {
                    icon: <Lock size={20} />,
                    title: "الخصوصية والتغليف السري",
                    text: "خصوصيتك هي أولويتنا القصوى. يتم شحن جميع الطلبات في عبوات سرية وبسيطة بنسبة 100٪ دون أي ذكر للمحتويات أو اسم العلامة التجارية على الملصق الخارجي. نحن نستخدم خوادم آمنة لحماية معلوماتك الشخصية."
                },
                {
                    icon: <Truck size={20} />,
                    title: "الشحن والتوصيل",
                    text: "نحن نقدم شحنًا سريعًا وموثوقًا. تتم معالجة معظم الطلبات في غضون 24 ساعة ويتم توصيلها في غضون 2-4 أيام عمل. ستتلقى رقم تتبع بمجرد إرسال طلبك."
                },
                {
                    icon: <RefreshCw size={20} />,
                    title: "المعاينه والدفع عند الاستلام",
                    text: "نحن نقدم خدمة الدفع عند الاستلام (COD). لديك الحق في فحص الطرد عند التسليم قبل إجراء الدفع. إذا لم تكن راضيًا عن المنتج في لحظة التسليم ، يمكنك إعادته مع المندوب."
                }
            ]
        }
    };

    const current = content[lang];

    return (
        <div className={`py-12 px-4 max-w-4xl mx-auto ${lang === 'ar' ? 'text-right' : 'text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-3xl font-bold text-teal">{current.title}</h1>
                <button
                    onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-sm font-medium border border-teal/10"
                >
                    <Globe size={16} />
                    {lang === 'en' ? 'العربية' : 'English'}
                </button>
            </div>

            <div className="grid gap-8">
                {current.sections.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: lang === 'en' ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-8 rounded-3xl shadow-sm border border-teal/5 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-teal">
                            {React.cloneElement(section.icon as React.ReactElement, { size: 120 })}
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center text-teal">
                                {section.icon}
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed relative z-10">
                            {section.text}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
