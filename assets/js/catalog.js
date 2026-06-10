/* ============================================================================
   KELOBOR — assortiment, productdetail, categorie- en regiopagina's
   ========================================================================== */
(function () {
  "use strict";
  var K = window.KELOBOR, C = K.COMPANY, ICON = window.ICON;
  var qs = function (s, r) { return (r || document).querySelector(s); };

  /* Passende emoji per product zonder foto (fallback per categorie/type). */
  var PH_EMOJI = {
    "indian-fun": "🏹", "summer-party": "🌞", "lion-run": "🦁", "toxic-run": "🧪",
    "ips-kegels": "🎳", "popcornmachine": "🍿", "reuze-4-op-een-rij": "🔴",
    "domino-xl": "🎲", "zaklopen-kids": "🦘", "soft-archery-kiddies": "🏹",
    "soft-archery-junior": "🏹", "kleefbal-kids": "🎯", "partytenten": "⛺", "verwarming": "🔥"
  };
  function phEmoji(p) {
    if (PH_EMOJI[p.slug]) return PH_EMOJI[p.slug];
    if (p.water) return "💦"; if (p.cats.indexOf("peuters") !== -1) return "🧸";
    if (p.type === "run") return "🏁"; if (p.slide) return "🎢";
    if (p.cats.indexOf("thema") !== -1) return "🏰"; if (p.type === "volksspel") return "🎯";
    if (p.type === "feestmateriaal") return "🎪";
    return "🎈";
  }
  function phBlock(p) {
    return '<div class="card__ph"><span class="ph-emoji" aria-hidden="true">' + phEmoji(p) + "</span>" +
      "<b>" + p.name + "</b><small>Foto volgt binnenkort</small></div>";
  }
  function media(p, cls) {
    if (p.img) return '<img class="' + (cls || "card__img") + '" src="' + p.img + '" alt="' + p.name + ' — springkasteel huren bij Kelobor" loading="lazy" decoding="async">';
    return phBlock(p);
  }
  function badges(p) {
    if (!p.badges || !p.badges.length) return "";
    var b = p.badges.map(function (t) {
      var c = "badge"; if (/nieuw/i.test(t)) c += " badge--new"; else if (/populair/i.test(t)) c += " badge--pop";
      else if (/water/i.test(t)) c += " badge--water"; else if (/glijbaan/i.test(t)) c += " badge--slide";
      return '<span class="' + c + '">' + t + "</span>";
    }).join("");
    return '<div class="badges">' + b + "</div>";
  }
  function metaBits(p) {
    var out = [];
    if (p.dim) out.push("<span>" + ICON("ruler") + K.fmtDim(p.dim) + "</span>");
    if (p.ages && p.ages !== "—") out.push("<span>" + ICON("age") + p.ages + "</span>");
    return out.join("");
  }
  function priceBlock(p) {
    if (!p.price) return '<div class="card__price">Op aanvraag<small>vrijblijvend</small></div>';
    var m = p.priceLabel.match(/^(vanaf\s*)?€\s?\d+/i);
    var main = m ? m[0].replace(/\s+/g, " ").trim() : "€" + p.price;
    var qual = "per dag";
    if (/combi/i.test(p.priceLabel)) qual = "los · combi voordeliger";
    else if (/set/i.test(p.priceLabel)) qual = "per set";
    else if (/incl/i.test(p.priceLabel)) qual = "incl. verbruik";
    return '<div class="card__price">' + main + "<small>" + qual + "</small></div>";
  }

  function card(p) {
    return (
      '<article class="card">' +
        '<a class="card__media" href="product.html?p=' + p.slug + '" aria-label="' + p.name + '">' + media(p) + badges(p) + "</a>" +
        '<div class="card__body">' +
          '<span class="card__type">' + K.TYPE_LABELS[p.type] + "</span>" +
          '<h3 class="card__title"><a href="product.html?p=' + p.slug + '">' + p.name + "</a></h3>" +
          '<p class="card__intro">' + p.intro + "</p>" +
          '<div class="card__meta">' + metaBits(p) + "</div>" +
          '<div class="card__foot">' + priceBlock(p) + "</div>" +
          '<div class="card__actions">' +
            '<a class="btn btn--ghost" href="product.html?p=' + p.slug + '">Details</a>' +
            '<a class="btn btn--cta" href="offerte.html?product=' + p.slug + '">Aanvragen</a>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }
  function renderGrid(host, list) {
    if (!host) return;
    host.innerHTML = list.length ? list.map(card).join("")
      : '<div class="empty-state"><p>Geen toestellen gevonden met deze filters.</p><p>Pas je filters aan of <a href="offerte.html">vraag ons om advies</a> — we helpen je graag kiezen.</p></div>';
  }

  /* ---------- Homepage: populaire toestellen ---------------------------- */
  function homePopular() {
    var host = qs("[data-popular-grid]"); if (!host) return;
    var pop = K.PRODUCTS.filter(function (p) { return p.popular; }).slice(0, 6);
    renderGrid(host, pop);
  }

  /* ---------- Assortimentpagina (filters) ------------------------------- */
  function catalogApp() {
    var app = qs("[data-catalog-app]"); if (!app) return;
    var params = new URLSearchParams(location.search);
    var state = {
      q: "", type: params.get("type") || "all",
      cat: params.get("c") || "all",
      slide: params.get("slide") === "1", water: params.get("water") === "1", peuters: false,
      sort: "popular"
    };
    var CHIPS = [
      { k: "all", label: "Alles" },
      { k: "verjaardag", label: "Verjaardag" }, { k: "peuters", label: "Peuters" },
      { k: "met-glijbaan", label: "Met glijbaan" }, { k: "waterspringkastelen", label: "Waterpret" },
      { k: "multiplay", label: "Multiplay" }, { k: "hindernisbanen", label: "Hindernisbanen" },
      { k: "thema", label: "Thema" }, { k: "scholen", label: "Scholen" }, { k: "bedrijven", label: "Bedrijven" }
    ];
    app.innerHTML =
      '<div class="toolbar">' +
        '<div class="chips" role="group" aria-label="Categorieën">' +
          CHIPS.map(function (c) { return '<button class="chip" data-chip="' + c.k + '" aria-pressed="false">' + c.label + "</button>"; }).join("") +
        "</div>" +
        '<div class="toolbar__row">' +
          '<label class="search"><span class="visually-hidden">Zoeken</span>' + ICON("search") +
            '<input class="input" type="search" placeholder="Zoek een springkasteel of thema…" data-q></label>' +
          '<select class="select" data-sort aria-label="Sorteren">' +
            '<option value="popular">Sorteer: populair</option>' +
            '<option value="price-asc">Prijs: laag → hoog</option>' +
            '<option value="price-desc">Prijs: hoog → laag</option>' +
            '<option value="name">Naam: A → Z</option>' +
          "</select>" +
        "</div>" +
        '<div class="toggle-pills">' +
          '<label class="toggle-pill"><input type="checkbox" data-t="slide"> Met glijbaan</label>' +
          '<label class="toggle-pill"><input type="checkbox" data-t="water"> Waterpret</label>' +
          '<label class="toggle-pill"><input type="checkbox" data-t="peuters"> Geschikt voor peuters</label>' +
        "</div>" +
      "</div>" +
      '<p class="result-count" data-count style="margin:1.2rem 0 .4rem"></p>' +
      '<div class="card-grid" data-grid></div>';

    var grid = qs("[data-grid]", app), count = qs("[data-count]", app);

    function apply() {
      var list = K.PRODUCTS.filter(function (p) {
        if (state.type !== "all" && p.type !== state.type) return false;
        if (state.cat !== "all" && p.cats.indexOf(state.cat) === -1) return false;
        if (state.slide && !p.slide) return false;
        if (state.water && !p.water) return false;
        if (state.peuters && p.agesMin > 3) return false;
        if (state.q) {
          var hay = (p.name + " " + p.intro + " " + p.cats.join(" ") + " " + K.TYPE_LABELS[p.type]).toLowerCase();
          if (hay.indexOf(state.q.toLowerCase()) === -1) return false;
        }
        return true;
      });
      list.sort(function (a, b) {
        if (state.sort === "price-asc") return (a.price || Infinity) - (b.price || Infinity); // 'op aanvraag' achteraan
        if (state.sort === "price-desc") return b.price - a.price;
        if (state.sort === "name") return a.name.localeCompare(b.name);
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.price - a.price;
      });
      count.textContent = list.length + (list.length === 1 ? " toestel" : " toestellen") + " gevonden";
      renderGrid(grid, list);
      qsa(".chip", app).forEach(function (ch) {
        var on = ch.dataset.chip === state.cat;
        ch.classList.toggle("is-active", on);
        ch.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }
    function qsa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

    app.addEventListener("click", function (e) {
      var ch = e.target.closest("[data-chip]"); if (ch) { state.cat = ch.dataset.chip; state.type = "all"; apply(); }
    });
    qs("[data-q]", app).addEventListener("input", function (e) { state.q = e.target.value; apply(); });
    qs("[data-sort]", app).addEventListener("change", function (e) { state.sort = e.target.value; apply(); });
    qsa("[data-t]", app).forEach(function (cb) {
      cb.checked = state[cb.dataset.t];
      cb.addEventListener("change", function () { state[cb.dataset.t] = cb.checked; apply(); });
    });
    apply();
  }

  /* ---------- Meta / structured data helpers ---------------------------- */
  function setMeta(title, desc, imgPath, canonicalPath) {
    document.title = title;
    var m = qs('meta[name="description"]'); if (m) m.setAttribute("content", desc);
    var ogt = qs('meta[property="og:title"]'); if (ogt) ogt.setAttribute("content", title);
    var ogd = qs('meta[property="og:description"]'); if (ogd) ogd.setAttribute("content", desc);
    if (imgPath) { var ogi = qs('meta[property="og:image"]'); if (ogi) ogi.setAttribute("content", C.url + "/" + imgPath); }
    if (canonicalPath) {
      var href = C.url + "/" + canonicalPath;
      var can = qs('link[rel="canonical"]');
      if (!can) { can = document.createElement("link"); can.rel = "canonical"; document.head.appendChild(can); }
      can.href = href;
      var ogu = qs('meta[property="og:url"]');
      if (!ogu) { ogu = document.createElement("meta"); ogu.setAttribute("property", "og:url"); document.head.appendChild(ogu); }
      ogu.setAttribute("content", href);
    }
  }
  function injectJSONLD(obj) {
    var s = document.createElement("script"); s.type = "application/ld+json";
    s.textContent = JSON.stringify(obj); document.head.appendChild(s);
  }
  function setCrumb(host, items) {
    host.innerHTML = items.map(function (it, i) {
      var sep = i ? " › " : "";
      return sep + (it.href ? '<a href="' + it.href + '">' + it.label + "</a>" : "<span>" + it.label + "</span>");
    }).join("");
  }

  /* ---------- Productdetailpagina --------------------------------------- */
  function productPage() {
    var host = qs("[data-product]"); if (!host) return;
    var slug = new URLSearchParams(location.search).get("p");
    var p = slug && K.bySlug(slug);
    if (!p) {
      host.innerHTML = '<div class="empty-state"><h1>Toestel niet gevonden</h1><p>Bekijk <a href="springkastelen.html">het volledige assortiment</a>.</p></div>';
      var relSec = qs("[data-related]"); if (relSec) relSec.closest("section").style.display = "none";
      return;
    }

    setMeta(
      p.name + " huren — " + p.priceLabel + " | Kelobor Springkastelen",
      p.intro + " " + (p.dim ? "Afmetingen " + K.fmtDim(p.dim) + ". " : "") + "Gratis levering in de regio Lebbeke–Buggenhout. Vraag de beschikbaarheid aan.",
      p.img || null,
      "product.html?p=" + p.slug
    );
    var crumb = qs("[data-breadcrumb]"); if (crumb) setCrumb(crumb, [
      { label: "Home", href: "index.html" }, { label: "Springkastelen", href: "springkastelen.html" }, { label: p.name }
    ]);

    function spec(icon, k, v) { return '<li><span class="k">' + ICON(icon) + k + '</span><span class="v">' + v + "</span></li>"; }
    var freeSpace = p.dim ? "± " + Math.ceil(p.dim.b + 2) + " × " + Math.ceil(p.dim.l + 2) + " m (incl. 1 m rondom)" : "In overleg";
    var specs =
      (p.dim ? spec("ruler", "Afmetingen (B×L×H)", K.fmtDim(p.dim)) : "") +
      (p.dim ? spec("surface", "Benodigde vrije ruimte", freeSpace) : "") +
      (p.ages !== "—" ? spec("age", "Geschikte leeftijd", p.ages) : "") +
      (p.capacity !== "—" ? spec("users", "Capaciteit", p.capacity) : "") +
      spec("power", "Stroom", p.power) +
      (p.surface !== "—" ? spec("surface", "Ondergrond", p.surface) : "") +
      spec("slide", "Glijbaan", p.slide ? "Ja" : "Nee") +
      spec("water", "Waterpret", p.water ? "Ja" : "Nee");

    var feats = p.features.map(function (f) { return "<li>" + ICON("check") + "<span>" + f + "</span></li>"; }).join("");
    var good = p.goodFor.map(function (g) { return '<span class="badge badge--soft">' + g + "</span>"; }).join("");

    host.innerHTML =
      '<div class="pd">' +
        '<div class="pd__gallery">' +
          '<div class="pd__main">' + (p.img ? '<img src="' + p.img + '" alt="' + p.name + ' springkasteel huren">' : phBlock(p)) + "</div>" +
          '<ul class="spec-grid">' + specs + "</ul>" +
        "</div>" +
        '<div class="pd__info">' +
          badges(p) +
          "<h1>" + p.name + "</h1>" +
          '<p class="lead">' + p.intro + "</p>" +
          (function () {
            // Zelfde prijsweergave als de kaartjes: hoofdprijs uit priceLabel (bij combi = losse prijs).
            if (!p.price) return '<div class="pd__price"><b>Op aanvraag</b><span>vrijblijvend</span></div>';
            var m = p.priceLabel.match(/^(vanaf\s*)?€\s?\d+/i);
            var main = m ? m[0].replace(/\s+/g, " ").trim() : "€" + p.price;
            var qual = /combi/i.test(p.priceLabel) ? "/ dag (los) · incl. btw" : "/ dag · incl. btw";
            return '<div class="pd__price"><b>' + main + "</b><span>" + qual + "</span></div>";
          })() +
          (p.priceNote ? '<p class="tag" style="font-size:.92rem">' + p.priceNote + "</p>" : "") +
          (p.booqableId
            ? '<div class="booqable-cta"><span class="booqable-cta__label">' + ICON("calendar") + " Reserveer direct online — kies je datum</span>" +
              '<div class="booqable-product-button" data-id="' + p.booqableId + '"></div></div>'
            : "") +
          '<div class="pd__cta">' +
            '<a class="btn ' + (p.booqableId ? "btn--ghost" : "btn--cta") + ' btn--lg" href="offerte.html?product=' + p.slug + '">' + (p.booqableId ? "Liever advies? Vraag het ons" : "Vraag beschikbaarheid aan") + "</a>" +
            '<a class="btn btn--wa btn--lg" href="' + C.whatsappHref + '?text=' + encodeURIComponent("Hallo Kelobor, is de " + p.name + " beschikbaar op ") + '" target="_blank" rel="noopener">' + ICON("wa") + " WhatsApp</a>" +
          "</div>" +
          '<ul class="feature-list pd__includes">' +
            "<li>" + ICON("check") + "<span>Levering, plaatsing &amp; ophaling inbegrepen</span></li>" +
            "<li>" + ICON("check") + "<span>Proper en ontsmet afgeleverd</span></li>" +
            "<li>" + ICON("check") + "<span>Betaal pas op de dag zelf — gratis &lt; 15 km</span></li>" +
          "</ul>" +
        "</div>" +
      "</div>" +
      '<div class="split mt-2" style="margin-top:clamp(2rem,5vw,3.5rem)">' +
        "<div><h2>Waarom de " + p.name + "?</h2><p>" + p.desc + '</p><ul class="feature-list mt-1">' + feats + "</ul></div>" +
        '<div class="panel"><h3>Ideaal voor</h3><div class="chips-row mt-1">' + good + "</div>" +
          '<hr class="divider" style="margin:1.3rem 0">' +
          "<h3>Inbegrepen</h3><ul class=\"feature-list mt-1\">" +
            "<li>" + ICON("check") + "<span>Levering, plaatsing én ophaling</span></li>" +
            "<li>" + ICON("check") + "<span>Stevige verankering + grondzeil</span></li>" +
            "<li>" + ICON("check") + "<span>Stroomkabels en uitleg ter plaatse</span></li>" +
            "<li>" + ICON("check") + "<span>Proper en ontsmet afgeleverd</span></li>" +
          "</ul>" +
          '<p class="form-note mt-1">' + ICON("info") + "<span>Betaal pas op de dag van levering. Gratis binnen 15 km rond Lebbeke.</span></p>" +
        "</div>" +
      "</div>";

    // Gerelateerde toestellen
    var rel = K.PRODUCTS.filter(function (x) { return x.slug !== p.slug && x.cats.some(function (c) { return p.cats.indexOf(c) !== -1; }); }).slice(0, 3);
    var relHost = qs("[data-related]"); if (relHost && rel.length) renderGrid(relHost, rel);

    injectJSONLD({
      "@context": "https://schema.org", "@type": "Product", "name": p.name,
      "image": p.img ? C.url + "/" + p.img : C.url + "/assets/img/logo.jpg",
      "description": p.intro, "category": K.TYPE_LABELS[p.type], "brand": { "@type": "Brand", "name": "Kelobor Springkastelen" },
      "offers": p.price ? { "@type": "Offer", "price": p.price, "priceCurrency": "EUR", "availability": "https://schema.org/InStock",
        "priceValidUntil": (new Date().getFullYear() + 1) + "-12-31", "url": C.url + "/product.html?p=" + p.slug,
        "seller": { "@type": "Organization", "name": "Kelobor Springkastelen" } } : undefined
    });
  }

  /* ---------- Categoriepagina ------------------------------------------- */
  function categoryPage() {
    var host = qs("[data-category]"); if (!host) return;
    var slug = new URLSearchParams(location.search).get("c");
    var cat = slug && K.catBySlug(slug);
    if (!cat) { location.replace("springkastelen.html"); return; }
    setMeta(cat.seoTitle, cat.seoDesc, null, "categorie.html?c=" + slug);
    var crumb = qs("[data-breadcrumb]"); if (crumb) setCrumb(crumb, [
      { label: "Home", href: "index.html" }, { label: "Springkastelen", href: "springkastelen.html" }, { label: cat.short }
    ]);
    qs("[data-cat-h1]").textContent = cat.h1;
    qs("[data-cat-intro]").textContent = cat.intro;
    renderGrid(qs("[data-cat-grid]"), K.inCat(slug));
    injectJSONLD({
      "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": C.url + "/" },
        { "@type": "ListItem", "position": 2, "name": "Springkastelen", "item": C.url + "/springkastelen.html" },
        { "@type": "ListItem", "position": 3, "name": cat.h1 }
      ]
    });
  }

  /* ---------- Regiopagina (lokale SEO) ---------------------------------- */
  function regionPage() {
    var host = qs("[data-region]"); if (!host) return;
    var slug = new URLSearchParams(location.search).get("plaats");
    var r = slug && K.regionBySlug(slug);
    if (!r) { location.replace("contact.html"); return; }
    var free = r.free ? "Binnen 15 km van onze thuisbasis in Lebbeke, dus ook in <strong>" + r.name + "</strong>, leveren én plaatsen we volledig gratis."
                       : "Ook naar <strong>" + r.name + "</strong> komen we graag. Buiten de 15 km-zone rekenen we enkel een beperkte kilometervergoeding.";
    setMeta(
      "Springkasteel huren in " + r.name + " (" + r.postcode + ") | Kelobor Springkastelen",
      "Springkasteel of hindernisbaan huren in " + r.name + "? Ruime keuze, veilig gekeurd materiaal en " + (r.free ? "gratis levering" : "snelle levering") + ". Betaal pas op de dag zelf. Vraag de beschikbaarheid aan.",
      null,
      "regio.html?plaats=" + slug
    );
    var crumb = qs("[data-breadcrumb]"); if (crumb) setCrumb(crumb, [
      { label: "Home", href: "index.html" }, { label: "Werkgebied" }, { label: r.name }
    ]);
    qs("[data-reg-h1]").textContent = "Springkasteel huren in " + r.name;
    qs("[data-reg-intro]").innerHTML =
      "Op zoek naar een springkasteel in <strong>" + r.name + "</strong> (" + r.postcode + ")? Bij Kelobor Springkastelen kies je uit een ruim aanbod springkastelen, hindernisbanen en feestmateriaal. " + free +
      " Ideaal voor een verjaardag, communiefeest, schoolfeest of buurtfeest in " + r.name + ".";
    renderGrid(qs("[data-reg-grid]"), K.PRODUCTS.filter(function (p) { return p.popular; }).slice(0, 6));
    var other = qs("[data-reg-other]");
    if (other) other.innerHTML = K.REGIONS.filter(function (x) { return x.slug !== r.slug; })
      .map(function (x) { return '<a class="chip" href="regio.html?plaats=' + x.slug + '">' + x.name + "</a>"; }).join("");
    injectJSONLD({
      "@context": "https://schema.org", "@type": "Service", "serviceType": "Verhuur van springkastelen",
      "provider": { "@type": "LocalBusiness", "name": "Kelobor Springkastelen", "telephone": C.phoneHref.replace("tel:", "") },
      "areaServed": { "@type": "City", "name": r.name }, "description": "Springkastelen en feestmateriaal huren in " + r.name + "."
    });
  }

  // Booqable-boekingssysteem laden (zwevend winkelmandje + checkout site-breed).
  // Wordt ná het renderen geladen zodat de product-knoppen al in de DOM staan.
  function loadBooqable() {
    if (!C.booqableScript || document.querySelector("script[data-booqable]")) return;
    var s = document.createElement("script");
    s.src = C.booqableScript; s.async = true; s.setAttribute("data-booqable", "1");
    document.body.appendChild(s);
  }

  function init() { homePopular(); catalogApp(); productPage(); categoryPage(); regionPage(); loadBooqable(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
