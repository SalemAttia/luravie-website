import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export const WhatsAppButton: React.FC = () => {
  const t = useTranslations('common');
  const locale = useLocale();
  const phoneNumber = '201505555388';
  const message = encodeURIComponent(
    locale === 'ar'
      ? "مرحباً لُوراڤيه! أود الاستفسار عن مجموعتكم."
      : "Hello Luravie! I'd like to inquire about your collection."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-[#25D366]/40 transition-shadow group"
      aria-label={locale === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
    >
      <MessageCircle size={32} fill="currentColor" />

      {/* Tooltip */}
      <span className={`absolute ${locale === 'ar' ? 'left-full ml-4' : 'right-full mr-4'} px-4 py-2 bg-white text-teal text-sm font-bold rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-teal/5`}>
        {locale === 'ar' ? 'تواصل معنا' : 'Chat with us'}
      </span>
      
      {/* Notification Dot */}
      <span className="absolute top-0 right-0 w-4 h-4 bg-coral border-2 border-white rounded-full animate-pulse" />
    </motion.a>
  );
};
