"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';

export default function ContactPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <span className="text-xs font-bold text-coral uppercase tracking-[0.3em] mb-4 block">Get In Touch</span>
                    <h1 className="text-5xl font-bold text-teal mb-6">We're Here to Help</h1>
                    <p className="text-teal/60 text-lg max-w-2xl mx-auto">
                        Have a question about our sizes, materials, or your order?
                        Our dedicated team is ready to assist you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-10">
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-teal/5 space-y-12">
                            <div className="flex gap-6">
                                <div className="w-14 h-14 bg-blush rounded-2xl flex items-center justify-center text-coral flex-shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-teal text-xl mb-1">Email Us</h3>
                                    <p className="text-teal/60 mb-3">For all inquiries and support</p>
                                    <a href="mailto:support@luravie.com" className="text-coral font-bold hover:underline">support@luravie.com</a>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-14 h-14 bg-blush rounded-2xl flex items-center justify-center text-coral flex-shrink-0">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-teal text-xl mb-1">WhatsApp</h3>
                                    <p className="text-teal/60 mb-3">Live chat support (Sat-Thu, 10am-8pm)</p>
                                    <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer" className="text-coral font-bold hover:underline">+20 123 456 7890</a>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-14 h-14 bg-blush rounded-2xl flex items-center justify-center text-coral flex-shrink-0">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-teal text-xl mb-1">Business Hours</h3>
                                    <p className="text-teal/60">Saturday - Thursday</p>
                                    <p className="text-teal font-medium">10:00 AM - 08:00 PM (EET)</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-teal text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
                            <h3 className="text-2xl font-bold mb-4">Online Only Business</h3>
                            <p className="text-white/70 leading-relaxed mb-8">
                                Luravie operates exclusively online to provide you with the best prices and
                                discreet direct-to-door delivery. We do not have a physical showroom,
                                but we offer a flexible return-at-delivery policy via our courier.
                            </p>
                            <div className="flex items-center gap-3 text-coral">
                                <MapPin size={20} />
                                <span className="font-bold">Cairo, Egypt</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[3rem] shadow-lg border border-teal/5">
                        <h3 className="text-3xl font-bold text-teal mb-8">Send us a Message</h3>
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent! We will get back to you soon.'); }}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-teal uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Jane Doe"
                                        className="w-full px-6 py-4 bg-blush border border-teal/5 rounded-2xl focus:outline-none focus:ring-2 ring-coral/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-teal uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="jane@example.com"
                                        className="w-full px-6 py-4 bg-blush border border-teal/5 rounded-2xl focus:outline-none focus:ring-2 ring-coral/50 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-teal uppercase tracking-widest ml-1">Subject</label>
                                <select className="w-full px-6 py-4 bg-blush border border-teal/5 rounded-2xl focus:outline-none focus:ring-2 ring-coral/50 transition-all appearance-none">
                                    <option>Order Support</option>
                                    <option>Size Guide Inquiry</option>
                                    <option>Wholesale</option>
                                    <option>Feedback</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-teal uppercase tracking-widest ml-1">Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="How can we help you today?"
                                    className="w-full px-6 py-4 bg-blush border border-teal/5 rounded-2xl focus:outline-none focus:ring-2 ring-coral/50 transition-all resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-5 bg-coral text-white rounded-2xl font-bold text-lg shadow-lg shadow-coral/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
