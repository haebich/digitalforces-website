# DigitalForces Website — Klickdummy V1

Neutraler, statischer Relaunch-Prototyp. Keine produktive Domain, keine freigegebenen Kundenreferenzen und keine Abhängigkeit von der bestehenden WordPress-Instanz.

## Lokal starten

```bash
npm install
npm run dev
```

## Architektur

- Astro als statischer Site Generator
- Semantisches HTML und wenige, progressive JavaScript-Interaktionen
- Komponenten und Inhalte austauschbar vorbereitet
- Statischer Build für Cloudflare Pages, Netlify, Vercel oder klassisches Object Storage/CDN

## Offene Inhalte

- Marken-/Designbriefing von Mira
- freigegebene Cases, Leistungsbeschreibungen und Bildwelt
- rechtlich geprüfte Impressums- und Datenschutztexte
- finale Hosting- und Analytics-Entscheidung

## Privater Review

Jeder Push auf `main` erzeugt in GitHub Actions ein statisches Artefakt namens `digitalforces-website-review`. Es ist nur für berechtigte Repository-Nutzer abrufbar, wird 14 Tage aufbewahrt und veröffentlicht keine Website. Nach dem Download kann `dist/index.html` lokal geprüft oder der Ordner mit einem lokalen HTTP-Server geöffnet werden.
