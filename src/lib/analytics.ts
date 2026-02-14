type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(action: string, params?: GtagEventParams) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
}

export function trackViewItem(product: {
  id: string;
  name: string;
  price: number;
  category: string;
}) {
  trackEvent('view_item', {
    currency: 'EGP',
    value: product.price,
    items: JSON.stringify([
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
      },
    ]),
  });
}

export function trackAddToCart(
  product: { id: string; name: string; price: number; category: string },
  size?: string,
  color?: string,
) {
  trackEvent('add_to_cart', {
    currency: 'EGP',
    value: product.price,
    items: JSON.stringify([
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        item_variant: [size, color].filter(Boolean).join(' / ') || undefined,
        quantity: 1,
      },
    ]),
  });
}

export function trackRemoveFromCart(product: {
  id: string;
  name: string;
  price: number;
  category: string;
}) {
  trackEvent('remove_from_cart', {
    currency: 'EGP',
    value: product.price,
    items: JSON.stringify([
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
      },
    ]),
  });
}

export function trackBeginCheckout(
  items: { id: string; name: string; price: number; category: string; quantity: number }[],
  total: number,
) {
  trackEvent('begin_checkout', {
    currency: 'EGP',
    value: total,
    items: JSON.stringify(
      items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity,
      })),
    ),
  });
}

export function trackPurchase(
  items: { id: string; name: string; price: number; category: string; quantity: number }[],
  total: number,
) {
  trackEvent('purchase', {
    currency: 'EGP',
    value: total,
    transaction_id: `${Date.now()}`,
    items: JSON.stringify(
      items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity,
      })),
    ),
  });
}
