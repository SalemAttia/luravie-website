import React from 'react';
import { Package, Truck, ShieldCheck, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

const TRUST_ITEMS = [
  {
    icon: <Package className="text-teal" size={24} />,
    title: "Discreet Packaging",
    desc: "Shipped in plain, unmarked boxes for your absolute privacy."
  },
  {
    icon: <CreditCard className="text-teal" size={24} />,
    title: "Cash on Delivery",
    desc: "Exclusively COD for your convenience. Pay only at your doorstep."
  },
  {
    icon: <ShieldCheck className="text-teal" size={24} />,
    title: "Inspection First",
    desc: "Inspect your items before making the payment for total peace of mind."
  },
  {
    icon: <Truck className="text-teal" size={24} />,
    title: "Fast Shipping",
    desc: "Reliable delivery to your home within 2-4 business days."
  }
];

export const TrustSection: React.FC = () => {
  return (
    <section className="py-24 bg-rose relative overflow-hidden">
      {/* Decorative text bg */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
        <span className="text-[20rem] font-bold text-teal whitespace-nowrap">CONFIDENCE</span>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold text-teal/40 uppercase tracking-[0.4em] mb-4 block">Our Commitment</span>
          <h2 className="text-4xl font-bold text-teal mb-6 tracking-tight">Built on Trust & Privacy</h2>
          <div className="w-16 h-1 bg-coral mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {TRUST_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-4 group"
            >
              <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-teal/5 mb-8 group-hover:scale-110 group-hover:bg-coral group-hover:text-white transition-all duration-500">
                {React.cloneElement(item.icon as React.ReactElement, { size: 32, className: 'transition-colors' })}
              </div>
              <h3 className="font-bold text-teal mb-4 text-xl tracking-tight">{item.title}</h3>
              <p className="text-sm text-teal/60 leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
