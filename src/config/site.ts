export const site = {
  name: 'DigitalForces',
  canonicalOrigin: 'https://www.digital-forces.de',
  email: 'info@digital-forces.de',
  contactSubject: 'Shopware-Erstgespräch',
} as const;

export type SiteRoute = '/' | '/leistungen/' | '/referenzen/' | '/impressum/' | '/datenschutz/';

export const routes: Record<'home' | 'services' | 'references' | 'legalNotice' | 'privacy', SiteRoute> = {
  home: '/',
  services: '/leistungen/',
  references: '/referenzen/',
  legalNotice: '/impressum/',
  privacy: '/datenschutz/',
};

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}` || '/';
}

export function canonicalUrl(path: string): string {
  const normalized = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`;
  return new URL(normalized, site.canonicalOrigin).toString();
}

export function contactHref(subject: string = site.contactSubject): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}
