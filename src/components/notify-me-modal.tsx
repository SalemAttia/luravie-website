"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Check, Phone } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Product } from '@/data';
import { useTranslations, useLocale } from 'next-intl';
import { toast } from 'sonner';

interface NotifyMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export const NotifyMeModal: React.FC<NotifyMeModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const t = useTranslations('product.notifyMe');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setPhoneError('');
    setIsSuccess(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');

    if (!phone.trim()) {
      setPhoneError(t('phoneRequired'));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/notify-me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || undefined,
          phone: phone.trim(),
          email: email.trim() || undefined,
          productId: product?.id,
          productName: product?.name,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2500);
    } catch {
      toast.error(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 rounded-full bg-teal/5 hover:bg-teal/10 text-teal/60 hover:text-teal transition-all cursor-pointer z-10`}
            >
              <X size={18} />
            </button>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                /* Success state */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center px-8 py-14 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mb-6"
                  >
                    <Check size={36} className="text-teal" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-teal mb-2">{t('success')}</h3>
                  <p className="text-teal/60 font-medium">{t('successSub')}</p>
                </motion.div>
              ) : (
                /* Form state */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Product preview header */}
                  <div className="flex items-center gap-4 px-6 pt-6 pb-5 border-b border-teal/10">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-blush shrink-0">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <p className="text-coral font-bold text-[10px] uppercase tracking-widest mb-0.5">
                        {t('title')}
                      </p>
                      <h3 className="font-bold text-teal text-base leading-tight">{product.name}</h3>
                      <p className="text-teal/50 text-xs mt-0.5">{t('subtitle')}</p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                    {/* Name */}
                    <div>
                      <label className={`block text-xs font-bold text-teal/60 uppercase tracking-widest mb-1.5 ${isRTL ? 'text-right' : ''}`}>
                        {t('name')}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('namePlaceholder')}
                        className={`w-full px-4 py-3 rounded-xl border border-teal/15 bg-white text-teal placeholder:text-teal/30 font-medium focus:outline-none focus:border-teal/40 focus:ring-2 focus:ring-teal/10 transition-all text-sm ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>

                    {/* Phone (required) */}
                    <div>
                      <label className={`block text-xs font-bold text-teal/60 uppercase tracking-widest mb-1.5 ${isRTL ? 'text-right' : ''}`}>
                        {t('phone')} <span className="text-coral">*</span>
                      </label>
                      <div className="relative">
                        <Phone
                          size={16}
                          className={`absolute top-1/2 -translate-y-1/2 text-teal/30 pointer-events-none ${isRTL ? 'right-4' : 'left-4'}`}
                        />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (phoneError) setPhoneError('');
                          }}
                          placeholder={t('phonePlaceholder')}
                          className={`w-full py-3 rounded-xl border bg-white text-teal placeholder:text-teal/30 font-medium focus:outline-none focus:ring-2 focus:ring-teal/10 transition-all text-sm ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} ${phoneError ? 'border-red-400 focus:border-red-400' : 'border-teal/15 focus:border-teal/40'}`}
                        />
                      </div>
                      {phoneError && (
                        <p className={`text-red-500 text-xs mt-1 font-medium ${isRTL ? 'text-right' : ''}`}>
                          {phoneError}
                        </p>
                      )}
                    </div>

                    {/* Email (optional) */}
                    <div>
                      <label className={`block text-xs font-bold text-teal/60 uppercase tracking-widest mb-1.5 ${isRTL ? 'text-right' : ''}`}>
                        {t('email')}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('emailPlaceholder')}
                        className={`w-full px-4 py-3 rounded-xl border border-teal/15 bg-white text-teal placeholder:text-teal/30 font-medium focus:outline-none focus:border-teal/40 focus:ring-2 focus:ring-teal/10 transition-all text-sm ${isRTL ? 'text-right' : ''}`}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-coral text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-coral/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mt-2"
                    >
                      {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Bell size={17} />
                          {t('submit')}
                        </>
                      )}
                    </button>

                    <p className={`text-center text-[10px] text-teal/35 uppercase tracking-widest font-bold pb-1 ${isRTL ? 'text-right' : ''}`}>
                      We respect your privacy. No spam.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
