import type { APIRoute } from 'astro';
import { canonicalUrl } from '../config/site';
import { releaseSitemapRoutes } from '../config/public-routes';

export const GET: APIRoute = () => {
  const isPreview = import.meta.env.GITHUB_PAGES_PREVIEW === 'true';
  const isReleased = import.meta.env.PUBLIC_SITE_RELEASE === 'true' && !isPreview;
  const urls = isReleased ? releaseSitemapRoutes.map(({ pathname }) => `<url><loc>${canonicalUrl(pathname)}</loc></url>`).join('') : '';
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
