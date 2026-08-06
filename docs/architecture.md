# Technischer Vorschlag V1

## Stack

**Empfehlung: Astro + TypeScript + CSS, statischer Output.** Für die aktuelle Agentur-Website ist serverseitiges WordPress voraussichtlich unnötige Betriebsfläche. Astro liefert HTML-first, erlaubt bei Bedarf gezielte interaktive Inseln und hält den Wechsel zu einem Headless-CMS offen.

## Komponentenstruktur

- `Base`: Metadaten, globale Styles, progressive Interaktionen
- `Header`: Navigation und Primär-CTA
- Seiten: zunächst Landingpage, später Leistungen, Cases, Agentur, Kontakt, Rechtliches
- Inhalte später wahlweise Markdown/MDX oder Headless-CMS

## Hosting / Deployment

Bevorzugt Cloudflare Pages: Git-basierte Preview-Deployments, CDN, HTTPS und einfacher Rollback. Alternativen sind GitHub Pages für einen rein statischen Stand oder Vercel. Die produktive Zielwahl erfolgt erst nach Prüfung von Datenschutz, bestehendem DNS und Owner-Freigabe.

## Migrationspfad

1. WordPress-Inventar exportieren: URLs, Inhalte, Medien, Metadaten, Formulare, Redirects.
2. Ziel-Informationsarchitektur und URL-Mapping freigeben.
3. Inhalte in strukturierte Collections oder ein Headless-CMS überführen.
4. Preview-Umgebung prüfen: Visual QA, Accessibility, Lighthouse, Formulare, SEO.
5. Redirect-Matrix und Rollback vorbereiten.
6. DNS-Umschaltung ausschließlich nach separater Owner-Freigabe; WordPress zunächst als Rückfalloption erhalten.

## Referenzanalyse (Prinzipien, keine Kopie)

Die Referenz führt von einem klaren Nutzenversprechen über Vertrauenssignale, fokussierbare Leistungen, persönliche Positionierung, Referenzen und Stimmen bis zu Prozess und wiederholtem Termin-CTA. Übertragbar sind die starke narrative Reihenfolge, kurze Wege zur Conversion, interaktive Leistungswahl und der Wechsel aus großen Aussagen und konkreten Belegen. Der V1-Entwurf interpretiert diese Prinzipien eigenständig mit technischer Editorial-Ästhetik, Systemstatus-Motiv und drei klaren Arbeitsschritten.

## Aktueller Website-Befund

`digitalforces.de` war bei der Analyse am 2026-08-06 nicht per DNS auflösbar. Damit war eine belastbare Inventarisierung der bestehenden Website noch nicht möglich. Die WordPress-URL bzw. ein Export wird benötigt; es wurden keine Änderungen am Bestand vorgenommen.
