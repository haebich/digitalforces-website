# Shopware-5→6-Migrationskampagne – Technik, Iteration 2

**Stand:** 2026-08-07  
**Status:** interne Umsetzungsplanung; nicht veröffentlicht  
**Task:** `shopware5-to-6-migration-landingpages-2026-08-07`  
**Leitplanken:** keine Kunden-/Referenzclaims, kein Preis-, Dauer-, Downtime-, Vollständigkeits-, SEO- oder Performanceversprechen; Preview bleibt `noindex`; Veröffentlichung, Produktion, DNS und Custom Domain bleiben separate Owner-Gates.

## 1. Ticketstatus

| Ticket | Prio | Status Iteration 2 | Ergebnis / nächster Schritt |
| --- | --- | --- | --- |
| MIG-TECH-01 | P0 | **erledigt** | Claims-Matrix und satzgenaues Review für Miras Hub-/Supporting-Page-Draft liegen vor. Vor jeder Veröffentlichung ist ein erneuter Primärquellen-Abgleich nötig. |
| MIG-TECH-02 | P0 | **spezifiziert** | Ziel-IA, Contentmodell, Routen, Komponenten und Release-/SEO-/A11y-Gates sind implementierungsbereit. |
| MIG-TECH-03 | P1 | **erledigt** | Discovery-Artefakt deckt Daten, Erweiterungen, Integrationen, B2B, SEO, Payment/Versand, Tests, Cutover und Rollback ab. |
| MIG-TECH-04 | P1 | **erledigt** | Aufwand, Abhängigkeiten, kritischer Pfad und Definition of Done sind dokumentiert. Kein Deployment beauftragt. |
| MIG-QA-01 | P1 | **erledigt** | Seitenübergreifende und seitenspezifische Abnahmematrix ist definiert. |

**Implementierungsreife:** Das technische Grundgerüst kann nach Übernahme der Copy-Korrekturen lokal umgesetzt werden. Für einen privaten/noindex Preview-Build fehlen keine Architekturentscheidungen. Vor jedem Push/Deploy bleibt eine ausdrückliche Owner-Freigabe erforderlich.

## 2. MIG-TECH-01 – Claims-Review-Matrix

### Statuslegende

- **Freigabefähig:** technisch belastbar in der angegebenen Form; Primärquelle vor Veröffentlichung erneut prüfen.
- **Nur mit Einschränkung:** nur mit genanntem Projektvorbehalt bzw. präziserer Formulierung.
- **Nicht behaupten:** pauschal nicht belastbar oder nur mit konkretem Projektbeleg zulässig.

### 2.1 Shopware-5-Lifecycle und Migrationsmechanik

| Aussage | Status | Freigabefähiger Wortlaut / Korrektur | Quelle / Gate |
| --- | --- | --- | --- |
| Shopware 5 erhält keine Sicherheitsupdates mehr. | **Freigabefähig** | „Seit Ende Juli 2024 stellt Shopware für Shopware 5 keine weiteren Sicherheitsupdates bereit.“ Keine Aussage, ein konkreter Shop sei deshalb bereits unsicher oder kompromittiert. | Shopware 5 End-of-Life; unmittelbar vor Veröffentlichung erneut prüfen. |
| Die Migration ist kein einfaches Versionsupdate. | **Freigabefähig** | „Der Wechsel benötigt eine neue Shopware-6-Umgebung sowie eine geplante Übernahme und Neubewertung von Daten, Funktionen und Integrationen.“ | Shopware-Migrationsprozess. |
| Der Migration Assistant überträgt Shopware-Standarddaten. | **Nur mit Einschränkung** | „Der Migration Assistant kann ausgewählte Shopware-Standarddaten übertragen.“ Auswahl, Quellprofil, Datenstand, Fehlerbehandlung und fachliche Abnahme bleiben projektabhängig. | „What is migrated“, Migrationsprozess. |
| Produkte, Kategorien, Eigenschaften/Varianten, Kunden, Bestellungen, Dokumente, Medien, Bewertungen, Promotions und SEO-URLs können zum Standardumfang gehören. | **Freigabefähig** | Nur als Beispiele und nie als Vollständigkeits- oder Fehlerfreiheitszusage nennen. | „What is migrated“. |
| Zahlarten, Standardzahlart, Anreden sowie Lieferzeiten brauchen Zuordnung bzw. Anlage im Ziel. | **Freigabefähig** | Zwischen übertragenen Daten, manuell zugeordneten Datensätzen und neu aufgebauter Konfiguration unterscheiden. | „What is migrated“. |
| Versandarten werden migriert. | **Nur mit Einschränkung** | „Datensätze von Versandarten können übertragen werden; Versandkosten, Verfügbarkeitsbedingungen und Regeln müssen im Ziel geprüft und typischerweise neu konfiguriert werden.“ | „What is migrated“. |
| Theme, Einkaufswelten/Shopseiten, E-Mail-/Dokumentvorlagen und B2B-Suite werden übernommen. | **Nicht behaupten** | Diese Bereiche als Neuaufbau bzw. gesonderte Prüfung benennen. Shopware dokumentiert insbesondere Theme/Templates, Shopping Worlds/Shop Pages und B2B Suite als nicht direkt übertragbar. | „What is migrated“. |
| Wiederholungsläufe halten den Zielshop automatisch live synchron. | **Nicht behaupten** | „Wiederholte Migrationsläufe und prüfsummenbasierte Aktualisierungen können den Cutover vorbereiten.“ Kein Echtzeit-, CDC- oder garantiert vollständiger Delta-Claim. | Shopware-6-Migrationsprozess. |
| Migration ist vollständig, verlustfrei oder mit einem Klick möglich. | **Nicht behaupten** | Keine Alternative mit gleichwertigem Erfolgsversprechen. Stattdessen Scope, Prüfungen und Abnahmekriterien erklären. | dauerhaft gesperrt ohne projektspezifischen Nachweis. |

### 2.2 Erweiterungen, Individualcode und Integrationen

| Aussage | Status | Freigabefähiger Wortlaut / Korrektur | Gate |
| --- | --- | --- | --- |
| Plugins lassen sich migrieren. | **Nur mit Einschränkung** | „Für jede Erweiterung wird geprüft, ob eine kompatible Shopware-6-Lösung und ein belastbarer Datenpfad existieren.“ Hersteller-Migrationsprofil, Zielversion, Konfiguration und Regressionstest sind einzeln zu prüfen. | aktuelle Hersteller-/Shopware-Quelle pro Extension. |
| Plugin-Daten werden vom Assistant übernommen. | **Nur mit Einschränkung** | Nur wenn der konkrete Hersteller bzw. ein geprüftes Migrationsprofil diese Daten unterstützt. Keine pauschale Aussage. | konkrete Extension-Dokumentation und Testlauf. |
| Individualcode kann übernommen werden. | **Nicht behaupten** | „Individuelle Funktionen werden fachlich neu bewertet und für die Shopware-6-Architektur ersetzt, neu implementiert oder bewusst stillgelegt.“ | Code-/Prozessinventur. |
| ERP/PIM/WMS sind über APIs einfach weiter nutzbar. | **Nicht behaupten** | „Anbindungen werden anhand von Systemführerschaft, Datenrichtung, IDs, Mapping, Idempotenz, Retry/Reconciliation und Monitoring geprüft.“ | API-/Providerstand und End-to-End-Test. |
| Payment-Tokens und Zahlprozesse werden übernommen. | **Nicht behaupten** | Providerkonto, Credentials, Domains, Webhooks, Statusmapping, 3DS, Capture, Refund und Cancel einzeln testen. Tokenportabilität ist provider- und vertragsabhängig. | Providerfreigabe und Testkonto. |
| Versandlogik wird übernommen. | **Nicht behaupten** | Methoden, Preise, Rule-Builder-Bedingungen, Länder, Gewichte, Zuschläge, Labels und Tracking separat inventarisieren und abnehmen. | Fachkonfiguration und Testmatrix. |
| „Übernehmen · ersetzen · neu entwickeln · vereinfachen/abschalten“ ist ein zulässiges Raster. | **Freigabefähig** | Reihenfolge ergänzen: Bedarf bestätigen → Core-Funktion prüfen → kompatible Extension prüfen → Ersatz → gezielter Neubau → kontrollierte Stilllegung. | fachliche Owner je Prozess. |

### 2.3 Daten, SEO, Cutover und Rollback

| Aussage | Status | Freigabefähiger Wortlaut / Korrektur | Gate |
| --- | --- | --- | --- |
| Daten werden vollständig übernommen. | **Nicht behaupten** | „Die vereinbarten Datenbereiche werden migriert, abgeglichen und fachlich abgenommen.“ Mengen-/Summenabgleiche, kritische Stichproben und Fehlerprotokoll nennen. | projektspezifischer Scope und Abnahme. |
| SEO-URLs werden migriert. | **Nur mit Einschränkung** | „Bestehende SEO-URLs gehören zum Daten- und URL-Abgleich; Ziel-URLs, Canonicals, interne Links und Redirects werden separat geplant und getestet.“ | URL-Inventar/Crawl beider Systeme. |
| Redirects sichern Rankings. | **Nicht behaupten** | „Direkte serverseitige 301/308-Weiterleitungen, Self-Canonicals, aktualisierte interne Links und Sitemaps reduzieren vermeidbare Migrationsfehler. Sichtbarkeit kann dennoch schwanken.“ | Google Search Central; projektspezifisches Mapping. |
| Die Migration erfolgt ohne Downtime. | **Nicht behaupten** | „Cutover und erforderlicher Schreibstopp werden nach Generalprobe und gemessenen Laufzeiten geplant.“ | Last-/Datenvolumen, Integrationen, Cutover-Runbook. |
| Ein Rollback ist jederzeit möglich. | **Nicht behaupten** | „Vor dem Cutover werden Rückschaltkriterien, Backups, Restore-Nachweis und der Umgang mit neuen Schreibvorgängen definiert.“ DNS-Rückschaltung allein ist kein Datenrollback. | getestetes Runbook, RTO/RPO-Entscheidung. |
| Shopware-Go-live-Finalisierung kann früh durchgeführt werden. | **Nicht behaupten** | Finalisierung erst nach fachlicher Abnahme; danach kann der Migration Assistant den Datenstand nicht weiter aktualisieren. | Shopware-Go-live-Dokumentation. |
| Tests verhindern alle Fehler. | **Nicht behaupten** | „Automatisierte und fachliche Tests senken erkannte Risiken; Abnahmekriterien und Restrisiken werden dokumentiert.“ | Testplan und Sign-off. |

### 2.4 Satzgenaues Review von Miras Iteration-2-Draft

| Draft-Stelle | Entscheidung | Präzise Rückmeldung |
| --- | --- | --- |
| „Shopware 5 wird nicht mehr weiterentwickelt.“ | **ändern** | Zu unscharf. Besser die belegbare Security-Aussage mit Datum verwenden; keine Aussage zum Sicherheitszustand eines konkreten Shops. |
| Hero B: „… was wirklich übernommen werden muss.“ | **ändern** | „… welche Daten übertragen werden können und welche Funktionen neu bewertet werden müssen.“ trennt technische Möglichkeit und fachliche Entscheidung. |
| Problemspiegel B: „Fragen, die später teuer werden können.“ | **ändern** | Unbelegter Kostenimpuls. Neutral: „Fragen, die Scope, Reihenfolge und Testaufwand bestimmen.“ |
| „Nicht alles Alte muss neu gebaut werden.“ | **ändern** | Kann Wiederverwendbarkeit suggerieren. Besser: „Nicht jede bestehende Funktion sollte unverändert nachgebaut werden.“ |
| Fünf Prüffelder | **freigabefähig** | „Verkaufskanäle“ um Domains, Sprachen, Währungen und rechtlich/operativ relevante Konfiguration ergänzen; nur nennen, wenn im Discovery tatsächlich geprüft. |
| Entscheidungsraster | **freigabefähig** | „Übernehmen“ präzisieren zu „per Standardmigration übertragen“ bzw. „mit kompatibler Lösung fortführen“. |
| Ablauf, Schritt 3 „Umsetzung und relevante Abläufe prüfen“ | **ändern** | Zu grob. Trennen in „Zielsystem und Funktionen umsetzen“ sowie „Daten, Integrationen und Geschäftsprozesse testen“. |
| FAQ „Ist das ein Update?“ | **freigabefähig** | Ergänzen: neue Shopware-6-Umgebung; Assistant unterstützt Datenübernahme, ersetzt aber Funktionsabgleich und Tests nicht. |
| FAQ Plugins/Schnittstellen | **freigabefähig mit Ergänzung** | Pro Extension/Integration sind Zielversion, Ersatz/Neubau, Datenpfad und End-to-End-Test zu klären. |
| FAQ URLs/Inhalte | **freigabefähig mit Ergänzung** | URL-Inventar, Zielmapping, direkte Redirects, Canonicals, interne Links und Monitoring nennen; keine Rankingzusage. |
| FAQ Dauer/Kosten | **freigabefähig** | Der projektabhängige Wortlaut ist korrekt. Keine Beispielspanne ergänzen. |
| „Migrations-Check“/Roadmap/Go-live/Betrieb | **Owner-Gate** | Nur als konkrete Leistung/Deliverable benennen, wenn Scope und Kontaktprozess bestätigt sind. Bis dahin „Migrationsvorhaben besprechen“. |

### 2.5 Primärquellenregister

Unmittelbar vor einer Veröffentlichung sind Datum, Wortlaut und Geltungsbereich erneut zu prüfen.

- Shopware: [Shopware 5 End of Life](https://docs.shopware.com/pdf/en/shopware-5-en-end-of-life.pdf)
- Shopware: [What is migrated?](https://docs.shopware.com/en/migration-en/what-is-migrated)
- Shopware: [Migration from Shopware 5](https://docs.shopware.com/en/migration-en/Migrationprocess)
- Shopware: [Migration process / checksums and logs](https://docs.shopware.com/en/migration-en/shopware6-Migrationsprocess)
- Shopware: [GoLive](https://docs.shopware.com/en/migration-en/Golive)
- Google Search Central: [Site move with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- Google Search Central: [Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- W3C: [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

## 3. MIG-TECH-02 – IA, Route und Landingpage-Template

### 3.1 Ziel-IA

**Kanonischer Hub:** `/leistungen/shopware-5-auf-6-migration/`

**Welle 1:**

- `/leistungen/shopware-5-auf-6-migration/`
- `/leistungen/shopware-5-auf-6-migration/migrationsprozess/`
- `/leistungen/shopware-5-auf-6-migration/daten-plugins-integrationen/`

**Später nur bei eigenständigem Suchnutzen und belastbarer Copy:**

- `/leistungen/shopware-5-auf-6-migration/seo-urls/`
- `/leistungen/shopware-5-auf-6-migration/migrationsreife/`

Miras bisherige Root-Routen (`/shopware-5-…/`) werden vor Implementierung ersetzt. Die verschachtelte IA hält die Leistungshierarchie verständlich, verhindert eine Sammlung unverbundener Root-Landingpages und bleibt für weitere Leistungscluster skalierbar. Es werden keine leeren Detailseiten erzeugt.

### 3.2 Navigation und interne Verlinkung

- Globale Hauptnavigation bleibt unverändert; der Migrations-Hub wird unter „Leistungen“ eingeordnet.
- `/leistungen/` erhält aus dem Shopware-Engineering-Bereich einen kontextuellen Link zum Hub.
- Hub verlinkt beide Supporting Pages und zurück auf `/leistungen/`.
- Supporting Pages enthalten Breadcrumbs, Link zum Hub, kontextuellen Querverweis zur jeweils anderen Supporting Page und Mailto-CTA.
- Keine Referenz-/Case-Verlinkung als Migrationsbeleg. Watzka und andere Kunden bleiben ausgeschlossen.
- Footer-Erweiterung erst, wenn die Kampagne ein dauerhaftes Haupteinstiegsangebot wird; kein Pflichtbestandteil von Welle 1.

### 3.3 Contentmodell

Neue Collection `landingPages`, z. B. in `src/content/landing-pages/`:

```text
src/content/landing-pages/
  shopware-5-auf-6-migration.md
  shopware-5-auf-6-migration--migrationsprozess.md
  shopware-5-auf-6-migration--daten-plugins-integrationen.md
```

Pflichtfelder:

- `slug`, `parentSlug`, `order`, `status` (`draft`/`review`/`approved`)
- `title`, `description`, `eyebrow`, `heading`, `intro`
- `primaryCtaLabel`, `primaryCtaSubject`
- `sections[]` mit stabiler `id`, Typ, Überschrift und strukturiertem Inhalt
- `faq[]`, `related[]`, `sources[]`, `lastTechnicalReview`
- `indexable` standardmäßig `false`; ein Build-Gate verhindert Indexierung nicht freigegebener Inhalte

Die statische Route kann über `src/pages/leistungen/[...slug].astro` und `getStaticPaths()` generiert werden. `/leistungen/index.astro` bleibt bestehen. Nur Content mit mindestens Status `review` wird in den internen Preview-Build aufgenommen; `approved` bedeutet noch keine Produktionsfreigabe.

### 3.4 Wiederverwendbare Komponenten

- `Breadcrumbs`: semantisches `nav` + geordnete Liste.
- `LandingHero`: genau eine H1, Kicker, Intro, Mailto-CTA und optionaler In-Page-Link.
- `AuditFieldGrid`: strukturierte Prüffelder ohne pseudo-interaktive Cards.
- `DecisionMatrix`: Core / kompatibel fortführen / ersetzen / neu bauen / abschalten.
- `MigrationProcess`: geordnete Phasenliste; ohne JS vollständig sichtbar.
- `DataScopeTable`: „Standardmigration / Mapping / Neuaufbau / projektabhängig“ mit mobiler lesbarer Darstellung.
- `ContentSection`: semantische Standardsektion mit stabiler Anchor-ID.
- `FaqList`: native `details/summary`; ohne JS nutzbar.
- `RelatedPages`: kontextuelle interne Links, kein automatischer Link auf Drafts.
- bestehende `ContactCta`: kampagnenspezifischer Betreff, aber keine unbestätigte Dauer-/Gratis-Microcopy.

### 3.5 SEO- und Release-Baseline

- Produktion: Self-Canonical `https://www.digital-forces.de{pathname}` nur bei `PUBLIC_SITE_RELEASE=true` und nicht im Pages-Preview-Build.
- Preview: `noindex, nofollow, noarchive`; `robots.txt` mit `Disallow: /`; keine Production-Canonical/`og:url`.
- `sitemap.xml` darf im Preview-Build keine Produktions-URLs ausgeben. Produktionssitemap wird aus freigegebenen Collections erzeugt, nicht aus einer harten Routenliste.
- Eindeutige `title`, Meta Description, H1 und Search Intent pro Seite; keine Keyword-/Rankingzusage.
- Strukturierte Daten: `BreadcrumbList` für Hub/Supporting Pages; optional `Service` mit ausschließlich sichtbaren, bestätigten Angaben. `Organization` bleibt globale Site-Angabe. Kein `Review`, `AggregateRating`, `Product` oder nicht sichtbares FAQ-Markup. `FAQPage` nur semantisch und ohne Rich-Result-Versprechen.
- JSON-LD muss dieselbe Release-/Inhaltsfreigabe wie sichtbare Copy durchlaufen.

### 3.6 Accessibility, No-JS und Reduced Motion

- Landmarken, Skip-Link, Breadcrumb-Navigation, genau eine H1 und logische H2/H3-Hierarchie.
- Listen/Tabellen semantisch; Tabellen bei 390 px ohne Informationsverlust. Bei komplexen Vergleichen gestapelte Definition Lists statt horizontalem Scrollzwang.
- Alle Funktionen per Tastatur, sichtbare Fokuszustände, Zielgröße und Kontrast nach WCAG 2.2 AA.
- Inhalte ohne JavaScript vollständig sichtbar und erreichbar; keine Pflicht-Hydration für die Landingpages.
- Keine autoplay-/scrollgebundene Bewegung. Etwaige Reveal-Effekte sind rein dekorativ und bei `prefers-reduced-motion: reduce` deaktiviert.
- Anchor-Ziele berücksichtigen Sticky-Header per `scroll-margin-top`.

## 4. MIG-TECH-03 – Discovery-/Checklist-Artefakt

### A. Ziel, Scope und Verantwortlichkeiten

- [ ] Geschäftsziele, Muss-Prozesse und explizite Nicht-Ziele dokumentiert.
- [ ] Shopware-6-Zielversion, Edition, Hosting/Betriebsmodell und Umgebungen festgelegt.
- [ ] System Owner, fachliche Abnehmer, technische Owner und Go/No-Go-Entscheider benannt.
- [ ] Daten- und Funktionsscope je Entität/Prozess bestätigt.
- [ ] Datenschutz-, Aufbewahrungs- und Löschanforderungen geklärt.

### B. Quelle und Voraussetzungen

- [ ] Exakte Shopware-5-Version, Datenbank, Dateisystem, PHP/Serverstand und Migrationszugang inventarisiert.
- [ ] Migration Assistant in Quell- und Zielsystem sowie zulässige Verbindungsart geprüft.
- [ ] Datenvolumen, Medienvolumen, Laufzeiten, Fehlerhistorie und Wartungsfenster messbar.
- [ ] Bereinigte Testkopie und wiederholbarer Restore verfügbar.
- [ ] Zeichensätze, Zeitzonen, Währungen, Sprachen und Nummernkreise dokumentiert.

### C. Daten und Datenqualität

- [ ] Entitätenliste: Kategorien, Produkte/Varianten/Eigenschaften, Hersteller, Medien, Kunden, Adressen, Bestellungen, Dokumente, Promotions, Bewertungen, SEO-URLs.
- [ ] Mengen-/Summenabgleiche und kritische fachliche Stichproben je Entität definiert.
- [ ] Dubletten, Pflichtfelder, verwaiste Referenzen, ungültige Medien und Alt-/Sonderdaten identifiziert.
- [ ] Manuelle Mappings für Zahlarten, Anreden, Lieferzeiten und weitere projektspezifische Werte vorbereitet.
- [ ] Daten, die bewusst nicht übernommen werden, schriftlich freigegeben.

### D. Plugins und Individualcode

- [ ] Vollständige Extension-/Custom-Code-Inventur mit Version, Hersteller, Zweck, Owner, Datenhaltung und Prozesskritikalität.
- [ ] Je Eintrag Entscheidung: Core / kompatible Shopware-6-Lösung / Ersatz / Neubau / Stilllegung.
- [ ] Datenpfad des Plugins bzw. Hersteller-Migrationsprofil belegt und getestet.
- [ ] Lizenz-, Vertrags-, Support- und Zielversionskompatibilität bestätigt.
- [ ] Storefront-, Administration-, Event-/Subscriber-, Scheduled-Task- und API-Anpassungen erfasst.

### E. Integrationen

- [ ] ERP, PIM, WMS, CRM, DAM, Marktplätze, Search, E-Mail, Tax und weitere Systeme erfasst.
- [ ] System of Record, Datenrichtung, IDs, Mapping, Frequenz und Volumen je Flow dokumentiert.
- [ ] Authentifizierung, IP/Domain-Allowlisting, Secrets, Rate Limits und Provider-Sandbox geklärt.
- [ ] Idempotenz, Retry, Dead Letter/Reconciliation, Monitoring und Alarmierung definiert.
- [ ] End-to-End-Testfälle und verantwortliche externe Partner bestätigt.

### F. B2B

- [ ] B2B Suite bzw. kundenspezifische Firmen-/Rollen-/Freigabe-/Budget-/Angebotsprozesse identifiziert.
- [ ] B2B-Funktionen nicht als Standarddatenmigration eingeplant.
- [ ] Zielprodukt/Extension oder Neubauentscheidung, Datenmodell und Migration je B2B-Prozess geklärt.
- [ ] Organisations-, Benutzer-, Rechte- und kundenspezifische Preis-/Sortimentslogik abgenommen.

### G. Payment und Versand

- [ ] Payment: Providerkonto, Merchant IDs, Credentials, Domains, Webhooks und Statusmapping dokumentiert.
- [ ] Authorization, 3DS, Capture, Partial Capture, Refund, Partial Refund, Cancel und Fehlerpfade getestet.
- [ ] Token-/Mandatsportabilität schriftlich vom Provider bestätigt oder als nicht übertragbar geplant.
- [ ] Versandmethoden getrennt von Kosten, Regeln, Ländern, Gewichten, Zuschlägen und Verfügbarkeiten geprüft.
- [ ] Label, Manifest, Tracking, Retoure und Carrier-Fehlerpfade End-to-End getestet.

### H. SEO, URLs und Inhalte

- [ ] Vollständiger Crawl/Export indexierbarer URLs, Statuscodes, Canonicals, hreflang, Meta, strukturierter Daten und interner Links liegt vor.
- [ ] Jede relevante Alt-URL hat Zielentscheidung: beibehalten / direkte 301/308 / 410 / begründete Ausnahme.
- [ ] Keine Redirect-Ketten, Schleifen, pauschalen Homepage-Redirects oder Soft-404-Muster.
- [ ] Self-Canonicals, hreflang, interne Links, Sitemap, Robots und Indexierungsfreigabe im Ziel geprüft.
- [ ] Content-/Medienmigration und ggf. Alt-Texte fachlich abgenommen.
- [ ] Monitoringplan ohne Rankinggarantie vorbereitet.

### I. Test, Cutover und Rollback

- [ ] Funktionsmatrix deckt Katalog, Suche, Konto, Checkout, Bestellungen, Dokumente, E-Mails, Administration und kritische Sonderprozesse ab.
- [ ] Datenabgleich, Integrationstests, Security-, Accessibility- und Performancechecks bestanden.
- [ ] Generalprobe mit gemessenen Laufzeiten, Fehlern, Verantwortlichen und Go/No-Go-Kriterien durchgeführt.
- [ ] Schreibstopp, finaler Lauf, DNS/CDN/Cache, Queue/Cron, Secrets, Webhooks und Smoke-Tests im Cutover-Runbook enthalten.
- [ ] Rollbackkriterien, Entscheidungszeitpunkt, Backup/Restore und Umgang mit nach Cutover entstandenen Daten getestet.
- [ ] Finalisierung im Migration Assistant erst nach Sign-off vorgesehen.
- [ ] Hypercare, Monitoring, Incidentkanal und Übergabe in den Betrieb definiert.

## 5. MIG-TECH-04 – Aufwand und Abhängigkeiten

### 5.1 Aufwand bis zu einem intern reviewfähigen noindex Build

| Paket | Schätzung | Abhängigkeiten | Definition of Done |
| --- | ---: | --- | --- |
| Contentmodell + dynamische Route | 2 PT | finaler Slug, Collection-Schema | Drei statische Routen aus typisiertem Content; Draft-/Release-Gate aktiv. |
| Gemeinsame Landingpage-Komponenten | 2 PT | UI-System vorhanden | Breadcrumbs, Hero, Prüffelder, Matrix, Prozess, FAQ, Related Links und CTA semantisch/responsiv. |
| Hub integrieren | 1.5–2 PT | Miras korrigierte Hub-Copy, CTA-Entscheid | Copy vollständig, keine gesperrten Claims, Links/Anchors korrekt. |
| Zwei Supporting Pages | 2–3 PT | Copy nach Claims-Review | Je Seite eigenständige Intention, keine Dublette, vollständige Pflichtabschnitte. |
| SEO-/Release-Gates + Sitemap | 1 PT | Produktions-Canonical unverändert | Preview ohne Canonical/Prod-URLs; noindex/robots; Produktionspfad vorbereitbar. |
| Automatisierte + visuelle QA | 1.5–2 PT | alle drei Routen gebaut | Check/Build/Guard, Multi-Route-Browser-QA, 4 Viewports, No-JS, Reduced Motion, Keyboard, Screenshots. |

**Gesamtrahmen:** **10–12 PT** für Welle 1 bis zum intern reviewfähigen noindex Build. Das ist eine Implementierungsschätzung, keine Kundenpreis-, Dauer- oder Lieferzusage. Nicht enthalten: neue Bildproduktion, Formular/CRM, Analytics/Consent, echte Case-Assets, rechtliche Prüfung oder Produktivmigration.

### 5.2 Kritischer Pfad

1. Sven: Claims-/IA-Gate (**erledigt**).
2. Mira: Route und Copy-Korrekturen übernehmen; Hub plus zwei Supporting Pages als reviewfähige Copy liefern.
3. Stephen: Leistungsumfang/CTA/„Migrations-Check“ entscheiden; für einen neutralen Mailto-CTA nicht zwingend vor lokalem Scaffold nötig.
4. Sven: Contentmodell, Komponenten und drei Routen lokal implementieren.
5. Sven + Mira: technische und redaktionelle QA; Claim-Quellen erneut prüfen.
6. Owner: separate Freigabe für Push/noindex Preview.
7. Späteres separates Release-Gate: Indexierung, Canonicals/Sitemap, Hosting/Produktion/DNS.

### 5.3 Blocker und Entscheidungen

- **Kein Architekturblocker:** lokaler Scaffold und noindex Build können nach Copy-Übergabe beginnen.
- **Copy-Abhängigkeit:** Supporting Pages benötigen Miras ausformulierte Texte auf Basis der Pflichtabschnitte und Claims-Matrix.
- **Owner-Entscheidung:** Bietet DigitalForces konkret Analyse/Check, Konzeption, Umsetzung, Go-live-Begleitung und Betrieb an? Bis dahin keine Deliverable-Zusage.
- **CTA-Entscheidung:** „Migrations-Check“ bleibt Arbeitsbegriff; Default ist „Migrationsvorhaben besprechen“ per Mailto.
- **Proof:** kein migrationsspezifischer Case; keine Kunden-/Referenzsektion in Welle 1.
- **SEO-Entscheidung:** Keyword-/SERP-Validierung kann nach Welle 1 erfolgen; sie blockiert die fachlich saubere Hub-Architektur nicht.

## 6. MIG-QA-01 – Abnahmecheckliste

### 6.1 Für jede Landingpage

**Build und Governance**

- [ ] `npm run check`, `npm run build`, `npm audit --audit-level=high` und Ausschluss-/Content-Guard erfolgreich.
- [ ] Route ist im statischen Build vorhanden und liefert lokal HTTP 200.
- [ ] Keine Kunden, Referenzen, Logos, Screenshots, Zahlen oder Ergebnisclaims.
- [ ] Technische Aussagen besitzen Quelle, Reviewdatum und Status; keine Dauer-/Preis-/Downtime-/Vollständigkeits-/SEO-/Performancezusage.

**SEO und Metadaten**

- [ ] Eindeutiger Title, Meta Description, H1 und Intent; keine Kannibalisierung zwischen Hub und Supporting Pages.
- [ ] Preview: `noindex, nofollow, noarchive`, keine Production-Canonical/`og:url`, Robots `Disallow: /`, Sitemap ohne Production-URLs.
- [ ] Release-Simulation: korrekte Self-Canonical unter `https://www.digital-forces.de`, nur freigegebene Routen in Sitemap.
- [ ] BreadcrumbList/optionales Service-JSON-LD valide und deckungsgleich mit sichtbarer Copy.
- [ ] Interne Links, Breadcrumbs, Anchors und Mailto-Ziel korrekt; keine 4xx, Redirectketten oder Draft-Links.

**Accessibility und No-JS**

- [ ] Genau eine H1, logische Heading-Hierarchie, Landmarken, Skip-Link und eindeutige Linknamen.
- [ ] Tastaturreihenfolge, sichtbarer Fokus, native FAQ-Bedienung und Mobile-Navigation geprüft.
- [ ] 1440/1024/768/390 px ohne horizontalen Overflow; Tabellen/Definition Lists bleiben lesbar.
- [ ] Inhalte mit deaktiviertem JavaScript vollständig sichtbar; keine Funktion ist von Hydration abhängig.
- [ ] `prefers-reduced-motion: reduce` unterdrückt nicht notwendige Bewegung; keine Inhalte bleiben verborgen.
- [ ] WCAG-2.2-AA-orientierter Kontrast, Reflow, Target Size und Focus Appearance manuell/automatisiert geprüft.

**Performance und Netzwerk**

- [ ] Kein routenspezifisches Client-JavaScript ohne begründete Funktion.
- [ ] Keine externen Requests, Fonts, Tracker oder Analytics; Mailto-only.
- [ ] Neue Bilder nur optimiert mit expliziten Maßen, sinnvoller Ladepriorität und passendem Alt-Text bzw. leerem Alt bei Dekoration.
- [ ] CLS-Labziel ≤ 0,1 und mobiles LCP-Labziel ≤ 2,5 s im vereinbarten Testprofil; keine öffentliche Performancezusage daraus ableiten.

### 6.2 Seitenspezifische Abnahme

**Hub**

- [ ] Erklärt Migration als neues Zielsystem, nicht als Update/1:1-Kopie.
- [ ] Trennt Datenübernahme, Mapping, Neuaufbau und projektabhängige Prüfung.
- [ ] Verlinkt beide Supporting Pages und `/leistungen/`; CTA ist neutral und bestätigt.

**Migrationsprozess**

- [ ] Enthält Voraussetzungen, Analyse, Zielbild, Probelauf, Neuaufbau, Daten-/Integrationstest, Generalprobe, Cutover, Rollbackkriterien und Hypercare.
- [ ] Wiederholungsläufe nicht als Echtzeitsynchronisierung und Rollback nicht als jederzeit möglich beschrieben.
- [ ] Migrationsfinalisierung ausdrücklich erst nach Abnahme.

**Daten, Plugins & Integrationen**

- [ ] Enthält Standarddaten, manuelle Mappings, Neuaufbau und nicht pauschal migrierbare Bereiche.
- [ ] Enthält Entscheidungslogik für Extensions/Individualcode sowie ERP/PIM/WMS, Payment, Versand und B2B.
- [ ] Keine pauschale Plugin-, Token-, API- oder Versandregel-Kompatibilität.

## 7. Übergabe Iteration 2

### Von Mira benötigt

1. Hub-Route auf `/leistungen/shopware-5-auf-6-migration/` und Supporting-Routen auf die verschachtelte IA umstellen.
2. Die fünf Satzkorrekturen aus Abschnitt 2.4 übernehmen.
3. „Migrationsprozess“ mit den Pflichtteilen aus QA 6.2 ausformulieren.
4. „Daten, Plugins & Integrationen“ entlang Discovery D–H ausformulieren.
5. CTA bis Owner-Entscheidung auf „Migrationsvorhaben besprechen“ begrenzen; keine Dauer-/Gratis-Microcopy.

### Nächster technischer Schritt

Nach Miras Copy-Übergabe: lokaler Implementierungsbranch/Commit für Collection, Template, Hub und zwei Supporting Pages. Vor Push oder Preview-Deployment ist eine neue Owner-Freigabe einzuholen.
