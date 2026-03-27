# Dokumentace webu – Festival (P)o životě 2026

Tento soubor popisuje **aktuální implementovaný stav** webu. Slouží jako referenční dokument při dalších úpravách.

---

## Přehled projektu

- **Název:** (P)o životě 2026 – festival o smrti, který bourá tabu
- **Pořadatel:** Po životě z.s., IČO 21849471
- **Místo konání:** KC 101010, Tanvaldská 340, Liberec – Vratislavice nad Nisou
- **Datum konání:** sobota 25. dubna 2026
- **Web:** www.pozivote.org
- **Email:** info@pozivote.org
- **Transparentní účet:** 2602959939 / 2010
- **Datová schránka:** 7s97a5t
- **Prodej vstupenek a rezervace:** form.simpleshop.cz (Celodenní: /yX3mL/, Odpolední: /EOXk0/, Stezka: /zQ92B/, Řekni mi: /GXPk9/, Krematorium: /78poA/)

---

## Struktura souborů

```
/
├── index.html              – Hlavní stránka festivalu
├── program.html            – Podrobný program festivalu
├── vstupenky.html          – Vstupenky a rezervace
├── krematorium.html        – Den otevřených krematorií
├── rekni-mi.html           – „Řekni mi" u kafe
├── zahrada-vzpominek.html  – Zahrada vzpomínek (park Mrtvolky)
├── stezka-zivotem.html     – Stezka životem
├── festival-s-detmi.html   – Festival s dětmi
├── minuly-rocnik.html      – Minulý ročník (2025)
├── o-nas.html              – O nás, kontakt, spolupráce
├── obchodni-podminky.html  – Obchodní podmínky
├── gdpr.html               – Zásady zpracování osobních údajů
├── style.css               – Veškeré styly
├── script.js               – JavaScript (reveal animace, navbar, FAQ, sparkles, countdown, atd.)
├── favicon.svg
└── Obrazky/
    ├── Logo/               – logo_bile.png, logo_cerne.png, hero_pozadi.jpg
    ├── Lide/               – fotografie řečníků a průvodců
    └── Ostatni/            – QR kód, deti.jpg, deti1.jpg, fotky míst atd.
```

---

## Design systém

### Fonty
- **Nadpisy:** `Cinzel` (serif, Google Fonts) – elegantní, vážný charakter
- **Body:** `Inter` (sans-serif, Google Fonts) – čitelný, moderní
- Načítány přes Google Fonts v `<head>` každé stránky: `family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;700`

### Barvy (CSS proměnné)

```css
--color-bg: #FAFAF8          /* světlý krém – hlavní pozadí */
--color-bg-alt: #F2EFE9      /* tmavší krém – střídavé sekce */
--color-dark: #2A3A35        /* tmavě zelená – hero, card headers */
--color-dark-alt: #1E2D28    /* ještě tmavší zelená – footer */
--color-primary: #6B8F71     /* přirozená zelená – akcenty, ikony */
--color-primary-dark: #557060
--color-accent: #C17A5A      /* rezavě oranžová – CTA tlačítka */
--color-accent-dark: #A6634A
--color-text: #333333
--color-text-light: #666666
--color-text-muted: #999999
--color-border: #E5E0D8
--color-white: #FFFFFF
```

### Stíny
```css
--shadow-sm: 0 2px 8px rgba(0,0,0,0.06)
--shadow-md: 0 4px 16px rgba(0,0,0,0.08)
--shadow-lg: 0 8px 32px rgba(0,0,0,0.12)
```

### Spacing
```css
--spacing-xs: 0.5rem
--spacing-sm: 1rem
--spacing-md: 1.5rem
--spacing-lg: 2.5rem
--spacing-xl: 4rem
--spacing-xxl: 6rem
```

### Border radius
```css
--border-radius: 8px
--border-radius-sm: 4px
--border-radius-lg: 16px
```

---

## Navigace (navbar)

Stejná na všech stránkách:
- Logo vlevo (`logo_bile.png`), CSS výška **60px** (`.nav-logo img { height: 60px; }`)
- Položky: Program 2026 | Vstupenky | Doprovodné akce (dropdown) | Festival s dětmi | Minulý ročník | O nás
- Dropdown obsahuje: Den otevřených krematorií, „Řekni mi" u kafe, Zahrada vzpomínek, Stezka životem
- Vpravo CTA tlačítko „Vstupenky" (`.nav-cta`) – oranžové, border-radius-sm
- Desktop: dropdown se otevírá na hover (CSS) i click (JS .open třída)
- Na mobilu (do 767px): hamburger menu (fullscreen overlay, tmavé pozadí + blur, 3-pruhové tlačítko → X animace)
- `navbar.scrolled` (po scrollu > 60px): padding 0.65rem, tmavé poloprůhledné pozadí + blur

---

## Patička (footer)

Stejná na všech stránkách. Tmavé pozadí (`--color-dark-alt`).

**Struktura:**
- Grid 4 sloupce (desktop): Logo + popis | Program | Doprovodné akce | Kontakt
- Logo v patičce: `logo_bile.png`, CSS výška 75px
- Sociální sítě: Facebook stránka + Facebooková událost (ikony v kulatém rámečku)
- Spodní lišta (`footer-legal`): copyright © 2025–2026 | Obchodní podmínky | GDPR

**Styly patičky:**
- `footer-col h4`: Cinzel, 1rem, letter-spacing 0.08em, uppercase, bílá
- `footer-links a`: 0.9rem, rgba(255,255,255,0.5)
- `footer-contact-item`: 0.9rem, rgba(255,255,255,0.5)
- `footer-tagline`: 0.925rem, rgba(255,255,255,0.5), max-width 28ch
- `footer-copyright`: 0.83rem, rgba(255,255,255,0.3)
- `footer-bottom-links a`: 0.83rem, rgba(255,255,255,0.35)
- Ikony: `--color-primary` (zelená)

> Právní text s IČO a spisovou značkou byl z patičky odstraněn (tyto údaje jsou na stránce O nás v sekci Kontakt).

---

## Scroll a kotvy

- Globální rule: `[id] { scroll-margin-top: 90px }` – kompenzace fixní navigace
- Sekce: `section[id] { scroll-margin-top: 70px }` – kotva na začátek sekce (viditelný i section-label)
- Smooth scroll: script.js sekce 7 – IntersectionObserver s navbar offset kompenzací
- Kotvy odkazují vždy na `id` přímo na `<section>` elementu, **ne** na `<h2>`

Pojmenované sekce (id na `<section>`):
- `sekce-hlidani` – festival-s-detmi.html, sekce FAQ hlídání
- `sekce-vstupenky` – vstupenky.html, sekce výběru vstupenek
- `sekce-spoluprace` – o-nas.html, sekce Podpořte nás

---

## Komponenty

### Tlačítka

| Třída | Popis |
|---|---|
| `.btn` | Základní: `padding: 0.75rem 1.75rem`, font-weight 700, border-radius 8px |
| `.btn-accent` | Primární CTA: oranžová (#C17A5A), bílý text |
| `.btn-outline-dark` | Průhledný, tmavý rámeček a text |
| `.btn-outline-accent` | Průhledný, oranžový rámeček a text |
| `.btn-outline-white` | Průhledný, bílý rámeček – na tmavém pozadí |
| `.btn-sm` | Menší varianta: `padding: 0.5rem 1.25rem`, font-size 0.85rem |

**Pravidlo:** Tlačítka v `program-note` (šedé info pruhy pod programem) používají `.btn-accent`, nikoli `.btn-outline-accent`, protože na světlém pozadí outline verze zaniká.

### Section label

Dekorativní popis nad nadpisem sekce:
```css
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;           /* mezi čárami a textem */
  font-size: 0.75rem;    /* Inter, ne Cinzel */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}
/* ::before a ::after jsou zelené dekorativní čáry (20px × 1.5px) */
```

### Hero (homepage)

Fotka na pozadí (`hero_pozadi.jpg`) + overlay gradient:
```css
.hero-overlay {
  background: linear-gradient(135deg,
    rgba(30, 45, 40, 0.60),
    rgba(42, 58, 53, 0.50),
    rgba(20, 30, 25, 0.55));
}
```
Overlay byl záměrně zjemněn (původně ~0.75–0.82), aby fotka prosvítala.

**Hero badge** (`.hero-badge`, malá pilule nahoře, text „2. ročník festivalu"): 0.75rem, uppercase, průhledné pozadí + blur, bílá
**Hero title**: Cinzel, clamp(2.5rem, 6vw, 5rem), font-weight 700
**Hero subtitle** (`.hero-subtitle`, text „Smrt jako klíč k životu"): Cinzel, clamp(1.2rem, 2.8vw, 1.9rem), rgba(255,255,255,0.75)

**Datum a místo (`.hero-meta-item`):**
```css
font-family: 'Cinzel', serif;
font-size: 1.2rem;
font-weight: 600;
color: rgba(255, 255, 255, 0.82);
```
`.hero-meta` má `margin-bottom: calc(var(--spacing-md) + 0.8rem)` – odsazení od tlačítek.
`.hero-cta` má `margin-top: 2rem`.

### Countdown bar

Tmavý pruh (`background: var(--color-dark-alt)`) hned pod hero sekcí na homepage:
- Odpočet do 25. 4. 2026 9:00 CEST
- Elementy: `#countdown` (grid boxů), `#countdown-expired` (skrytý, zobrazí se po vypršení)
- Každý `.cd-box`: Cinzel, clamp(1.75rem, 4vw, 2.5rem), min-width 80px
- Na mobilu (≤768px): 2×2 grid

### Page Hero (podstránky)

Tmavý hero pro všechny podstránky:
```css
.page-hero {
  background: linear-gradient(135deg, var(--color-dark-alt) 0%, var(--color-dark) 100%);
  padding: 9rem 0 4.5rem;
}
.page-hero::before {
  /* hero_pozadi.jpg jako textura na pozadí */
  opacity: 0.18;  /* zvýšeno ze 0.07, aby listy eukalyptu prosvítaly */
}
```

- `.page-hero-label`: 0.72rem, uppercase, zelená, letter-spacing 0.15em
- `.page-hero-title`: Cinzel, clamp(2rem, 5vw, 3.5rem), font-weight 700, bílá
- `.page-hero-desc`: rgba(255,255,255,0.72), 1.05rem – pro delší popisné texty (max-width 640px)
- `.page-hero-meta-item`: **Cinzel, 1.2rem, font-weight 600**, rgba(255,255,255,0.82) – pro datum/místo a krátké popisné věty v hero
- `.page-hero-cta`: flex, gap 1rem, `margin-top: 2.8rem` – tlačítka pod meta řádkem

> **Pravidlo:** Datum, místo a stručné popisné věty v hero patří do `.page-hero-meta-item` (Cinzel, tučné). Delší popisné texty patří do `.page-hero-desc` (Inter, jemné).

### Info Bar (homepage)

Tmavý pruh pod countdown barem se třemi informačními položkami a CTA tlačítkem:

```css
.info-item-label  { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-primary); }
.info-item-title  { font-family: var(--font-heading); font-size: 1.08rem; font-weight: 600; color: var(--color-white); }
.info-item-sub    { font-size: 0.95rem; color: rgba(255,255,255,0.5); }
.info-cta-text    { font-family: var(--font-heading); font-size: 1rem; font-weight: 600; color: var(--color-white); }
```
Desktop: 4-sloupcový grid (`1fr 1fr 1fr auto`). CTA je celý pravý sloupec s oranžovým pozadím.

### About-invite sekce (homepage, Sekce 1)

Sekce s pozvánkou – hned pod hero. Pozadí `--color-bg-alt` s animací zlatých jisker (canvas `#about-sparkles`).

```css
.about-invite-box {
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 2.5rem 3rem;
  max-width: 940px;
  margin: 0 auto;
  display: flex;         /* logo vlevo + text vpravo */
  align-items: center;
  gap: 2.5rem;
}
.about-invite-logo {
  width: 240px;
  flex-shrink: 0;
  opacity: 0.85;         /* logo_cerne.png */
}
.about-invite {
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
  color: var(--color-text);  /* #333333 */
  line-height: 1.85;
}
```

Na mobilu (≤768px): flex-direction column, logo 180px, text-align center.

Sparkle animace: canvas přes celou sekci, zlaté jiskry `rgba(212, 170, 60, alpha)`, pohyblivé, **55 částic**, IntersectionObserver (animace jen když je sekce viditelná).

### Program sekce – přehled (homepage)

```css
.program-item-title { font-size: 1rem; font-weight: 700; color: var(--color-text); }
.program-item-sub   { font-size: 0.875rem; color: var(--color-text-light); }
```
Shodná velikost jako `.timeline-title` na stránce program.html.

`.program-block-head`: tmavý gradient (stejný jako ticket-card header)
`.program-block-head--morning`: gradient od `--color-primary-dark` do `--color-dark` (zelenější)

### Children sekce (homepage – Festival s dětmi)

```css
.children-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: stretch;
}
.children-section {
  background: linear-gradient(135deg, var(--color-dark-alt) 0%, var(--color-dark) 100%);
}
.children-text { align-self: start; }  /* text zarovnán nahoru */
.children-image-wrap {
  position: relative;
  align-self: stretch;
}
.children-image-wrap img {
  height: 100%;
  object-fit: cover;
  border-radius: var(--border-radius-lg);
}
```

Fotka: `Obrazky/Ostatni/deti1.jpg`. (Na stránce festival-s-detmi.html je jiná fotka: `deti.jpg`.)

### Event Info Box

Bílé karty s kulatými rohy (shadow-sm). Používají se pro informační sekce na stránkách doprovodných akcí.

```html
<div class="event-info-grid">
  <div class="event-info-box">
    <div style="padding: 1.75rem;">
      <h3 class="event-info-box-title">Nadpis</h3>
      <!-- obsah -->
    </div>
  </div>
</div>
```

`.event-info-grid`: `display: grid; grid-template-columns: 1fr 1fr; gap: 2rem` (výchozí)
`.event-info-grid--photo`: `grid-template-columns: 1fr 2fr` (fotka + text)
`.event-info-grid--3col`: `grid-template-columns: 0.8fr 1.4fr 0.8fr` (spolupráce na O nás)
`.event-info-box-title`: Cinzel, clamp(1.2rem, 1.8vw, 1.6rem), font-weight 600, color dark, **line-height 1.2**

### Ticket Card

Karta se tmavou hlavičkou – používá se na vstupenky i kontaktní sekci O nás:

```css
.ticket-card-header {
  background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-dark-alt) 100%);
  padding: 1.5rem 1.75rem;
}
.ticket-card.featured .ticket-card-header {
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-dark) 100%);
}
.ticket-card.featured .ticket-card-type {
  color: #a8d5b0;   /* světle zelená místo výchozí zelené */
}
```
- `.ticket-card-type`: malý label (nad názvem), zelená (nebo světle zelená u featured)
- `.ticket-card-name`: Cinzel, clamp(1.2rem, 1.8vw, 1.6rem), bílá
- `.ticket-card-body`: padding 1.5rem 1.75rem
- `.ticket-single-price`: Cinzel, 1.5rem, font-weight 700

Na vstupenky.html: **Celodenní** (299 Kč) = `.featured` (zelená hlavička); **Odpolední** (199 Kč) = bez `.featured` (tmavá hlavička).

### Team Card

```css
.team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.team-card { background: white; border-radius: 16px; box-shadow: shadow-sm; overflow: hidden; }
.team-card-name { font-family: Cinzel; font-size: clamp(1.2rem, 1.8vw, 1.6rem); }
```
- Foto: `aspect-ratio: 1/1; object-fit: cover` (čtvercové), `border-radius` jen nahoře
- `.team-card-bio`: 0.9rem, `var(--color-text)` (#333333), line-height 1.7

### Testimonial Card

```css
.testimonial-card {
  background: white;
  border-radius: 16px;
  padding: 1.75rem;
  padding-top: 4.5rem;   /* prostor pro velkou uvozovku */
  position: relative;
}
.testimonial-card::before {
  content: '\201C';
  position: absolute; top: 0.75rem; left: 1rem;
  font-family: Georgia, serif; font-size: 8rem;
  color: var(--color-primary); opacity: 0.18;
}
.testimonial-quote {
  font-size: 0.95rem;
  color: var(--color-text);  /* #333333 */
  line-height: 1.75;
  margin-bottom: 1.25rem;
}
```

**Správná HTML struktura** (blockquote, ne article):
```html
<blockquote class="testimonial-card reveal">
  <p class="testimonial-quote">„Text citátu."</p>
  <footer class="testimonial-author">
    <div class="testimonial-author-dot" aria-hidden="true"></div>
    <div>
      <div class="testimonial-author-name">Jméno</div>
      <div class="testimonial-author-label">Festival 2025</div>
    </div>
  </footer>
</blockquote>
```

### FAQ / Accordion

```css
.faq-question {
  font-family: var(--font-heading); /* Cinzel */
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-dark);
}
```
- Otevírání/zavírání řeší `script.js` globálně (i inline script na festival-s-detmi.html pro jistotu)
- `.faq-answer`: `display: none` výchozí; `display: block` při `.faq-item.open`; padding `0 1.5rem 1.25rem`, font-size 0.9rem, `var(--color-text)` (#333333)

### Timeline Tag (barevné štítky)

Malé pilule-badge na položkách programu/harmonogramu:

| Třída | Barva | Použití |
|---|---|---|
| `.tag-workshop` | zelená (#6B8F71) | workshopy |
| `.tag-prednaska` | oranžová (#C17A5A) | přednášky |
| `.tag-diskuze` | modrá (#2e5478) | diskuze |
| `.tag-stezka` | hnědá (#7a5520) | stezka životem |
| `.tag-cultural` | fialová (#6b3d7a) | kulturní program / hlídání |
| `.tag-kultura` | béžová (#7a6a58) | přestávka / ostatní |

**Override na tmavém pozadí:** Tagy uvnitř `.workshop-detail-card .card-header` mají speciální pravidlo, protože jejich výchozí styl (průhledné pozadí, tmavé písmo) na tmavém gradientu zmizí:

```css
.workshop-detail-card .card-header .timeline-tag {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
```

### Workshop Detail Card

Karta pro sekci „Co vás čeká" na program.html – tmavě zelená hlavička + bílé tělo s odrážkami. Struktura je totožná s `.ticket-card` (stejný gradient), ale s jiným názvem třídy a jiným obsahem.

```html
<article id="detail-xyz" class="workshop-detail-card reveal">
  <div class="card-header">
    <div class="card-meta">
      <span class="timeline-tag tag-workshop">Workshop</span>
      <span class="card-time"><i class="fa-regular fa-clock" aria-hidden="true"></i> 9:30 – 11:00 · Velký sál</span>
    </div>
    <h3 class="card-title">Název akce</h3>
    <p class="card-speaker"><i class="fa-solid fa-user" aria-hidden="true"></i> Jméno přednášejícího</p>
  </div>
  <div class="card-body">
    <ul class="detail-list">
      <li>Věta o obsahu.</li>
    </ul>
  </div>
</article>
```

```css
.workshop-detail-card          { background: white; border-radius: 16px; box-shadow: shadow-sm; overflow: hidden; }
.workshop-detail-card .card-header { background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-dark-alt) 100%); padding: 1.5rem 1.75rem; }
.workshop-detail-card .card-meta   { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.75rem; }
.workshop-detail-card .card-time   { font-size: 0.82rem; color: rgba(255,255,255,0.65); }
.workshop-detail-card .card-title  { font-family: Cinzel; font-size: clamp(1.2rem,1.8vw,1.6rem); font-weight: 600; color: white; }
.workshop-detail-card .card-speaker { font-size: 0.85rem; color: rgba(255,255,255,0.75); }
.workshop-detail-card .card-body   { padding: 1.5rem 1.75rem; }
```

CSS třída `.workshop-detail-card--full` = `grid-column: span 2` (přes celou šířku gridu).

> Karta pro diskuzi nemá `.card-speaker` – přednášející jsou všichni účastníci.

### Detail List

Odrážkový seznam pro `card-body` v `.workshop-detail-card`. Ikona je renderována přes CSS `::before` (Font Awesome `fa-circle-dot`), **bez** `<i>` tagu v HTML.

```html
<ul class="detail-list">
  <li>Věta.</li>
  <li><span>Věta s <a href="...">odkazem</a> uvnitř.</span></li>
</ul>
```

> **Důležité:** Pokud `<li>` obsahuje `<a>` tagy, musí být celý obsah obalen v `<span>`. Jinak flex layout (ikona + text) rozpadne každý `<a>` do samostatného sloupce.

```css
.detail-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.detail-list li { display: flex; align-items: flex-start; gap: 0.55rem; font-size: 0.9rem; color: var(--color-text-light); line-height: 1.7; }
.detail-list li::before {
  font-family: 'Font Awesome 6 Free'; font-weight: 900;
  content: '\f192';          /* fa-circle-dot */
  font-size: 0.7rem; color: var(--color-primary);
  margin-top: 0.15em;        /* zarovnání na první řádek textu */
  flex-shrink: 0;
}
```

### About Cards (homepage – O festivalu)

Sekce „Festival, který bourá tabu" obsahuje 3 karty (`.about-card`) v gridu 3 sloupce.

Obsah karet je formátován jako seznam s ikonami (`.about-card-list`), **bez** ikony nad textem:

```html
<div class="about-card">
  <ul class="about-card-list">
    <li>
      <i class="fa-solid fa-circle-dot" aria-hidden="true"></i>
      <span>Text věty, případně s <strong>tučnou částí.</strong></span>
    </li>
  </ul>
</div>
```

**Klíčové CSS pravidlo:** Text každé odrážky musí být obalen v `<span>`, jinak flex layout rozpadne `<strong>` tagy do samostatných sloupců.

```css
.about-card-list {
  list-style: none;
  padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 0.65rem;
}
.about-card-list li {
  display: flex; align-items: flex-start; gap: 0.55rem;
  font-size: 0.95rem; color: var(--color-text); line-height: 1.7;
}
.about-card-list li .fa-circle-dot {
  font-size: 0.7rem;
  color: var(--color-primary);
  margin-top: 0.5em;   /* zarovnání ikony na první řádek textu */
  flex-shrink: 0;
}
```

### About Grid

2-sloupcový layout pro intro sekce (text + obrázek/logo):
```css
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
```
Na mobilu: 1 sloupec; `.about-image-wrap` dostane `order: -1` → obrázek se zobrazí nad textem. Na desktopu `order: 0` → zpět na pravou stranu.

### Contact Grid

2-sloupcový grid pro dvě ticket-card v sekci Kontakt:
```css
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
```

### Speaker Modal

Modální okno pro detail řečníka (HTML v program.html, styles v style.css, logika v inline `<script>` na konci program.html):
- `.speaker-modal`: `display: none` → `.speaker-modal.active`: `display: flex` (přiřazeno třídou `.active`)
- Struktura: `.speaker-modal-overlay` (klik zavře) + `.speaker-modal-content` (obsah)
- `.speaker-modal-inner`: grid `200px 1fr` (foto + text)
- `.speaker-modal-bio`: 0.875rem, `var(--color-text)` (#333333), line-height 1.8; může obsahovat `<p>` i `<blockquote>`
- Na mobilu ≤560px: 1 sloupec (foto nahoře)
- Tlačítko zavření: `.speaker-modal-close` (× symbol), Escape, nebo klik na overlay
- Otevření: `onclick="openSpeakerModal(this.dataset.speaker)"` s `data-speaker="klíč"` na `.speaker-more-btn`
- Data: `var _speakerData = { ... }` – objekt s klíči: marie, oleg, alenka, adela, jirina, adam, jindrich, petr, tomas, ladislav

### Speakers Grid

Desktop: `repeat(5, 1fr)` – 5 sloupců (pozice 1 je `.speaker-intro-card` s tmavým pozadím)
Mobile: `1fr 1fr` – 2 sloupce
`.speaker-photo` (div wrapper): `aspect-ratio: 3/4`
`img.speaker-photo` (přímý img): `aspect-ratio: 1/1` (na homepage)

### Reveal animace

Prvky s třídou `.reveal` se animují při scrollu (opacity 0→1, translateY 30px→0, transition 0.65s). script.js sleduje IntersectionObserver (threshold 0.08, rootMargin -40px dole) a přidává třídu `.visible`.

---

## Responzivní design

Breakpointy v style.css:

| Breakpoint | Pravidla |
|---|---|
| Výchozí (mobile-first) | Hamburger, fullscreen menu, 1-sloupcové layouty |
| `@media (max-width: 768px)` | Drobné úpravy pro subpages (stats-grid 2col, countdown 2×2) |
| `@media (min-width: 768px)` (tablet) | Desktop navbar, 2-col footer, 2-col testimonials |
| `@media (min-width: 769px) and (max-width: 1023px)` | team-grid 2col, photo-gallery 3col |
| `@media (min-width: 1024px)` (desktop) | Plný 5-col speakers, 2-col about-grid, 4-col footer, 3-col testimonials |

**Klíčové responsive změny:**
- `about-grid`: mobile 1col → desktop 2col; foto se přesouvá přes `order`
- `speakers-grid`: mobile 2col → desktop 5col
- `doprovod-grid`: mobile 1col → tablet/desktop 2col
- `testimonials-grid`: mobile 1col → tablet 2col → desktop 3col
- `children-grid`: mobile 1col → desktop 2col
- `footer-grid`: mobile 1col → tablet 2col → desktop `2fr 1fr 1fr 1fr`
- `info-bar-grid`: mobile 1col → tablet `1fr 1fr` (CTA span 2) → desktop `1fr 1fr 1fr auto`
- `schedule-grid` (harmonogram): mobile 1col s přeuspořádáním (order CSS), desktop 2col
- `photo-gallery`: mobile 2col → tablet 3col → desktop 4col
- `event-info-grid`: mobile 1col → desktop 2col (nebo photo/3col dle modifikátoru)
- `ticket-grid` a `doprovod-ticket-grid`: mobile 1col → desktop 2col/3col

---

## Jednotlivé stránky

### index.html – Hlavní stránka

Sekce v pořadí:
1. **Hero** – fotka `hero_pozadi.jpg`, overlay gradient (zjemněný ~0.55):
   - Badge: „2. ročník festivalu"
   - H1: „(P)o životě 2026"
   - Subtitle: „Smrt jako klíč k životu"
   - `.hero-meta`: 2 položky (datum + místo) s ikonami Font Awesome
   - CTA: `btn-accent` „Koupit vstupenku" (ikona fa-ticket) + `btn-outline-white` „Prohlédnout program" (ikona fa-list)
2. **Countdown Bar** – tmavý pruh, odpočet do 25. 4. 2026 9:00; po vypršení: `#countdown-expired` zobrazí text „Festival právě probíhá!"
3. **Info Bar** – tmavý pruh, 3 info-item (KDY: Sobota 25. dubna 2026 / 9:00–21:00 | KDE: Kulturní centrum 101010 / Vratislavice nad Nisou | PROGRAM: Přednášky, workshopy / a doprovodný program) + CTA tlačítko oranžovém sloupci (Koupit vstupenku)
4. **Pozvánka** (`about-invite-section`) – krémové pozadí, zlaté sparkles (55 částic), bílý box s `logo_cerne.png` (240px) vlevo a 3 odstavci textu vpravo, text #333333
5. **O festivalu** (`about-section`) – label „O festivalu", h2 „Festival, který bourá tabu"; 3 `.about-card` karty, `about-card-list` s ikonami; tlačítko `btn-outline-dark` „Zobrazit program"
6. **Program** – label „Sobota 25. 4. 2026", h2 „Program festivalu"; 2 sloupce (Dopolední/Workshopy + Odpolední/Přednášky); program-note s `btn-accent` „Zobrazit podrobný program"
7. **Řečníci** – label „Lidé festivalu", h2 „Přednášející a průvodci"; speaker-cards grid; 10 řečníků:
   - Marie Bezděkovská – Průvodkyně smrtí, lektorka
   - Oleg Vojtíšek – Religionista, přednášející
   - Alenka Koublová – Průvodkyně v umírání
   - Adéla Hendrychová – Lektorka, facilitátorka
   - Jiřina Macháčková – Terapeutka, lektorka
   - Petr Brestovanský – Pohřební průvodce
   - Tomáš Beneš – Přednášející, průvodce
   - Adam Vokáč – Hrobník, spoluzakladatel spolku Poslední stopa
   - Jindřich Kafka – Pedagog, historik
   - Ladislav Kopal – Herec, průvodce festivalu
   - Pod gridem: `btn-outline-dark` „Více o přednášejících" → `program.html#prednasejici`
8. **Doprovodné akce** – label „Mimo hlavní program", h2 „Doprovodné akce"; doprovod-grid (4 karty, 2 sloupce desktop):
   - Den otevřených krematorií (`krematorium_liberec.jpg`)
   - „Řekni mi" u kafe (`rekni_mi.jpg`)
   - Komentovaná prohlídka Zahrady vzpomínek (`park_mrtvolky.jpg`)
   - Stezka životem (nejen) pro rodiny (`stezka.jpg`)
9. **Festival s dětmi** (`children-section`) – tmavý gradient, 2 sloupce: text vlevo (`deti1.jpg` vpravo, stretch výška); checklist 4 položky; `btn-accent` „Více informací"
10. **Ohlasy** – label „Co říkají loňští návštěvníci", h2 „1. ročník festivalu P(o) životě 2025"; testimonials-grid, 3 sloupce, **6 karet** se skutečnými citáty z ročníku 2025
11. **Footer**

---

### program.html – Program

**Hero:** `<header class="page-hero">`, label „Festival (P)o životě 2026"; h1 „Program festivalu"; meta-list: datum 25. 4. 2026, KC 101010 Vratislavice nad Nisou, 9:00–21:00; `btn-accent` „Koupit vstupenku"

**Sekce 1 – Harmonogram** (label „Harmonogram dne", h2 „Program 25. dubna 2026"):

Nad hlavním gridem: `.schedule-special.schedule-special--top` (3 položky):
- 9:00–9:15 – Slavnostní zahájení II. ročníku festivalu
- 9:30–11:30 – `tag-stezka` Komentovaná Stezka životem (timeline-room: Park)
- 9:30–13:00 – `tag-stezka` Stezka životem – volné tempo, bez průvodce (timeline-room: Park)

Hlavní grid `.schedule-grid` (`display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem 2rem`):
- Levý sloupec header: „Dopolední blok – Workshopy"
- Pravý sloupec header: „Odpolední blok – Přednášky a diskuze"
- Každá položka: `.timeline-item` s `.timeline-time` + `.timeline-body` (tag + h3 + `.timeline-speaker` + link)

Harmonogram (řady):
| Čas (dopoledne) | Čas (odpoledne) |
|---|---|
| 9:30–11:00 velký sál – `tag-workshop` Smrt není tabu / Marie Bezděkovská | 13:30–14:30 – `tag-prednaska` Proměny smrti v čase / Jindřich Kafka a Adam Vokáč |
| 9:30–11:00 malý sál – `tag-workshop` Dítě v srdci / Adéla Hendrychová | 14:50–15:50 – `tag-prednaska` Život až do konce / Marie Bezděkovská |
| 11:15–12:45 velký sál – `tag-workshop` Za oponu a zase zpátky / Jiřina Macháčková a Daniela Maté | 16:20–17:20 – `tag-prednaska` Neodcházej bez rozloučení / Oleg Vojtíšek, Alenka Koublová, Adéla Hendrychová |
| 11:45–12:45 malý sál – `tag-workshop` Jak mluvit s dětmi o smrti / Unitáři | 17:45–18:45 – `tag-diskuze` Diskuze se všemi přednášejícími |
| 12:45–13:30 – `.timeline-item--break` Pauza na oběd | 19:00–21:00 – `tag-cultural` Kulturní program a zakončení festivalu |

Pod gridem: `program-note` s `margin-top: 2rem`, tlačítko `btn-accent` „Koupit vstupenku" vpravo.
Na mobilu: 1 sloupec s CSS `order` přeuspořádáním (dopolední + odpolední bloky prokládány chronologicky).

**Sekce 2 – Co vás čeká** (bg: `--color-bg-alt`; label „Obsah programu", h2 „Co vás čeká"):
- Grid `.workshop-detail-grid`: `display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem`
- **7 karet** `.workshop-detail-card` – tmavě zelená hlavička + bílé tělo s odrážkami:
  1. `#detail-smrt-neni-tabu` – Workshop 9:30–11:00 Velký sál / Marie Bezděkovská
  2. `#detail-za-oponu` – Workshop 11:15–12:45 Velký sál / Jiřina Macháčková a Daniela Maté
  3. `#detail-jak-mluvit` – Workshop 11:45–12:45 Malý sál / Unitáři
  4. `#detail-promeny-smrti` – Přednáška 13:30–14:30 / Jindřich Kafka a Adam Vokáč
  5. `#detail-zivot-az-do-konce` – Přednáška 14:50–15:50 / Marie Bezděkovská (Poradna Mala)
  6. `#detail-neodchazej` – Přednáška 16:20–17:20 / Oleg Vojtíšek a Alenka Koublová (Pohřební průvodci) a Adéla Hendrychová (Světlo do srdce)
  7. `#detail-diskuze` – Diskuze 17:45–18:45 / `.workshop-detail-card--full` (přes celou šířku gridu); **bez** `.card-speaker`
- Pod gridem: `<p>` „Upozornění: Program se stále sestavuje, změny vyhrazeny"

**Sekce 3 – Řečníci** (label „Lidé festivalu", h2 „Přednášející a průvodci"):

`speakers-grid` s tlačítky `.speaker-more-btn` (otevírají speaker modal). 10 karet + speaker modal:

| Klíč | Jméno | Role (program.html) | Web |
|---|---|---|---|
| marie | Marie Bezděkovská | Průvodkyně smrtí, lektorka | poradnamala.cz |
| oleg | Oleg Vojtíšek | Zakladatel Pohřebních průvodců | pohrebnipruvodci.cz |
| alenka | Alenka Koublová | Pohřební průvodkyně | pohrebnipruvodci.cz |
| jirina | Jiřina Macháčková | Přírodovědkyně a lektorka | ekologie-duse-a-sveta.com |
| adela | Adéla Hendrychová | Pedagožka, ceremonialistka | Facebook (Světlo do srdce) |
| adam | Adam Vokáč | Hrobník, spoluzakladatel spolku Poslední stopa | – |
| jindrich | Jindřich Kafka | Pedagog, historik | – |
| petr | Petr Brestovanský | Archeolog, Severočeské muzeum | – |
| tomas | Tomáš Beneš | Moderátor, průvodce festivalu | – |
| ladislav | Ladislav Kopal | Spolumajitel pohřební služby a krematoria | pskopal-memoria.cz |

> Pozn.: Role řečníků na **index.html** se liší od rolí na program.html (jsou méně specifické – např. Oleg Vojtíšek = „Religionista, přednášející" na index.html vs. „Zakladatel Pohřebních průvodců" na program.html).

Pod gridem: `btn-accent` „Koupit vstupenku"

**Speaker modal** (inline `<script>` na konci program.html):
- Proměnná `_speakerData` – objekt s daty 10 řečníků (name, role, photo, web, webUrl, bio)
- Funkce `openSpeakerModal(id)` – naplní modal daty a přidá `.active` třídu
- Funkce `closeSpeakerModal()` – odebere `.active`, obnoví scroll
- Zavření: klikem na overlay, tlačítko ×, nebo klávesa Escape

---

### vstupenky.html – Vstupenky

**Hero:** "Vstupenky a rezervace", meta-item řádek (datum, místo, čas), tlačítko „Koupit vstupenku" odkazuje na `#sekce-vstupenky`

**Sekce 1** (`id="sekce-vstupenky"`) – **Hlavní vstupenky** (`ticket-grid`, 2 sloupce):
- **Celodenní program** (299 Kč): `ticket-card featured` → zelená hlavička, `btn-accent`, odkaz na /yX3mL/
- **Odpolední program** (199 Kč): `ticket-card` (bez featured) → tmavá hlavička, `btn-outline-dark`, odkaz na /EOXk0/

**Sekce 2 – Doprovodný program zdarma** (`doprovod-ticket-grid`, 3 sloupce, bg: `--color-bg-alt`):
- „Řekni mi" u kafe, Stezka životem, Den otevřených krematorií
- Každá karta: `ticket-free-badge` = „Vstup zdarma" (zelená, Cinzel)
- Každá karta má 2 tlačítka: `btn-accent` Rezervovat + `btn-outline-dark` Více informací
- Krematorium: navíc `.ticket-note` s upozorněním o plné obsazenosti libereckého krematoria
- Pod gridem: `program-note` bez CTA tlačítka (jen informační text)

---

### krematorium.html – Den otevřených krematorií

**Hero:** "Den otevřených krematorií", 28. 3. a 31. 3. 2026, Liberec a Noviny pod Ralskem, vstup zdarma; bez CTA tlačítka

**Sekce 1 – Intro** (bg: `--color-bg`): `about-grid` (text + krematorium_liberec.jpg, aspect-ratio 4/3)

**Sekce 2 – Termíny** (bg: `--color-bg-alt`): `event-info-grid` (2 sloupce):
- **Krematorium Liberec** – 28. 3. 2026, PLNĚ OBSAZENO; tlačítko disabled „Rezervace uzavřena"
- **Krematorium Likrem Noviny pod Ralskem** – 31. 3. 2026, prohlídka od 17:00; `btn-accent` Rezervace místa

**Sekce 3 – CTA** (bg: `--color-bg`): centrovaná sekce „Nezapomeňte také na hlavní festivalový program"; 2 tlačítka: `btn-accent` „Program festivalu" + `btn-outline-dark` „Koupit vstupenku"

---

### rekni-mi.html – „Řekni mi" u kafe

**Hero:** "„Řekni mi" u kafe", různé termíny, Liberecký kraj, „Vstup zdarma – dobrovolné vstupné"; `btn-accent` Rezervovat místo

**Sekce 1 – Intro** (bg: `--color-bg`): `about-grid` (4 odstavce textu + rekni_mi.jpg, aspect-ratio 4/3), `align-items: start`

**Sekce 2 – Termíny setkání** (bg: `--color-bg-alt`): `<ol class="timeline">`, 5 setkání:
- 27. 11. 2025 – BG klub Liberec (opacity 0.5 – proběhlé)
- 25. 2. 2026 – Café Green Vratislavice (opacity 0.5 – proběhlé)
- 18. 3. 2026 – Rezidence RoSa
- 23. 3. 2026 – Kavárna Jiná Huť
- 16. 4. 2026 – Palác Liebieg
- Pod timeline: text + `btn-accent` Rezervovat místo (centered, max-width 640px)

**Sekce 3 – Kdo vás provede** (bg: `--color-bg`): `event-info-grid event-info-grid--photo` (1fr 2fr), Marie Bezděkovská – průvodkyně péčí v závěru života, www.poradnamala.cz

**Sekce 4 – Praktické informace** (bg: `--color-bg-alt`): `event-info-grid` (2 sloupce):
- Levý: „Pro koho" – checklist 5 položek + `btn-accent` Rezervovat
- Pravý: `event-info-right-col` (flex column, gap 1rem) → 2 boxy: Kde + Za kolik (vstupné je dobrovolné)

---

### zahrada-vzpominek.html – Zahrada vzpomínek

**Hero:** "Zahrada vzpomínek", úterý 21. 4. 2026 17:00, Park Mrtvolky – ul. Budyšínská Liberec, vstup zdarma; `btn-accent` „Více o festivalu"

**Sekce 1 – Intro** (bg: `--color-bg`): `about-grid` (text + park_mrtvolky.jpg), `align-items: start`; text `style="color: #666666;"` (inline)

**Sekce 2 – Kdo vás provede** (bg: `--color-bg-alt`): `event-info-grid event-info-grid--photo` (1fr 2fr); Mgr. Petr Brestovanský – vedoucí archeologického oddělení Severočeského muzea v Liberci

**Sekce 3 – Praktické informace** (bg: `--color-bg`): `event-info-grid` (2 sloupce):
- Levý: „Kdy a kde" – datum, místo, délka cca 60–90 min
- Pravý: „Vstup" – zdarma, bez registrace

---

### stezka-zivotem.html – Stezka životem

**Hero:** "Stezka životem", sobota 25. 4. 2026 od 10:00, **Zámecký park – Vratislavice nad Nisou, Liberec**, vstup zdarma; `btn-accent` „Rezervovat komentovanou prohlídku" → /zQ92B/

**Sekce 1 – Intro** (bg: `--color-bg`): `about-grid` (text + stezka.jpg), `align-items: start`; text `style="color: #666666;"` (inline)
- Checklist s ikonami `fa-check`: 7 zastavení, 2 000 kroků, 1 společný zážitek
- 3 odstavce popisného textu (color #666666)

**Sekce 2 – Praktické informace** (bg: `--color-bg-alt`): `event-info-grid` (2 sloupce):
- Levý: „Kde" – popis startu + `btn-accent` Rezervovat komentovanou prohlídku
- Pravý: `event-info-right-col` (flex column, gap 1rem) → 2 boxy: Kdy (25. 4. od 10:00–14:00, komentovaná od 9:15) + Za kolik (zdarma, komentovaná vyžaduje rezervaci)

**Sekce 3 – CTA** (bg: `--color-bg`): centrovaná, „Celý den s dětmi na festivalu?"; 1 tlačítko `btn-accent` „Festival s dětmi"

---

### festival-s-detmi.html – Festival s dětmi

**Hero:** `<section class="page-hero">` (ne `<header>`), label „Pro rodiny", datum 25. dubna 2026, „Děti mají vstup zdarma"; `btn-accent` odkazuje na `#sekce-hlidani`

**Sekce 1 – Intro** (bg: `--color-bg-alt`): `about-grid` (text + **deti.jpg**, aspect-ratio 4/3), `align-items: start`; text `style="color: #666666;"` (4 odstavce)

**Sekce 2 – Harmonogram** (bg: výchozí `--color-bg`): `<div class="timeline">`, 4 položky:
- 9:30–11:15 – `tag-stezka` – Komentovaná Stezka životem v Zámeckém parku
- 11:45–12:45 – `tag-workshop` – Jak mluvit s dětmi o smrti
- 12:45–13:30 – `tag-kultura` – Pauza na oběd
- 13:30–19:00 – `tag-cultural` – Hlídání dětí
- Pod timeline: `program-note` s `btn-accent` „Hlavní program" (odkaz na program.html)

**Sekce 3** (`id="sekce-hlidani"`) – **FAQ Hlídání dětí** (bg: `--color-bg-alt`):
- 5 FAQ otázek (FAQ accordion)
- Inline script pro toggle `.faq-item.open` (doplňuje script.js)

**Sekce 4 – CTA** (bg: `--color-dark`, vlastní třída `.children-section`): text-align center, „Přijďte s celou rodinou"; 2 tlačítka: `btn-accent` „Koupit vstupenku" + `btn-outline-white` „Stezka životem"

---

### minuly-rocnik.html – Minulý ročník

**Hero:** label „Historie festivalu"; `<h1>` s vnořeným `<span>` pro "(P)o životě 2025" (menší, průhledné); `<p class="page-hero-meta-item">` s textem „Proběhl 4. a 5. dubna 2025 ve vratislavickém Kulturním centru 101010"

**Sekce 1 – Statistiky** (bg: výchozí):
- Obě části zabaleny v obálce `max-width: 820px; margin: 0 auto`
- `.stats-grid` (3 sloupce): boxy 50+, 12, 10 – bg `--color-bg-alt`, Cinzel, `--color-accent`
- Textový box pod nimi: bg `#F2EFE9`, border-radius-lg, padding 2.5rem 3rem, text #333333, **bez stínu**

**Sekce 2 – Ohlasy** (bg: `--color-bg-alt`):
- `testimonials-grid` (3 sloupce), 6 karet
- Správná struktura: `blockquote.testimonial-card`, `p.testimonial-quote`, `testimonial-author-dot`
- Skutečné citáty z ročníku 2025

**Sekce 3 – Fotogalerie** (bg: výchozí): `photo-gallery` – **4 sloupce** (desktop), 3 (tablet), 2 (mobile); **36 fotografií** PoZivote1_1.jpg až PoZivote1_36.jpg; `aspect-ratio: 4/3`, hover scale 1.05

**Sekce 4 – CTA** (bg: `#F2EFE9`): text-align center; 2 tlačítka: `btn-accent` Koupit vstupenku + `btn-outline-dark` Program 2026

---

### o-nas.html – O nás

**Hero:** label „O festivalu"; titulek „O nás"; `<p class="page-hero-meta-item">` „Kdo pro vás festival tvoří a jak nás můžete podpořit"; `btn-accent` „Chci vás podpořit" → `#sekce-spoluprace`

**Sekce 1 – Kdo jsme** (`about-grid`):
- Vlevo: 3 odstavce textu (1.1rem, **`var(--color-text-light)` = #666666**, line-height 1.8, inline style)
- Vpravo: `logo_bile.png` na tmavém gradientu (`div` se stylem), zaoblené rohy

**Sekce 2 – Zakladatelé** (bg: `--color-bg-alt`):
- `team-grid` (3 sloupce)
- **Martina Píšová** – `object-position: center 25%`
- **Jiřina Macháčková** – `object-position: center 25%`
- **Petr Slanina** – `object-position: center 20%`
- `.team-card-bio` = #333333

**Sekce 3 – Kontakt** (`contact-grid`, 2 sloupce ticket-card):
- Levá: „Organizace" (název, adresa Klicperova 436/12 Liberec IV-Perštýn, IČO, spisová značka L 14096 u KS Ústí nad Labem)
- Pravá: „Kontakt" (email, web, datová schránka, transparentní účet)

**Sekce 4** (`id="sekce-spoluprace"`) – **Spolupráce** (bg: `--color-bg-alt`):
- `event-info-grid event-info-grid--3col` (`grid-template-columns: 0.8fr 1.4fr 0.8fr`)
- Sloupec 1: „Možnosti spolupráce" + `sponsoring-list` (4 položky) + `btn-accent` „Napište nám"
- Sloupec 2: „Co vám můžeme nabídnout na oplátku" + `sponsoring-list` (5 položek)
- Sloupec 3: text + QR kód 130×130px (`QRPlatba_na_ucet_2602959939.jpg`)

### obchodni-podminky.html – Obchodní podmínky

**Hero:** `page-hero-label` „Právní dokumenty"; h1 „Obchodní podmínky"; `page-hero-meta-item` „Podmínky pro prodej vstupenek na akce spolku Po životě z.s."

**Obsah** (`.gdpr-content`): Jedna sekce `.section` s kompletním textem obchodních podmínek. Struktura:
- Úvodní odstavec (popis platnosti, IČO, adresa, spisová značka)
- Děleno `<hr class="gdpr-divider">` na kapitoly `<article class="gdpr-chapter">`:
  1. Objednávka vstupenek
  2. Ceny vstupenek
  3. Uzavření smlouvy a platba (bankovní převod, splatnost 10 dnů)
  4. Doručení vstupenky (elektronická vstupenka, stačí ukázat na mobilu)
  5. Odstoupení od smlouvy (datované vstupenky – nelze odstoupit)
  6. Reklamace
  7. Zrušení akce (vyšší moc)
  8. Fotografická dokumentace (souhlas s focením)
  9. Kontaktní údaje (adresa, IČO, email, tel 723 598 446, datová schránka)
  10. Platnost od 1. 9. 2025
- Nadpisy: `h2.gdpr-chapter-title`
- Kontakt je `<address>` s `<ul class="gdpr-bullet-list">`
- **Bez script.js (ne, script.js je přítomen)** – script.js je načten pro navbar

---

### gdpr.html – Zásady ochrany osobních údajů

**Hero:** `page-hero-label` „Právní dokumenty"; h1 „Zásady ochrany osobních údajů"; `page-hero-meta-item` „Informace o zpracování osobních údajů dle GDPR"

**Obsah** (`.gdpr-content`): Jedna sekce `.section`. Struktura se 7 kapitolami:
- Obsah linked z `<ul class="gdpr-toc-list">` (interní kotvy #kap-i až #kap-vii)
- Kapitoly: I. Obsah a účel | II. Správce (Po životě z.s., IČO 21849471, Klicperova 436/12 Liberec) | III. Jaké osobní údaje | IV. Účely zpracování (A–D) | V. Zpřístupnění jiným osobám | VI. Práva subjektů (A–G) | VII. Další informace
- Podkapitoly: `h3.gdpr-subchapter-title`
- Platnost od 1. 1. 2025

**Sdílené CSS třídy** pro oba dokumenty:
```css
.gdpr-content   { max-width: 820px; margin: 0 auto; }
.gdpr-chapter   { /* wrapper pro <article> */ }
.gdpr-chapter-title   { h2: Cinzel, clamp(1.1rem, 1.8vw, 1.4rem), color: --color-dark }
.gdpr-subchapter-title { h3: Inter, 1rem, font-weight 700, color: --color-text }
.gdpr-divider   { border-color: --color-border }
.gdpr-bullet-list / .gdpr-numbered-list { list-style s odrážkami/čísly }
.gdpr-toc-list  { seznam interních odkazů }
.gdpr-lead      { uvozující text před TOC }
```

---

## Rozhodnutí o designu

| Oblast | Rozhodnutí |
|---|---|
| Hero overlay | Záměrně zjemněn (~0.55) – fotka eukalyptu má být viditelná |
| Textura podstránek | `page-hero::before` opacity 0.18 – listy prosvítají přes tmavý gradient |
| Datum/místo v hero | Cinzel, 1.2rem, font-weight 600 – platí pro `.hero-meta-item` i `.page-hero-meta-item` |
| Odsazení tlačítek od meta | `.hero-meta`: `margin-bottom: calc(spacing-md + 0.8rem)`; `.page-hero-cta`: `margin-top: 2.8rem` |
| Kotvy na sekce | ID vždy na `<section>`, ne na `<h2>` – section-label zůstane viditelný |
| About-invite box | Flexbox: logo_cerne.png (240px) vlevo, 3 odstavce textu vpravo, max-width 940px |
| Sparkles animace | Zlaté jiskry na about-invite-section, canvas, **55 částic**, IntersectionObserver |
| Children sekce foto | deti1.jpg (homepage), deti.jpg (festival-s-detmi.html) |
| Children text | `align-self: start` – section-label zarovnán s horním okrajem fotky |
| Testimonial struktura | `blockquote` + `p.testimonial-quote` + `testimonial-author-dot` – konzistentní na všech stránkách |
| Program-note tlačítka | Vždy `btn-accent` (plné, oranžové) – outline verze zaniká na šedém pozadí |
| Minulý ročník – stat box | Textový box má bg #F2EFE9 (stejné jako stat boxy), bez box-shadow, text #333333 |
| Fotky v team-card | `aspect-ratio: 1/1` (čtvercové) |
| vstupenky.html featured | **Celodenní** = featured (zelená hlavička); **Odpolední** = bez featured (tmavá hlavička) |
| Barva obyčejného textu | `#333333` (`--color-text`) – platí pro `.about-invite`, `.about-card`, `.testimonial-quote`, `.ticket-*-desc`, `.event-meta-list li`, `.team-card-bio`, `.faq-answer`, `.speaker-modal-bio` |
| Záměrně světlejší text | `#666666` (`--color-text-light`) – texty na doprovodných stránkách (zahrada, stezka, rekni-mi, festival-s-detmi intro), sekce Kdo jsme na o-nas.html |
| Právní text v patičce | Odstraněn – informace jsou na stránce O nás |
| FAQ nadpisy | Font Cinzel, 1.05rem; toggle přes `.faq-item.open` (CSS display: none → block) |
| event-info-box-title | `line-height: 1.2` (Cinzel je bez toho příliš rozvolněný) |
| Workshop detail karty | Tmavě zelená hlavička (stejný gradient jako ticket-card) + bílé tělo – sjednocuje vizuální jazyk s vstupenkami |
| Tag na tmavém pozadí | Override `rgba(255,255,255,0.15)` bg + bílé písmo – výchozí tag styl (průhledný, tmavý text) na tmavém headeru zmizí |
| Detail-list ikony | CSS `::before` s FA `\f192` (fa-circle-dot) místo `<i>` tagů v HTML – konzistentní s `.about-card-list` na homepage |
| `<li>` s odkazem uvnitř | Obalit obsah do `<span>` – bez toho flex rozpadne `<a>` tagy do samostatných sloupců |
| program-note odsazení | `margin-top: 2rem` – mezera mezi posledními položkami harmonogramu a poznámkou |
| krematorium.html CTA | Odkazuje na hlavní program (ne na „Festival s dětmi") |
| stezka-zivotem.html místo | „Zámecký park – Vratislavice nad Nisou, Liberec" (ne areál KC 101010) |
| rekni-mi.html pořadí | Sekce: Intro → Termíny → Kdo vás provede → Praktické informace |
| Logo výška navbar | CSS: 60px; HTML attr: 50 (přebíjeno CSS) |
| Hero badge text | „2. ročník festivalu" (ne obecné „Festival 2026") |
| Hero subtitle text | „Smrt jako klíč k životu" |
| Hero – žádné tags/pills | V hero NEJSOU žádné pill-badge tagy, jen 2 `.hero-meta-item` (datum + místo) |
| Roles řečníků | Index.html má zjednodušenější role; program.html má úplnější/specifičtější role |
| Speaker modal – zavření | Overlay, ×, nebo Escape – tři způsoby zavření |
| Countdown expired text | „Festival právě probíhá!" (zobrazí se po 25. 4. 2026 9:00 CEST) |
| obchodni-podminky.html | Platnost od 1. 9. 2025; platba bankovním převodem do 10 dnů; datované vstupenky – nelze odstoupit |
| gdpr.html | Platnost od 1. 1. 2025; nezpracovávají se citlivé osobní údaje; přímý marketing jako oprávněný zájem |

---

## Závislosti

- **Google Fonts:** Cinzel (wght 400, 600, 700) + Inter (wght 300, 400, 500, 700)
- **Font Awesome 6.5.1** (CDN, integrity hash)
- **Žádný CSS framework** (Bootstrap apod.) – vlastní styly
- **Žádný JS framework** – vanilla JS v script.js
- **Rezervační systém:** form.simpleshop.cz (externí)
