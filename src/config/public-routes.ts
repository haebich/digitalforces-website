export type RouteKind = 'core' | 'service' | 'migration' | 'reference' | 'legal';
export type RouteStage = 'release-approved' | 'preview' | 'planned' | 'legal-review';

export interface PublicRouteRecord {
  pathname: string;
  kind: RouteKind;
  stage: RouteStage;
  indexable: boolean;
  includeInSitemap: boolean;
  includeInQa: boolean;
}

export const serviceDetailRoutes = {
  shopwareEngineering: '/leistungen/shopware-engineering/',
  ecommerceConsulting: '/leistungen/e-commerce-beratung/',
  systemCheck: '/leistungen/system-check/',
  aiConsulting: '/leistungen/ki-consulting/',
  customDevelopment: '/leistungen/individuelle-entwicklung/',
} as const;

export const migrationDetailRoutes = {
  hub: '/leistungen/shopware-5-auf-6-migration/',
  process: '/leistungen/shopware-5-auf-6-migration/migrationsprozess/',
  dependencies: '/leistungen/shopware-5-auf-6-migration/daten-plugins-integrationen/',
} as const;

export const publicRoutes: PublicRouteRecord[] = [
  { pathname: '/', kind: 'core', stage: 'release-approved', indexable: true, includeInSitemap: true, includeInQa: true },
  { pathname: '/leistungen/', kind: 'core', stage: 'release-approved', indexable: true, includeInSitemap: true, includeInQa: true },
  { pathname: serviceDetailRoutes.shopwareEngineering, kind: 'service', stage: 'planned', indexable: false, includeInSitemap: false, includeInQa: false },
  { pathname: serviceDetailRoutes.ecommerceConsulting, kind: 'service', stage: 'planned', indexable: false, includeInSitemap: false, includeInQa: false },
  { pathname: serviceDetailRoutes.systemCheck, kind: 'service', stage: 'planned', indexable: false, includeInSitemap: false, includeInQa: false },
  { pathname: migrationDetailRoutes.hub, kind: 'migration', stage: 'preview', indexable: false, includeInSitemap: false, includeInQa: true },
  { pathname: migrationDetailRoutes.process, kind: 'migration', stage: 'preview', indexable: false, includeInSitemap: false, includeInQa: true },
  { pathname: migrationDetailRoutes.dependencies, kind: 'migration', stage: 'preview', indexable: false, includeInSitemap: false, includeInQa: true },
  { pathname: serviceDetailRoutes.aiConsulting, kind: 'service', stage: 'planned', indexable: false, includeInSitemap: false, includeInQa: false },
  { pathname: serviceDetailRoutes.customDevelopment, kind: 'service', stage: 'planned', indexable: false, includeInSitemap: false, includeInQa: false },
  { pathname: '/referenzen/', kind: 'reference', stage: 'release-approved', indexable: true, includeInSitemap: true, includeInQa: true },
  { pathname: '/impressum/', kind: 'legal', stage: 'legal-review', indexable: false, includeInSitemap: false, includeInQa: true },
  { pathname: '/datenschutz/', kind: 'legal', stage: 'legal-review', indexable: false, includeInSitemap: false, includeInQa: true },
];

export const qaRoutes = publicRoutes.filter((route) => route.includeInQa);
export const releaseSitemapRoutes = publicRoutes.filter((route) => route.indexable && route.includeInSitemap);

export function getRoutePolicy(pathname: string): PublicRouteRecord | undefined {
  return publicRoutes.find((route) => route.pathname === pathname);
}
