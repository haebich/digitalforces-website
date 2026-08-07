# Shopware-5→6-Migrationskampagne – Copy-/Implementierungs-QA v1

**Stand:** 2026-08-07  
**Status:** technisch implementierungsbereit; P0-Abschluss-Recheck bestanden
**Task:** `shopware5-to-6-migration-landingpages-2026-08-07`  
**Scope:** technische Satz-, Claim-, IA- und Implementierungsprüfung; keine Seitenimplementierung, kein Push, kein Deployment.

## Geprüfte Quellen

- `/home/node/.openclaw/workspace-digitalforces-marketing/docs/shopware5-zu-6-hub-copy-v1.md`
- `/home/node/.openclaw/workspace-digitalforces-marketing/docs/shopware5-zu-6-migrationsprozess-copy-v1.md`
- `/home/node/.openclaw/workspace-digitalforces-marketing/docs/shopware5-zu-6-daten-plugins-integrationen-copy-v1.md`
- `/home/node/.openclaw/workspace-digitalforces-marketing/docs/shopware5-zu-6-technische-claimfreigabe-v1.md`
- `docs/shopware5-to-6-migration-iteration-2.md`

## Gesamturteil

Die IA, Metadaten, fachliche Trennung und technischen Qualifier sind implementierbar. Es wurden keine Kunden-/Referenz-, Zeit-, Preis-, Gratis-, Downtime-, Datenvollständigkeits-, SEO-/Ranking- oder Performancezusagen gefunden. Alle vier P0-Korrekturen sind im Abschluss-Recheck bestätigt.

## P0 – abgeschlossen

| ID | Fundstelle | Befund | Erforderliche Korrektur | Abnahme |
| --- | --- | --- | --- | --- |
| COPY-QA-01 | Hub, Prozess Schritt 3 | **bestanden** | „Zielsystem aufbauen und Daten übertragen“ nennt Aufbau und vereinbarte Datenbereiche; Tests bleiben ein eigener Schritt. |
| COPY-QA-02 | Hub, Migrations-Check | **bestanden** | Ausgangslage, Risiken, Zielbild und sinnvoller nächster Schritt stehen gemeinsam im Discovery-Abschnitt. |
| COPY-QA-03 | Hub H2; Daten-FAQ | **bestanden** | „dein Shop“ und neutrale ERP-/PIM-Frage; kein unbeabsichtigter Wechsel zur Ihr-/Wir-Ansprache. |
| COPY-QA-04 | alle drei Copy-Dokumente | **bestanden** | Interne Kommentare, Status-/Gate-/Quellenpfad- und Ausschlusshinweise wurden entfernt; Scan auf interne Marker und gesperrte Namen ohne Treffer. |

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
- Das YAML-Frontmatter aller drei Dateien ist syntaktisch valide; Routen sind eindeutig, CTA-Felder und Related Links sind vollständig.
- Der Markdown-Body ist ein strukturiertes redaktionelles Übergabeformat (`## Hero`, `**H1**` usw.), kein direkt semantisch auszugebendes Seiten-HTML. Bei der Implementierung werden die Felder/Abschnitte in die typisierte Collection und Komponenten gemappt; ein generisches `render()` des gesamten Bodys würde die H1-/Komponentensemantik nicht erfüllen.
- FAQ kann ohne Client-JavaScript über native `details/summary` umgesetzt werden.
- Vergleichstabellen benötigen bei 390 px eine gestapelte Darstellung oder semantische Definition Lists.
- Preview-Gates aus `Base.astro` bleiben: `noindex, nofollow, noarchive`, keine Production-Canonical/`og:url`, Robots `Disallow: /`.
- Vor einer Preview muss `sitemap.xml` so gegated werden, dass der Preview-Build keine Produktions-URLs für neue oder bestehende Routen ausliefert.
- `BreadcrumbList` ist für die verschachtelten Routen sinnvoll; kein Review-/Rating-/Case-Markup.

## Automatisierte Vorprüfung

- alle drei korrigierten Dateien vollständig gelesen;
- YAML-Frontmatter mit Parser validiert; Pflichtfelder, eindeutige Routen, Mailto-CTA und interne Zielrouten geprüft;
- Routen und Querverweise gegen die Ziel-IA geprüft;
- Suche nach Kunden-/Referenznamen, Gratis-/Dauer-/Preis-, Garantie-, Vollständigkeits-, Downtime-, Ranking- und Performanceformulierungen durchgeführt;
- Suche nach internen Kommentaren, Status-/Gate-Markern und ausgeschlossenen Namen ohne Treffer;
- Meta-Längen ermittelt: Hub Title 50 / Description 124; Prozess 60 / 130; Daten-Seite 70 / 139 Zeichen;
- referenzierte Claim-Freigabedatei ist vorhanden.

## Freigabestatus

**Technisch implementierungsbereit.** COPY-QA-01 bis -04 sind geschlossen; es ist kein fachlicher oder architektonischer Restblocker für die lokale Implementierung bekannt. Die P1-Sprach-/Title-Optimierungen können im redaktionellen Feinschliff erfolgen. Push, Preview-Deployment und jede Veröffentlichung bleiben separate Owner-Freigaben.
