import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("public/images/gelati");

const items = [
  {
    slug: "cono-classico",
    nome: "Cono Classico",
    categoria: "Cono",
    palette: ["#f8e7b0", "#8a4b2f", "#5c311d"],
    accent: "#d96b46",
    decor: "waffle",
  },
  {
    slug: "cono-fragola-pistacchio",
    nome: "Cono Fragola e Pistacchio",
    categoria: "Cono",
    palette: ["#f9a8b5", "#b1d27b", "#84573e"],
    accent: "#d5396b",
    decor: "berry",
  },
  {
    slug: "cono-stracciatella",
    nome: "Cono Stracciatella",
    categoria: "Cono",
    palette: ["#f2ead8", "#7a4b35", "#3a2418"],
    accent: "#5e3523",
    decor: "chips",
  },
  {
    slug: "cono-nocciola",
    nome: "Cono Nocciola",
    categoria: "Cono",
    palette: ["#d7b08b", "#a56a43", "#5b3628"],
    accent: "#c27a4d",
    decor: "hazelnut",
  },
  {
    slug: "coppetta-cioccolato-fondente",
    nome: "Coppetta Cioccolato Fondente",
    categoria: "Coppetta",
    palette: ["#5c3525", "#2f1914", "#d8b17d"],
    accent: "#a5623d",
    decor: "cacao",
  },
  {
    slug: "coppetta-frutti-di-bosco",
    nome: "Coppetta Frutti di Bosco",
    categoria: "Coppetta",
    palette: ["#8648b7", "#274cbf", "#e55b87"],
    accent: "#fbcc4e",
    decor: "berries",
  },
  {
    slug: "coppetta-tiramisu",
    nome: "Coppetta Tiramisù",
    categoria: "Coppetta",
    palette: ["#d6bb96", "#8c5a3d", "#f6ede0"],
    accent: "#5b3928",
    decor: "dust",
  },
  {
    slug: "coppetta-vaniglia-caramello",
    nome: "Coppetta Vaniglia e Caramello",
    categoria: "Coppetta",
    palette: ["#f7e7b7", "#d6914b", "#8e5830"],
    accent: "#f1b24f",
    decor: "swirl",
  },
  {
    slug: "stecco-cioccolato-mandorle",
    nome: "Stecco Cioccolato e Mandorle",
    categoria: "Stecco",
    palette: ["#7b4d33", "#f3e6d5", "#b99472"],
    accent: "#d9b182",
    decor: "almonds",
  },
  {
    slug: "stecco-yogurt-fragola",
    nome: "Stecco Yogurt e Fragola",
    categoria: "Stecco",
    palette: ["#fff2f2", "#f79bb6", "#d14974"],
    accent: "#ffd166",
    decor: "heart",
  },
  {
    slug: "stecco-pistacchio",
    nome: "Stecco Pistacchio",
    categoria: "Stecco",
    palette: ["#bdd880", "#69853f", "#3e4f2a"],
    accent: "#f7d06e",
    decor: "pistachio",
  },
  {
    slug: "stecco-cocco-mango",
    nome: "Stecco Cocco e Mango",
    categoria: "Stecco",
    palette: ["#fff6e8", "#f3b449", "#eb7a34"],
    accent: "#54c7b0",
    decor: "tropical",
  },
];

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const createBackdrop = (item) => `
  <defs>
    <linearGradient id="bg-${item.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.palette[0]}" />
      <stop offset="48%" stop-color="${item.accent}" />
      <stop offset="100%" stop-color="${item.palette[1]}" />
    </linearGradient>
    <linearGradient id="panel-${item.slug}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.88)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.42)" />
    </linearGradient>
    <linearGradient id="cone-${item.slug}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#dba55f" />
      <stop offset="100%" stop-color="#9f6430" />
    </linearGradient>
    <filter id="shadow-${item.slug}" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="rgba(19,32,43,0.22)" />
    </filter>
  </defs>
  <rect width="1200" height="900" rx="48" fill="url(#bg-${item.slug})" />
  <circle cx="215" cy="175" r="128" fill="rgba(255,255,255,0.14)" />
  <circle cx="980" cy="210" r="94" fill="rgba(255,255,255,0.18)" />
  <circle cx="1025" cy="735" r="154" fill="rgba(255,255,255,0.10)" />
  <path d="M0 640C182 550 262 560 422 638C592 720 672 716 861 638C997 583 1106 573 1200 620V900H0Z" fill="rgba(255,255,255,0.18)" />
  <rect x="72" y="72" width="1056" height="756" rx="40" fill="url(#panel-${item.slug})" stroke="rgba(255,255,255,0.35)" />
`;

const createLabel = (item) => `
  <g opacity="0.9">
    <text x="110" y="150" font-size="34" font-family="'Trebuchet MS', 'Segoe UI', sans-serif" font-weight="700" fill="${item.palette[2]}">${escapeXml(item.categoria.toUpperCase())}</text>
    <text x="110" y="215" font-size="70" font-family="'Trebuchet MS', 'Segoe UI', sans-serif" font-weight="800" fill="#fff">${escapeXml(item.nome)}</text>
    <text x="110" y="275" font-size="28" font-family="'Trebuchet MS', 'Segoe UI', sans-serif" fill="rgba(255,255,255,0.92)">Illustrazione artigianale per il menu API</text>
  </g>
`;

const toppingDots = (dots, radius = 8) =>
  dots
    .map(
      ({ x, y, fill }) =>
        `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" opacity="0.95" />`,
    )
    .join("");

const drawCone = (item) => {
  const [top, middle, dark] = item.palette;
  const decor =
    {
      waffle: `<path d="M646 514L786 760" stroke="rgba(120,68,32,0.28)" stroke-width="8" />
        <path d="M718 494L844 714" stroke="rgba(120,68,32,0.24)" stroke-width="8" />
        <path d="M832 540L688 746" stroke="rgba(120,68,32,0.24)" stroke-width="8" />`,
      berry: toppingDots([
        { x: 650, y: 350, fill: "#cf2d5c" },
        { x: 685, y: 328, fill: "#cf2d5c" },
        { x: 721, y: 356, fill: "#d9456d" },
        { x: 816, y: 338, fill: "#8fb643" },
        { x: 860, y: 362, fill: "#7ea437" },
      ]),
      chips: toppingDots([
        { x: 655, y: 362, fill: "#5c311d" },
        { x: 688, y: 334, fill: "#5c311d" },
        { x: 723, y: 370, fill: "#5c311d" },
        { x: 805, y: 340, fill: "#5c311d" },
        { x: 848, y: 368, fill: "#5c311d" },
      ], 7),
      hazelnut: `<ellipse cx="666" cy="350" rx="18" ry="13" fill="#8c552f" />
        <ellipse cx="705" cy="322" rx="18" ry="13" fill="#a76b41" />
        <ellipse cx="839" cy="355" rx="18" ry="13" fill="#8c552f" />`,
    }[item.decor] || "";

  return `
    <g filter="url(#shadow-${item.slug})">
      <ellipse cx="750" cy="726" rx="168" ry="30" fill="rgba(27,42,48,0.18)" />
      <circle cx="678" cy="382" r="78" fill="${top}" />
      <circle cx="776" cy="358" r="86" fill="${middle}" />
      <circle cx="863" cy="404" r="72" fill="${item.accent}" />
      <path d="M722 450L860 450L802 722Q793 754 765 754Q735 754 726 722Z" fill="url(#cone-${item.slug})" />
      <path d="M735 483L846 483" stroke="rgba(120,68,32,0.25)" stroke-width="7" />
      <path d="M725 540L836 540" stroke="rgba(120,68,32,0.25)" stroke-width="7" />
      <path d="M714 595L825 595" stroke="rgba(120,68,32,0.25)" stroke-width="7" />
      <path d="M702 650L813 650" stroke="rgba(120,68,32,0.25)" stroke-width="7" />
      <path d="M689 705L800 705" stroke="rgba(120,68,32,0.25)" stroke-width="7" />
      <path d="M730 454L842 710" stroke="rgba(120,68,32,0.22)" stroke-width="8" />
      <path d="M775 452L820 726" stroke="rgba(120,68,32,0.22)" stroke-width="8" />
      <path d="M826 454L756 730" stroke="rgba(120,68,32,0.22)" stroke-width="8" />
      <path d="M684 462C721 432 770 428 812 438" stroke="${dark}" stroke-linecap="round" stroke-width="12" opacity="0.28" />
      ${decor}
    </g>
  `;
};

const drawCup = (item) => {
  const [left, center, right] = item.palette;
  const decor =
    {
      cacao: `<circle cx="670" cy="365" r="6" fill="#d6b18a" />
        <circle cx="708" cy="336" r="5" fill="#d6b18a" />
        <circle cx="840" cy="346" r="5" fill="#d6b18a" />
        <circle cx="862" cy="386" r="6" fill="#d6b18a" />`,
      berries: `<circle cx="674" cy="350" r="16" fill="#df5a89" />
        <circle cx="714" cy="330" r="14" fill="#6b45d3" />
        <circle cx="858" cy="360" r="14" fill="#355dd8" />
        <path d="M716 314C726 300 738 296 748 298" stroke="#3f7f31" stroke-width="6" stroke-linecap="round" />`,
      dust: `<path d="M648 350C700 325 749 326 800 350" stroke="#73503d" stroke-dasharray="4 16" stroke-width="12" stroke-linecap="round" />
        <path d="M790 350C828 330 855 330 882 346" stroke="#73503d" stroke-dasharray="4 16" stroke-width="12" stroke-linecap="round" />`,
      swirl: `<path d="M655 366C711 322 786 324 842 362" stroke="#d5853d" stroke-width="16" stroke-linecap="round" fill="none" />
        <path d="M678 390C735 355 800 355 854 386" stroke="#f4c15b" stroke-width="12" stroke-linecap="round" fill="none" />`,
    }[item.decor] || "";

  return `
    <g filter="url(#shadow-${item.slug})">
      <ellipse cx="760" cy="742" rx="190" ry="32" fill="rgba(27,42,48,0.18)" />
      <circle cx="684" cy="392" r="82" fill="${left}" />
      <circle cx="778" cy="360" r="90" fill="${center}" />
      <circle cx="864" cy="408" r="78" fill="${right}" />
      <path d="M635 454H892L850 680C844 725 806 758 760 758C714 758 676 725 670 680Z" fill="#ffffff" opacity="0.95" />
      <path d="M648 470H880L848 669C843 703 805 731 760 731C716 731 678 703 672 669Z" fill="${item.accent}" opacity="0.85" />
      <path d="M648 470H880" stroke="rgba(255,255,255,0.76)" stroke-width="12" stroke-linecap="round" />
      <path d="M690 540H832" stroke="rgba(255,255,255,0.48)" stroke-width="12" stroke-linecap="round" />
      <path d="M708 592H814" stroke="rgba(255,255,255,0.34)" stroke-width="12" stroke-linecap="round" />
      ${decor}
    </g>
  `;
};

const drawStick = (item) => {
  const [main, glaze, detail] = item.palette;
  const decor =
    {
      almonds: `<ellipse cx="807" cy="396" rx="18" ry="9" fill="#ecd1b5" transform="rotate(22 807 396)" />
        <ellipse cx="750" cy="458" rx="18" ry="9" fill="#ecd1b5" transform="rotate(-14 750 458)" />
        <ellipse cx="836" cy="506" rx="18" ry="9" fill="#f0dac1" transform="rotate(14 836 506)" />`,
      heart: `<path d="M744 415C744 388 778 386 786 414C794 386 828 388 828 415C828 439 806 452 786 474C766 452 744 439 744 415Z" fill="#ff6b96" />`,
      pistachio: toppingDots([
        { x: 747, y: 412, fill: "#557036" },
        { x: 800, y: 468, fill: "#6e8842" },
        { x: 844, y: 520, fill: "#4e6b31" },
      ], 10),
      tropical: `<circle cx="744" cy="406" r="10" fill="#55c7ad" />
        <circle cx="790" cy="456" r="10" fill="#55c7ad" />
        <circle cx="837" cy="511" r="10" fill="#55c7ad" />
        <path d="M730 378C741 362 754 356 768 357" stroke="#55c7ad" stroke-width="6" stroke-linecap="round" />`,
    }[item.decor] || "";

  return `
    <g filter="url(#shadow-${item.slug})">
      <ellipse cx="774" cy="756" rx="166" ry="30" fill="rgba(27,42,48,0.18)" />
      <rect x="712" y="278" width="124" height="400" rx="62" fill="${main}" />
      <rect x="712" y="278" width="124" height="270" rx="62" fill="${glaze}" opacity="0.88" />
      <path d="M742 680H807V794C807 814 792 830 775 830C757 830 742 814 742 794Z" fill="#c48f59" />
      <path d="M727 352C761 336 797 337 826 354" stroke="rgba(255,255,255,0.44)" stroke-width="10" stroke-linecap="round" />
      <path d="M727 416C761 401 796 402 826 418" stroke="${detail}" stroke-width="9" stroke-linecap="round" opacity="0.4" />
      <path d="M727 484C761 469 796 470 826 486" stroke="${detail}" stroke-width="9" stroke-linecap="round" opacity="0.4" />
      ${decor}
    </g>
  `;
};

const drawProduct = (item) => {
  if (item.categoria === "Cono") return drawCone(item);
  if (item.categoria === "Coppetta") return drawCup(item);
  return drawStick(item);
};

const createSvg = (item) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" fill="none" role="img" aria-labelledby="title desc">
  <title>${escapeXml(item.nome)}</title>
  <desc>${escapeXml(`Illustrazione del gelato ${item.nome}`)}</desc>
  ${createBackdrop(item)}
  ${createLabel(item)}
  ${drawProduct(item)}
  <g opacity="0.86">
    <rect x="110" y="682" width="252" height="50" rx="25" fill="rgba(255,255,255,0.18)" />
    <text x="140" y="715" font-size="24" font-family="'Trebuchet MS', 'Segoe UI', sans-serif" font-weight="700" fill="#fff">GELATERIA NICE CREAM</text>
    <text x="112" y="782" font-size="26" font-family="'Trebuchet MS', 'Segoe UI', sans-serif" fill="rgba(255,255,255,0.94)">Immagine locale servita dalle API statiche</text>
  </g>
</svg>
`;

await mkdir(outputDir, { recursive: true });

for (const item of items) {
  const svg = createSvg(item);
  const filePath = path.join(outputDir, `${item.slug}.svg`);
  await writeFile(filePath, svg, "utf8");
}

console.log(`Creati ${items.length} asset SVG in ${outputDir}`);
