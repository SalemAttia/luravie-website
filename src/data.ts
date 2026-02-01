export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Bra' | 'Pants' | 'Lingerie' | 'Socks';
  image: string;
  description: string;
  features: string[];
  materials: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
}

const COMMON_COLORS = [
  { name: 'Midnight Black', hex: '#1A1A1A' },
  { name: 'Soft Nude', hex: '#E3C5AF' },
  { name: 'Luravie Teal', hex: '#5B7B7C' },
  { name: 'Soft Coral', hex: '#E59595' },
  { name: 'Pearl Rose', hex: '#FCE4E4' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Confidence Seamless Bra',
    price: 450,
    category: 'Bra',
    image: 'https://images.unsplash.com/photo-1594734415578-00fc9540929b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYnJhJTIwZmxhdGxheSUyMHVuZGVyd2VhciUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3Njk5NTQ5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Designed for everyday confidence, our seamless bra provides invisible support and ultimate comfort.',
    features: ['No-wire support', 'Seamless edges', 'Breathable fabric'],
    materials: '85% Nylon, 15% Spandex',
    sizes: ['32B', '34B', '36B', '32C', '34C', '36C', '38C'],
    colors: COMMON_COLORS.slice(0, 3)
  },
  {
    id: '2',
    name: 'Everyday Essential Briefs',
    price: 180,
    category: 'Pants',
    image: 'https://images.unsplash.com/photo-1713881630214-82c44407cf25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY290dG9uJTIwYnJpZWZzJTIwZmxhdGxheSUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3Njk5NTQ5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Ultra-soft cotton briefs that stay in place all day. Discreet and comfortable.',
    features: ['100% cotton gusset', 'Tag-free comfort', 'Stay-put waistband'],
    materials: '95% Pima Cotton, 5% Elastane',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: COMMON_COLORS
  },
  {
    id: '3',
    name: 'Silk Touch Lingerie Set',
    price: 650,
    category: 'Lingerie',
    image: 'https://images.unsplash.com/photo-1691718854657-43cec80ba4d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwdW5kZXJ3ZWFyJTIwZmxhdGxheSUyMGx1eHVyeSUyMHRleHR1cmV8ZW58MXx8fHwxNzY5OTU0OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Elegant lace details meet premium comfort. A set that makes you feel beautiful from within.',
    features: ['Premium lace detail', 'Silk lining', 'Adjustable fit'],
    materials: 'Lace: 90% Polyamide, 10% Elastane. Lining: 100% Silk',
    sizes: ['S', 'M', 'L'],
    colors: [COMMON_COLORS[0], COMMON_COLORS[3]]
  },
  {
    id: '4',
    name: 'Cozy Morning Ankle Socks',
    price: 120,
    category: 'Socks',
    image: 'https://images.unsplash.com/photo-1579799582972-1927b8773bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjB3b21lbiUyMHNvY2tzJTIwYWVzdGhldGljfGVufDF8fHx8MTc2OTk1Mzg4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Breathable, cushioned, and designed to stay hidden or look great. The perfect everyday essential.',
    features: ['Arch support', 'Seamless toe', 'Breathable knit'],
    materials: '80% Combed Cotton, 17% Polyamide, 3% Elastane',
    sizes: ['One Size'],
    colors: COMMON_COLORS
  },
  {
    id: '5',
    name: 'Sculpt & Smooth Bants',
    price: 240,
    category: 'Pants',
    image: 'https://images.unsplash.com/photo-1666112514123-b3735b66aee3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2xkZWQlMjBsZWdnaW5nJTIwZmFicmljJTIwdGV4dHVyZSUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzY5OTU0OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'High-waisted support that feels like a second skin. Confidence in every layer.',
    features: ['Light compression', 'Seamless finish', 'Mid-waist design'],
    materials: '78% Recycled Polyamide, 22% Elastane',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [COMMON_COLORS[0], COMMON_COLORS[1], COMMON_COLORS[2]]
  },
  {
    id: '6',
    name: 'All-Day Comfort Bra',
    price: 420,
    category: 'Bra',
    image: 'https://images.unsplash.com/photo-1636545767112-27892db3d13f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFicmljJTIwdGV4dHVyZSUyMHNpbGslMjBjb3R0b24lMjB0ZWFsfGVufDF8fHx8MTc2OTk1NDkyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A classic silhouette reimagined for modern life. Lightweight and supportive.',
    features: ['Padded cups', 'Soft-touch fabric', 'Four-way stretch'],
    materials: '82% Polyester, 18% Spandex',
    sizes: ['32A', '34A', '32B', '34B', '36B', '34C'],
    colors: COMMON_COLORS
  }
];
