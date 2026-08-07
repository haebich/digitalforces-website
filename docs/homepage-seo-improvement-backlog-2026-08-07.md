# Technischer SEO-/Homepage-Backlog

Stand: 2026-08-07  
Basis: `23ca7e109e4241d081b2ff861e198f59a1ed7fe4`  
Scope: interne Planung und Preview-sichere Umsetzung; kein Production-/DNS-/Custom-Domain-Change

## Kurzbefund

- Die noindex-Preview verhält sich aktuell grundsätzlich richtig: keine Canonical- oder `og:url`-Ausgabe, `noindex, nofollow, noarchive`, gesperrte `robots.txt` und leere Sitemap.
- Release-Blocker: `src/pages/sitemap.xml.ts` führt nur Startseite, Leistungen und Referenzen. Die drei vorhandenen Shopware-5→6-Routen fehlen.
- Routen sind derzeit mehrfach und unterschiedlich gepflegt (`site.ts`, `migration-pages.ts`, `sitemap.xml.ts`, `browser-qa.mjs`). Das erhöht das Risiko, neue Seiten beim Release oder in QA zu übersehen.
- Der vorhandene Browser-QA-Modus `QA_EXPECT_RELEASED=true` erwartet zwar Canonicals, prüft aber weiterhin fest auf Preview-Robots. Damit ist er kein belastbarer Release-Regressionscheck.
- Englische CSS-Klassennamen haben keinen SEO-Nachteil. Eine Umbenennung nur aus SEO-Gründen wäre unnötige Regression und ist nicht eingeplant.

## P0 – Release-Gates

### SEO-01: Zentrales Manifest für veröffentlichbare Routen

**Nutzen:** Eine einzige Quelle entscheidet, welche Route existiert, indexierbar ist und in die Release-Sitemap gehört. Neue Landingpages können nicht still aus Sitemap oder QA fallen.  
**Risiko ohne Umsetzung:** Unvollständige Sitemap, inkonsistente Release-Metadaten und ungetestete Seiten.  
**Umsetzung:**

- Neues serialisierbares Manifest, bevorzugt `src/config/public-routes.mjs`, mit mindestens `pathname`, `kind`, `releaseStatus` und `sitemap`.
- Startseite, `/leistungen/`, `/referenzen/` und die drei Migrationsrouten aufnehmen.
- `/impressum/` und `/datenschutz/` bis zum Abschluss der Rechtsprüfung explizit als nicht indexierbar/nicht in Sitemap markieren; statische Existenz darf nicht automatisch Indexierung bedeuten.
- `src/pages/sitemap.xml.ts` aus dem Manifest generieren; Preview bleibt unabhängig davon leer.
- `scripts/browser-qa.mjs` nutzt dieselbe Routenquelle statt eigener Listen.

**Abnahme:**

- Release-Sitemap enthält exakt alle als `releaseStatus: approved` und `sitemap: true` markierten Routen, inklusive der drei Migrationsseiten.
- Preview-Sitemap enthält weiterhin keine URL.
- Keine Duplikate, keine GitHub-Pages-URL, nur normalisierte HTTPS-URLs auf `www.digital-forces.de`.

**Abhängigkeiten:** Stephen bestätigt vor dem Produktions-Release die Indexierbarkeit der Migrationsrouten und den finalen Rechtsseitenstatus.  
**Owner:** Sven; Release-Inhaltsfreigabe Stephen.  
**Preview-Update:** Ja. Das Manifest und die leere Preview-Sitemap können gefahrlos in die noindex-Preview übernommen werden.

### SEO-02: Getrennte Preview-/Release-Regression für Robots, Canonical, Open Graph und Sitemap

**Nutzen:** Die gegensätzlichen SEO-Modi werden vor jedem Release reproduzierbar geprüft.  
**Risiko ohne Umsetzung:** Ein Flag- oder Templatefehler kann entweder die Preview indexierbar machen oder den Produktionsstand auf noindex belassen.

**Umsetzung:**

- `scripts/browser-qa.mjs` korrigieren: bei `QA_EXPECT_RELEASED=true` `index, follow` statt Preview-Robots erwarten.
- `og:url`, genau eine Canonical sowie deren Übereinstimmung mit der normalisierten aktuellen Route prüfen.
- Sitemap und `robots.txt` in beiden Modi prüfen.
- Für jede indexierbare Manifest-Route im lokalen Release-Build: HTTP 200, Self-Canonical und identische `og:url` auf `https://www.digital-forces.de{pathname}`.
- Preview-Modus: `noindex, nofollow, noarchive`, keine Canonical, keine `og:url`, `Disallow: /`, leere Sitemap.
- Separate Befehle in `package.json`, beispielsweise `qa:seo:preview` und `qa:seo:release`; Release ausschließlich lokal simulieren, nicht deployen.

**Abnahme:** Beide Modi laufen lokal grün; eine absichtlich entfernte Route oder falsche Meta-Angabe lässt den passenden Test fehlschlagen.  
**Abhängigkeiten:** SEO-01.  
**Owner:** Sven.  
**Preview-Update:** Ja. Keine Änderung am produktiven Release-Flag oder Hosting nötig.

## P1 – strukturierte Daten und dauerhafte QA

### SEO-03: Minimales `Organization`- und `WebSite`-JSON-LD

**Nutzen:** Eindeutige maschinenlesbare Zuordnung von Website und Organisation ohne Marketing- oder Ergebnisclaims.  
**Risiko:** Falscher Firmenname, falsches Logo oder nicht belegte Eigenschaften wären irreführende strukturierte Daten.

**Umsetzung:**

- Kleine Komponente, z. B. `src/components/StructuredData.astro`, in `src/layouts/Base.astro` einbinden.
- Nur bestätigte Felder ausgeben: rechtlicher Organisationsname, Website-URL und freigegebene Logo-URL; keine Bewertungen, Preise, Leistungsversprechen oder erfundenen Profile.
- JSON sicher serialisieren und in SEO-02 syntaktisch sowie gegen den Canonical-Host validieren.
- Kein `FAQPage`-Markup allein für Ranking-/Rich-Result-Zwecke einführen.

**Abnahme:** Valides JSON-LD, ausschließlich bestätigte Angaben, URL-Werte auf der freigegebenen Hauptdomain; Preview bleibt dennoch noindex.  
**Abhängigkeiten:** Stephen liefert/bestätigt rechtlichen Organisationsnamen und freigegebenes Logo inklusive öffentlicher Ziel-URL.  
**Owner:** Stephen für Datenfreigabe, Sven für Umsetzung.  
**Preview-Update:** Erst nach Daten-/Assetfreigabe; technisch anschließend ja.

### SEO-04: SEO-Regressionscheck als verpflichtender CI-/Preview-Gate

**Nutzen:** SEO-01/02 bleiben bei späteren Landingpages wirksam.  
**Risiko:** Browser-/Serverstart kann CI-Laufzeit erhöhen oder bei unklarer Prozessbeendigung flaken.

**Umsetzung:**

- Die stabilisierten SEO-Tests in `.github/workflows/private-review.yml` und den Pages-Build aufnehmen.
- Lokalen Astro-Server deterministisch starten/beenden, feste Ports verwenden und Fehlerartefakte hochladen.
- Erst nach lokal wiederholbar grünen Läufen zum verpflichtenden Gate machen.

**Abnahme:** Pull-/Preview-Build scheitert bei falschem Robots-Tag, Canonical, `og:url`, Sitemap-Inhalt oder nicht erreichbarer Manifest-Route.  
**Abhängigkeiten:** SEO-01 und SEO-02.  
**Owner:** Sven.  
**Preview-Update:** Ja.

## P2 – Markup- und Social-Metadaten

### A11Y-01: Dekorative KI-Visuals semantisch bereinigen

**Nutzen:** Screenreader wiederholen keine Bildbeschreibung, wenn Bild und Nachbartext dieselbe Information transportieren.  
**Risiko:** Ein tatsächlich inhaltstragendes Bild darf nicht versehentlich stumm werden.

**Umsetzung:**

- Die drei Bilder in `src/pages/index.astro` einzeln semantisch prüfen.
- Hero-Hintergrund, Systemvisual neben beschreibender Caption und Arbeitsweisen-Bild voraussichtlich mit `alt=""` kennzeichnen; sichtbare Caption/Texte bleiben erhalten.
- Abmessungen, `loading`, `fetchpriority` und Layout unverändert lassen.

**Abnahme:** Alle Bilder besitzen ein `alt`-Attribut; dekorative Bilder sind für Accessibility-APIs stumm, informative Bilder behalten einen knappen zweckbezogenen Alternativtext.  
**Abhängigkeiten:** Kurzer redaktioneller Abgleich mit Mira.  
**Owner:** Sven, Review Mira.  
**Preview-Update:** Ja.

### META-01: Viewport-Baseline vervollständigen

**Nutzen:** Explizite, verbreitete Mobile-Viewport-Baseline.  
**Risiko:** Minimal; Zoom darf nicht eingeschränkt werden.

**Umsetzung:** In `src/layouts/Base.astro` auf `width=device-width, initial-scale=1` ergänzen. Kein `maximum-scale` und kein `user-scalable=no`.  
**Abnahme:** 390/768/1024/1440 px ohne Overflow; Browser-Zoom bleibt möglich.  
**Abhängigkeiten:** Keine.  
**Owner:** Sven.  
**Preview-Update:** Ja.

### SOCIAL-01: Freigegebenes Social-Share-Asset und Kartenmetadaten

**Nutzen:** Kontrollierte Darstellung beim Teilen statt zufälliger Bildauswahl.  
**Risiko:** Unfreigegebene oder irreführende Bildmotive würden extern verbreitet; falsche Pfade brechen Karten.

**Umsetzung:**

- Erst nach Assetfreigabe ein 1200×630-WebP/JPEG als lokales Asset ergänzen.
- In `src/layouts/Base.astro` absolute `og:image`-URL, Breite, Höhe, Typ, Alt-Text und `twitter:card=summary_large_image` ausgeben.
- URL und HTTP-Status im Release-Regressionscheck validieren; keinen Platzhalter veröffentlichen.

**Abnahme:** Freigegebenes Asset ist unter der erwarteten absoluten Produktions-URL erreichbar, Metadaten sind vollständig und enthalten keine Preview-URL.  
**Abhängigkeiten:** Stephen/Mira liefern und bestätigen Motiv, Textfreiheit und Nutzung.  
**Owner:** Mira/Stephen für Assetfreigabe, Sven für Umsetzung.  
**Preview-Update:** Erst nach Assetfreigabe; anschließend ja.

### CONTENT-01: Sichtbare Leistungsbezeichnung vereinheitlichen

**Nutzen:** Ein konsistenter Angebotsname verbessert Orientierung und Markenführung zwischen Hero, Leistungskarte und Footer. Es geht um redaktionelle Eindeutigkeit, nicht um ein Ranking-Signal.
**Risiko:** Eine technische Eigenentscheidung könnte die freigegebene Positionierung oder bestehende Copy unbeabsichtigt verändern.

**Ist-Stand:**

- `src/pages/index.astro`: „E-Commerce-Beratung“ in Titel, Description und Hero-Kicker.
- `src/content/services/02-ecommerce-consulting.md`: „E-Commerce Business Consulting“.
- `src/components/SiteFooter.astro`: „E-Commerce Consulting“.

**Umsetzung:** Mira/Stephen legen ein sichtbares Primärlabel und zulässige Kurzform fest. Sven gleicht anschließend Seitentitel, Description, Kicker, Servicekarte und Footer ab; URLs und CSS-Klassen bleiben unverändert.
**Abnahme:** Auf allen sichtbaren Fundstellen wird das freigegebene Label beziehungsweise die ausdrücklich freigegebene Kurzform konsistent verwendet; keine Copy- oder Layout-Regression auf 390/768/1024/1440 px.
**Abhängigkeiten:** Owner-/Content-Entscheidung zum Primärlabel.
**Owner:** Mira für Empfehlung, Stephen für finale Markenentscheidung, Sven für Umsetzung.
**Preview-Update:** Nach Label-Freigabe ja.

## Bewusst nicht eingeplant

- **CSS-Klassennamen eindeutschen:** kein SEO- oder Accessibility-Nutzen; hohes unnötiges Selector-/QA-Risiko.
- **FAQ-Schema als SEO-Abkürzung:** ohne fachlichen Suchergebnis-Nutzen kein Grund für zusätzliches Markup.
- **Analytics/Consent:** zum Launch laut Owner-Entscheidung nicht vorgesehen.
- **Indexierung der Preview:** bleibt ausgeschlossen. Preview-Autonomie ändert das Release-Gate nicht.

## Empfohlene Reihenfolge

1. SEO-01 und SEO-02 gemeinsam umsetzen und lokal in Preview-/Release-Modus testen.
2. A11Y-01 und META-01 als kleine Preview-sichere Verbesserungen mitnehmen.
3. SEO-04 nach stabilen lokalen Läufen zum CI-Gate machen.
4. SEO-03 und SOCIAL-01 erst nach bestätigten Organisations-/Logo-/Social-Asset-Daten umsetzen.
5. CONTENT-01 nach der Label-Entscheidung als kleine globale Copy-Korrektur umsetzen.
6. Vor Produktivfreigabe entscheidet Stephen final über Indexierbarkeit der Migrations- und Rechtsrouten sowie das Umschalten von noindex auf index.

## Offene Owner-Entscheidungen

- Sollen alle drei Migrationsseiten beim ersten Produktions-Release indexiert und in die Sitemap aufgenommen werden?
- Sind Impressum und Datenschutz zum Release indexierbar oder bewusst von der Sitemap auszuschließen?
- Welcher rechtliche Organisationsname und welches Logo dürfen im `Organization`-Markup verwendet werden?
- Welches Social-Share-Asset ist freigegeben?
- Welches sichtbare Primärlabel gilt: „E-Commerce-Beratung“, „E-Commerce Consulting“ oder „E-Commerce Business Consulting“ – und ist eine Kurzform zulässig?
