/* ============================================================================
   KELOBOR SPRINGKASTELEN — centrale datalaag
   Eén bron van waarheid voor alle pagina's: bedrijfsgegevens, assortiment,
   prijzen, categorieën, lokale SEO-regio's en FAQ.
   Alle inhoud is overgenomen en herschreven vanaf de oude website.
   Wil je een product toevoegen of een prijs wijzigen? Doe dat hier.
   ========================================================================== */
(function () {
  "use strict";

  /* --- Bedrijfsgegevens (NAP — overal identiek gebruiken) ----------------- */
  const COMPANY = {
    name: "Kelobor Springkastelen",
    legalName: "Kelobor Springkastelen",
    tagline: "Springkasteel huren in Lebbeke, Buggenhout en omstreken",
    phoneDisplay: "0492 07 02 51",
    phoneHref: "tel:+32492070251",
    whatsappHref: "https://wa.me/32492070251",
    whatsappText: "Hallo Kelobor, ik heb een vraag over het huren van een springkasteel.",
    email: "keloborspringkastelen@outlook.com",
    street: "Halfveld 1",
    postcode: "9280",
    city: "Lebbeke",
    country: "België",
    region: "Lebbeke, Buggenhout en omstreken",
    vat: "BE 0778.763.411",
    deliveryRadiusKm: 15,
    facebook: "", // ← vul hier de échte Facebook-pagina in (oude link was een placeholder)
    instagram: "",
    url: "https://www.keloborspringkastelen.be",
    // Booqable verhuur-/boekingssysteem (overgenomen van de oude site)
    booqableScript: "https://d95b53a2-cd69-466e-bfc7-095d61b2aef6.assets.booqable.com/v2/booqable.js"
  };

  /* --- Categorieën / collecties (filters + SEO-landingspagina's) ---------- */
  const CATEGORIES = [
    { slug: "peuters", name: "Voor peuters & kleuters", short: "Peuters",
      h1: "Springkastelen voor peuters en kleuters",
      intro: "Veilige, lage springkastelen met zachte wanden — perfect voor de allerkleinsten van 1 tot 6 jaar. Ideaal voor een verjaardag of doopfeest thuis in de tuin.",
      seoTitle: "Springkasteel voor peuters huren | Veilig & laag | Kelobor",
      seoDesc: "Springkastelen voor peuters en kleuters huren in Lebbeke, Buggenhout en omstreken. Veilig, laag en proper. Gratis levering binnen 15 km. Vraag de beschikbaarheid aan." },
    { slug: "verjaardag", name: "Voor verjaardagen", short: "Verjaardag",
      h1: "Springkastelen voor een verjaardagsfeest",
      intro: "Maak van elke verjaardag een onvergetelijk feest. Onze populairste springkastelen voor kinderfeestjes thuis, in de tuin of de straat.",
      seoTitle: "Springkasteel huren voor een verjaardag | Kelobor Springkastelen",
      seoDesc: "Springkasteel huren voor een verjaardagsfeestje? Ruime keuze, scherpe prijzen en gratis levering in de regio Lebbeke–Buggenhout. Vraag vandaag nog de beschikbaarheid aan." },
    { slug: "met-glijbaan", name: "Met glijbaan", short: "Met glijbaan",
      h1: "Springkastelen met glijbaan",
      intro: "Springen én glijden in één. Deze multiplay-kastelen en glijbanen zorgen voor uren plezier bij jong en oud.",
      seoTitle: "Springkasteel met glijbaan huren | Kelobor Springkastelen",
      seoDesc: "Een springkasteel met glijbaan huren in de regio Lebbeke en Buggenhout. Multiplay-kastelen en grote glijbanen. Gratis levering binnen 15 km. Vraag de beschikbaarheid aan." },
    { slug: "waterspringkastelen", name: "Waterpret", short: "Waterpret",
      h1: "Waterspringkastelen huren",
      intro: "Verkoeling op een warme dag? Onze waterspringkastelen en glijbanen met zwembad maken van je tuin het leukste zwembad van de buurt.",
      seoTitle: "Waterspringkasteel huren | Glijbaan met water | Kelobor",
      seoDesc: "Waterspringkasteel of glijbaan met zwembad huren in Lebbeke, Buggenhout en omstreken. Het ideale zomerfeest. Gratis levering binnen 15 km. Vraag de beschikbaarheid aan." },
    { slug: "multiplay", name: "Multiplay", short: "Multiplay",
      h1: "Multiplay springkastelen",
      intro: "Springen, klimmen, glijden en hindernissen — alles in één kasteel. Multiplay-kastelen bieden de meeste variatie en plezier voor elke leeftijd.",
      seoTitle: "Multiplay springkasteel huren | Veel speelplezier | Kelobor",
      seoDesc: "Multiplay springkastelen huren met klimwand, glijbaan en hindernissen. Veel speelplezier in één toestel. Regio Lebbeke–Buggenhout. Vraag de beschikbaarheid aan." },
    { slug: "hindernisbanen", name: "Hindernisbanen & runs", short: "Hindernisbaan",
      h1: "Hindernisbanen en runs huren",
      intro: "Wie is het snelst door de baan? Onze stormbanen en runs dagen kinderen én volwassenen uit. Ideaal voor school- en bedrijfsfeesten.",
      seoTitle: "Hindernisbaan / stormbaan huren | Runs | Kelobor Springkastelen",
      seoDesc: "Hindernisbaan, stormbaan of run huren voor je feest, school of bedrijf in de regio Lebbeke–Buggenhout. Spannende parcours tot 20 m. Vraag de beschikbaarheid aan." },
    { slug: "thema", name: "Themakastelen", short: "Thema",
      h1: "Thema springkastelen",
      intro: "Van prinsessen en eenhoorns tot piraten en haaien — een themakasteel maakt het feest helemaal af.",
      seoTitle: "Thema springkasteel huren | Prinses, piraat, unicorn | Kelobor",
      seoDesc: "Thema springkastelen huren: prinsessen, unicorn, piraat, haai en meer. Regio Lebbeke en Buggenhout. Gratis levering binnen 15 km. Vraag de beschikbaarheid aan." },
    { slug: "scholen", name: "Voor scholen", short: "Scholen",
      h1: "Springkastelen voor scholen en schoolfeesten",
      intro: "Een geslaagd schoolfeest, opendeurdag of sportdag? Wij denken mee met scholen: grote toestellen, vlotte plaatsing en correcte facturatie.",
      seoTitle: "Springkasteel huren voor school & schoolfeest | Kelobor",
      seoDesc: "Springkastelen en hindernisbanen huren voor scholen, schoolfeesten en sportdagen. Grote toestellen, vlotte service en facturatie. Regio Lebbeke–Buggenhout." },
    { slug: "bedrijven", name: "Voor bedrijven & verenigingen", short: "Bedrijven",
      h1: "Springkastelen voor bedrijfsfeesten en verenigingen",
      intro: "Een bedrijfsfeest, opendeurdag of buurtfeest dat blijft hangen? Van interactieve attracties tot grote runs — wij verzorgen het van A tot Z, mét factuur.",
      seoTitle: "Springkasteel & attractie huren voor bedrijf of vereniging | Kelobor",
      seoDesc: "Opblaasbare attracties, interactieve spellen en springkastelen huren voor bedrijfsfeesten, buurtfeesten en verenigingen. Mét factuur. Regio Lebbeke–Buggenhout." }
  ];

  /* --- Helper voor afmetingen --------------------------------------------- */
  function dim(b, l, h) { return { b: b, l: l, h: h }; }

  /* --- Het assortiment ----------------------------------------------------- */
  /* type: 'springkasteel' | 'run' | 'animatie' | 'volksspel' | 'feestmateriaal'
     price: laagste dagprijs (getal) — voor filters/sorteren
     img: pad of null (null => stijlvolle placeholder met icoon)              */
  const PRODUCTS = [
    {
      slug: "happende-haai", name: "Happende Haai", type: "springkasteel",
      cats: ["verjaardag", "met-glijbaan", "multiplay", "thema", "scholen"],
      price: 200, priceLabel: "€200 / dag",
      dim: dim(5.50, 10, 5), capacity: "± 10 kinderen", ages: "4–13 jaar", agesMin: 4,
      power: "2 × 230V", surface: "gras, verharding of binnen", slide: true, water: false, indoor: true,
      badges: ["Populair", "Met glijbaan"], popular: true, img: "assets/img/products/happende-haai.jpg",
      intro: "Een indrukwekkend multiplay-kasteel met een grote happende haai en glijbaan. Een echte blikvanger op elk feest.",
      desc: "De Happende Haai is een van onze grootste publiekslievelingen. Klimmen, springen, door de haaienmuil kruipen en van de glijbaan: dit ruime multiplay-kasteel houdt een hele bende kinderen urenlang bezig. Door zijn formaat is het ook ideaal voor schoolfeesten en grotere verjaardagen.",
      features: ["Grote 3D-haai als blikvanger", "Glijbaan + klim- en speelgedeelte", "Veel speelruimte binnenin", "Geschikt voor grotere groepen"],
      goodFor: ["Verjaardagen", "Schoolfeesten", "Buurtfeesten", "Communiefeesten"]
    },
    {
      slug: "monkey-slide-xl", name: "Monkey Slide XL", type: "springkasteel",
      cats: ["met-glijbaan", "verjaardag", "multiplay", "scholen"],
      price: 170, priceLabel: "€170 / dag",
      dim: dim(3.80, 7.80, 6.30), capacity: "± 8 kinderen", ages: "4–13 jaar", agesMin: 4,
      power: "2 × 230V", surface: "gras, verharding of binnen", slide: true, water: false, indoor: true,
      badges: ["Grote glijbaan"], popular: true, img: "assets/img/products/monkey-slide-xl.jpg",
      intro: "Een torenhoge glijbaan van meer dan 6 meter. Klimmen naar boven en in één ruk naar beneden!",
      desc: "Met zijn hoogte van meer dan 6 meter is de Monkey Slide XL een echte uitdaging voor avontuurlijke kinderen. Klim naar de top en glij in één vloeiende beweging naar beneden. De brede glijbaan zorgt voor veel doorstroming, zodat er weinig wachttijd is.",
      features: ["Glijbaan van meer dan 6 meter hoog", "Brede glijmat, weinig wachttijd", "Stevige klimwand", "Indrukwekkende blikvanger"],
      goodFor: ["Verjaardagen", "Schoolfeesten", "Sportdagen"]
    },
    {
      slug: "krokopark", name: "Krokopark", type: "springkasteel",
      cats: ["multiplay", "verjaardag", "met-glijbaan", "thema", "peuters"],
      price: 150, priceLabel: "€150 / dag",
      dim: dim(5, 5.60, 3.20), capacity: "± 8 kinderen", ages: "2–10 jaar", agesMin: 2,
      power: "1 × 230V", surface: "gras, verharding of binnen", slide: true, water: false, indoor: true,
      badges: ["Multiplay"], popular: true, img: "assets/img/products/krokopark.jpg",
      intro: "Een vrolijk multiplay-kasteel met krokodillenthema: springen, hindernissen én een glijbaan.",
      desc: "Het Krokopark combineert een ruim springgedeelte met hindernissen en een glijbaan in een vrolijk krokodillenthema. Door de gesloten wanden en het lage instapje is het ook geschikt voor jongere kinderen, terwijl de glijbaan ook de groteren blijft boeien.",
      features: ["Springen, klimmen én glijden", "Vrolijk krokodillenthema", "Veilige, gesloten wanden", "Geschikt voor gemengde leeftijden"],
      goodFor: ["Verjaardagen", "Communiefeesten", "Tuinfeesten"]
    },
    {
      slug: "discobal", name: "Discobal", type: "springkasteel",
      cats: ["verjaardag", "multiplay", "thema"],
      price: 150, priceLabel: "€150 / dag",
      dim: dim(4.40, 4, 4.20), capacity: "± 8 kinderen", ages: "3–12 jaar", agesMin: 3,
      power: "1 × 230V", surface: "gras, verharding of binnen", slide: false, water: false, indoor: true,
      badges: [], popular: false, img: "assets/img/products/discobal.jpg",
      intro: "Een eyecatcher met disco-thema. Springen onder de discobal — feest verzekerd!",
      desc: "Het Discobal-springkasteel brengt meteen sfeer met zijn kleurrijke disco-thema. Een ruim springvlak met zachte wanden maakt het geschikt voor een brede leeftijdsgroep. Een vrolijke keuze voor verjaardagen en themafeestjes.",
      features: ["Vrolijk disco-thema", "Ruim springvlak", "Zachte, veilige wanden", "Compact op te stellen"],
      goodFor: ["Verjaardagen", "Themafeesten", "Tuinfeesten"]
    },
    {
      slug: "summer-party", name: "Summer Party", type: "springkasteel",
      cats: ["verjaardag", "multiplay", "scholen"],
      price: 150, priceLabel: "€150 / dag",
      dim: dim(5, 5.50, 4.20), capacity: "± 8 kinderen", ages: "3–12 jaar", agesMin: 3,
      power: "1 × 230V", surface: "gras, verharding of binnen", slide: true, water: false, indoor: true,
      badges: [], popular: false, img: null,
      intro: "Een zomers, kleurrijk multiplay-kasteel dat past bij elk feest.",
      desc: "Summer Party is een vrolijk, veelzijdig springkasteel met een zomerse uitstraling. Met een ruim springgedeelte en speelelementen is het een dankbare keuze voor verjaardagen, tuinfeesten en schoolfeesten.",
      features: ["Zomerse, kleurrijke look", "Ruim speelgedeelte", "Veilige wanden", "Veelzijdig inzetbaar"],
      goodFor: ["Verjaardagen", "Tuinfeesten", "Schoolfeesten"]
    },
    {
      slug: "prinsessen-kasteel", name: "Prinsessen Kasteel", type: "springkasteel",
      cats: ["thema", "verjaardag", "peuters", "met-glijbaan"],
      price: 150, priceLabel: "€150 / dag",
      dim: dim(5, 5.40, 3.50), capacity: "± 8 kinderen", ages: "2–10 jaar", agesMin: 2,
      power: "1 × 230V", surface: "gras, verharding of binnen", slide: true, water: false, indoor: true,
      badges: ["Thema"], popular: true, img: "assets/img/products/prinsessen-kasteel.jpg",
      intro: "Een sprookjesachtig prinsessenkasteel — dé favoriet voor een echt prinsessenfeestje.",
      desc: "Het Prinsessen Kasteel toveert elke tuin om tot een sprookje. Met zijn zachte kleuren, torentjes en speelelementen is het de droom van elke kleine prinses (of prins). Ideaal voor verjaardagen en communiefeesten.",
      features: ["Sprookjesachtig prinsessenthema", "Speel- en glijgedeelte", "Geschikt voor jongere kinderen", "Echte blikvanger in de tuin"],
      goodFor: ["Verjaardagen", "Communiefeesten", "Doopfeesten"]
    },
    {
      slug: "unicorn", name: "Unicorn", type: "springkasteel",
      cats: ["thema", "verjaardag", "peuters"],
      price: 120, priceLabel: "€120 / dag",
      dim: dim(4, 4.50, 3.50), capacity: "± 8 kinderen", ages: "2–10 jaar", agesMin: 2,
      power: "1 × 230V", surface: "gras, verharding of binnen", slide: false, water: false, indoor: true,
      badges: ["Thema"], popular: false, img: "assets/img/products/unicorn.jpg",
      intro: "Een magisch eenhoornkasteel vol kleur. Glitter en springplezier verzekerd.",
      desc: "Het Unicorn-springkasteel is een betoverende keuze voor wie van magie en kleur houdt. Compact genoeg voor de meeste tuinen en met zachte wanden, ideaal voor jongere kinderen en kleinere feestjes.",
      features: ["Magisch eenhoornthema", "Compact, past in de meeste tuinen", "Zachte, veilige wanden", "Geschikt voor jongere kinderen"],
      goodFor: ["Verjaardagen", "Doopfeesten", "Tuinfeesten"]
    },
    {
      slug: "kroko-piraat", name: "Kroko Piraat", type: "springkasteel",
      cats: ["thema", "verjaardag", "multiplay"],
      price: 120, priceLabel: "€120 / dag",
      dim: dim(4, 4.70, 3.50), capacity: "± 8 kinderen", ages: "3–12 jaar", agesMin: 3,
      power: "1 × 230V", surface: "gras, verharding of binnen", slide: false, water: false, indoor: true,
      badges: ["Thema"], popular: false, img: "assets/img/products/kroko-piraat.jpg",
      intro: "Ahoy! Een stoer piratenkasteel voor kleine avonturiers.",
      desc: "Met het Kroko Piraat-springkasteel verandert het feest in een echt piratenavontuur. Een stoer thema met speelelementen, ideaal voor avontuurlijke kinderen en themafeestjes.",
      features: ["Stoer piratenthema", "Speelse hindernissen", "Veilige wanden", "Compact opstelbaar"],
      goodFor: ["Verjaardagen", "Themafeesten", "Tuinfeesten"]
    },
    {
      slug: "indian-fun", name: "Indian Fun", type: "springkasteel",
      cats: ["thema", "verjaardag", "multiplay", "met-glijbaan"],
      price: 160, priceLabel: "€160 / dag",
      dim: dim(7, 5.20, 5.90), capacity: "± 8 kinderen", ages: "3–12 jaar", agesMin: 3,
      power: "2 × 230V", surface: "gras, verharding of binnen", slide: true, water: false, indoor: true,
      badges: ["Nieuw 2026", "Thema"], popular: true, isNew: 2026, img: null,
      intro: "Splinternieuw voor 2026: een groot themakasteel in Indianenstijl met volop speelplezier.",
      desc: "Indian Fun is onze nieuwste aanwinst voor 2026. Een ruim themakasteel in vrolijke Indianenstijl met klim-, speel- en glijelementen. Een unieke blikvanger die je dit seizoen nog niet veel zal tegenkomen.",
      features: ["Splinternieuw model (2026)", "Ruim speel- en glijgedeelte", "Origineel Indianenthema", "Echte blikvanger"],
      goodFor: ["Verjaardagen", "Communiefeesten", "Schoolfeesten"]
    },
    {
      slug: "konijntje", name: "Konijntje", type: "springkasteel",
      cats: ["peuters", "verjaardag", "thema"],
      price: 100, priceLabel: "€100 / dag",
      dim: dim(3.20, 4, 2.60), capacity: "± 6 kinderen", ages: "1–6 jaar", agesMin: 1,
      power: "1 × 230V", surface: "gras, verharding of binnen", slide: false, water: false, indoor: true,
      badges: ["Peutervriendelijk"], popular: true, img: "assets/img/products/konijntje.jpg",
      intro: "Een lief, laag konijnenkasteel — perfect en veilig voor de allerkleinsten.",
      desc: "Het Konijntje is speciaal geschikt voor peuters en kleuters. Door de lage instap, de kleine afmetingen en de zachte wanden kunnen de allerkleinsten hier veilig en zorgeloos springen. Onze topkeuze voor een eerste verjaardagsfeestje.",
      features: ["Speciaal voor 1–6 jaar", "Lage, veilige instap", "Compact — past in elke tuin", "Schattig konijnenthema"],
      goodFor: ["Verjaardagen peuters", "Doopfeesten", "Kleuterklas"]
    },
    {
      slug: "interactief-springkussen", name: "Interactief Springkussen (IPS)", type: "springkasteel",
      cats: ["multiplay", "bedrijven", "scholen", "verjaardag"],
      price: 120, priceLabel: "€120 / dag",
      dim: dim(3, 4, 3.40), capacity: "± 6 kinderen", ages: "5–99 jaar", agesMin: 5,
      power: "1 × 230V", surface: "gras, verharding of binnen", slide: false, water: false, indoor: true,
      badges: ["Interactief"], popular: false, img: "assets/img/products/interactief-springkussen.jpg",
      intro: "Springen én gamen tegelijk: drie interactieve spellen met lichtjes en punten.",
      desc: "Het Interactieve Springkussen (IPS) combineert springplezier met technologie. Het toestel bevat drie uitdagende interactieve spellen waarbij verlichte knoppen oplichten en je punten scoort. Reactiesnelheid en conditie worden op de proef gesteld — leuk voor kinderen én volwassenen.",
      features: ["3 interactieve spellen in één", "Verlichte knoppen + puntentelling", "Leuk voor jong en oud", "Ideaal voor competitie"],
      goodFor: ["Verjaardagen", "Bedrijfsfeesten", "Schoolfeesten"]
    },
    {
      slug: "haai-run", name: "Haai Run", type: "run",
      cats: ["hindernisbanen", "verjaardag", "thema", "scholen"],
      price: 150, priceLabel: "€150 / dag",
      dim: dim(4.40, 9, 4.20), capacity: "2 banen naast elkaar", ages: "4–13 jaar", agesMin: 4,
      power: "2 × 230V", surface: "gras, verharding of binnen", slide: false, water: false, indoor: true,
      badges: ["Run", "Race samen"], popular: true, img: "assets/img/products/haai-run.jpg",
      intro: "Een spannende run met twee banen naast elkaar. Wie haalt als eerste de finish?",
      desc: "De Haai Run is een dubbele hindernisbaan met haaienthema. Door de twee banen naast elkaar kunnen kinderen tegen elkaar racen, wat voor extra spanning en plezier zorgt. De 3D-haaienelementen maken er een echte blikvanger van.",
      features: ["2 banen — race tegen elkaar", "Hindernissen + 3D-haaien", "Spannend voor groepen", "Geschikt voor school- en buurtfeesten"],
      goodFor: ["Verjaardagen", "Schoolfeesten", "Buurtfeesten", "Sportdagen"]
    },
    {
      slug: "lion-run", name: "Lion Run", type: "run",
      cats: ["hindernisbanen", "met-glijbaan", "thema", "verjaardag", "scholen"],
      price: 170, priceLabel: "€170 / dag",
      dim: dim(3.80, 9.50, 5.10), capacity: "1 baan + glijbaan", ages: "4–13 jaar", agesMin: 4,
      power: "2 × 230V", surface: "gras, verharding of binnen", slide: true, water: false, indoor: true,
      badges: ["Run", "Met glijbaan"], popular: false, img: null,
      intro: "Een jungle-run met hindernissen en een glijbaan die uit de muil van de leeuw komt.",
      desc: "De Lion Run combineert een hindernisparcours met een spectaculaire glijbaan die je uit de muil van een grote leeuw laat glijden. Het kleurrijke junglethema en de 3D-elementen maken er een feest van voor het oog én de benen.",
      features: ["Hindernisparcours + glijbaan", "Glijbaan uit de leeuwenmuil", "Vrolijk junglethema met 3D", "Spannend en sportief"],
      goodFor: ["Verjaardagen", "Schoolfeesten", "Sportdagen"]
    },
    {
      slug: "stormbaan-vrachtwagen", name: "Stormbaan Vrachtwagen", type: "run",
      cats: ["hindernisbanen", "scholen", "bedrijven", "verjaardag"],
      price: 300, priceLabel: "€300 / dag",
      dim: dim(3.60, 14, 5.50), capacity: "grote groep", ages: "6–99 jaar", agesMin: 6,
      power: "2 × 230V", surface: "gras of verharding (veel ruimte nodig)", slide: true, water: false, indoor: false,
      badges: ["XL", "Voor groepen"], popular: true, img: "assets/img/products/stormbaan-vrachtwagen.jpg",
      intro: "Een indrukwekkende hindernisbaan van 14 meter in vrachtwagenvorm. Spektakel verzekerd.",
      desc: "De Stormbaan Vrachtwagen is een echte aandachtstrekker van 14 meter lang, vormgegeven als een grote vrachtwagen. Kruipen, klimmen, springen en glijden: deze baan daagt zowel kinderen als volwassenen uit. Ideaal voor school-, buurt- en bedrijfsfeesten. Let op: voorzie voldoende vrije ruimte en een vlakke ondergrond — dit toestel is niet geschikt voor trappen of smalle doorgangen.",
      features: ["14 meter lange hindernisbaan", "Opvallende vrachtwagenvorm", "Voor kinderen én volwassenen", "Topper op grote evenementen"],
      goodFor: ["Schoolfeesten", "Bedrijfsfeesten", "Buurtfeesten", "Sportdagen"]
    },
    {
      slug: "toxic-run", name: "Toxic Run", type: "run",
      cats: ["hindernisbanen", "bedrijven", "scholen"],
      price: 300, priceLabel: "vanaf €300 / dag",
      priceNote: "€300 in de ingekorte versie (12,95 m) — €475 in de volledige versie (20,45 m).",
      dim: dim(3.33, 20.45, 5.30), capacity: "grote groep", ages: "6–99 jaar", agesMin: 6,
      power: "2 × 230V", surface: "gras of verharding (veel ruimte nodig)", slide: true, water: false, indoor: false,
      badges: ["Nieuw 2025", "XL"], popular: true, isNew: 2025, img: null,
      intro: "Onze langste run (tot ruim 20 m) met klimwand, pillow-jump en tunnelglijbaan.",
      desc: "Toxic Run is onze spectaculairste hindernisbaan, nieuw sinds 2025. De volledige versie meet ruim 20 meter en bevat een klimwand, een pillow-jump en een tunnelglijbaan. Te kort op ruimte? Dan kan de baan ook ingekort (12,95 m) geplaatst worden. Een echte uitdaging voor grote groepen op school- en bedrijfsfeesten.",
      features: ["Tot 20,45 m lang", "Klimwand, pillow-jump & tunnelglijbaan", "Ook in ingekorte versie te huren", "Uitdaging voor groepen"],
      goodFor: ["Bedrijfsfeesten", "Schoolfeesten", "Sportevenementen"]
    },
    {
      slug: "kroko-swim", name: "Kroko-Swim (waterglijbaan)", type: "springkasteel",
      cats: ["waterspringkastelen", "met-glijbaan", "verjaardag", "multiplay"],
      price: 160, priceLabel: "vanaf €160 / dag",
      priceNote: "€160 zonder zwembad — €195 mét zwembad onderaan de glijbaan.",
      dim: dim(5.40, 11, 4.20), capacity: "± 8 kinderen", ages: "4–13 jaar", agesMin: 4,
      power: "1 × 230V + wateraansluiting", surface: "gras (waterafvoer voorzien)", slide: true, water: true, indoor: false,
      badges: ["Waterpret", "Met glijbaan"], popular: true, img: "assets/img/products/kroko-swim.jpg",
      intro: "Dé zomertopper: een lange glijbaan met water en een zwembad onderaan.",
      desc: "De Kroko-Swim is onze favoriete zomerattractie. Glij over de natte glijbaan recht het (optionele) zwembad in. Met een lengte van 11 meter biedt deze waterglijbaan urenlang verfrissend plezier op warme dagen. Te huren met of zonder zwembad.",
      features: ["11 meter lange waterglijbaan", "Optioneel zwembad onderaan", "Verfrissend op warme dagen", "Krokodillenthema"],
      goodFor: ["Zomerfeesten", "Verjaardagen", "Tuinfeesten"]
    },

    /* ---- Extra (opblaasbare) animatie ------------------------------------ */
    {
      slug: "fortnite-shooting", name: "Fortnite Shooting", type: "animatie",
      cats: ["bedrijven", "scholen", "verjaardag"],
      price: 120, priceLabel: "€150 los — €120 combi",
      priceNote: "€150 als losse attractie, €120 in combinatie met een springkasteel.",
      dim: dim(4.50, 5, 2.60), capacity: "2 spelers tegelijk", ages: "6–99 jaar", agesMin: 6,
      power: "1 × 230V", surface: "gras, verharding of binnen", slide: false, water: false, indoor: true,
      badges: ["Interactief"], popular: true, img: "assets/img/products/fortnite-shooting.jpg",
      intro: "Schiet de doelen omver met zachte balletjes — populair bij groot en klein.",
      desc: "Bij de Fortnite Shooting probeer je met luchtdrukkanonnen zoveel mogelijk doelen om te schieten met zachte balletjes. Een interactieve attractie die altijd in de smaak valt — leuk als losse activiteit of als aanvulling op een springkasteel.",
      features: ["Schieten met zachte balletjes", "Spannend tegen elkaar", "Veilig voor alle leeftijden", "Combineerbaar met een kasteel"],
      goodFor: ["Verjaardagen", "Bedrijfsfeesten", "Schoolfeesten"]
    },
    {
      slug: "voetbaldarts", name: "Voetbaldarts", type: "animatie",
      cats: ["bedrijven", "scholen", "verjaardag"],
      price: 80, priceLabel: "€120 los — €80 combi",
      priceNote: "€120 als losse attractie, €80 in combinatie met een springkasteel.",
      dim: dim(3.60, 5.20, 4.40), capacity: "groep", ages: "6–99 jaar", agesMin: 6,
      power: "1 × 230V", surface: "gras, verharding of binnen", slide: false, water: false, indoor: true,
      badges: [], popular: false, img: "assets/img/products/voetbaldarts.jpg",
      intro: "Voetbal én darts in één: trap de bal op het reuze dartsbord.",
      desc: "Voetbaldarts combineert het beste van twee werelden: trap de (klittenband)bal en mik op het grote opblaasbare dartsbord. Een toffe, actieve attractie voor jong en oud, perfect voor groepen.",
      features: ["Reuze opblaasbaar dartsbord", "Spelen met klittenbandballen", "Actief en competitief", "Voor alle leeftijden"],
      goodFor: ["Bedrijfsfeesten", "Buurtfeesten", "Verjaardagen"]
    },
    {
      slug: "darts", name: "Reuze Darts", type: "animatie",
      cats: ["bedrijven", "verjaardag"],
      price: 50, priceLabel: "€90 los — €50 combi",
      priceNote: "€90 als losse attractie, €50 in combinatie met een springkasteel.",
      dim: dim(1.50, 3, 3), capacity: "1–2 spelers", ages: "6–99 jaar", agesMin: 6,
      power: "1 × 230V", surface: "gras, verharding of binnen", slide: false, water: false, indoor: true,
      badges: [], popular: false, img: "assets/img/products/darts.jpg",
      intro: "Een groot opblaasbaar dartsbord met klittenbandpijlen — leuk en veilig.",
      desc: "Met de Reuze Darts gooi je met zachte klittenbandpijlen naar een groot opblaasbaar bord. Veilig, simpel en altijd in de smaak. Ideaal als extra randanimatie naast een springkasteel.",
      features: ["Groot opblaasbaar dartsbord", "Veilige klittenbandpijlen", "Simpel en leuk", "Mooie aanvulling op een kasteel"],
      goodFor: ["Verjaardagen", "Buurtfeesten", "Bedrijfsfeesten"]
    },
    {
      slug: "speeltafel", name: "Speeltafel", type: "animatie",
      cats: ["peuters", "verjaardag"],
      price: 80, priceLabel: "€100 los — €80 combi",
      priceNote: "€100 als losse attractie, €80 in combinatie met een springkasteel.",
      dim: dim(1.30, 2.60, 0.80), capacity: "kleine groep", ages: "1–6 jaar", agesMin: 1,
      power: "1 × 230V", surface: "gras, verharding of binnen", slide: false, water: false, indoor: true,
      badges: ["Peutervriendelijk"], popular: false, img: "assets/img/products/speeltafel.jpg",
      intro: "Een opblaasbare speeltafel op maat van de allerkleinsten.",
      desc: "De opblaasbare Speeltafel is ideaal voor peuters en kleuters. Op de juiste hoogte spelen, knutselen of een spelletje doen — een leuke, veilige aanvulling voor de jongste gasten op het feest.",
      features: ["Op maat van peuters", "Veilige, zachte randen", "Leuk als rustige speelhoek", "Combineerbaar met een kasteel"],
      goodFor: ["Verjaardagen peuters", "Doopfeesten"]
    },
    {
      slug: "ips-kegels", name: "IPS-Kegels (interactief bowlen)", type: "animatie",
      cats: ["bedrijven", "scholen", "verjaardag"],
      price: 100, priceLabel: "€100 / dag",
      dim: null, capacity: "groep", ages: "5–99 jaar", agesMin: 5,
      power: "1 × 230V", surface: "vlakke ondergrond", slide: false, water: false, indoor: true,
      badges: ["Interactief"], popular: false, img: null,
      intro: "Interactief bowlen met 10 kegels en een automatisch scorebord.",
      desc: "Met de IPS-Kegels bowl je tegen elkaar: 10 kegels met een automatisch scorebord houden de stand bij. Een interactieve, competitieve activiteit die het altijd goed doet op bedrijfs- en schoolfeesten.",
      features: ["10 kegels", "Automatisch scorebord", "Interactief en competitief", "Binnen of buiten te spelen"],
      goodFor: ["Bedrijfsfeesten", "Schoolfeesten", "Verjaardagen"]
    },
    {
      slug: "popcornmachine", name: "Popcornmachine (retro kar)", type: "animatie",
      cats: ["bedrijven", "scholen", "verjaardag"],
      price: 85, priceLabel: "€85 (incl. 25 porties)",
      priceNote: "Extra ingrediënten: €25 per 25 porties.",
      dim: null, capacity: "—", ages: "Alle leeftijden", agesMin: 0,
      power: "1 × 230V", surface: "vlakke, droge ondergrond", slide: false, water: false, indoor: true,
      badges: ["Lekkers"], popular: false, img: null,
      intro: "Verse popcorn uit een sfeervolle retro kar — inclusief 25 porties.",
      desc: "Niets ruikt zo naar feest als verse popcorn. Onze popcornmachine op retro kar levert meteen sfeer én een lekkere traktatie. Standaard inclusief ingrediënten voor 25 porties, eenvoudig bij te bestellen.",
      features: ["Sfeervolle retro kar", "Inclusief 25 porties", "Eenvoudig in gebruik", "Geur en sfeer van een kermis"],
      goodFor: ["Bedrijfsfeesten", "Schoolfeesten", "Buurtfeesten", "Communiefeesten"]
    },

    /* ---- Volksspelen (kant-en-klaar mee te geven) ------------------------ */
    { slug: "reuze-4-op-een-rij", name: "Reuze 4 op een rij", type: "volksspel",
      cats: ["bedrijven", "verjaardag"], price: 25, priceLabel: "€25 / dag",
      dim: null, capacity: "2 spelers", ages: "6–99 jaar", agesMin: 6, power: "geen", surface: "—",
      slide: false, water: false, indoor: true, badges: [], popular: false, img: null,
      intro: "De klassieker in XL-formaat.", desc: "Het bekende vier-op-een-rij in een groot formaat. Een toffe, rustige activiteit voor tussendoor.",
      features: ["XL-formaat", "Voor jong en oud", "Geen stroom nodig"], goodFor: ["Buurtfeesten", "Bedrijfsfeesten"] },
    { slug: "domino-xl", name: "Domino XL", type: "volksspel",
      cats: ["bedrijven", "verjaardag"], price: 10, priceLabel: "€10 / dag",
      dim: null, capacity: "groep", ages: "4–99 jaar", agesMin: 4, power: "geen", surface: "—",
      slide: false, water: false, indoor: true, badges: [], popular: false, img: null,
      intro: "Reuze domino voor uren bouwplezier.", desc: "Een set domino in groot formaat — bouwen, omverduwen en opnieuw beginnen.",
      features: ["Groot formaat", "Eindeloos speelplezier", "Geen stroom nodig"], goodFor: ["Buurtfeesten", "Verjaardagen"] },
    { slug: "bakschieten", name: "Bakschieten", type: "volksspel",
      cats: ["bedrijven", "verjaardag"], price: 15, priceLabel: "€15 / dag",
      dim: null, capacity: "groep", ages: "6–99 jaar", agesMin: 6, power: "geen", surface: "—",
      slide: false, water: false, indoor: true, badges: [], popular: false, img: "assets/img/products/bakschieten.jpg",
      intro: "Een gezellig Vlaams volksspel.", desc: "Bakschieten is een traditioneel Vlaams behendigheidsspel. Gezellig, competitief en geschikt voor alle leeftijden.",
      features: ["Traditioneel volksspel", "Behendigheid & plezier", "Geen stroom nodig"], goodFor: ["Buurtfeesten", "Bedrijfsfeesten"] },
    { slug: "nageltje-klop", name: "Nageltje Klop", type: "volksspel",
      cats: ["bedrijven", "verjaardag"], price: 35, priceLabel: "€35 (incl. 50 nagels)",
      dim: null, capacity: "groep", ages: "8–99 jaar", agesMin: 8, power: "geen", surface: "—",
      slide: false, water: false, indoor: false, badges: [], popular: false, img: "assets/img/products/nageltje-klop.png",
      intro: "Wie klopt de nagel het snelst in de boomstronk?", desc: "Het klassieke nageltje-klop: met een hamer om ter snelst een nagel in de stronk slaan. Inclusief 50 nagels. Een toffe, ietwat ruige activiteit voor op een buurt- of bedrijfsfeest.",
      features: ["Inclusief 50 nagels", "Competitief volksspel", "Geen stroom nodig"], goodFor: ["Buurtfeesten", "Bedrijfsfeesten"] },
    { slug: "zaklopen-kids", name: "Zaklopen (kids)", type: "volksspel",
      cats: ["scholen", "verjaardag"], price: 10, priceLabel: "€10 / set",
      dim: null, capacity: "groep", ages: "4–12 jaar", agesMin: 4, power: "geen", surface: "—",
      slide: false, water: false, indoor: true, badges: [], popular: false, img: null,
      intro: "Springen in de zak — een klassieker op elk kinderfeest.", desc: "Zaklopen-sets voor kinderen. Ideaal voor een spelletjesparcours op een verjaardag of schoolfeest.",
      features: ["Per set te huren", "Klassiek kinderspel", "Geen stroom nodig"], goodFor: ["Verjaardagen", "Schoolfeesten"] },
    { slug: "soft-archery-kiddies", name: "Soft Archery (kiddies)", type: "volksspel",
      cats: ["scholen", "verjaardag"], price: 25, priceLabel: "€25 / set",
      dim: null, capacity: "groep", ages: "4–8 jaar", agesMin: 4, power: "geen", surface: "—",
      slide: false, water: false, indoor: true, badges: [], popular: false, img: null,
      intro: "Boogschieten met zachte pijlen voor de kleinsten.", desc: "Veilige boogschiet-set met zachte pijlen, op maat van jongere kinderen.",
      features: ["Zachte, veilige pijlen", "Voor jongere kinderen", "Geen stroom nodig"], goodFor: ["Verjaardagen", "Schoolfeesten"] },
    { slug: "soft-archery-junior", name: "Soft Archery (junior)", type: "volksspel",
      cats: ["scholen", "verjaardag", "bedrijven"], price: 25, priceLabel: "€25 / set",
      dim: null, capacity: "groep", ages: "8–99 jaar", agesMin: 8, power: "geen", surface: "—",
      slide: false, water: false, indoor: true, badges: [], popular: false, img: null,
      intro: "Boogschieten met zachte pijlen voor de groteren.", desc: "Boogschiet-set met zachte pijlen voor oudere kinderen en volwassenen.",
      features: ["Zachte, veilige pijlen", "Voor oudere kinderen & volwassenen", "Geen stroom nodig"], goodFor: ["Bedrijfsfeesten", "Schoolfeesten"] },
    { slug: "kleefbal-kids", name: "Kleefbal (kids)", type: "volksspel",
      cats: ["scholen", "verjaardag"], price: 10, priceLabel: "€10 / set",
      dim: null, capacity: "2 spelers", ages: "4–12 jaar", agesMin: 4, power: "geen", surface: "—",
      slide: false, water: false, indoor: true, badges: [], popular: false, img: null,
      intro: "Gooien en vangen met klittenband.", desc: "Kleefbal-sets: gooi de bal en vang hem op het klittenbandvest. Simpel en leuk.",
      features: ["Per set te huren", "Gooi- en vangspel", "Geen stroom nodig"], goodFor: ["Verjaardagen", "Schoolfeesten"] },

    /* ---- Feestmateriaal (op aanvraag) ------------------------------------ */
    { slug: "tafels-en-stoelen", name: "Partytafels & receptietafels", type: "feestmateriaal",
      cats: ["bedrijven"], price: 0, priceLabel: "Prijs op aanvraag",
      dim: null, capacity: "—", ages: "—", agesMin: 0, power: "geen", surface: "—",
      slide: false, water: false, indoor: true, badges: ["Op aanvraag"], popular: false, img: "assets/img/products/tafels-tenten.jpg",
      intro: "Party- en receptietafels voor je tuinfeest of receptie.", desc: "Naast springkastelen verhuren we ook party- en receptietafels. Handig om je feest volledig in orde te brengen bij één adres. Vraag gerust naar de mogelijkheden en beschikbaarheid.",
      features: ["Partytafels & receptietafels", "Alles bij één adres", "Plaatsing mogelijk"], goodFor: ["Tuinfeesten", "Recepties", "Communiefeesten"] },
    { slug: "partytenten", name: "Partytenten", type: "feestmateriaal",
      cats: ["bedrijven"], price: 0, priceLabel: "Prijs op aanvraag",
      dim: null, capacity: "—", ages: "—", agesMin: 0, power: "geen", surface: "vlakke ondergrond",
      slide: false, water: false, indoor: false, badges: ["Op aanvraag"], popular: false, img: null,
      intro: "Partytenten voor je tuinfeest — droog en sfeervol.", desc: "Wij plaatsen en breken partytenten af op de afgesproken momenten, zodat jij volop kan versieren. Let op: onze tenten mogen niet gebruikt worden om onder te koken (frituren, bbq'en, …). Vraag naar de beschikbare maten.",
      features: ["Plaatsing & afbraak inbegrepen", "Ruimte om te versieren", "Niet om onder te koken"], goodFor: ["Tuinfeesten", "Recepties", "Buurtfeesten"] },
    { slug: "verwarming", name: "Terrasverwarming", type: "feestmateriaal",
      cats: ["bedrijven"], price: 0, priceLabel: "Prijs op aanvraag",
      dim: null, capacity: "—", ages: "—", agesMin: 0, power: "—", surface: "—",
      slide: false, water: false, indoor: false, badges: ["Op aanvraag"], popular: false, img: null,
      intro: "Houd het gezellig warm bij een avondfeest.", desc: "Voor de frissere avonden voorzien we verwarming. Vraag naar de mogelijkheden in combinatie met een partytent of feest.",
      features: ["Voor frissere avonden", "Combineerbaar met een tent", "Op aanvraag"], goodFor: ["Tuinfeesten", "Recepties"] }
  ];

  /* --- FAQ (ook gebruikt voor FAQPage structured data) -------------------- */
  const FAQ = [
    { q: "Hoe reserveer ik een springkasteel?", a: "Kies je springkasteel en vraag de beschikbaarheid aan via het aanvraagformulier, per telefoon (0492 07 02 51), WhatsApp of e-mail. Je aanvraag is pas een definitieve reservatie zodra wij ze schriftelijk bevestigen." },
    { q: "Hoe lang op voorhand moet ik reserveren?", a: "Hoe vroeger, hoe beter — zeker in het weekend en tijdens de communie- en zomerperiode zijn de populairste kastelen snel volgeboekt. Last minute? Vraag het gerust, vaak kunnen we nog iets regelen." },
    { q: "Wordt het springkasteel geleverd en geplaatst?", a: "Ja. Wij leveren, plaatsen, verankeren én halen alles weer op. Binnen 15 km rond Lebbeke is dat gratis. Daarbuiten rekenen we een beperkte kilometervergoeding." },
    { q: "Wat als het slecht weer is?", a: "Een beetje regen is geen probleem: een nat springkasteel kan gewoon gebruikt worden en droogt vanzelf weer op. Bij onweer of windkracht 5 Beaufort of meer mag het kasteel niet gebruikt worden. Je kan tot de dag vóór de verhuur kosteloos annuleren bij slecht weer." },
    { q: "Heb ik stroom nodig?", a: "Ja, een gewoon stopcontact (230V) binnen een 25-tal meter volstaat. De blower moet permanent blijven draaien. Voor grotere toestellen zijn soms twee aansluitingen nodig. Stroomkabels en grondzeil voorzien wij." },
    { q: "Hoeveel plaats moet ik voorzien?", a: "Reken op de afmetingen van het kasteel plus ongeveer 1 meter vrije ruimte rondom, en voldoende hoogte (geen takken of kabels boven het toestel). De exacte maten vind je op elke productpagina." },
    { q: "Op welke ondergrond mag een springkasteel staan?", a: "Een vlakke ondergrond zoals gras of verharding (klinkers, terras). Op gras verankeren we met grondpinnen, op verharding met gewichten of zandzakken. Een springkasteel kan ook binnen geplaatst worden, op een grondzeil." },
    { q: "Zijn jullie springkastelen veilig?", a: "Al onze toestellen voldoen aan de Europese veiligheidsnormen en worden steeds stevig verankerd opgesteld. Toezicht door een volwassene tijdens het gebruik blijft noodzakelijk. Op elke productpagina vind je de veiligheidsrichtlijnen terug." },
    { q: "Moet ik een waarborg betalen?", a: "Voor de meeste verhuringen vragen we geen waarborg. Bij grotere of meerdaagse verhuringen kan dit anders zijn — dat bespreken we altijd vooraf, zonder verrassingen." },
    { q: "Kan ik meerdere attracties tegelijk huren?", a: "Zeker. Veel klanten combineren een springkasteel met bijvoorbeeld een Fortnite Shooting, darts of een popcornmachine. Bij een combinatie genieten extra attracties bovendien van een voordeeltarief." },
    { q: "Verhuren jullie ook aan scholen, verenigingen en bedrijven?", a: "Jazeker. We werken graag samen met scholen, jeugdbewegingen, sportclubs, gemeenten en bedrijven. Een factuur is uiteraard mogelijk. Vraag gerust naar een offerte op maat van je evenement." },
    { q: "In welke regio leveren jullie?", a: "We zijn gevestigd in Lebbeke en leveren in Lebbeke, Buggenhout, Dendermonde, Aalst, Opwijk, Wieze, Wetteren, Zele, Hamme, Bornem en de hele omgeving. Binnen 15 km is de levering gratis." },
    { q: "Wanneer en hoe betaal ik?", a: "Je betaalt pas op de dag van de plaatsing, cash. Reserveren kost dus niets vooraf. Alle vermelde prijzen zijn per dag en inclusief btw." }
  ];

  /* --- Lokale SEO-regio's (gemeente-landingspagina's) --------------------- */
  const REGIONS = [
    { slug: "lebbeke", name: "Lebbeke", postcode: "9280", free: true },
    { slug: "buggenhout", name: "Buggenhout", postcode: "9255", free: true },
    { slug: "dendermonde", name: "Dendermonde", postcode: "9200", free: true },
    { slug: "aalst", name: "Aalst", postcode: "9300", free: true },
    { slug: "opwijk", name: "Opwijk", postcode: "1745", free: true },
    { slug: "wieze", name: "Wieze", postcode: "9280", free: true },
    { slug: "zele", name: "Zele", postcode: "9240", free: true },
    { slug: "hamme", name: "Hamme", postcode: "9220", free: false },
    { slug: "wetteren", name: "Wetteren", postcode: "9230", free: false },
    { slug: "bornem", name: "Bornem", postcode: "2880", free: false },
    { slug: "merchtem", name: "Merchtem", postcode: "1785", free: false },
    { slug: "londerzeel", name: "Londerzeel", postcode: "1840", free: false }
  ];

  const TYPE_LABELS = {
    springkasteel: "Springkasteel", run: "Hindernisbaan / run",
    animatie: "Extra animatie", volksspel: "Volksspel", feestmateriaal: "Feestmateriaal"
  };

  /* --- Helpers ------------------------------------------------------------- */
  function fmtDim(d) {
    if (!d) return null;
    const n = function (x) { return String(x).replace(".", ","); };
    return "B " + n(d.b) + " × L " + n(d.l) + " × H " + n(d.h) + " m";
  }
  function bySlug(slug) { return PRODUCTS.find(function (p) { return p.slug === slug; }); }
  function inCat(slug) { return PRODUCTS.filter(function (p) { return p.cats.indexOf(slug) !== -1; }); }
  function catBySlug(slug) { return CATEGORIES.find(function (c) { return c.slug === slug; }); }
  function regionBySlug(slug) { return REGIONS.find(function (r) { return r.slug === slug; }); }

  /* --- Booqable-product-ID's (exact zoals op de oude site) ---------------- */
  /* Koppelt onze slug aan de id in het Booqable-boekingssysteem.            */
  var BOOQABLE = {
    "happende-haai": "happende-haai", "monkey-slide-xl": "monkeyslide", "krokopark": "krokopark",
    "discobal": "discbal", "summer-party": "summerparty", "prinsessen-kasteel": "prinses",
    "unicorn": "unicorn", "kroko-piraat": "krokopiraat", "indian-fun": "indian-fun",
    "konijntje": "konijntje", "interactief-springkussen": "interactief-springkussen",
    "haai-run": "haairun", "lion-run": "lion-run", "stormbaan-vrachtwagen": "stormbaan-vrachtwagen",
    "toxic-run": "toxic-run", "kroko-swim": "krokoswim", "fortnite-shooting": "fortnite-shooting",
    "voetbaldarts": "voetbaldarts", "darts": "reuzedarts", "speeltafel": "speeltafel",
    "ips-kegels": "ips-kegels", "popcornmachine": "popcornmachine", "reuze-4-op-een-rij": "reuze-4-op-1-rij",
    "domino-xl": "domino-xl", "bakschieten": "bakschieten", "nageltje-klop": "nageltje-klop",
    "zaklopen-kids": "zaklopen-kids", "soft-archery-kiddies": "soft-archery-kiddies",
    "soft-archery-junior": "soft-archery-junior", "kleefbal-kids": "kleefbal-kids"
  };
  PRODUCTS.forEach(function (p) { p.booqableId = BOOQABLE[p.slug] || null; });

  window.KELOBOR = {
    COMPANY: COMPANY, CATEGORIES: CATEGORIES, PRODUCTS: PRODUCTS,
    FAQ: FAQ, REGIONS: REGIONS, TYPE_LABELS: TYPE_LABELS,
    fmtDim: fmtDim, bySlug: bySlug, inCat: inCat, catBySlug: catBySlug, regionBySlug: regionBySlug
  };
})();
