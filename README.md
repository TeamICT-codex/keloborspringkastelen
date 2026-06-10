# Kelobor Springkastelen — nieuwe website

Een volledig nieuwe, moderne, snelle en conversiegerichte website voor het verhuurbedrijf
**Kelobor Springkastelen** (Lebbeke / Buggenhout). Gebouwd als statische site (HTML + CSS +
vanilla JS, géén build-stap) zodat ze overal supersnel werkt en eenvoudig te hosten is.

> Alle bestaande inhoud van de oude site (assortiment, prijzen, afmetingen, voorwaarden,
> contactgegevens, foto's) is overgenomen, geherstructureerd en herschreven.

---

## 1. Snel starten

Geen installatie nodig. Open `index.html` of zet de map op je hosting.

Lokaal bekijken met een mini-server (aanbevolen, want de site gebruikt query-parameters):

```bash
# vanuit de projectmap:
node .claude/static-server.js      # → http://localhost:5577
# of
python -m http.server 8000         # → http://localhost:8000
```

## 2. Mappenstructuur

```
/                         de root = deploy deze map
├─ index.html             Homepage
├─ springkastelen.html    Assortiment (filterbare catalogus)
├─ product.html           Productdetail (data-gedreven: ?p=<slug>)
├─ categorie.html         Categorie-landing (?c=<slug>)
├─ regio.html             Lokale SEO-landing (?plaats=<slug>)
├─ prijzen.html           Prijslijst (tabellen)
├─ hoe-werkt-het.html     Stappenplan + inbegrepen / zelf voorzien
├─ veelgestelde-vragen.html
├─ over-ons.html
├─ contact.html           NAP, klikbare tel/mail/WhatsApp, kaart, formulier
├─ offerte.html           Aanvraag-/reservatieformulier (conversie-kern)
├─ veiligheid-en-voorwaarden.html
├─ algemene-voorwaarden.html
├─ privacybeleid.html
├─ 404.html · sitemap.xml · robots.txt · site.webmanifest
└─ assets/
   ├─ css/styles.css      Volledig designsysteem
   ├─ js/data.js          ★ ALLE inhoud (producten, prijzen, categorieën, regio's, FAQ, bedrijfsgegevens)
   ├─ js/main.js          Header, footer, mobiele balk, cookiebanner, formulieren
   ├─ js/catalog.js       Catalogus, filters, productdetail, categorie-/regiopagina's
   └─ img/                logo, products/, gallery/
```

## 3. Inhoud beheren — alles op één plek

Open **`assets/js/data.js`**. Daar staat alles. De pagina's bouwen zich automatisch op uit deze data.

- **Prijs/afmeting wijzigen** → pas het product aan in `PRODUCTS`.
- **Nieuw springkasteel** → kopieer een bestaand product-object, geef een unieke `slug`,
  zet een foto in `assets/img/products/<slug>.jpg` en verwijs ernaar via `img`.
- **Navigatie/menu** → `NAV` in `assets/js/main.js` (1 plek, geldt voor alle pagina's).
- **Bedrijfsgegevens (telefoon, adres, btw…)** → `COMPANY` in `data.js`.

### Foto's die nog ontbreken (placeholder = nette gradient met naam)
Deze toestellen tonen een placeholder tot je een foto toevoegt op het aangegeven pad:

| Product | Verwacht bestand |
|---|---|
| Indian Fun | `assets/img/products/indian-fun.jpg` |
| Lion Run | `assets/img/products/lion-run.jpg` |
| Summer Party | `assets/img/products/summer-party.jpg` |
| Toxic Run | `assets/img/products/toxic-run.jpg` |
| IPS-Kegels | `assets/img/products/ips-kegels.jpg` |
| Popcornmachine | `assets/img/products/popcornmachine.jpg` |
| enkele volksspelen | zie `data.js` (`img: null`) |

Tip: optimaliseer nieuwe foto's tot max ~1000 px breed en ~80 % kwaliteit (de bestaande
foto's zijn al verkleind en EXIF-gecorrigeerd).

## 4. Het contactformulier laten werken (belangrijk vóór livegang)

Nu openen de formulieren het **e-mailprogramma** van de bezoeker (mailto), als drempelloze
fallback zonder server. Voor echte, betrouwbare aanvragen koppel je best een formulier-service:

1. Maak een gratis account bij **Formspree**, **Web3Forms** of **Basin**.
2. In `assets/js/main.js`, functie `initForms()`: vervang de mailto-logica door een
   `fetch(endpoint, { method:'POST', body:data })` naar je endpoint-URL.
3. De honeypot (`name="website"`) tegen spam zit er al in.

## 4b. Online reserveren via Booqable (overgenomen van de oude site)

De oude site gebruikte **Booqable** (verhuurboekingssoftware) voor online reservaties. Dat is
behouden en netjes ingebouwd:

- Het Booqable-script (`assets/js/data.js` → `COMPANY.booqableScript`) wordt **site-breed** geladen,
  zodat het **zwevende winkelmandje + de checkout** op elke pagina werken.
- Op **elke productdetailpagina** staat de echte **"Reserveer direct online"-knop**
  (`<div class="booqable-product-button" data-id="…">`), die live de prijs/beschikbaarheid uit
  Booqable toont en "Toevoegen aan mandje" aanbiedt. Het offerteformulier en WhatsApp blijven als
  alternatief ("Liever advies? Vraag het ons").
- De koppeling slug → Booqable-id staat in `assets/js/data.js` (`BOOQABLE`-map). De 3 "op aanvraag"-items
  (tafels, tenten, verwarming) hebben bewust géén Booqable-knop.
- Op mobiel wordt de zwevende Booqable-mandknop automatisch boven de sticky contactbalk getild
  (CSS: `#booqable-cart .closed`), zodat ze elkaar niet overlappen.

> Beheer je producten/prijzen/beschikbaarheid in je **Booqable-dashboard**; die data verschijnt
> automatisch in de boekknoppen. De prijzen in `data.js` zijn voor de weergave op de site —
> hou ze gelijk met Booqable.

## 5. SEO — wat al ingebouwd is

- Unieke **title** + **meta description** per pagina (op product-/categorie-/regiopagina's
  dynamisch en uniek per item).
- **Structured data (JSON-LD):** `LocalBusiness` (home), `Product` (elk toestel),
  `FAQPage` (home + FAQ), `BreadcrumbList` (categorie), `Service` (regio).
- Correcte **H1/H2/H3**-hiërarchie, **alt-teksten**, **canonical**, **OG-tags**, `sitemap.xml`, `robots.txt`.
- Sterke **interne links** (footer → categorieën + regio's; tussen producten onderling).
- Doel-zoektermen: *springkasteel huren (Lebbeke/Buggenhout/Dendermonde/Aalst…)*,
  *springkasteel verjaardag / schoolfeest*, *springkasteel met glijbaan*,
  *waterspringkasteel huren*, *hindernisbaan huren*.

### Optionele SEO-upgrade: "mooie" statische URL's
De categorie- en regiopagina's werken nu via query-parameters (`?c=` / `?plaats=`). Google
rendert JS en indexeert deze, maar voor maximale lokale SEO kan je ze omzetten naar statische
bestanden met propere URL's (bv. `/springkasteel-huren-dendermonde.html`). De inhoud staat
al klaar in `data.js`; je hoeft enkel per slug een statisch bestand te genereren en de
sitemap bij te werken. Vraag dit gerust — het is een kleine toevoeging.

## 6. NAP-consistentie (opgelet)
De oude site gebruikte door elkaar **Buggenhout** en **Lebbeke**. Hier is overal het
geregistreerde adres aangehouden: **Halfveld 1, 9280 Lebbeke**, met als werkgebied
"Lebbeke, Buggenhout en omstreken". Hou dit identiek op Google Bedrijfsprofiel,
Facebook en in vermeldingen — dat helpt je lokale ranking.

## 7. Nog te doen vóór livegang (checklist)
- [ ] **Echte reviews** plaatsen op de homepage (nu voorbeeldteksten — duidelijk gemarkeerd).
- [ ] **Facebook/Instagram-URL** invullen in `COMPANY` (`data.js`) — de oude FB-link was een placeholder.
- [ ] **Formulier-endpoint** koppelen (zie §4).
- [ ] Ontbrekende **productfoto's** toevoegen (zie §3).
- [ ] **Algemene voorwaarden** juridisch laten nakijken (het is een verzorgde basisversie).
- [ ] Eventueel een **favicon** als `.ico`/`.png` toevoegen (nu wordt het logo gebruikt).
- [ ] **Google Bedrijfsprofiel** aanmaken/koppelen voor lokale vindbaarheid.

## 8. Designsysteem (samengevat)
- **Kleuren:** hemelsblauw `#1B9DE0` (primair) · zon-geel `#FFC23C` (accent) ·
  koraal/tomaat `#E84E2E` (call-to-action) · mint `#1FA971` (✓/inbegrepen) · diepnavy tekst.
- **Typografie:** *Baloo 2* (speelse, ronde titels) + *Hanken Grotesk* (heldere body).
- **Vormen:** ruime afronding, zachte schaduwen, golfscheidingen, subtiele confetti.
- **Componenten:** knoppen, badges (Populair/Nieuw/Met glijbaan/Waterpret), productkaarten,
  USP-blokken, stappen, FAQ-accordeon, formulieren, sticky mobiele contactbalk, cookiebanner.
- **Toegankelijk:** skip-link, focus-states, voldoende contrast, `prefers-reduced-motion`,
  semantische HTML, mobile-first.

---

*Gemaakt met aandacht voor snelheid, duidelijkheid, vertrouwen en conversie. Veel succes met de feesten! 🎉*
