export interface TextBlock {
  type: 'text';
  paragraphs: string[];
}

export interface ListBlock {
  type: 'list';
  label?: string;
  items: string[];
}

export interface StepsBlock {
  type: 'steps';
  items: Array<{ title: string; text: string }>;
}

export interface TableBlock {
  type: 'table';
  caption: string;
  headers: [string, string];
  rows: Array<[string, string]>;
}

export type MigrationBlock = TextBlock | ListBlock | StepsBlock | TableBlock;

export interface MigrationSection {
  id?: string;
  heading: string;
  blocks: MigrationBlock[];
  cta?: boolean;
}

export interface MigrationPage {
  slug: string;
  pathname: string;
  title: string;
  description: string;
  kicker: string;
  heading: string;
  intro: string;
  technicalNote?: string;
  secondaryLink?: { label: string; href: string };
  sections: MigrationSection[];
  faq: Array<{ question: string; answer: string }>;
  relatedLinks: Array<{ label: string; href: string }>;
}

export const migrationContact = {
  label: 'Migrationsvorhaben besprechen',
  subject: 'Shopware-5-zu-6-Migrationsvorhaben',
  microcopy: 'Wir klären Ausgangslage, Risiken und den sinnvollen nächsten Schritt.',
} as const;

export const migrationRoutes = migrationDetailRoutes;

export const migrationPages: MigrationPage[] = [
  {
    slug: 'shopware-5-auf-6-migration',
    pathname: migrationRoutes.hub,
    title: 'Shopware 5 zu Shopware 6 Migration | DigitalForces',
    description: 'Shopware 5 geordnet auf Shopware 6 vorbereiten: Daten, Erweiterungen, Schnittstellen, URLs und Go-live frühzeitig einordnen.',
    kicker: 'Shopware 5 → Shopware 6',
    heading: 'Shopware 5 ablösen. Den nächsten Schritt sauber entscheiden.',
    intro: 'Ein Wechsel auf Shopware 6 betrifft mehr als ein neues System. Entscheidend ist, welche Daten übertragen werden können und welche Funktionen, Schnittstellen und Abläufe im neuen Setup neu bewertet werden müssen.',
    technicalNote: 'Seit Ende Juli 2024 stellt Shopware für Shopware 5 keine weiteren Sicherheitsupdates bereit. Daraus folgt keine Aussage über den Sicherheitszustand eines konkreten Shops; die relevante Entscheidung beginnt mit dessen System- und Abhängigkeitslage.',
    secondaryLink: { label: 'Was vor der Migration geklärt werden sollte', href: '#vorbereitung' },
    sections: [
      {
        id: 'vorbereitung',
        heading: 'Erst verstehen, was dein Shop heute wirklich leistet.',
        blocks: [
          { type: 'text', paragraphs: ['Der sichtbare Shop ist nur ein Teil des Systems. Individuelle Funktionen, Datenflüsse und interne Abläufe entscheiden mit darüber, wie ein sinnvoller Zielzustand aussehen kann.'] },
          { type: 'list', label: 'Was im Migrations-Check für deinen Shop betrachtet wird', items: [
            'relevante Katalog-, Kunden- und Bestelldaten',
            'Erweiterungen und individuelle Funktionen',
            'angebundene Systeme und fachliche Prozesse',
            'Inhalte, URLs und relevante Verkaufskanäle',
            'Test, Umschaltung und Verantwortlichkeiten danach',
          ] },
        ],
      },
      {
        heading: 'Nicht jede bestehende Funktion sollte unverändert nachgebaut werden.',
        blocks: [
          { type: 'text', paragraphs: ['Eine Migration ist keine Kopie des alten Shops. Im ersten Schritt geht es darum, geschäftskritische Anforderungen von Routinen zu unterscheiden, die sich im Laufe der Zeit angesammelt haben.'] },
          { type: 'list', label: 'Entscheidungsraster', items: [
            'per Standardmigration übertragen, wenn Daten und Zielmodell passen',
            'mit einer kompatiblen Lösung im Zielsystem fortführen',
            'ersetzen, wenn ein anderer Ansatz fachlich und technisch besser passt',
            'gezielt neu entwickeln, wenn eine geschäftskritische Logik nicht passend abbildbar ist',
            'kontrolliert abschalten, wenn Nutzen und Aufwand nicht mehr zusammenpassen',
          ] },
        ],
      },
      {
        heading: 'Ein Ablauf, der Scope, Reihenfolge und Testaufwand sichtbar macht.',
        blocks: [
          { type: 'steps', items: [
            { title: 'Bestandsaufnahme', text: 'Daten, Funktionen, Systeme und Abhängigkeiten erfassen.' },
            { title: 'Zielbild', text: 'Prioritäten, Zielsystem und Entscheidungen für das Vorhaben klären.' },
            { title: 'Zielsystem aufbauen und Daten übertragen', text: 'Erforderliche Konfigurationen, Inhalte und Funktionen im Ziel aufbauen und die vereinbarten Datenbereiche übertragen.' },
            { title: 'Daten, Integrationen und Geschäftsprozesse testen', text: 'Vereinbarte Datenbereiche und kritische Abläufe fachlich und technisch prüfen.' },
            { title: 'Cutover vorbereiten', text: 'Umschaltung, Smoke Tests, Go/No-Go und den Rückfallweg konkret planen.' },
            { title: 'Stabilisierung', text: 'Offene Punkte, Monitoring und die nächsten Schritte nach dem Go-live organisieren.' },
          ] },
          { type: 'text', paragraphs: ['Der genaue Umfang ergibt sich aus System, Geschäftsprozessen und Zielbild.'] },
        ],
      },
      {
        heading: 'Wo eine frühe Prüfung besonders wichtig ist.',
        blocks: [{
          type: 'table',
          caption: 'Konstellationen für einen frühen Migrations-Check',
          headers: ['Konstellation', 'Frage für den Migrations-Check'],
          rows: [
            ['Viele Erweiterungen oder individuelle Funktionen', 'Welche Funktion wird im Zielsystem wie abgebildet?'],
            ['Mehrere angebundene Systeme', 'Welche Daten und Prozesse sind systemübergreifend kritisch?'],
            ['Gewachsene Inhalte und URL-Strukturen', 'Welche Inhalte, Ziel-URLs und Weiterleitungen müssen eingeplant werden?'],
            ['Unklare Verantwortlichkeiten', 'Wer entscheidet, testet und trägt den Betrieb nach der Umschaltung?'],
          ],
        }],
      },
      {
        heading: 'Shopware-5→6 Migrations-Check',
        blocks: [{ type: 'text', paragraphs: ['In der Discovery-Phase klären wir Ausgangslage, Risiken, Zielbild und den sinnvollen nächsten Schritt. Daraus entsteht ein gemeinsames Bild darüber, welche Daten und Funktionen im Scope liegen, welche Abhängigkeiten zuerst geprüft werden und welche Entscheidung vor einer Umsetzung noch fehlt.'] }],
        cta: true,
      },
    ],
    faq: [
      { question: 'Ist der Wechsel von Shopware 5 auf Shopware 6 ein einfaches Update?', answer: 'Nein. Shopware 6 wird als neues Zielsystem aufgebaut. Der Migration Assistant kann ausgewählte unterstützte Standarddaten übertragen, ersetzt aber Funktionsabgleich und Tests nicht.' },
      { question: 'Was passiert mit Plugins und Schnittstellen?', answer: 'Das hängt von der jeweiligen Erweiterung oder Anbindung ab. Zielversion, Datenpfad, Ersatz- oder Neubauentscheidung und End-to-End-Test werden pro Funktion geklärt.' },
      { question: 'Was passiert mit URLs und Inhalten?', answer: 'Bestehende URLs und Inhalte werden inventarisiert und als eigener Prüfpunkt behandelt. Zielzuordnung, Weiterleitungen, Canonicals, interne Links und Monitoring werden für das konkrete Vorhaben geplant; Rankings werden nicht versprochen.' },
      { question: 'Wie lange dauert eine Migration und was kostet sie?', answer: 'Das hängt von Daten, Funktionen, Integrationen, Testtiefe und Zielbild ab. Pauschale Zeit- oder Preisangaben wären nicht belastbar.' },
      { question: 'Gibt es zuerst nur eine Discovery-Phase?', answer: 'Ja. Der Shopware-5→6 Migrations-Check dient dazu, Ausgangslage, Risiken und den sinnvollen nächsten Schritt einzuordnen. Der weitere Umfang wird erst danach festgelegt.' },
    ],
    relatedLinks: [
      { label: 'Migrationsprozess', href: migrationRoutes.process },
      { label: 'Daten, Plugins & Integrationen', href: migrationRoutes.dependencies },
      { label: 'Shopware Engineering', href: '/leistungen/#shopware-engineering' },
    ],
  },
  {
    slug: 'shopware-5-auf-6-migration/migrationsprozess',
    pathname: migrationRoutes.process,
    title: 'Shopware 5 zu 6: Migrationsprozess verstehen | DigitalForces',
    description: 'Welche Phasen und Entscheidungen vor einer Shopware-5→6-Migration geklärt werden sollten – von Inventur und Probelauf bis Go-live.',
    kicker: 'Shopware 5 → Shopware 6',
    heading: 'Eine Migration beginnt vor dem ersten Datentransfer.',
    intro: 'Der Wechsel auf Shopware 6 ist kein In-place-Update. Ein neues Zielsystem wird vorbereitet; der Migration Assistant kann ausgewählte unterstützte Standarddaten aus Shopware 5 übertragen. Was im Zielsystem neu aufgebaut, zugeordnet oder geprüft werden muss, entscheidet sich im konkreten Shop.',
    sections: [
      {
        heading: '1. Ausgangslage und Zielbild erfassen',
        blocks: [
          { type: 'text', paragraphs: ['Vor dem Zielsystem braucht es eine gemeinsame Sicht auf relevante Daten, Verkaufskanäle, Erweiterungen, individuellen Code, angebundene Systeme, Inhalte, URLs und Verantwortlichkeiten im Betrieb.'] },
          { type: 'list', items: [
            'Welche fachlichen Prozesse sind geschäftskritisch?',
            'Welche Daten und Dokumente gehören in den vereinbarten Zielumfang?',
            'Welche Erweiterungen, Schnittstellen und Jobs beeinflussen Bestellung, Bestand, Preis oder Kundenkommunikation?',
            'Welche Shopware-6-Zielversion und Zielarchitektur passen zum Vorhaben?',
          ] },
        ],
      },
      {
        heading: '2. Zielsystem und ersten Probelauf vorbereiten',
        blocks: [{ type: 'text', paragraphs: [
          'Shopware 6 wird als neues Zielsystem aufgebaut. Vor dem eigentlichen Zielaufbau gehören eine isolierte Umgebung sowie ein nachweisbarer Backup- und Restore-Weg zur Vorbereitung. Ein erster Probelauf zeigt, welche unterstützten Daten übertragbar sind und wo Zuordnung, Bereinigung oder zusätzliche Umsetzung nötig wird.',
          'Datenübernahme und Funktionsaufbau werden bewusst getrennt geplant. Wenn ein Probelauf zurückgesetzt werden muss, soll das nicht unkontrolliert bereits aufgebaute Funktionen treffen.',
        ] }],
      },
      {
        heading: '3. Daten zuordnen und Zielsystem aufbauen',
        blocks: [
          { type: 'text', paragraphs: ['Der Migration Assistant unterstützt Auswahl, Datencheck, Fehlerbehandlung und Protokolle. Einige Einstellungen müssen im Ziel vorab angelegt und zugeordnet werden. Theme, Einkaufswelten beziehungsweise Shopseiten und alte E-Mail-Templates gehören nicht einfach in eine Übernahme, sondern in den Zielaufbau.'] },
          { type: 'list', label: 'Zu klären', items: [
            'Welche Daten sind für den vereinbarten Scope fachlich korrekt und ausreichend?',
            'Welche Zahlungs- und Versandlogik muss im Ziel vorbereitet und getestet werden?',
            'Welche Funktionen werden per Standardmigration übertragen, im Zielsystem fortgeführt, ersetzt, neu entwickelt oder abgeschaltet?',
          ] },
        ],
      },
      {
        heading: '4. Daten, Integrationen und Geschäftsprozesse testen',
        blocks: [{ type: 'text', paragraphs: [
          'Ein belastbarer Abgleich verbindet Datenmengen und Konsistenz mit fachlichen Stichproben. Je nach Scope gehören Varianten, Preise, Bestände, Kundenzuordnung, Bestellungen und Dokumente ebenso dazu wie Login, Checkout, E-Mails und die Zusammenarbeit mit angebundenen Systemen.',
          'Der Abnahmekatalog wird vorab vereinbart. Fachliche Verantwortliche prüfen reale Use Cases; technische Fehler, Einschränkungen und Restarbeiten bleiben dokumentiert sichtbar.',
        ] }],
      },
      {
        heading: '5. Generalprobe und Cutover vorbereiten',
        blocks: [{ type: 'text', paragraphs: [
          'Für unterstützte Daten sind wiederholte Aktualisierungsläufe möglich. Vor der Umschaltung werden Ablauf und Laufzeit im konkreten System erprobt. Ein Cutover braucht ein abgestimmtes Änderungsfenster, Finalmigration, Prüfungen an Domains, Verkaufskanälen und Integrationen sowie Smoke Tests und ein fachliches Go/No-Go.',
          'Ein Rückfallweg beschreibt Verantwortliche, Entscheidungskriterien und den spätesten sicheren Rücksprungpunkt. Sobald das Zielsystem neue Daten annimmt, reicht ein reines Zurückdrehen von Routing oder DNS nicht als Datenrollback aus.',
        ] }],
      },
      {
        heading: '6. Stabilisierung und Abschluss',
        blocks: [{ type: 'text', paragraphs: ['Nach der Umschaltung werden Monitoring, Fehlerbehandlung und Restarbeiten für den vereinbarten Zeitraum organisiert. Die Migration wird erst finalisiert, wenn Go-live und Datenstand bestätigt sind; danach sind Aktualisierungsläufe über den Assistant nicht mehr möglich.'] }],
      },
    ],
    faq: [
      { question: 'Können wir bis zum letzten Moment weiterverkaufen?', answer: 'Das hängt von Daten, angebundenen Systemen und dem vereinbarten Cutover ab. Wiederholte Aktualisierungsläufe sind für unterstützte Daten möglich; eine pauschale Parallelbetriebszusage wäre nicht belastbar.' },
      { question: 'Wie lange dauert die Migration?', answer: 'Das ist abhängig von Daten, Funktionen, Integrationen, Testtiefe und Zielbild. Diese Seite nennt deshalb keine pauschale Dauer.' },
      { question: 'Was passiert, wenn beim Go-live etwas nicht funktioniert?', answer: 'Vorher werden Go/No-Go-Kriterien, Verantwortlichkeiten und ein Rückfallweg festgelegt. Welche Optionen dann bestehen, hängt vom definierten Zeitpunkt und vom Datenstand in beiden Systemen ab.' },
    ],
    relatedLinks: [
      { label: 'Shopware-5→6 Migration', href: migrationRoutes.hub },
      { label: 'Daten, Plugins & Integrationen', href: migrationRoutes.dependencies },
    ],
  },
  {
    slug: 'shopware-5-auf-6-migration/daten-plugins-integrationen',
    pathname: migrationRoutes.dependencies,
    title: 'Shopware 5 Migration: Daten, Plugins und Integrationen | DigitalForces',
    description: 'Daten, Erweiterungen und Schnittstellen vor der Shopware-5→6-Migration strukturiert einordnen und die richtigen Entscheidungen vorbereiten.',
    kicker: 'Shopware 5 → Shopware 6',
    heading: 'Daten, Plugins und Integrationen vor der Migration richtig einordnen.',
    intro: 'Bei einer Migration kommen Daten, Erweiterungen und Integrationen nicht alle auf demselben Weg ins Zielsystem. Entscheidend ist die Trennung zwischen unterstützten Standarddaten, notwendigen Zuordnungen und individuell zu prüfenden Funktionen.',
    sections: [
      {
        heading: 'Drei Klassen, die vor dem Scope getrennt werden sollten',
        blocks: [{
          type: 'table',
          caption: 'Einordnung von Daten, Konfiguration und individuellen Funktionen',
          headers: ['Klasse', 'Einordnung'],
          rows: [
            ['Unterstützte Standarddaten', 'Der Assistant kann ausgewählte Daten wie Kategorien, Produkte, Kunden, Bestellungen, Medien oder SEO-URLs übertragen. Die konkrete Auswahl und der Abgleich bleiben Teil des Projekts.'],
            ['Zuordnung und Zielkonfiguration', 'Beispielsweise Zahlungsarten, Standardzahlungsart, Anreden und Lieferzeiten werden im Ziel vorbereitet und zugeordnet. Versandarten und Versandkostenlogik werden getrennt betrachtet.'],
            ['Individuell zu prüfen', 'Erweiterungen, individueller Code, Daten aus eigenen Tabellen und angebundene Systeme brauchen eine eigene fachliche und technische Entscheidung.'],
          ],
        }],
      },
      {
        heading: 'Datenqualität ist ein Projektpunkt – keine Annahme.',
        blocks: [{ type: 'text', paragraphs: [
          'Vor dem Transfer wird geklärt, welche Daten im vereinbarten Zielumfang tatsächlich benötigt werden und woran ihre fachliche Richtigkeit gemessen wird. Dazu zählen Beziehungen zwischen Produkten, Varianten, Preisen, Beständen, Kunden und Bestellungen sowie Medien und Dokumente.',
          'Einzelne Metadatenfelder können aufgrund unterschiedlicher Feldlängen gekürzt werden. Deshalb gehören Feldinventur, Stichproben und definierte Akzeptanzregeln in die Vorbereitung.',
        ] }],
      },
      {
        heading: 'Plugins nach Funktion und Datenpfad entscheiden',
        blocks: [
          { type: 'text', paragraphs: ['Nicht jede Erweiterung aus Shopware 5 hat eine passende Entsprechung in Shopware 6. Für jede Funktion wird strukturiert bewertet:'] },
          { type: 'list', items: [
            'Wird sie fachlich noch benötigt?',
            'Deckt Shopware 6 Core sie ab?',
            'Gibt es eine gepflegte Extension für die konkrete Zielversion?',
            'Ist eine Ersatzlösung sinnvoller?',
            'Muss eine geschäftskritische Logik neu gebaut werden?',
            'Kann eine riskante oder redundante Funktion kontrolliert abgeschaltet werden?',
          ] },
          { type: 'text', paragraphs: ['„Kompatibel“ heißt nicht, ein Shopware-5-Plugin zu kopieren. Benötigt wird eine passende Shopware-6-Variante, deren Funktions- und Datenpfad im Zielsystem geprüft wurde.'] },
        ],
      },
      {
        heading: 'Individualcode und Integrationen sichtbar machen',
        blocks: [
          { type: 'text', paragraphs: ['Bei individuellem Code gehören Schnittstellen, Datenmodell, APIs, Jobs, Berechtigungen sowie Storefront- und Admin-Verhalten in die Inventur. Bei ERP-, PIM- oder Fulfillment-Anbindungen wird festgelegt, welches System für welche Daten führend ist, wie IDs und Datenrichtungen zugeordnet werden und wie Fehler sowie Abgleiche behandelt werden.'] },
          { type: 'list', label: 'Fragen für die Vorbereitung', items: [
            'Wo werden Produkte, Preise, Bestände und Kundendaten führend gepflegt?',
            'Welche Prozesse laufen zeitgesteuert oder asynchron?',
            'Welche Abhängigkeiten bestehen bei Varianten, Preisen, Rabatten oder Bestellstatus?',
            'Wie werden Fehler erkannt, wiederholt und fachlich abgeglichen?',
          ] },
        ],
      },
      {
        heading: 'Payment und Versand separat prüfen',
        blocks: [{ type: 'text', paragraphs: [
          'Bei Payment gehören Anbieter-/Account-Konfiguration, Domains, Webhooks, Zahlungsstatus und relevante Fehlerfälle in das Testsystem. Zahlungsdaten, Tokens, Mandate oder Vault-Referenzen werden nicht pauschal als migrierbar bezeichnet; das ist provider- und vertragsabhängig.',
          'Bei Versand werden Methoden, Kosten- und Regel-Logik, Länder, Gewichte, Zuschläge sowie Label-, Tracking- und Fulfillment-Prozesse getrennt geprüft. Ein übertragener Versandart-Datensatz ist nicht automatisch eine vollständige Versandkostenkonfiguration.',
        ] }],
      },
      {
        heading: 'Abnahme verbindet Daten und reale Geschäftsprozesse',
        blocks: [{ type: 'text', paragraphs: ['Neben Mengen- und Konsistenzprüfungen gehören vereinbarte End-to-End-Prozesse in die Abnahme: zum Beispiel Login, relevante Preis-/Bestandsdarstellung, Checkout, Bestellstatus, Dokumente, E-Mails und die Abstimmung mit angebundenen Systemen. Der genaue Katalog wird pro Zielbild festgelegt; eine vollständige oder fehlerfreie Abdeckung wird nicht versprochen.'] }],
      },
    ],
    faq: [
      { question: 'Werden alle Daten automatisch übernommen?', answer: 'Nein. Der Assistant unterstützt ausgewählte Standarddaten. Was zugeordnet, neu aufgebaut oder individuell übertragen werden muss, wird für den vereinbarten Scope geprüft.' },
      { question: 'Können alle Plugins weiterlaufen?', answer: 'Nein. Entscheidend sind fachlicher Zweck, Zielversions-Kompatibilität, Datenpfad, Wartbarkeit, Lizenz und Betrieb. Die Entscheidung kann Fortführung mit einer passenden Zielsystemlösung, Ersatz, Neubau oder Abschaltung sein.' },
      { question: 'Bleibt die ERP- oder PIM-Anbindung unverändert?', answer: 'Das lässt sich nicht pauschal zusagen. Datenrichtung, IDs, Mapping, Fehlerbehandlung und fachlicher Abgleich werden für die jeweilige Anbindung festgelegt.' },
      { question: 'Sind Zahlungsdaten nach der Migration vorhanden?', answer: 'Das ist abhängig vom Zahlungsanbieter und den vertraglichen sowie technischen Vorgaben. Zahlungsdaten, Tokens und Mandate werden nicht allgemein als migrierbar beschrieben.' },
    ],
    relatedLinks: [
      { label: 'Shopware-5→6 Migration', href: migrationRoutes.hub },
      { label: 'Migrationsprozess', href: migrationRoutes.process },
      { label: 'Shopware Engineering', href: '/leistungen/#shopware-engineering' },
    ],
  },
];
import { migrationDetailRoutes } from '../config/public-routes';
