# Shopware-5→6-Migrationskampagne – Copy-/Implementierungs-QA v1

**Stand:** 2026-08-07  
**Status:** bedingt implementierungsbereit; vier redaktionelle/Import-Restpunkte offen  
**Task:** `shopware5-to-6-migration-landingpages-2026-08-07`  
**Scope:** technische Satz-, Claim-, IA- und Implementierungsprüfung; keine Seitenimplementierung, kein Push, kein Deployment.

## Geprüfte Quellen

- `/home/node/.openclaw/workspace-digitalforces-marketing/docs/shopware5-zu-6-hub-copy-v1.md`
- `/home/node/.openclaw/workspace-digitalforces-marketing/docs/shopware5-zu-6-migrationsprozess-copy-v1.md`
- `/home/node/.openclaw/workspace-digitalforces-marketing/docs/shopware5-zu-6-daten-plugins-integrationen-copy-v1.md`
- `/home/node/.openclaw/workspace-digitalforces-marketing/docs/shopware5-zu-6-technische-claimfreigabe-v1.md`
- `docs/shopware5-to-6-migration-iteration-2.md`

## Gesamturteil

Die IA, Metadaten, fachliche Trennung und technischen Qualifier sind grundsätzlich implementierbar. Es wurden keine Kunden-/Referenz-, Zeit-, Preis-, Gratis-, Downtime-, Datenvollständigkeits-, SEO-/Ranking- oder Performancezusagen gefunden. Die Copy ist nach vier kleinen P0-Korrekturen implementierungsreif.

## P0 – vor Content-Import korrigieren

| ID | Fundstelle | Befund | Erforderliche Korrektur | Abnahme |
| --- | --- | --- | --- | --- |
| COPY-QA-01 | Hub, Prozess Schritt 3 | Der Owner-freigegebene methodische Schritt „Neuaufbau/Datenübernahme“ wird im Hub nur als Zielsystem-/Funktionsaufbau dargestellt. | „Zielsystem aufbauen und Daten übertragen“; Body muss Aufbau plus Übertragung der vereinbarten Datenbereiche nennen. Schritt 4 bleibt fachlicher/technischer Test. | Datenübernahme im sichtbaren Ablauf vorhanden, ohne Vollständigkeitszusage. |
| COPY-QA-02 | Hub, Migrations-Check | Die Discovery-Beschreibung nennt Ausgangslage, Risiken und nächsten Schritt, aber nicht ausdrücklich das freigegebene Zielbild. | „In der Discovery-Phase klären wir Ausgangslage, Risiken, Zielbild und den sinnvollen nächsten Schritt.“ | alle vier Owner-bestätigten Elemente in einem Sinnabschnitt. |
| COPY-QA-03 | Hub H2; Daten-FAQ | Ansprache wechselt vom siteweiten „Du“ zu „euer“ bzw. „unsere“. | „dein Shop“; „deine ERP-/PIM-Anbindung“ oder neutrale Form. | keine Leseransprache im Ihr-/Wir-Frageformat außerhalb bewusst wörtlicher FAQ-Perspektive. |
| COPY-QA-04 | alle drei Copy-Dokumente | Status/Gates/Technikgrundlage und redaktionelle Hinweise wie „Keine … Verlinkung auf Watzka“ sind keine öffentliche Copy. Ein unselektierter Markdown-Import würde interne Governance sichtbar machen. | Redaktionsmetadaten in Frontmatter/Übergabehinweis isolieren; nur explizit markierte Seitenabschnitte in die Content Collection übernehmen. | Build-Inhalt enthält keine internen Status-, Gate-, Quellenpfad- oder Ausschlusshinweise. |

## P1 – redaktionelle Qualität, nicht blockierend

- Migrationsprozess: „Smoke Tests“ zu „Smoke-Tests“ und „Use Cases“ zu „Anwendungsfälle“ vereinheitlichen.
- Supporting-Page-Title mit 70 Zeichen kompakter fassen, z. B. `Shopware 5: Daten, Plugins & Integrationen | DigitalForces`.
- Die technische Claim-Freigabedatei führt Commercial-/Owner-Gates noch als offen. Den Governance-Status auf die Owner-Entscheidung vom 2026-08-07 aktualisieren; die Copy selbst verwendet bereits den korrekten engen Discovery-Scope.

## Technische Claim-Abnahme

| Bereich | Status | Prüfergebnis |
| --- | --- | --- |
| Shopware-5-Lifecycle | **bestanden** | Datierter Security-Update-Wortlaut und ausdrücklicher Verzicht auf einen konkreten Unsicherheitsclaim. |
| Neues Zielsystem / kein In-place-Update | **bestanden** | Assistant wird nur als Unterstützung für ausgewählte Standarddaten beschrieben. |
| Standarddaten und Mappings | **bestanden** | Beispiele bleiben ausgewählt/projektabhängig; Zahlungsarten, Anreden, Lieferzeiten und Versandlogik werden getrennt behandelt. |
| Theme, Einkaufswelten/Shopseiten, E-Mail-Templates | **bestanden** | als Zielaufbau, nicht als automatische Übernahme dargestellt. |
| Wiederholungsläufe | **bestanden** | nur für unterstützte Daten; keine Echtzeit-/CDC-/Parallelbetriebszusage. |
| Extensions und Individualcode | **bestanden** | Zielversions-, Funktions- und Datenpfadprüfung; Ersatz/Neubau/Abschaltung; keine direkte Weiterlaufzusage. |
| ERP/PIM/Fulfillment | **bestanden** | Systemführung, IDs, Datenrichtung, Mapping, Fehlerbehandlung und Abgleich werden projektbezogen genannt. |
| Payment und Versand | **bestanden** | Provider-/Vertragsabhängigkeit und Trennung von Methoden, Kosten/Regeln, Label/Tracking; keine Tokenzusage. |
| Datenabnahme | **bestanden** | Mengen/Konsistenz plus fachliche Stichproben; keine vollständige oder fehlerfreie Abdeckung versprochen. |
| SEO und URLs | **bestanden** | Inventar, Mapping, Redirects, Canonicals, interne Links und Monitoring; keine Rankingzusage. |
| Cutover und Rollback | **bestanden** | Änderungsfenster, Generalprobe, Smoke-Tests, Go/No-Go und spätester Rücksprungpunkt; DNS allein nicht als Datenrollback. |
| Finalisierung | **bestanden** | erst nach Bestätigung; danach keine Aktualisierungsläufe über den Assistant. |

## IA-/Implementierungsabnahme

- **Hub:** `/leistungen/shopware-5-auf-6-migration/` – korrekt.
- **Migrationsprozess:** `/leistungen/shopware-5-auf-6-migration/migrationsprozess/` – korrekt.
- **Daten, Plugins & Integrationen:** `/leistungen/shopware-5-auf-6-migration/daten-plugins-integrationen/` – korrekt.
- Hub und Supporting Pages besitzen eigenständige H1, Title, Description und Suchintention.
- Interne Links bilden Hub ↔ Supporting Pages sowie Rückweg zu Shopware Engineering ab.
- CTA und Microcopy entsprechen dem Owner-Gate; Mailto-Betreff muss bei Implementierung kampagnenspezifisch gesetzt werden.
- FAQ kann ohne Client-JavaScript über native `details/summary` umgesetzt werden.
- Vergleichstabellen benötigen bei 390 px eine gestapelte Darstellung oder semantische Definition Lists.
- Preview-Gates aus `Base.astro` bleiben: `noindex, nofollow, noarchive`, keine Production-Canonical/`og:url`, Robots `Disallow: /`.
- Vor einer Preview muss `sitemap.xml` so gegated werden, dass der Preview-Build keine Produktions-URLs für neue oder bestehende Routen ausliefert.
- `BreadcrumbList` ist für die verschachtelten Routen sinnvoll; kein Review-/Rating-/Case-Markup.

## Automatisierte Vorprüfung

- alle drei Dateien vollständig gelesen;
- Routen und Querverweise gegen die Ziel-IA geprüft;
- Suche nach Kunden-/Referenznamen, Gratis-/Dauer-/Preis-, Garantie-, Vollständigkeits-, Downtime-, Ranking- und Performanceformulierungen durchgeführt;
- Meta-Längen ermittelt: Hub Title 50 / Description 124; Prozess 60 / 130; Daten-Seite 70 / 139 Zeichen;
- referenzierte Claim-Freigabedatei ist vorhanden.

## Freigabestatus

**Bedingt implementierungsbereit.** Nach Bestätigung von COPY-QA-01 bis -04 ist kein fachlicher oder architektonischer Restblocker für die lokale Implementierung bekannt. Push, Preview-Deployment und jede Veröffentlichung bleiben separate Owner-Freigaben.
