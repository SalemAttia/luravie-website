export type SupportedLocale = 'en' | 'ar';

function normalizeSiteUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';
  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
}

export function getSiteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.VERCEL_URL ||
    '';

  const normalized = normalizeSiteUrl(fromEnv);
  if (!normalized) return 'https://luravie.com';

  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    return normalized;
  }

  // Vercel provides just the host, e.g. "myapp.vercel.app"
  return `https://${normalized}`;
}

export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}

export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
}

export function truncate(input: string, maxLength: number): string {
  const value = input.trim();
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

export function ogLocaleFromLocale(locale: string): string {
  if (locale === 'ar') return 'ar_AR';
  return 'en_US';
}

export function localePath(locale: string, path: string): string {
  const cleanPath = path === '' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${cleanPath}`;
}

export function localizedAlternates(path: string): { languages: Record<string, string> } {
  const cleanPath = path === '' ? '' : path.startsWith('/') ? path : `/${path}`;
  return {
    languages: {
      en: `/en${cleanPath}`,
      ar: `/ar${cleanPath}`,
    },
  };
}

