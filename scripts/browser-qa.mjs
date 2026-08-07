import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const cdpUrl = process.env.QA_CDP_URL ?? 'ws://browser:3000';
const baseUrl = new URL(process.env.QA_BASE_URL ?? 'http://127.0.0.1:4321/');
const outputDir = resolve(process.env.QA_OUTPUT_DIR ?? '/tmp/digitalforces-route-qa');
const expectReleased = process.env.QA_EXPECT_RELEASED === 'true';
const routes = ['/', '/leistungen/', '/referenzen/', '/impressum/', '/datenschutz/'];
const widths = [1440, 1024, 768, 390];
const expectedCanonicals = new Map(routes.map((route) => [route, new URL(route, 'https://www.digital-forces.de').toString()]));

await mkdir(outputDir, { recursive: true });

const socket = new WebSocket(cdpUrl);
const pending = new Map();
let sequence = 0;

socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data.toString());
  if (message.id && pending.has(message.id)) {
    const { resolve: done, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(`${message.error.code}: ${message.error.message}`));
    else done(message.result ?? {});
    return;
  }
});

await new Promise((done, reject) => {
  socket.addEventListener('open', done, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

function call(method, params = {}, sessionId) {
  const id = ++sequence;
  return new Promise((done, reject) => {
    const timeout = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`CDP timeout: ${method}`));
    }, 15000);
    pending.set(id, {
      resolve: (value) => { clearTimeout(timeout); done(value); },
      reject: (error) => { clearTimeout(timeout); reject(error); },
    });
    socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
}

async function createPage(width, scriptDisabled = false, reducedMotion = false) {
  const { targetInfos } = await call('Target.getTargets');
  const pageTarget = targetInfos.find((target) => target.type === 'page');
  if (!pageTarget) throw new Error('Browserless stellt kein Page-Target bereit.');
  const { sessionId } = await call('Target.attachToTarget', { targetId: pageTarget.targetId, flatten: true });
  await Promise.all([
    call('Page.enable', {}, sessionId),
    call('Runtime.enable', {}, sessionId),
    call('Network.enable', {}, sessionId),
    call('Emulation.setDeviceMetricsOverride', { width, height: width <= 390 ? 844 : 900, deviceScaleFactor: 1, mobile: width <= 390 }, sessionId),
    call('Emulation.setScriptExecutionDisabled', { value: scriptDisabled }, sessionId),
    call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reducedMotion ? 'reduce' : 'no-preference' }] }, sessionId),
  ]);
  return { targetId: pageTarget.targetId, sessionId };
}

async function navigate(sessionId, url) {
  const result = await call('Page.navigate', { url }, sessionId);
  if (result.errorText) throw new Error(`Navigation fehlgeschlagen: ${result.errorText} (${url})`);
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const { result: readyState } = await call('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true }, sessionId);
    if (readyState.value === 'complete') return;
    await new Promise((done) => setTimeout(done, 100));
  }
  throw new Error(`Dokument wurde nicht vollständig geladen: ${url}`);
}

async function evaluate(sessionId, expression) {
  const { result, exceptionDetails } = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
  if (exceptionDetails) throw new Error(exceptionDetails.text);
  return result.value;
}

async function closePage(page) {
  await call('Target.detachFromTarget', { sessionId: page.sessionId });
}

const results = [];
for (const width of widths) {
  for (const route of routes) {
    const page = await createPage(width);
    const requestFailures = [];
    const badResponses = [];
    const externalRequests = [];
    const eventListener = ({ data }) => {
      const message = JSON.parse(data.toString());
      if (message.sessionId !== page.sessionId) return;
      if (message.method === 'Network.loadingFailed') requestFailures.push(message.params.errorText);
      if (message.method === 'Network.responseReceived' && message.params.response.status >= 400) badResponses.push(`${message.params.response.status} ${message.params.response.url}`);
      if (message.method === 'Network.requestWillBeSent') {
        const requestUrl = new URL(message.params.request.url);
        if (!['data:', 'mailto:'].includes(requestUrl.protocol) && requestUrl.origin !== baseUrl.origin) externalRequests.push(requestUrl.toString());
      }
    };
    socket.addEventListener('message', eventListener);
    const url = new URL(route.replace(/^\//, ''), baseUrl).toString();
    await navigate(page.sessionId, url);
    if (route === '/') {
      await evaluate(page.sessionId, `new Promise((resolve) => {
        const image = document.querySelector('.system-visual img');
        image?.scrollIntoView({ block: 'center' });
        if (!image || image.complete) return resolve(Boolean(image?.naturalWidth));
        const timeout = setTimeout(() => resolve(false), 5000);
        image.addEventListener('load', () => { clearTimeout(timeout); resolve(true); }, { once: true });
        image.addEventListener('error', () => { clearTimeout(timeout); resolve(false); }, { once: true });
      })`);
    }
    const state = await evaluate(page.sessionId, `(() => ({
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim(),
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      robots: document.querySelector('meta[name="robots"]')?.content,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      header: Boolean(document.querySelector('.site-header')),
      footer: Boolean(document.querySelector('.site-footer')),
      mobileSummaryVisible: ${width <= 800} ? getComputedStyle(document.querySelector('.mobile-nav')).display !== 'none' : true,
      deadInternalLinks: [...document.querySelectorAll('a[href]')].filter((a) => {
        const value = a.getAttribute('href');
        return value?.startsWith('/') && !value.startsWith('${baseUrl.pathname}');
      }).map((a) => a.getAttribute('href')),
      duplicateIds: [...document.querySelectorAll('[id]')].map((element) => element.id).filter((id, index, ids) => ids.indexOf(id) !== index),
      imagesMissingAlt: [...document.images].filter((image) => !image.hasAttribute('alt')).length,
      linksWithoutName: [...document.querySelectorAll('a[href]')].filter((link) => !link.textContent?.trim() && !link.getAttribute('aria-label')).length,
      mainCount: document.querySelectorAll('main').length,
      mailtoCount: document.querySelectorAll('a[href^="mailto:"]').length,
      homeUiReady: ${route !== '/'} || (() => {
        const journey = document.querySelector('.process-journey');
        const journeyList = journey?.querySelector('ol');
        const image = document.querySelector('.system-visual img');
        const columns = journeyList ? getComputedStyle(journeyList).gridTemplateColumns.split(' ').length : 0;
        return journey?.querySelectorAll('li').length === 4
          && journey.scrollWidth <= journey.clientWidth
          && columns === ${width <= 800 ? 1 : width <= 1100 ? 2 : 4}
          && image?.complete
          && image.naturalWidth === 1536
          && image.currentSrc.endsWith('/assets/df-code-card-engineering-visual-v1.webp')
          && image.alt === 'Abstrakte Visualisierung von digitalem Engineering und modularen Systemen.';
      })(),
    }))()`);

    const expectedCanonical = expectReleased ? expectedCanonicals.get(route) : null;
    const passed = Boolean(state.h1) && state.canonical === expectedCanonical && state.robots === 'noindex, nofollow, noarchive' && !state.overflow && state.header && state.footer && state.mobileSummaryVisible && state.deadInternalLinks.length === 0 && state.duplicateIds.length === 0 && state.imagesMissingAlt === 0 && state.linksWithoutName === 0 && state.mainCount === 1 && state.mailtoCount > 0 && state.homeUiReady && requestFailures.length === 0 && badResponses.length === 0 && externalRequests.length === 0;
    results.push({ route, width, passed, ...state, requestFailures, badResponses, externalRequests: [...new Set(externalRequests)] });

    if ((route === '/' || route === '/leistungen/' || route === '/referenzen/') && (width === 1440 || width === 390 || (route === '/' && width === 1024))) {
      await evaluate(page.sessionId, "document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));");
      const { data } = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, fromSurface: true }, page.sessionId);
      const routeName = route === '/' ? 'home' : route.replaceAll('/', '');
      const name = `${routeName}-${width}.png`;
      await writeFile(resolve(outputDir, name), Buffer.from(data, 'base64'));
      if (route === '/') {
        for (const [component, selector] of [['process', '.process-journey'], ['system-visual', '.system-visual']]) {
          const clip = await evaluate(page.sessionId, `(() => {
            const rect = document.querySelector('${selector}').getBoundingClientRect();
            return { x: rect.left + scrollX, y: rect.top + scrollY, width: rect.width, height: rect.height, scale: 1 };
          })()`);
          const screenshot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, fromSurface: true, clip }, page.sessionId);
          await writeFile(resolve(outputDir, `home-${component}-${width}.png`), Buffer.from(screenshot.data, 'base64'));
        }
      }
    }
    socket.removeEventListener('message', eventListener);
    await closePage(page);
  }
}

const noJsResults = [];
for (const route of routes) {
  const page = await createPage(390, true);
  const url = new URL(route.replace(/^\//, ''), baseUrl).toString();
  await navigate(page.sessionId, url);
  await call('Emulation.setScriptExecutionDisabled', { value: false }, page.sessionId);
  const state = await evaluate(page.sessionId, `(() => ({
    jsClassAbsent: !document.documentElement.classList.contains('js'),
    hiddenRevealCount: [...document.querySelectorAll('[data-reveal]')].filter((element) => getComputedStyle(element).opacity === '0').length,
    textLength: document.body.innerText.length,
  }))()`);
  noJsResults.push({ route, passed: state.jsClassAbsent && state.hiddenRevealCount === 0 && state.textLength > 200, ...state });
  await closePage(page);
}

const reducedPage = await createPage(390, false, true);
await navigate(reducedPage.sessionId, baseUrl.toString());
const reducedMotion = await evaluate(reducedPage.sessionId, `(() => ({
  matches: matchMedia('(prefers-reduced-motion: reduce)').matches,
  hiddenRevealCount: [...document.querySelectorAll('[data-reveal]')].filter((element) => getComputedStyle(element).opacity === '0').length,
}))()`);
await closePage(reducedPage);

const keyboardPage = await createPage(390);
await navigate(keyboardPage.sessionId, baseUrl.toString());
await evaluate(keyboardPage.sessionId, "document.querySelector('.mobile-nav').open = true; document.body.focus();");
const focusOrder = [];
for (let index = 0; index < 10; index += 1) {
  await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 }, keyboardPage.sessionId);
  await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 }, keyboardPage.sessionId);
  focusOrder.push(await evaluate(keyboardPage.sessionId, "document.activeElement?.textContent?.trim().replace(/\\s+/g, ' ').slice(0, 80)"));
}
await closePage(keyboardPage);

socket.close();
const summary = {
  passed: results.every((result) => result.passed) && noJsResults.every((result) => result.passed) && reducedMotion.matches && reducedMotion.hiddenRevealCount === 0 && focusOrder.some((item) => item === 'Menü'),
  routes: results,
  noJs: noJsResults,
  reducedMotion,
  keyboard: { passed: focusOrder.some((item) => item === 'Menü') && focusOrder.some((item) => item?.includes('Leistungen')), focusOrder },
  screenshots: outputDir,
};
await writeFile(resolve(outputDir, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
if (!summary.passed) process.exitCode = 1;
