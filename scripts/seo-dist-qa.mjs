import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { qaRoutes, releaseSitemapRoutes } from '../src/config/public-routes.ts';

const distDir = resolve(process.env.QA_DIST_DIR ?? 'dist');
const expectReleased = process.env.QA_EXPECT_RELEASED === 'true';
const canonicalOrigin = 'https://www.digital-forces.de';

function htmlPath(pathname) {
  return pathname === '/'
    ? resolve(distDir, 'index.html')
    : resolve(distDir, pathname.replace(/^\//, ''), 'index.html');
}

function match(html, expression) {
  return html.match(expression)?.[1] ?? null;
}

const results = [];
for (const route of qaRoutes) {
  const html = await readFile(htmlPath(route.pathname), 'utf8');
  const canonical = match(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const ogUrl = match(html, /<meta\s+property="og:url"\s+content="([^"]+)"/i);
  const robots = match(html, /<meta\s+name="robots"\s+content="([^"]+)"/i);
  const expectedUrl = expectReleased ? new URL(route.pathname, canonicalOrigin).toString() : null;
  const expectedRobots = expectReleased ? (route.indexable ? 'index, follow' : 'noindex, follow') : 'noindex, nofollow, noarchive';
  results.push({
    pathname: route.pathname,
    passed: canonical === expectedUrl && ogUrl === expectedUrl && robots === expectedRobots,
    canonical,
    ogUrl,
    robots,
    expectedUrl,
    expectedRobots,
  });
}

const robotsText = await readFile(resolve(distDir, 'robots.txt'), 'utf8');
const sitemapText = await readFile(resolve(distDir, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedSitemapUrls = expectReleased
  ? releaseSitemapRoutes.map(({ pathname }) => new URL(pathname, canonicalOrigin).toString())
  : [];
const expectedRobotsText = expectReleased
  ? `User-agent: *\nAllow: /\nSitemap: ${canonicalOrigin}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n';
const infrastructure = {
  passed: robotsText === expectedRobotsText
    && JSON.stringify(sitemapUrls) === JSON.stringify(expectedSitemapUrls)
    && new Set(sitemapUrls).size === sitemapUrls.length,
  robotsText,
  expectedRobotsText,
  sitemapUrls,
  expectedSitemapUrls,
};

const summary = {
  mode: expectReleased ? 'release' : 'preview',
  passed: results.every((result) => result.passed) && infrastructure.passed,
  routes: results,
  infrastructure,
};
console.log(JSON.stringify(summary, null, 2));
if (!summary.passed) process.exitCode = 1;
