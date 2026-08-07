# Systemvisual im Leistungsmodul

## Aktueller lokaler Stand

- Datei: `public/assets/df-code-card-engineering-visual-v1.webp`
- Quelle: freigegebenes Generierungsasset `code-card-engineering-visual---f3554ba7-48c2-413c-b651-0919fc82751a.webp`; Originaldatei unverändert
- Format: WebP, sRGB, ohne Alpha
- Quelldimensionen: 1536 × 1024 px
- Dateigröße: 33.480 Bytes (lokal weboptimiert; Quelldatei unverändert)
- Einordnung: generisches, KI-generiertes Markenvisual; keine Kunden-, Team- oder Projektdokumentation
- Platzierung: unterhalb der wechselnden Leistungsdetails in der rechten Spalte des Leistungsmoduls
- Laden: `loading="lazy"`, `decoding="async"`, explizite Breite und Höhe gegen Layout Shift
- Alt-Text: „Abstrakte Visualisierung von digitalem Engineering und modularen Systemen.“

## Responsive Crop

- Desktop/Tablet über 800 px: mindestens 330 px hoch, `object-fit: cover`, Fokus `50% center`; Copy als eigener `figcaption` auf der ruhigen rechten Bildfläche
- Mobile bis 800 px: Bildslot 4:3, `object-fit: cover`, Fokus `38% center`; Caption folgt als eigener Block unter dem Bild
- Horizontaler dunkler Verlauf stärkt auf Desktop den Kontrast der rechten Copy-Zone; keine Animation, Parallaxe oder Ken-Burns-Bewegung
- Bildinhalt und Caption bleiben semantisch als `figure`/`figcaption` verbunden; Text wird nicht in das Bild gerendert

## Spezifikation für einen späteren Ersatz

- WebP oder AVIF mit WebP-Fallback
- bevorzugt 1536 × 1024 px oder größer im Seitenverhältnis 3:2
- Zielgröße maximal 120 KB bei visuell sauberer Darstellung
- ruhige, technische Systemdarstellung ohne lesbare Kundendaten, Logos, reale Benutzeroberflächen oder Ergebnisclaims
- primäres Motiv in der linken Bildhälfte platzieren; die rechte Hälfte als ruhige Copy-Zone und den linken bis mittleren Ausschnitt für den mobilen 4:3-Crop auslegen
- keine feinen, inhaltstragenden Texte im Bild
- Alt-Text nach dem tatsächlichen Motiv neu formulieren; generische Motive nicht als Projektdokumentation bezeichnen
