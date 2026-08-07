import type { APIRoute } from 'astro';
import { site } from '../config/site';

export const GET: APIRoute = () => {
  const isPreview = import.meta.env.GITHUB_PAGES_PREVIEW === 'true';
  const isReleased = import.meta.env.PUBLIC_SITE_RELEASE === 'true' && !isPreview;
  const body = isReleased
    ? `User-agent: *\nAllow: /\nSitemap: ${site.canonicalOrigin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n';

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
