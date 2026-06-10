/* ============================================================================
   KELOBOR — laadscherm ("Even opblazen…")
   Vanilla-JS herbouw van het aangeleverde splash-design (React-prototype):
   ballonnenboeket dat opblaast met de laadvoortgang, gestreepte balk,
   drijvende wolken & ballonnen op een traag verkleurende pastelhemel,
   gevolgd door confetti + het KELOBOR-woordmerk. Daarna fade naar de site.

   Gedrag:
   • Alleen op de homepage, één keer per browsersessie (sessionStorage).
   • Overslaan kan via de knop of Escape.
   • `prefers-reduced-motion` → geen splash.
   • De voortgang volgt de échte paginalading (klemt op 90% tot window load).
   • Inhoud blijft gewoon in de DOM — zoekmachines zien alles.
   ========================================================================== */
(function () {
  "use strict";
  var docEl = document.documentElement;
  function clearCover() { docEl.classList.remove("has-splash"); }

  /* ---- Tonen of niet? ---------------------------------------------------- */
  try {
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return clearCover();
    if (sessionStorage.getItem("kelobor-splash-seen")) return clearCover();
    sessionStorage.setItem("kelobor-splash-seen", "1");
  } catch (e) { return clearCover(); }
  if (document.body.dataset.page !== "home") return clearCover();
  docEl.classList.add("has-splash");

  /* ---- Merk (uit het logo — bewust het splash-palet, niet het sitepalet) - */
  var B = {
    orange: "#F26321", orangeDeep: "#D64C0E", orangeSoft: "#FF8A4C",
    green: "#36A93B", greenDeep: "#258A2A", greenSoft: "#7FCE5E",
    red: "#E63A2E", blue: "#2566C8", yellow: "#FFC52E"
  };
  var BG = [["#FFE0C2", "#FFF2E4"], ["#CFEFD2", "#ECF9ED"], ["#C6E8F6", "#E9F7FC"], ["#FCEFB4", "#FEF9DD"], ["#F3D9EC", "#FBEFF6"]];

  /* Fredoka (woordmerk-font van het design) — enkel laden als de splash toont.
     Fallback 'Baloo 2' (sitefont) lijkt sterk, dus geen lelijke swap. */
  var fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&display=swap";
  document.head.appendChild(fontLink);

  /* ---- Stijlen (allemaal ks- prefix, botst nergens met de site) ---------- */
  var PER_COLOR = 9, CYCLE = PER_COLOR * BG.length;
  var css =
    "#kelobor-splash{position:fixed;inset:0;z-index:100000;overflow:hidden;background:#E9F7FC;" +
      "font-family:'Fredoka','Baloo 2','Trebuchet MS',sans-serif;transition:opacity .55s ease}" +
    "#kelobor-splash.is-done{opacity:0;pointer-events:none}" +
    ".ks-bglayer{position:absolute;inset:0;opacity:0;will-change:opacity;animation:ksBgFade " + CYCLE + "s linear infinite}" +
    "@keyframes ksBgFade{0%{opacity:0}4%{opacity:1}18%{opacity:1}22%{opacity:0}100%{opacity:0}}" +
    ".ks-cloud{position:absolute;opacity:.9;filter:drop-shadow(0 8px 14px rgba(80,120,160,.1));animation:ksDrift linear infinite}" +
    "@keyframes ksDrift{from{transform:translateX(-18vw)}to{transform:translateX(118vw)}}" +
    ".ks-balloon{position:absolute;animation:ksFloat ease-in-out infinite alternate;filter:drop-shadow(0 10px 12px rgba(60,90,40,.15))}" +
    "@keyframes ksFloat{from{transform:translateY(10px) rotate(-4deg)}to{transform:translateY(-22px) rotate(4deg)}}" +
    ".ks-bq{animation:ksBob 2.8s ease-in-out infinite;animation-delay:var(--d,0s);transform-box:fill-box;transform-origin:center}" +
    "@keyframes ksBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}" +
    ".ks-loader{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;" +
      "gap:clamp(14px,3vh,30px);transition:opacity .5s ease,transform .5s ease}" +
    ".ks-loader.out{opacity:0;transform:scale(1.1);pointer-events:none}" +
    ".ks-scene{display:flex;flex-direction:column;align-items:center;transform-origin:bottom center;transition:transform .14s ease-out}" +
    ".ks-label{font-weight:600;font-size:clamp(20px,3vw,30px);color:" + B.orangeDeep + ";letter-spacing:.2px;white-space:nowrap}" +
    ".ks-label b{color:" + B.greenDeep + "}" +
    ".ks-dots span{animation:ksBlink 1.2s infinite}.ks-dots span:nth-child(2){animation-delay:.2s}.ks-dots span:nth-child(3){animation-delay:.4s}" +
    "@keyframes ksBlink{0%,100%{opacity:.25}50%{opacity:1}}" +
    ".ks-bar{width:min(360px,76vw);height:18px;border-radius:999px;background:#fff;" +
      "box-shadow:inset 0 2px 5px rgba(60,90,40,.16),0 2px 0 rgba(255,255,255,.6);overflow:hidden;padding:3px}" +
    ".ks-fill{height:100%;border-radius:999px;width:0;transition:width .14s ease;" +
      "background-image:repeating-linear-gradient(45deg," + B.orange + " 0 14px," + B.orangeSoft + " 14px 28px);" +
      "background-size:40px 40px;animation:ksStripes .7s linear infinite}" +
    "@keyframes ksStripes{from{background-position:0 0}to{background-position:40px 0}}" +
    ".ks-pct{font-weight:600;color:" + B.greenDeep + ";font-size:15px;font-variant-numeric:tabular-nums}" +
    ".ks-skip{position:absolute;bottom:clamp(18px,4vh,34px);right:clamp(18px,4vw,34px);cursor:pointer;" +
      "background:rgba(255,255,255,.7);border:2px solid rgba(36,138,42,.25);color:" + B.greenDeep + ";" +
      "font-family:inherit;font-weight:600;font-size:14px;padding:8px 16px;border-radius:999px;" +
      "backdrop-filter:blur(3px);transition:transform .15s ease,background .15s ease}" +
    ".ks-skip:hover{transform:translateY(-2px);background:#fff}" +
    ".ks-reveal{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}" +
    ".ks-reveal[hidden]{display:none}" +
    ".ks-wm{margin:0;line-height:.92;display:flex;justify-content:center;gap:.01em;font-weight:700;user-select:none;" +
      "font-size:clamp(48px,12vw,140px);opacity:0;transform:translateY(26px) scale(.96);" +
      "animation:ksRise .7s cubic-bezier(.2,.9,.3,1.2) forwards}" +
    "@keyframes ksRise{to{opacity:1;transform:none}}" +
    ".ks-wm span{display:inline-block;transform:rotate(var(--tilt));-webkit-text-stroke:clamp(1.5px,.45vw,4px) #fff;" +
      "paint-order:stroke fill;text-shadow:0 6px 0 rgba(40,60,30,.16),0 9px 13px rgba(40,60,30,.16)}" +
    ".ks-confetti{position:absolute;inset:0;pointer-events:none;overflow:hidden}" +
    ".ks-bit{position:absolute;top:-6%;opacity:0;animation:ksFall ease-in 1 forwards}" +
    "@keyframes ksFall{0%{transform:translateY(-10vh) translateX(0) rotate(0);opacity:0}8%{opacity:1}" +
      "100%{transform:translateY(112vh) translateX(var(--drift)) rotate(calc(var(--rot) + 540deg));opacity:1}}";
  var styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ---- SVG-bouwstenen (rechtstreeks uit het design) ----------------------- */
  function cloudSvg(w, extra) {
    return '<svg class="ks-cloud" width="' + w + '" viewBox="0 0 200 86" fill="#fff" style="' + extra + '" aria-hidden="true">' +
      '<ellipse cx="60" cy="54" rx="44" ry="30"/><ellipse cx="104" cy="44" rx="40" ry="34"/>' +
      '<ellipse cx="146" cy="56" rx="38" ry="26"/><rect x="40" y="56" width="120" height="26" rx="13"/></svg>';
  }
  function balloonSvg(color, size) {
    return '<svg width="' + size + '" viewBox="0 0 60 86" fill="none" aria-hidden="true">' +
      '<ellipse cx="30" cy="34" rx="26" ry="32" fill="' + color + '"/>' +
      '<ellipse cx="22" cy="24" rx="7" ry="10" fill="#fff" opacity=".45"/>' +
      '<path d="M27 65 l3 8 3 -8 z" fill="' + color + '"/>' +
      '<path d="M30 73 q6 10 -2 18 q10 -6 2 -18z" stroke="#fff" stroke-opacity=".7" stroke-width="1.6" fill="none"/></svg>';
  }
  function bouquetSvg(width) {
    var knot = { x: 130, y: 264 };
    var bs = [
      { cx: 130, cy: 70, rx: 43, ry: 51, c: B.orange, d: "0s" },
      { cx: 72, cy: 100, rx: 37, ry: 45, c: B.red, d: ".35s" },
      { cx: 188, cy: 100, rx: 37, ry: 45, c: B.blue, d: ".18s" },
      { cx: 98, cy: 148, rx: 33, ry: 40, c: B.yellow, d: ".5s" },
      { cx: 162, cy: 148, rx: 33, ry: 40, c: B.green, d: ".62s" }
    ];
    var strings = bs.map(function (x, i) {
      return '<path d="M' + x.cx + " " + (x.cy + x.ry) + " Q " + ((x.cx + knot.x) / 2 + (i - 2) * 10) + " " +
        ((x.cy + knot.y) / 2 + 14) + " " + knot.x + " " + knot.y + '"/>';
    }).join("");
    var balloons = bs.map(function (x) {
      return '<g class="ks-bq" style="--d:' + x.d + '">' +
        '<ellipse cx="' + x.cx + '" cy="' + x.cy + '" rx="' + x.rx + '" ry="' + x.ry + '" fill="' + x.c + '"/>' +
        '<ellipse cx="' + (x.cx - x.rx * 0.32) + '" cy="' + (x.cy - x.ry * 0.34) + '" rx="' + (x.rx * 0.24) + '" ry="' + (x.ry * 0.3) + '" fill="#fff" opacity=".42"/>' +
        '<path d="M' + (x.cx - 6) + " " + (x.cy + x.ry - 3) + ' l6 10 6 -10 z" fill="' + x.c + '"/></g>';
    }).join("");
    return '<svg width="' + width + '" viewBox="0 0 260 326" fill="none" role="img" aria-label="Ballonnen">' +
      '<g stroke="#fff" stroke-opacity=".8" stroke-width="2.2" fill="none" stroke-linecap="round">' + strings + "</g>" +
      '<path d="M' + knot.x + " " + knot.y + ' q16 16 -2 32 q22 -4 4 -34" stroke="' + B.orangeDeep + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<circle cx="' + knot.x + '" cy="' + knot.y + '" r="6.5" fill="' + B.orangeDeep + '"/>' + balloons + "</svg>";
  }

  /* ---- DOM opbouwen -------------------------------------------------------- */
  var bgLayers = BG.map(function (c, i) {
    return '<div class="ks-bglayer" style="background:linear-gradient(180deg,' + c[0] + " 0%," + c[1] + " 72%);animation-delay:" + (-(i * PER_COLOR)) + 's"></div>';
  }).join("");
  var clouds =
    cloudSvg(180, "top:12%;animation-duration:46s") +
    cloudSvg(120, "top:32%;animation-duration:64s;animation-delay:-20s;opacity:.75") +
    cloudSvg(150, "top:6%;animation-duration:54s;animation-delay:-38s;opacity:.65");
  var floaters = [
    { c: B.red, top: "14%", left: "7%", s: 64, d: "3.4s", dl: "0s" },
    { c: B.yellow, top: "20%", left: "87%", s: 56, d: "4s", dl: ".4s" },
    { c: B.blue, top: "56%", left: "91%", s: 52, d: "3.7s", dl: ".8s" },
    { c: B.green, top: "62%", left: "4%", s: 58, d: "4.2s", dl: ".2s" },
    { c: B.orange, top: "9%", left: "58%", s: 44, d: "3.9s", dl: ".6s" },
    { c: B.greenSoft, top: "78%", left: "70%", s: 40, d: "4.4s", dl: ".3s" },
    { c: B.red, top: "74%", left: "30%", s: 46, d: "3.6s", dl: ".9s" }
  ].map(function (b) {
    return '<div class="ks-balloon" aria-hidden="true" style="top:' + b.top + ";left:" + b.left +
      ";animation-duration:" + b.d + ";animation-delay:" + b.dl + '">' + balloonSvg(b.c, b.s) + "</div>";
  }).join("");
  var letters = "KELOBOR".split("");
  var party = [B.orange, B.red, B.yellow, B.green, B.blue, B.orange, B.green];
  var tilts = [-5, 3, -3, 5, -4, 3, -5];
  var wm = letters.map(function (ch, i) {
    return '<span style="--tilt:' + tilts[i] + 'deg;color:' + party[i] + '">' + ch + "</span>";
  }).join("");

  var stage = document.createElement("div");
  stage.id = "kelobor-splash";
  stage.setAttribute("role", "status");
  stage.setAttribute("aria-label", "Kelobor Springkastelen wordt geladen");
  stage.innerHTML =
    '<div aria-hidden="true">' + bgLayers + clouds + floaters + "</div>" +
    '<div class="ks-loader">' +
      '<div class="ks-scene">' + bouquetSvg(Math.min(210, Math.round(innerWidth * 0.42))) + "</div>" +
      '<div class="ks-label">Even <b>opblazen</b><span class="ks-dots"><span>.</span><span>.</span><span>.</span></span></div>' +
      '<div class="ks-bar"><div class="ks-fill"></div></div>' +
      '<div class="ks-pct">0%</div>' +
    "</div>" +
    '<div class="ks-reveal" hidden><div class="ks-confetti"></div><h2 class="ks-wm" aria-label="Kelobor">' + wm + "</h2></div>" +
    '<button class="ks-skip" type="button" aria-label="Intro overslaan">Overslaan →</button>';
  document.body.appendChild(stage);

  /* ---- Voortgang & fasen --------------------------------------------------- */
  var scene = stage.querySelector(".ks-scene"),
      fill = stage.querySelector(".ks-fill"),
      pctEl = stage.querySelector(".ks-pct"),
      loader = stage.querySelector(".ks-loader"),
      reveal = stage.querySelector(".ks-reveal");
  var DURATION = 2200, raf = 0, timers = [], done = false;
  var t0 = performance.now();

  function frame(now) {
    if (done) return;
    var t = Math.min(1, (now - t0) / DURATION);
    var eased = 1 - Math.pow(1 - t, 3) /* easeOutCubic */;
    var p = eased * 100;
    // Wacht op de échte lading, maar nooit langer dan 8s (trage netwerken/CDN-haperingen).
    if (document.readyState !== "complete" && now - t0 < 8000) p = Math.min(p, 90);
    fill.style.width = p + "%";
    pctEl.textContent = Math.round(p) + "%";
    scene.style.transform = "scale(" + (0.42 + 0.58 * p / 100).toFixed(3) + ")";
    if (p >= 100) {
      loader.classList.add("out");
      timers.push(setTimeout(party_, 380));
    } else {
      raf = requestAnimationFrame(frame);
    }
  }

  function party_() {
    if (done) return;
    var n = innerWidth < 600 ? 70 : 110;
    var colors = [B.orange, B.red, B.yellow, B.green, B.blue, B.greenSoft];
    var bits = "";
    for (var i = 0; i < n; i++) {
      var size = 7 + Math.random() * 9, round = Math.random() > 0.55;
      bits += '<span class="ks-bit" style="left:' + (Math.random() * 100) + "%;width:" + size + "px;height:" +
        (round ? size : size * 0.5) + "px;background:" + colors[i % colors.length] +
        ";border-radius:" + (round ? "50%" : "2px") + ";animation-duration:" + (2.4 + Math.random() * 2.2) +
        "s;animation-delay:" + (Math.random() * 0.5) + "s;--rot:" + (Math.random() * 360) + "deg;--drift:" +
        ((Math.random() - 0.5) * 160) + 'px"></span>';
    }
    stage.querySelector(".ks-confetti").innerHTML = bits;
    reveal.hidden = false;
    timers.push(setTimeout(finish, 1300));
  }

  function finish() {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    timers.forEach(clearTimeout);
    stage.classList.add("is-done");
    clearCover();
    document.removeEventListener("keydown", onKey);
    setTimeout(function () { stage.remove(); styleEl.remove(); }, 650);
  }

  function onKey(e) { if (e.key === "Escape") finish(); }
  stage.querySelector(".ks-skip").addEventListener("click", finish);
  document.addEventListener("keydown", onKey);

  raf = requestAnimationFrame(frame);
})();
