/* ============================================================================
   KELOBOR — gedeelde site-logica
   • Bouwt header, footer, mobiele CTA-balk en cookiebanner op elke pagina
   • Icoonset (SVG), menu-/scroll-/reveal-interacties, formulierafhandeling
   ========================================================================== */
(function () {
  "use strict";
  var C = window.KELOBOR.COMPANY;

  /* ---------- Icoonset --------------------------------------------------- */
  var I = {
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z"/></svg>',
    wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.06 24l1.68-6.13A11.8 11.8 0 0 1 .16 11.9C.16 5.34 5.5 0 12.06 0a11.8 11.8 0 0 1 8.4 3.49 11.8 11.8 0 0 1 3.48 8.41c0 6.56-5.34 11.9-11.9 11.9a11.9 11.9 0 0 1-5.68-1.45L.06 24Zm6.6-3.8c1.68.99 3.28 1.58 5.4 1.58 5.45 0 9.89-4.43 9.89-9.88a9.86 9.86 0 0 0-9.88-9.89c-5.46 0-9.9 4.44-9.9 9.89 0 2.23.65 3.9 1.75 5.65l-.99 3.63 3.73-.98Zm11.39-5.55c-.07-.12-.27-.2-.57-.35-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9 9 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01a1.1 1.1 0 0 0-.8.37c-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.69.25-1.28.18-1.41Z"/></svg>',
    mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 6 9 7 9-7"/></svg>',
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    truck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17V5a1 1 0 0 0-1-1H2"/><path d="M14 17h-4"/><path d="M2 9h8"/><path d="M14 7h4l4 4v6h-3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
    shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
    sparkle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg>',
    wallet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2"/><path d="M3 7v10a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-3"/><path d="M21 11v4h-4a2 2 0 0 1 0-4h4Z"/></svg>',
    heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5.5 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z"/></svg>',
    calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M3 9h18M8 2v4M16 2v4"/><path d="m9 15 2 2 4-4"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
    star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1Z"/></svg>',
    search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    chevron:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    ruler:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h18v8H3z"/><path d="M7 8v3M11 8v4M15 8v3M19 8v4"/></svg>',
    users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
    age:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/></svg>',
    power:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"/><path d="M18 6a8 8 0 1 1-12 0"/></svg>',
    surface:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18h20M4 18l3-7 3 4 3-8 4 11"/></svg>',
    water:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5S5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2.5 12 2.5Z"/></svg>',
    slide:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20c6 0 10-4 12-10"/><path d="M16 10l4-5"/><circle cx="19" cy="4" r="1.4" fill="currentColor"/><path d="M4 20h4"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    party:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 22 5-14 9 9-14 5Z"/><path d="M14 6a3 3 0 0 0 3-3M16 11a4 4 0 0 1 4-4M19 14v.01M11 3v.01"/></svg>',
    school:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 11v5c0 1 2 2.5 5 2.5s5-1.5 5-2.5v-5"/></svg>',
    briefcase:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    gift:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9"/><path d="M12 8S11 3 8.5 3 6 6 8 8M12 8s1-5 3.5-5S18 6 16 8"/></svg>',
    info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>',
    facebook:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z"/></svg>',
    instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>',
    sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/></svg>'
  };
  window.ICON = function (name) { return I[name] || ""; };

  var waFull = C.whatsappHref + "?text=" + encodeURIComponent(C.whatsappText);

  /* ---------- Hoofdnavigatie-items -------------------------------------- */
  var NAV = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "springkastelen", label: "Springkastelen", href: "springkastelen.html" },
    { key: "prijzen", label: "Prijzen", href: "prijzen.html" },
    { key: "hoe", label: "Hoe werkt het?", href: "hoe-werkt-het.html" },
    { key: "faq", label: "FAQ", href: "veelgestelde-vragen.html" },
    { key: "over", label: "Over ons", href: "over-ons.html" },
    { key: "contact", label: "Contact", href: "contact.html" }
  ];

  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }

  /* ---------- Header ----------------------------------------------------- */
  function buildHeader() {
    var host = document.querySelector("[data-site-header]");
    if (!host) return;
    var page = document.body.dataset.page || "";
    var links = NAV.map(function (n) {
      var cur = n.key === page ? ' aria-current="page"' : "";
      return '<li><a href="' + n.href + '"' + cur + ">" + n.label + "</a></li>";
    }).join("");

    host.innerHTML =
      '<a class="skip-link" href="#main">Naar de inhoud</a>' +
      '<header class="site-header">' +
        '<div class="topbar"><div class="container topbar__inner">' +
          '<span class="hide-sm">' + I.pin + ' Lebbeke · Buggenhout · Dendermonde · Aalst — gratis levering binnen 15 km</span>' +
          '<div class="topbar__set">' +
            '<a href="' + C.phoneHref + '">' + I.phone + " " + C.phoneDisplay + "</a>" +
            '<a class="hide-sm" href="' + waFull + '" target="_blank" rel="noopener">' + I.wa + " WhatsApp</a>" +
          "</div>" +
        "</div></div>" +
        '<nav class="nav container" aria-label="Hoofdnavigatie">' +
          '<a class="nav__logo" href="index.html" aria-label="Kelobor Springkastelen — naar de homepage">' +
            '<img src="assets/img/logo.jpg" width="92" height="46" alt="Kelobor Springkastelen logo">' +
            "<span><b>Kelobor</b><span>Springkastelen</span></span>" +
          "</a>" +
          '<ul class="nav__links">' + links + "</ul>" +
          '<div class="nav__right">' +
            '<a class="btn btn--cta" href="offerte.html">Vraag beschikbaarheid</a>' +
            '<button class="nav-toggle" aria-label="Menu openen" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>' +
          "</div>" +
        "</nav>" +
      "</header>";

    // Drawer
    var drawerLinks = NAV.map(function (n) {
      return '<a class="drawer__link" href="' + n.href + '">' + n.label + I.arrow + "</a>";
    }).join("");
    var drawer = el(
      '<div class="drawer" id="drawer" aria-hidden="true">' +
        '<div class="drawer__panel" role="dialog" aria-modal="true" aria-label="Menu">' +
          '<div class="drawer__head">' +
            '<a class="nav__logo" href="index.html"><img src="assets/img/logo.jpg" width="80" height="40" alt=""><span><b>Kelobor</b><span>Springkastelen</span></span></a>' +
            '<button class="drawer__close" aria-label="Menu sluiten">&times;</button>' +
          "</div>" +
          drawerLinks +
          '<div class="drawer__cta">' +
            '<a class="btn btn--cta btn--block" href="offerte.html">Vraag beschikbaarheid aan</a>' +
            '<a class="btn btn--wa btn--block" href="' + waFull + '" target="_blank" rel="noopener">' + I.wa + " Stuur een WhatsApp</a>" +
            '<a class="btn btn--ghost btn--block" href="' + C.phoneHref + '">' + I.phone + " " + C.phoneDisplay + "</a>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
    document.body.appendChild(drawer);

    var header = host.querySelector(".site-header");
    var toggle = host.querySelector(".nav-toggle");
    function openDrawer() { drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); toggle.setAttribute("aria-expanded", "true"); document.body.classList.add("body-locked"); drawer.querySelector(".drawer__close").focus(); }
    function closeDrawer() { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); toggle.setAttribute("aria-expanded", "false"); document.body.classList.remove("body-locked"); if (drawer.contains(document.activeElement)) toggle.focus(); }
    toggle.addEventListener("click", function () { drawer.classList.contains("is-open") ? closeDrawer() : openDrawer(); });
    drawer.querySelector(".drawer__close").addEventListener("click", closeDrawer);
    drawer.addEventListener("click", function (e) { if (e.target === drawer) closeDrawer(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });

    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Footer ----------------------------------------------------- */
  function buildFooter() {
    var host = document.querySelector("[data-site-footer]");
    if (!host) return;
    var K = window.KELOBOR;
    var catLinks = ["peuters", "met-glijbaan", "waterspringkastelen", "hindernisbanen", "thema"].map(function (s) {
      var c = K.catBySlug(s); return '<li><a href="categorie.html?c=' + s + '">' + c.name + "</a></li>";
    }).join("");
    var regLinks = K.REGIONS.slice(0, 8).map(function (r) {
      return '<li><a href="regio.html?plaats=' + r.slug + '">Springkasteel huren ' + r.name + "</a></li>";
    }).join("");
    var social = "";
    if (C.facebook) social += '<a href="' + C.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + I.facebook + "</a>";
    if (C.instagram) social += '<a href="' + C.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + I.instagram + "</a>";
    social += '<a href="' + waFull + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + I.wa + "</a>";

    host.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a class="nav__logo" href="index.html"><img src="assets/img/logo.jpg" width="92" height="46" alt="Kelobor Springkastelen"><span><b>Kelobor</b><span>Springkastelen</span></span></a>' +
            "<p>Springkastelen, hindernisbanen en feestmateriaal huren in Lebbeke, Buggenhout en omstreken. Veilig, proper en met persoonlijke service.</p>" +
            '<div class="footer-contact">' +
              '<a href="' + C.phoneHref + '">' + I.phone + " " + C.phoneDisplay + "</a>" +
              '<a href="mailto:' + C.email + '">' + I.mail + " " + C.email + "</a>" +
              "<span>" + I.pin + " " + C.street + ", " + C.postcode + " " + C.city + "</span>" +
            "</div>" +
            '<div class="footer-social">' + social + "</div>" +
          "</div>" +
          '<div class="footer-col"><h4>Assortiment</h4><ul>' +
            '<li><a href="springkastelen.html">Alle springkastelen</a></li>' + catLinks +
            '<li><a href="springkastelen.html?type=animatie">Extra animatie</a></li>' +
          "</ul></div>" +
          '<div class="footer-col"><h4>Info</h4><ul>' +
            '<li><a href="hoe-werkt-het.html">Hoe werkt het?</a></li>' +
            '<li><a href="prijzen.html">Prijzen</a></li>' +
            '<li><a href="veiligheid-en-voorwaarden.html">Veiligheid & voorwaarden</a></li>' +
            '<li><a href="veelgestelde-vragen.html">Veelgestelde vragen</a></li>' +
            '<li><a href="over-ons.html">Over ons</a></li>' +
            '<li><a href="contact.html">Contact</a></li>' +
          "</ul></div>" +
          '<div class="footer-col"><h4>Regio</h4><ul>' + regLinks + "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>© " + new Date().getFullYear() + " " + C.legalName + " · btw " + C.vat + "</span>" +
          "<nav><a href='algemene-voorwaarden.html'>Algemene voorwaarden</a><a href='privacybeleid.html'>Privacybeleid</a><a href='#' data-cookie-open>Cookievoorkeuren</a></nav>" +
        "</div>" +
      "</div>";
  }

  /* ---------- Sticky mobiele CTA + cookiebanner -------------------------- */
  function buildStickyCTA() {
    if (document.body.dataset.noSticky === "1") return;
    var bar = el(
      '<div class="sticky-cta" aria-label="Snel contact">' +
        '<a class="sc-call" href="' + C.phoneHref + '">' + I.phone + "<span>Bellen</span></a>" +
        '<a class="sc-wa" href="' + waFull + '" target="_blank" rel="noopener">' + I.wa + "<span>WhatsApp</span></a>" +
        '<a class="sc-offerte" href="offerte.html">' + I.calendar + "<span>Offerte</span></a>" +
      "</div>"
    );
    document.body.appendChild(bar);
    var show = function () { bar.classList.toggle("is-visible", window.scrollY > 380); };
    show(); window.addEventListener("scroll", show, { passive: true });
  }

  // localStorage kan geblokkeerd zijn (privémodus/instellingen) — nooit laten crashen.
  function storeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function storeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function buildCookie() {
    // Banner altijd opbouwen (zodat de footerlink "Cookievoorkeuren" blijft werken);
    // alleen automatisch tonen zolang er nog geen keuze is opgeslagen.
    var box = el(
      '<div class="cookie" role="dialog" aria-label="Cookiemelding">' +
        "<h4>🍪 Cookies op deze site</h4>" +
        "<p>We gebruiken enkel essentiële cookies, o.a. voor het online reserveren via Booqable. Geen tracking, geen advertenties.</p>" +
        '<div class="cookie__row">' +
          '<button class="btn btn--cta btn--sm" data-cookie="ok">Oké, begrepen</button>' +
        "</div>" +
      "</div>"
    );
    document.body.appendChild(box);
    if (!storeGet("kelobor-cookie")) setTimeout(function () { box.classList.add("is-visible"); }, 700);
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cookie]"); if (!b) return;
      storeSet("kelobor-cookie", "ok");
      box.classList.remove("is-visible");
    });
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-cookie-open]")) { e.preventDefault(); box.classList.add("is-visible"); }
    });
  }

  /* ---------- Reveal on scroll ------------------------------------------ */
  function initReveal() {
    var nodes = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
    if (!("IntersectionObserver" in window) || !nodes.length) {
      nodes.forEach(function (n) { n.classList.add("is-in"); }); return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); obs.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    nodes.forEach(function (n) { obs.observe(n); });
  }

  /* ---------- Offerteformulier: productkeuze + verzending --------------- */
  function initForms() {
    // Productkeuze vullen
    var sel = document.querySelector("[data-product-select]");
    if (sel) {
      var groups = { springkasteel: "Springkastelen", run: "Hindernisbanen & runs", animatie: "Extra animatie", volksspel: "Volksspelen", feestmateriaal: "Feestmateriaal" };
      Object.keys(groups).forEach(function (type) {
        var og = document.createElement("optgroup"); og.label = groups[type];
        window.KELOBOR.PRODUCTS.filter(function (p) { return p.type === type; }).forEach(function (p) {
          var o = document.createElement("option"); o.value = p.name; o.textContent = p.name; og.appendChild(o);
        });
        sel.appendChild(og);
      });
      var pre = new URLSearchParams(location.search).get("product");
      if (pre) { var pr = window.KELOBOR.bySlug(pre); if (pr) sel.value = pr.name; }
    }

    // Datumvelden: geen datums in het verleden.
    document.querySelectorAll('form[data-mailform] input[type="date"]').forEach(function (inp) {
      inp.min = new Date().toISOString().slice(0, 10);
    });

    document.querySelectorAll("form[data-mailform]").forEach(function (form) {
      form.setAttribute("novalidate", ""); // wij valideren zelf via reportValidity
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        if (form.querySelector("[name=website]") && form.querySelector("[name=website]").value) return; // honeypot
        var data = new FormData(form), lines = [];
        data.forEach(function (v, k) { if (k !== "website" && String(v).trim()) lines.push(k + ": " + v); });
        var subject = "Aanvraag via website — " + (data.get("naam") || "");
        var body = lines.join("\n") + "\n\n— Verzonden via keloborspringkastelen.be";
        var mailto = "mailto:" + C.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        // Formulier zichtbaar laten (mailto kan falen of geannuleerd worden) — gegevens nooit weggooien.
        var ok = form.parentNode.querySelector(".form-success");
        if (ok) { ok.classList.add("is-visible"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
        window.location.href = mailto;
      });
    });
  }

  /* ---------- Init ------------------------------------------------------- */
  function init() {
    buildHeader(); buildFooter(); buildStickyCTA(); buildCookie(); initReveal(); initForms();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
