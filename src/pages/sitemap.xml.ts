import type { APIRoute } from 'astro';
import { canonicalUrl, routes } from '../config/site';

const publicRoutes = [routes.home, routes.services, routes.references];

export const GET: APIRoute = () => {
  const urls = publicRoutes.map((route) => `<url><loc>${canonicalUrl(route)}</loc></url>`).join('');
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
