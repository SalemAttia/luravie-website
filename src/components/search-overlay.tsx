import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, TrendingUp, History, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const handleSearch = (q: string) => {
    onSearch(q);
    onClose();
  };

  const suggestions = [
    'Cotton Briefs',
    'Silk Lingerie',
    'Everyday Bra',
    'Bamboo Socks',
  ];

  const recentSearches = [
    'Seamless Collection',
    'Nude Tones',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-teal/95 backdrop-blur-xl flex flex-col"
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-end">
            <button 
              onClick={onClose}
              className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-start pt-12 px-4 max-w-4xl mx-auto w-full">
            <div className="w-full relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-coral transition-colors" size={32} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                placeholder="Search for essentials..."
                className="w-full bg-white/5 border-b-4 border-white/10 py-8 pl-20 pr-10 text-3xl md:text-5xl font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-coral transition-all"
              />
              {query && (
                <button 
                  onClick={() => setQuery('')}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X size={24} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full mt-20">
              <div className="space-y-8">
                <div className="flex items-center gap-3 text-rose uppercase tracking-[0.3em] text-[10px] font-bold">
                  <TrendingUp size={16} className="text-coral" />
                  Trending Searches
                </div>
                <div className="flex flex-wrap gap-3">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSearch(s)}
                      className="px-6 py-3 bg-white/5 text-white rounded-full border border-white/10 hover:bg-coral hover:border-coral hover:scale-105 transition-all cursor-pointer font-bold text-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3 text-rose uppercase tracking-[0.3em] text-[10px] font-bold">
                  <History size={16} className="text-coral" />
                  Recent Searches
                </div>
                <div className="space-y-4">
                  {recentSearches.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSearch(s)}
                      className="flex items-center justify-between w-full group text-white/60 hover:text-white transition-colors py-2"
                    >
                      <span className="text-xl font-medium">{s}</span>
                      <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-20 w-full pt-10 border-t border-white/5">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">Popular Products</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {PRODUCTS.slice(0, 4).map(p => (
                  <button 
                    key={p.id}
                    onClick={() => handleSearch(p.name)}
                    className="group text-left space-y-3"
                  >
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white/5">
                      <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm truncate">{p.name}</p>
                      <p className="text-rose/60 text-xs">{p.price} EGP</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
