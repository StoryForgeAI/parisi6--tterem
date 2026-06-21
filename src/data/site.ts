import type { Dish, Review, GalleryImage, FAQItem } from "@/types";

/*
  KÉPEK CSERÉJE:
  Az alábbi adatokban található összes kép URL cserélhető saját képekre.
  1. Helyezze el a képeket a megfelelő mappákban: public/images/dishes/, public/images/gallery/, stb.
  2. Frissítse a kép URL-eket az alábbi tömbben.
  3. Törölje a placeholder URL-eket (images.unsplash.com).
*/

export const siteConfig = {
  name: "Parisi 6",
  tagline: "Magyar konyha eleganciával",
  description:
    "A Parisi 6 Budapest szívében, a Párizsi utcában várja vendégeit autentikus magyar konyhával, elegáns környezetben és figyelmes kiszolgálással.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://parisi6.hu",
  ogImage: "/images/og-image.jpg",
  location: {
    address: "Párizsi utca 6, Budapest, 1052 Hungary",
    phone: "+36 30 599 9137",
    email: "parisi6@parisi6.com",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.123!2d19.053!3d47.497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDI5JzQ5LjIiTiAxOcKwMDMnMTAuOCJF!5e0!3m2!1shu!2shu!4v1",
    googleMapsUrl: "https://maps.google.com/?q=Parisi+6+Budapest+Párizsi+utca+6",
  },
  rating: {
    score: 4.8,
    reviews: 11438,
  },
  priceRange: "4 000 – 14 000 Ft / fő",
  openingHours: [
    { day: "Hétfő – Csütörtök", hours: "12:00 – 22:00" },
    { day: "Péntek – Szombat", hours: "12:00 – 23:00" },
    { day: "Vasárnap", hours: "12:00 – 21:00" },
  ],
  social: {
    instagram: "https://instagram.com/parisi6",
    facebook: "https://facebook.com/parisi6",
    tripadvisor: "https://tripadvisor.com/parisi6",
  },
};

/*
  ÉTELEK KÉPEI:
  Cserélje ki az image URL-eket saját képeire a public/images/dishes/ mappából.
  Példa: image: "/images/dishes/goulash.jpg"
*/
export const dishes: Dish[] = [
  {
    id: "goulash",
    name: "Gulyásleves",
    description:
      "A hagyományos magyar gulyásleves marhahússal, burgonyával és friss zöldségekkel, házi kenyérrel tálalva.",
    price: "4 200 Ft",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    category: "Levesek",
  },
  {
    id: "paprikash",
    name: "Paprikás csirke",
    description:
      "Szaftos csirkepaprikás házi galuskával, tejfölös öntettel és friss petrezselyemmel díszítve.",
    price: "6 800 Ft",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&q=80",
    category: "Főételek",
  },
  {
    id: "tartare",
    name: "Angus marhatartár",
    description:
      "Prémium angus marhából készült tartár házi chipsszel, kapribogyóval és mustáros öntettel.",
    price: "8 500 Ft",
    image: "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=600&q=80",
    category: "Előételek",
  },
  {
    id: "sausage",
    name: "Magyar kolbászválogatás",
    description:
      "Válogatás a legfinomabb magyar kolbászokból, házi savanyúsággal és friss kenyérrel.",
    price: "5 200 Ft",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80",
    category: "Előételek",
  },
  {
    id: "strudel",
    name: "Almás rétes",
    description:
      "Ropogós réteges tészta, fahéjas almával, mazsolával és vaníliasodóval kísérve.",
    price: "3 800 Ft",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
    category: "Desszertek",
  },
  {
    id: "dumplings",
    name: "Túrós gombóc",
    description:
      "Házi túrós gombóc tejföllel, pirított morzsával és friss mentával megszórva.",
    price: "3 500 Ft",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80",
    category: "Desszertek",
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    text: "Csodálatos étterem! A kiszolgálás első osztályú, az ételek pedig mesésen ízletesek. A gulyásleves a legjobb, amit valaha ettem. A hangulat pedig egyszerűen varázslatos.",
    author: "Anna K.",
    rating: 5,
  },
  {
    id: "2",
    text: "Gyönyörű hely, figyelmes személyzet. Az ételek gyönyörűen vannak tálalva és az ízek lenyűgözőek. Mindenkinek ajánlom, aki Budapestre látogat.",
    author: "Péter M.",
    rating: 5,
  },
  {
    id: "3",
    text: "Kiváló ár-érték arány! A paprikás csirke isteni volt, és a desszertek is csodálatosak. Visszatérő vendég vagyok, és még soha nem csalódtam.",
    author: "Mária S.",
    rating: 5,
  },
  {
    id: "4",
    text: "Nemzetközi színvonalú étterem Budapest szívében. A marhatartár az egyik legjobb, amit valaha kóstoltam. A pincérek szakmai tudása kiemelkedő.",
    author: "David W.",
    rating: 5,
  },
  {
    id: "5",
    text: "Ha egy igazi magyar gasztroélményre vágysz, ezt a helyet ki kell próbálnod! Gyors kiszolgálás, kedves személyzet, csodás ízek.",
    author: "Eszter B.",
    rating: 4,
  },
  {
    id: "6",
    text: "Az almás rétes olyan, mintha a nagymamám készítette volna. Meghitt hangulat, gyertyafényes vacsora. Tökéletes romantikus estére.",
    author: "Gábor T.",
    rating: 5,
  },
];

/*
  GALÉRIA KÉPEI:
  Cserélje ki a src URL-eket saját képeire a public/images/gallery/ mappából.
  Példa: src: "/images/gallery/restaurant-interior.jpg"
  Változatos képarányok használata javasolt a masonry elrendezéshez.
*/
export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    alt: "Elegáns belső tér a Parisi 6 étteremben",
    width: 800,
    height: 600,
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80",
    alt: "Gyönyörűen tálalt étel",
    width: 600,
    height: 800,
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&q=80",
    alt: "Vendégek az étteremben",
    width: 800,
    height: 600,
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80",
    alt: "Séf a konyhában",
    width: 600,
    height: 800,
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    alt: "Gyertyafényes hangulat",
    width: 800,
    height: 600,
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=600&q=80",
    alt: "Borospoharak az asztalon",
    width: 600,
    height: 800,
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
    alt: "Az étterem külső homlokzata",
    width: 800,
    height: 600,
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
    alt: "Különleges desszert",
    width: 600,
    height: 600,
  },
];

export const whyGuestsLoveUs = [
  {
    title: "Lenyűgöző hangulat",
    description:
      "Gyertyafényes vacsora, elegáns berendezés, meghitt atmoszféra – minden egy felejthetetlen estéhez.",
    icon: "sparkles",
  },
  {
    title: "Barátságos személyzet",
    description:
      "Szakértő pincéreink figyelmes kiszolgálással és személyre szabott ajánlatokkal várják vendégeinket.",
    icon: "heart",
  },
  {
    title: "Gyors kiszolgálás",
    description:
      "Professzionális konyhánknak köszönhetően soha nem kell sokat várni az ételekre, még nagyobb rendezvények esetén sem.",
    icon: "clock",
  },
  {
    title: "Gyönyörű tálalás",
    description:
      "Minden fogást művészi igényességgel tálalunk, hogy az étkezés vizuális élménye is tökéletes legyen.",
    icon: "palette",
  },
  {
    title: "Kiváló ár-érték arány",
    description:
      "Prémium minőségű ételek megfizethető áron. A legjobb magyar gasztronómiai élmény Budapest szívében.",
    icon: "star",
  },
  {
    title: "Felejthetetlen élmény",
    description:
      "Vendégeink visszatérnek hozzánk, mert minden alkalommal különleges élményben részesülnek éttermünkben.",
    icon: "crown",
  },
];

export const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "Hogyan foglalhatok asztalt?",
    answer:
      "Asztalt foglalhat weboldalunk foglalási űrlapján keresztül, telefonon a +36 30 599 9137-es számon, vagy e-mailben a parisi6@parisi6.com címen. Javasoljuk, hogy legalább 24 órával érkezése előtt foglaljon.",
  },
  {
    id: "2",
    question: "Van parkolási lehetőség az étterem közelében?",
    answer:
      "Az étterem közelében több fizetős parkolóhely és parkolóház is található. Javasoljuk a tömegközlekedés használatát, mivel éttermünk a belváros szívében, könnyen megközelíthető helyen található.",
  },
  {
    id: "3",
    question: "Mikor vannak nyitva?",
    answer:
      "Hétfőtől csütörtökig 12:00–22:00, péntektől szombatig 12:00–23:00, vasárnap 12:00–21:00 óráig tartunk nyitva. Konyhánk zárás előtt egy órával utoljára fogad rendeléseket.",
  },
  {
    id: "4",
    question: "Tudnak fogadni vegetáriánus vagy allergiás vendégeket?",
    answer:
      "Igen, konyhánk rugalmasan alkalmazkodik a különböző étkezési igényekhez. Kérjük, foglaláskor vagy érkezéskor jelezze allergiáit vagy diétás igényeit, és séfünk személyre szabott ételekkel készül.",
  },
  {
    id: "5",
    question: "Lehetőség van rendezvények, céges események szervezésére?",
    answer:
      "Természetesen! Éttermünk alkalmas magánrendezvények, céges vacsorák, születésnapi partik és egyéb események lebonyolítására. Kérjük, vegye fel velünk a kapcsolatot, és egyedi ajánlatot készítünk.",
  },
  {
    id: "6",
    question: "Van öltözködési előírás?",
    answer:
      "Bár nincs szigorú öltözködési kódex, elegáns, alkalmi öltözéket javaslunk. Éttermünk atmoszférájához illik a smart casual viselet.",
  },
  {
    id: "7",
    question: "Elérhetőek nemzetközi ételek is?",
    answer:
      "Bár specialitásunk a magyar konyha, menünkben megtalálhatóak nemzetközi fogások is, és igény szerint tudunk alkalmazkodni vendégeink ízléséhez.",
  },
  {
    id: "8",
    question: "Van házon belüli desszert?",
    answer:
      "Igen, minden desszertünk házilag készül, saját cukrászunk által. A klasszikus magyar édességek mellett nemzetközi desszerteket is kínálunk.",
  },
];
