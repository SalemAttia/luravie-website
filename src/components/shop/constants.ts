export const CATEGORIES = ['All', 'Bra', 'Pants', 'Lingerie', 'Socks'] as const;

export const SORT_OPTIONS = [
  { labelKey: 'newest', value: 'Newest' },
  { labelKey: 'priceLowHigh', value: 'Price: Low to High' },
  { labelKey: 'priceHighLow', value: 'Price: High to Low' },
] as const;
