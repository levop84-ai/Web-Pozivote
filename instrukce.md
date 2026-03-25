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
├── script.js               – JavaScript (reveal animace, navbar, FAQ, sparkles, atd.)
├── favicon.svg
└── Obrazky/
    ├── Logo/               – logo_bile.png, logo_cerne.png, hero_pozadi.jpg
    ├── Lide/               – fotografie řečníků a průvodců
    └── Ostatni/            – QR kód, deti1.jpg, fotky míst atd.
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
- Logo vlevo (`logo_bile.png`, výška 50px)
- Položky: Program 2026 | Vstupenky | Doprovodné akce (dropdown) | Festival s dětmi | Minulý ročník | O nás
- Dropdown obsahuje: Den otevřených krematorií, „Řekni mi" u kafe, Zahrada vzpomínek, Stezka životem
- Vpravo CTA tlačítko „Vstupenky" (`.nav-cta`)
- Na mobilu: hamburger menu

---

## Patička (footer)

Stejná na všech stránkách. Tmavé pozadí (`--color-dark-alt`).

**Struktura:**
- Grid 4 sloupce: Logo + popis | Program | Doprovodné akce | Kontakt
- Sociální sítě: Facebook stránka + Facebooková událost
- Spodní lišta (`footer-legal`): copyright © 2025–2026 | Obchodní podmínky | GDPR

**Styly patičky:**
- `footer-col h4`: Cinzel, 1rem, uppercase, bílá
- `footer-links a`: 0.9rem, rgba(255,255,255,0.5)
- `footer-contact-item`: 0.9rem, rgba(255,255,255,0.5)
- `footer-tagline`: 0.925rem, rgba(255,255,255,0.5)
- `footer-copyright`: 0.83rem, rgba(255,255,255,0.3)
- `footer-bottom-links a`: 0.83rem, rgba(255,255,255,0.35)
- Ikony: `--color-primary` (zelená)

> Právní text s IČO a spisovou značkou byl z patičky odstraněn (tyto údaje jsou na stránce O nás v sekci Kontakt).

---

## Scroll a kotvy

- Globální rule: `[id] { scroll-margin-top: 90px }` – kompenzace fixní navigace
- Sekce: `section[id] { scroll-margin-top: 70px }` – kotva na začátek sekce (viditelný i section-label)
- Kotvy odkazují vždy na `id` přímo na `<section>` elementu, **ne** na `<h2>`

Pojmenované sekce (id na `<section>`):
- `sekce-hlidani` – festival-s-detmi.html, Sekce FAQ hlídání
- `sekce-vstupenky` – vstupenky.html, Sekce výběru vstupenek
- `sekce-spoluprace` – o-nas.html, Sekce Podpořte nás

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
  gap: 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-primary);
}
/* ::before a ::after jsou zelené dekorativní čáry */
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

**Datum a místo (`.hero-meta-item`):**
```css
font-family: 'Cinzel', serif;
font-size: 1.2rem;
font-weight: 600;
color: rgba(255, 255, 255, 0.82);
```
`.hero-meta` má `margin-bottom: calc(var(--spacing-md) + 0.8rem)` – odsazení od tlačítek.

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

- `.page-hero-label`: 0.72rem, uppercase, zelená
- `.page-hero-title`: Cinzel, clamp(2rem, 5vw, 3.5rem), bílá
- `.page-hero-desc`: světle bílá, 1.05rem – používá se pro delší popisné texty
- `.page-hero-meta-item`: **Cinzel, 1.2rem, font-weight 600**, rgba(255,255,255,0.82) – pro datum/místo a krátké popisné věty v hero
- `.page-hero-cta`: flex, gap 1rem, `margin-top: 2.8rem` – tlačítka pod meta řádkem

> **Pravidlo:** Datum, místo a stručné popisné věty v hero patří do `.page-hero-meta-item` (Cinzel, tučné). Delší popisné texty patří do `.page-hero-desc` (Inter, jemné).

### Info Bar (homepage)

Tmavý pruh pod hero sekcí se třemi informačními položkami a CTA tlačítkem:

```css
.info-item-label  { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-primary); }
.info-item-title  { font-family: var(--font-heading); font-size: 1.08rem; font-weight: 600; color: var(--color-white); }
.info-item-sub    { font-size: 0.95rem; color: rgba(255,255,255,0.5); }
.info-cta-text    { font-family: var(--font-heading); font-size: 1rem; font-weight: 600; color: var(--color-white); }
```

### About-invite sekce (homepage, Sekce 1)

Sekce s pozvánkou – hned pod hero. Pozadí `--color-bg-alt` s animací zlatých jisker (canvas `#about-sparkles`).

```css
.about-invite-section {
  position: relative;
  overflow: hidden;
}
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

Sparkle animace: canvas přes celou sekci, zlaté jiskry `rgba(212, 170, 60, alpha)`, pohyblivé, 80 částic, IntersectionObserver (animace jen když je sekce viditelná).

### Program sekce – přehled (homepage)

```css
.program-item-title { font-size: 1rem; font-weight: 700; color: var(--color-text); }
.program-item-sub   { font-size: 0.875rem; color: var(--color-text-light); }
```
Shodná velikost jako `.timeline-title` na stránce program.html.

### Children sekce (homepage – Festival s dětmi)

```css
.children-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: stretch;   /* oba sloupce stejná výška */
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

Fotka: `Obrazky/Ostatni/deti1.jpg`. Accent badge „Vstup zdarma" byl odstraněn.

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

`.event-info-grid`: `display: grid; grid-template-columns: 1fr 1fr; gap: 2rem` (výchozí, přepisuje se inline)
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
```
- `.ticket-card-type`: malý label (nad názvem), bílá/průhledná
- `.ticket-card-name`: Cinzel, clamp(1.2rem, 1.8vw, 1.6rem), bílá
- `.ticket-card-body`: padding 1.5rem 1.75rem

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

> **Pozor:** Starší verze karet na minuly-rocnik.html používala `<article>`, `<div class="testimonial-quote">` (HTML uvozovky) a `<p class="testimonial-text">`. Tato struktura je nesprávná a byla opravena na správnou výše uvedenou.

### FAQ / Accordion

```css
.faq-question {
  font-family: var(--font-heading); /* Cinzel */
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-dark);
}
```
- Otevírání/zavírání řeší script.js
- `.faq-answer`: hidden by default, `padding: 0 1.5rem 1.25rem`, 0.9rem, `var(--color-text)` (#333333)

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

> Karta pro diskuzi (grid-column: span 2) nemá `.card-speaker` – přednášející jsou všichni účastníci.

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

### Contact Grid

2-sloupcový grid pro dvě ticket-card v sekci Kontakt:
```css
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
```

### Reveal animace

Prvky s třídou `.reveal` se animují při scrollu (opacity 0→1, translateY 30px→0). script.js sleduje IntersectionObserver a přidává třídu `.visible`.

---

## Jednotlivé stránky

### index.html – Hlavní stránka

Sekce v pořadí:
1. **Hero** – fotka `hero_pozadi.jpg`, overlay gradient (zjemněný ~0.55), datum a místo v Cinzel 1.2rem tučné, tlačítka s odsazením 0.8rem od meta řádku
2. **Info Bar** – tmavý pruh, 3 info-item (KDY / KDE / PROGRAM) + CTA tlačítko „Koupit vstupenku"
3. **Pozvánka** (`about-invite-section`) – krémové pozadí, zlaté sparkles, bílý box s `logo_cerne.png` (240px) vlevo a 3 odstavci textu vpravo, text #666666
4. **Program** – 2 sloupce (dopoledne/odpoledne), program-note s `btn-accent`
5. **Řečníci** – speaker-cards grid
6. **Doprovodné akce** – doprovod-cards grid (4 karty)
7. **Festival s dětmi** – 2 sloupce: text vlevo, `deti1.jpg` vpravo (stretch výška)
8. **Ohlasy** – testimonials-grid, 3 sloupce, **6 karet** se skutečnými citáty z ročníku 2025
9. **Footer**

---

### program.html – Program

**Hero:** "Program festivalu", datum 25. 4. 2026, KC 101010, 9:00–21:00, tlačítko „Koupit vstupenku" (`btn-accent`)

**Sekce 1 – Harmonogram** (`schedule-grid`, 2 sloupce):
- Grid: `display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem`
- Každá položka je `.timeline-item` s `.timeline-time` a `.timeline-body`
- Levý sloupec: Dopolední program (9:00–12:45)
- Pravý sloupec: Odpolední program (13:30–21:00)
- Řada 5 (speciální): levý = „Pauza na oběd" (`timeline-item--break`, opacity 0.65), pravý = „Kulturní program a zakončení festivalu" (`tag-cultural`)
- Pod gridem: `program-note` s `margin-top: 2rem`, tlačítko `btn-accent` „Koupit vstupenku" vpravo

**Sekce 2 – Co vás čeká** (bg: `--color-bg-alt`):
- Label „Obsah programu", nadpis „Co vás čeká"
- Grid `display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem`
- **7 karet** typu `.workshop-detail-card` – tmavě zelená hlavička + bílé tělo s odrážkami
- Karta diskuze: `style="grid-column: span 2"` (přes celou šířku)
- Pod gridem: `<p>` s upozorněním „Program se stále sestavuje"

**Sekce 3 – Řečníci** – `speakers-grid`

---

### vstupenky.html – Vstupenky

**Hero:** "Vstupenky a rezervace", meta-item řádek, tlačítko „Koupit vstupenku" odkazuje na `#sekce-vstupenky`

**Sekce 1** (`id="sekce-vstupenky"`) – **Hlavní vstupenky** (`ticket-grid`, 2 sloupce):
- Celodenní vstupenka: 299 Kč
- Odpolední vstupenka: 199 Kč (`.featured` – zelená hlavička)

**Sekce 2 – Doprovodný program zdarma** (`doprovod-ticket-grid`, 3 sloupce):
- „Řekni mi" u kafe, Stezka životem, Den otevřených krematorií
- Každá karta: `ticket-free-badge` = „Vstup zdarma" (zelená, Cinzel)

---

### krematorium.html – Den otevřených krematorií

**Hero:** "Den otevřených krematorií", 28. 3. a 31. 3. 2026

**Sekce 1 – Intro:** `about-grid` (text + obrázek), barva textu #333333

**Sekce 2 – Termíny** (`event-info-grid`, 2 sloupce):
- Krematorium Liberec – 28. 3. 2026, PLNĚ OBSAZENO
- Krematorium Likrem Noviny – 31. 3. 2026, volná místa

**Sekce 3 – CTA** „Festival s dětmi" – tmavý gradient

---

### rekni-mi.html – „Řekni mi" u kafe

**Hero:** "„Řekni mi" u kafe", termíny, Liberecký kraj, vstup zdarma

**Sekce 1 – Kdo vás provede** (`event-info-grid`, 1:2 poměr)

**Sekce 2 – Praktické informace** (`event-info-grid`, 2 sloupce):
- „Pro koho", „Kde", „Za kolik" – vstupné je dobrovolné (zvýrazněno)

**Sekce 3 – Termíny** (`timeline`): 5 setkání

---

### zahrada-vzpominek.html – Zahrada vzpomínek

**Hero:** "Zahrada vzpomínek", úterý 21. 4. 2026, 17:00, Park Mrtvolky, zdarma

**Sekce 1 – Intro:** `about-grid` (text + park_mrtvolky.jpg), text #333333

**Sekce 2 – Kdo vás provede** (`event-info-grid`, 1:2 poměr)

**Sekce 3 – Praktické informace** (`event-info-grid`, 2 sloupce)

---

### stezka-zivotem.html – Stezka životem

**Hero:** "Stezka životem", 25. 4. 2026, od 10:00, areál KC 101010, zdarma

**Sekce 1 – Intro:** `about-grid` (text + stezka.jpg), checklist 7 zastavení

**Sekce 2 – Praktické informace** (`event-info-grid`, 2 sloupce)

**Sekce 3 – CTA** „Festival s dětmi"

---

### festival-s-detmi.html – Festival s dětmi

**Hero:** "Festival s dětmi", datum, vstup (děti zdarma)
- `.page-hero-meta` řádek s ikonkami
- Tlačítko „Více informací" odkazuje na `#sekce-hlidani`

**Sekce 1 – Intro:** `about-grid` (text vlevo, obrázek vpravo)

**Sekce 2** (`id="sekce-hlidani"`) – **FAQ Hlídání dětí** (bg: `--color-bg-alt`):
- `program-note` s tlačítkem `btn-accent` „Hlavní program"
- 5 otázek s odpověďmi

**Sekce 3 – CTA:** 2 tlačítka: „Koupit vstupenku", „Stezka životem"

---

### minuly-rocnik.html – Minulý ročník

**Hero:** "1. ročník 2025", text „Proběhl 4. a 5. dubna 2025..." ve třídě `.page-hero-meta-item` (Cinzel, tučné)

**Sekce 1 – Statistiky** (bg: výchozí):
- Obě části zabaleny v obálce `max-width: 820px; margin: 0 auto`
- Tři boxy se statistikami (50+, 12, 10) – bg `--color-bg-alt`, Cinzel, `--color-accent`
- Textový box pod nimi – bg `#F2EFE9`, border-radius-lg, text #333333, **bez stínu**

**Sekce 2 – Ohlasy** (bg: `--color-bg-alt`):
- `testimonials-grid` (3 sloupce), 6 karet
- Správná struktura: `blockquote.testimonial-card`, `p.testimonial-quote`, `testimonial-author-dot`
- Skutečné citáty z ročníku 2025

**Sekce 3 – Fotogalerie:** 4 sloupce, fotografie z ročníku 2025

**Sekce 4 – CTA** „Přijďte na 2. ročník"

---

### o-nas.html – O nás

**Hero:** "O nás"
- Text „Kdo pro vás festival tvoří a jak nás můžete podpořit" ve třídě `.page-hero-meta-item` (Cinzel, tučné)
- Tlačítko „Chci vás podpořit" (`btn-accent`) odkazuje na `#sekce-spoluprace`

**Sekce 1 – Kdo jsme** (`about-grid`):
- Vlevo: 3 odstavce textu (1.1rem, #333333, line-height 1.8)
- Vpravo: `logo_bile.png` na tmavém gradientu, zaoblené rohy

**Sekce 2 – Zakladatelé** (bg: `--color-bg-alt`):
- `team-grid` (3 sloupce)

Zakladatelé:
- **Martina Píšová** – `object-position: center 25%`
- **Jiřina Macháčková** – `object-position: center 25%`
- **Petr Slanina** – `object-position: center 20%`

**Sekce 3 – Kontakt** (`contact-grid`, 2 sloupce ticket-card):
- Levá: „Organizace" (název, adresa, IČO, spisová značka)
- Pravá: „Kontakt" (email, web, datová schránka, transparentní účet)

**Sekce 4** (`id="sekce-spoluprace"`) – **Spolupráce** (bg: `--color-bg-alt`):
- `event-info-grid` se 3 sloupci (`grid-template-columns: 0.8fr 1.4fr 0.8fr`)
- Sloupec 1: „Možnosti spolupráce" + `sponsoring-list` + tlačítko „Napište nám"
- Sloupec 2: „Co vám můžeme nabídnout na oplátku" + `sponsoring-list`
- Sloupec 3: úvodní text + QR kód (130×130px)

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
| Sparkles animace | Zlaté jiskry na about-invite-section, canvas s IntersectionObserver |
| Children sekce foto | deti1.jpg, `align-self: stretch`, `height: 100%` – stejná výška jako textový sloupec |
| Children text | `align-self: start` – section-label zarovnán s horním okrajem fotky |
| Testimonial struktura | `blockquote` + `p.testimonial-quote` + `testimonial-author-dot` – konzistentní na všech stránkách |
| Program-note tlačítka | Vždy `btn-accent` (plné, oranžové) – outline verze zaniká na šedém pozadí |
| Minulý ročník – stat box | Textový box má bg #F2EFE9 (stejné jako stat boxy), bez box-shadow, text #333333 |
| Fotky v team-card | `aspect-ratio: 1/1` (čtvercové) |
| Barva obyčejného textu | `#333333` (`--color-text`) – platí pro `.about-invite`, `.about-card p`, `.about-text p`, `.doprovod-desc`, `.testimonial-quote`, `.ticket-*-desc`, `.event-meta-list li`, `.team-card-bio`, `.faq-answer`, `.speaker-modal-bio` |
| Záměrně světlejší text | `#666666` (`--color-text-light`) – ponecháno pouze pro `.program-item-sub`, `.program-note-text`, `.schedule-details-sub`, `.qr-label span` |
| Právní text v patičce | Odstraněn – informace jsou na stránce O nás |
| FAQ nadpisy | Font Cinzel, 1.05rem |
| event-info-box-title | `line-height: 1.2` (Cinzel je bez toho příliš rozvolněný) |
| Workshop detail karty | Tmavě zelená hlavička (stejný gradient jako ticket-card) + bílé tělo – sjednocuje vizuální jazyk s vstupenkami |
| Tag na tmavém pozadí | Override `rgba(255,255,255,0.15)` bg + bílé písmo – výchozí tag styl (průhledný, tmavý text) na tmavém headeru zmizí |
| Detail-list ikony | CSS `::before` s FA `\f192` (fa-circle-dot) místo `<i>` tagů v HTML – konzistentní s `.about-card-list` na homepage |
| `<li>` s odkazem uvnitř | Obalit obsah do `<span>` – bez toho flex rozpadne `<a>` tagy do samostatných sloupců |
| program-note odsazení | `margin-top: 2rem` – mezera mezi posledními položkami harmonogramu a poznámkou |

---

## Závislosti

- **Google Fonts:** Cinzel (wght 400, 600, 700) + Inter (wght 300, 400, 500, 700)
- **Font Awesome 6.5.1** (CDN, integrity hash)
- **Žádný CSS framework** (Bootstrap apod.) – vlastní styly
- **Žádný JS framework** – vanilla JS v script.js
