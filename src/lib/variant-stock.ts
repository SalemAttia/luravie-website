import { ProductVariation } from '@/data';

/**
 * Check if a specific size is out of stock across ALL colors.
 * Returns true only if every variation with this size is out of stock.
 * Returns false (in stock) if no variation data is available.
 */
export function isSizeOutOfStock(
  variations: ProductVariation[] | undefined,
  size: string
): boolean {
  if (!variations || variations.length === 0) return false;
  const sizeVariations = variations.filter(v => v.attributes.size === size);
  if (sizeVariations.length === 0) return false;
  return sizeVariations.every(v => v.stockStatus === 'outofstock');
}

/**
 * Check if a specific color is out of stock across ALL sizes.
 */
export function isColorOutOfStock(
  variations: ProductVariation[] | undefined,
  colorName: string
): boolean {
  if (!variations || variations.length === 0) return false;
  const colorVariations = variations.filter(v => v.attributes.color === colorName);
  if (colorVariations.length === 0) return false;
  return colorVariations.every(v => v.stockStatus === 'outofstock');
}

/**
 * Check if a specific size+color combination is out of stock.
 */
export function isCombinationOutOfStock(
  variations: ProductVariation[] | undefined,
  size?: string,
  colorName?: string
): boolean {
  if (!variations || variations.length === 0) return false;
  const match = findVariation(variations, size, colorName);
  if (!match) return false;
  return match.stockStatus === 'outofstock';
}

/**
 * Find the specific variation matching a size+color combo.
 */
export function findVariation(
  variations: ProductVariation[] | undefined,
  size?: string,
  colorName?: string
): ProductVariation | undefined {
  if (!variations) return undefined;
  return variations.find(v => {
    const sizeMatch = !size || !v.attributes.size || v.attributes.size === size;
    const colorMatch = !colorName || !v.attributes.color || v.attributes.color === colorName;
    return sizeMatch && colorMatch;
  });
}
