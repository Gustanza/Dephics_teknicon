/**
 * TEKNICON LTD — all page content.
 *
 * Every fact here traces to docs/BRIEF.md; every image, alt text and caption to
 * docs/image-manifest.json. Nothing in this file may be invented. Templates
 * iterate over these objects — no prose is hardcoded in components.
 */

export const company = {
  name: 'TEKNICON LTD',
  shortName: 'Teknicon',
  tagline: 'Consulting Engineers and Project Managers',
  established: 'June 2009',
  vision: 'To improve the quality of life for human beings through engineering excellence.',
  visionAttribution: 'Teknicon Ltd — Vision Statement',
  email: 'info@teknicon.co.tz',
  phone: '+255 22 2700403',
  phoneHref: '+255222700403',
  web: 'www.teknicon.co.tz',
  webHref: 'https://www.teknicon.co.tz',
  address: [
    'Natai Plaza, 4th Floor, Suite No. RT 01B',
    'Coca Cola Road, Plot 17',
    'Mikocheni Light Industrial Area',
    'Dar es Salaam, Tanzania',
    'P. O. Box 31653'  /* client house style: spaced initials, not P.O. */
  ]
}

/* Order follows the order the sections appear on the page — the scroll-spy sorts by
   document position, but a menu whose order disagrees with the page still reads as
   broken. About now has its own section and sits where it belongs again. */
export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Clients', href: '#clients' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' }
]

/* ------------------------------------------------------------------ hero */
/* Each slide's photograph is the subject its headline names. Natural pixel
   dimensions come from docs/image-manifest.json. */
export const heroSlides = [
  {
    image: '/img/hero-luika-dissipater.jpg',
    w: 1541, h: 959,
    alt: 'A concrete-lined stilling basin holding pale green water, fed by a pipe outfall through a stone gabion wall, with a rockfill embankment and an excavator on its crest behind, under a clear blue sky',
    focus: '50% 45%',
    eyebrow: 'Consulting engineers and project managers',
    title: ['Engineering that holds', 'Tanzania together'],
    lede: 'Structural, civil and project management consultancy — from feasibility study to defects liability. Established June 2009 and registered with the Engineers Registration Board.',
    cta: { label: 'Explore our work', href: '#projects' },
    cta2: { label: 'Talk to an engineer', href: '#contact' }
  },
  {
    image: '/img/hero-tsf-embankment-luika.jpg',
    w: 1467, h: 964,
    alt: 'A yellow vibrating roller compacting the crest of a rockfill tailings embankment under a deep blue sky at a gold mine site',
    focus: '50% 45%',
    eyebrow: 'Tailings storage facilities & water',
    title: ['Dams and tailings', 'built to be audited'],
    lede: 'Design, design review and construction supervision of TSFs, clear-water dams and reservoirs for Shanta, Buckreef, Matongo and Anglo de Beers.',
    cta: { label: 'See the portfolio', href: '#projects' }
  },
  {
    image: '/img/project-tra-ita-hotel.jpg',
    w: 1367, h: 771,
    alt: 'A completed multi-storey accommodation block in white and green render with deep balconies and dark glazing, framed by mature palms',
    focus: '50% 45%',
    eyebrow: 'Buildings, bridges & infrastructure',
    title: ['From a 40m span', 'to a 7-storey block'],
    lede: 'Zimbili and Ulongoni bridges for the Dar es Salaam Metropolitan Development Project. The TZS 15.94 billion (VAT incl.) TRA ITA building at Mikocheni. Storage warehouses for MSD at Keko and Mbeya.',
    cta: { label: 'See the portfolio', href: '#projects' }
  }
]

/* ----------------------------------------------------------------- about */
/* Introduction and "Background and Organization of the Company", profile pp. 4-5.
   The profile draws the three departments as a three-cog diagram; that is not
   reproduced here — decorative shapes are against the theme (THEME_DNA §11.11) and
   the diagram's amber is a colour that exists nowhere else on the site. The
   departments are named and linked to the Services section instead. */
export const about = {
  eyebrow: 'Introduction',
  index: '01',                       /* the profile tabs this section "01 INTRODUCTION" */
  title: ['Multidisciplinary consultants,'],
  titleAccent: 'wholly Tanzanian-owned',   /* carries the theme's accent underline */
  paragraphs: [
    'TEKNICON LTD is a multidisciplinary local consultancy firm, established in June 2009 and registered in Tanzania with the Engineers Registration Board as a Local Engineering Consulting Firm. The company provides professional technical design, consulting engineering, construction supervision and project management services to public and private sector clients.',
    'The firm is wholly owned by Tanzanian nationals and is legally registered under the Companies Act. TEKNICON is also a member of the Association of Consulting Engineers Tanzania (ACET), confirming its standing within the professional consulting engineering sector.',
    'From its offices in Dar es Salaam, TEKNICON delivers practical, cost-effective and quality-driven engineering solutions for buildings, infrastructure, warehouses, bridges, hospitals, terminals and industrial developments — combining strong technical capability with hands-on project management and construction-stage support.'
  ],
  objective: 'The company’s objective is to deliver clients’ precise requirements with the highest level of quality, within the agreed budget and timeframe. This is achieved through constant dialogue with clients, disciplined coordination and strict adherence to internal quality control and assurance procedures.',
  departmentsIntro: 'The firm is organised around three technical departments',
  departments: [
    { n: '01', name: 'Structural and Bridge Engineering' },
    { n: '02', name: 'Civil Engineering' },
    { n: '03', name: 'Project Management' }
  ],
  departmentsLink: { label: 'What each department does', href: '#services' },
  /* Two frames, offset and overlapping — the theme's about-page image pair. One
     building, one civil work, so the pair shows the range the copy claims. */
  image: {
    src: '/img/project-kibongoto-laboratory.jpg',
    w: 1024, h: 768,
    alt: 'A completed four-storey laboratory building in white render with dark glazing and an orange feature panel, fronted by a paved forecourt and a circular lawn with a young tree',
    caption: 'New laboratory, Kibong’oto Hospital — Ministry of Health, Tanzania'
  },
  imageAlt2: {
    src: '/img/project-nyamazovu-river-training.jpg',
    w: 1509, h: 904,
    alt: 'A trained river channel carrying water between two banks faced with stone-filled gabion revetment, under an overcast sky in open bush country',
    caption: 'River Nyamazovu, relocated and trained — Buckreef Gold, Geita'
  }
}

/* ----------------------------------------------------------- credentials */
export const credentials = {
  items: [
    { label: 'Engineers Registration Board', value: 'LCF 122' },
    { label: 'ACET member', value: '061' },
    { label: 'OSHA', value: '313-102-022' },
    { label: 'Incorporated (BRELA)', value: '71672' },
    { label: 'NSSF', value: '1026954' },
    { label: 'Established', value: 'June 2009' }
  ],
  caption: 'Fully registered, continuously compliant, wholly Tanzanian-owned.'
}

/* -------------------------------------------------------------- services */
export const services = {
  eyebrow: 'What we do',
  title: ['Three departments,', 'one engineering practice'],
  lede: 'TEKNICON delivers multidisciplinary consulting engineering and project management services across the entire project lifecycle — feasibility study, concept and detailed design, tender documentation, construction supervision, contract administration and project close-out.',
  items: [
    {
      tag: 'Structural',
      title: 'Structural and Bridge Engineering',
      body: 'Raft foundations, frames and steelwork.',
      link: 'View Capability',
      href: '#projects',
      image: '/img/project-tobacco-plant-morogoro.jpg',
      w: 1015, h: 768,
      alt: 'A steel portal-frame building under erection, with a mobile crane lifting a rafter into place and workers on ladders securing steelwork',
      crop: false
    },
    {
      tag: 'Civil',
      title: 'Civil Engineering and Infrastructure',
      body: 'Earthworks, drainage, dams and tailings.',
      link: 'View Capability',
      href: '#projects',
      image: '/img/project-kilombero-pump-station.jpg',
      w: 1600, h: 1200,
      alt: 'A pump station under construction beside an open water channel, with a bank of six pumps and galvanised suction pipes feeding a common delivery manifold, and workers commissioning the units',
      crop: false
    },
    {
      tag: 'Project Management',
      title: 'Project Management and Supervision',
      body: 'Contracts, supervision and close-out.',
      link: 'View Capability',
      href: '#projects',
      image: '/img/site-survey-team.jpg',
      w: 1070, h: 775,
      alt: 'Two engineers in yellow high-visibility vests, one printed Teknicon Ltd, taking notes on a clipboard during a route survey in open bush country',
      crop: true
    }
  ]
}

/* ------------------------------------------------------ quality assurance */
export const quality = {
  eyebrow: 'Quality assurance',
  title: ['Checked before it is issued.', 'Checked again on site.'],
  body: 'TEKNICON applies quality assurance procedures that prescribe the checks and audits required to ensure soundness, correctness and interface compatibility of engineering solutions — implemented in accordance with applicable laws, codes of practice, technical standards and project-specific requirements.',
  steps: [
    {
      icon: 'review',
      title: 'Technical review',
      body: 'Design calculations and drawings are reviewed before issue.'
    },
    {
      icon: 'layers',
      title: 'Interface coordination',
      body: 'Structural, civil, architectural, mechanical, electrical and quantity surveying inputs are reconciled.'
    },
    {
      icon: 'site',
      title: 'Site inspection',
      body: 'Regular inspections, reporting and review of contractor submissions during construction.'
    },
    {
      icon: 'monitor',
      title: 'Monitoring',
      body: 'Quality, schedule, budget and compliance with the contract documents, tracked throughout.'
    },
    {
      icon: 'closeout',
      title: 'Close-out',
      body: 'Final inspections and support through the Defects Liability Period.'
    }
  ]
}

/* -------------------------------------------------------------- projects */
export const projects = {
  eyebrow: 'Selected work',
  title: ['Projects on the ground'],
  footnote: 'Over forty named projects, for clients across Tanzania, Rwanda, Uganda and Zanzibar.',
  items: [
    {
      title: 'TRA ITA Hotel Accommodation, Mikocheni',
      category: 'Buildings',
      client: 'Tanzania Revenue Authority · 7 storeys · TZS 15.94 billion (VAT incl.)',
      image: '/img/project-tra-ita-hotel.jpg',
      w: 1367, h: 771,
      alt: 'Architectural rendering of a seven-storey accommodation block with a green and white facade, framed by palm trees',
      crop: false
    },
    {
      title: 'Binguni Referral and Teaching Hospital, Zanzibar',
      category: 'Buildings',
      client: 'Government of Zanzibar, Ministry of Health',
      image: '/img/project-binguni-hospital.jpg',
      w: 1464, h: 880,
      alt: 'Aerial masterplan rendering of a hospital campus, with a large main block labelled Binguni Referral and Teaching Hospital surrounded by ancillary buildings, roads and parking',
      crop: false
    },
    {
      title: 'MSD Storage Warehouse, Keko',
      category: 'Buildings',
      client: 'Tanzania Medical Store Department (MSD) · funded by USAID',
      image: '/img/project-msd-warehouse-keko.jpg',
      w: 1100, h: 825,
      alt: 'A completed white medical storage warehouse with MSD branding, with two MSD delivery trucks at the loading bays and a paved yard in the foreground',
      crop: false
    },
    {
      title: 'Zimbili Bridge, Dar es Salaam',
      category: 'Infrastructure',
      wide: true,
      client: 'Ilala Municipal Council · DMDP · 40 m span',
      image: '/img/project-zimbili-bridge.jpg',
      w: 645, h: 291,
      alt: 'A bridge under construction over a river bed, with formwork and reinforcement on the abutment, workers on the deck and a wheel loader working in the foreground',
      crop: false
    },
    {
      title: 'TIPER Gantry Production Centre',
      category: 'Infrastructure',
      wide: true,
      client: 'Tanzania International Petroleum Reserves · rigid pavement hardstand',
      image: '/img/project-tiper-hardstand.jpg',
      w: 1020, h: 459,
      alt: 'A concrete boom pump placing concrete for a rigid pavement slab inside a fuel depot, with a mixer truck, a team of workers in high-visibility vests and rows of bulk storage tanks behind',
      crop: false
    },
    {
      title: 'Mnekezi–Lwamgasa road diversion, Geita',
      category: 'Infrastructure',
      wide: true,
      client: 'TARURA / Buckreef Gold Company · 8.6 km with box culvert',
      image: '/img/project-mnekezi-box-culvert.jpg',
      w: 1571, h: 1178,
      alt: 'A completed three-cell reinforced concrete box culvert carrying a gravel road with steel guardrails over a stream',
      crop: true
    },
    {
      title: '350 ML Masonry Water Dam, New Luika',
      category: 'Mining & Water',
      client: 'Shanta Mining Company Ltd',
      image: '/img/dam-masonry-luika.jpg',
      w: 676, h: 509,
      alt: 'A masonry water dam under construction, with a large crew in orange overalls working along the sloping masonry face, a reinforced concrete outlet structure and the impounded reservoir beyond',
      crop: true
    },
    {
      title: 'TSF1, Mwaoga Village, Chunya District',
      category: 'Mining & Water',
      client: 'Anglo de Beers Tanzania Ltd',
      image: '/img/project-tsf-liner-mwaoga.jpg',
      w: 1521, h: 1140,
      alt: 'A wide tailings storage facility basin fully lined with geomembrane, with three workers kneeling on the liner in the middle distance and forested hills on the horizon',
      crop: true
    },
    {
      title: 'TSF2 Cell 1, Mnekezi, Geita',
      category: 'Mining & Water',
      client: 'Buckreef Gold Company Ltd',
      image: '/img/site-supervision-crew.jpg',
      w: 808, h: 611,
      alt: 'A crew of about a dozen workers in hard hats and high-visibility vests unrolling a large roll of black geomembrane liner across a prepared earthworks platform',
      crop: true
    }
  ]
}

/* --------------------------------------------------------------- clients */
/* The 11 marks embedded in the company profile (docs/image-manifest.json,
   "clients"). They are mining, water and industrial companies — the strip is
   labelled as exactly that, because the public-sector and institutional clients
   in BRIEF §8 have no logo files in the source and are carried in prose instead. */
export const clients = {
  eyebrow: 'Clients & partners',
  title: ['Mining, water and', 'industrial clients', '& partners'],
  note: 'The marks shown are clients in the mining, water and industrial sectors. Public-sector and institutional clients — among them TRA, TIPER, MSD, TARURA, the Judiciary of Tanzania, the University of Dar es Salaam and the ministries of health in Tanzania and Zanzibar — are named in the company profile.',
  /* `mh` is the rendered box height in CSS px. It is not a free choice: each
     mark's *ink* bounding box was decoded (tools/_ink is gone, the numbers live
     here) and `mh` set so that sqrt(inkWidth * inkHeight) === 92px for every
     mark. Constraining by area rather than by height is what makes a 3.5:1
     wordmark and a 1:1 device read as the same visual weight in identical
     cells; capping height alone let landscape marks run 4.7x wider than
     square ones. client-dawasa.png and client-iruwasa.png were re-cropped to
     their ink, which is why their natural sizes are smaller than the source. */
  logos: [
    { file: '/img/clients/client-shanta-gold.png',     name: 'Shanta Mining Company Ltd', w: 175, h: 79, mh: 62 },
    { file: '/img/clients/client-buckreef-gold.png',   name: 'Buckreef Gold Company Ltd', w: 172, h: 90, mh: 67 },
    { file: '/img/clients/client-anglo-de-beers.png',  name: 'Anglo de Beers (T) Limited', w: 237, h: 103, mh: 63 },
    { file: '/img/clients/client-matongo-gold-mine.png', name: 'Matongo Gold Mine Ltd', w: 195, h: 58, mh: 50 },
    { file: '/img/clients/client-busolwa-mining.png',  name: 'Busolwa Mining Limited', w: 230, h: 169, mh: 80 },
    { file: '/img/clients/client-katavi-mining.png',   name: 'Katavi Mining Company Ltd', w: 220, h: 230, mh: 96 },
    { file: '/img/clients/client-ruvuma-coal.png',     name: 'Ruvuma Coal Limited', w: 127, h: 127, mh: 92 },
    { file: '/img/clients/client-volt-resources.png',  name: 'Volt Resources', w: 256, h: 80, mh: 54 },
    { file: '/img/clients/client-dawasa.png',          name: 'DAWASA — Dar es Salaam Water Supply and Sanitation Authority', w: 98, h: 72, mh: 79 },
    { file: '/img/clients/client-iruwasa.png',         name: 'IRUWASA — Iringa Urban Water Supply and Sanitation Authority', w: 151, h: 148, mh: 91 },
    { file: '/img/clients/client-unilever.png',        name: 'Unilever', w: 148, h: 148, mh: 92 }
  ]
}

/* -------------------------------------------------------------- counters */
export const counters = {
  eyebrow: 'The practice in numbers',
  items: [
    { value: 17, label: 'Years in practice' },
    { value: 40, label: 'Named projects' },
    { value: 14, label: 'Professional and technical staff' },
    { value: 34, label: 'Years, longest track record' }
  ],
  note: 'Established June 2009. Registered with the Engineers Registration Board as a Local Engineering Consulting Firm.'
}

/* ------------------------------------------------------------------ team */
export const team = {
  eyebrow: 'Key personnel',
  title: ['Registered engineers,', 'on the drawing board', 'and on site'],
  lede: 'Senior consulting engineers, registered professional engineers, a quantity surveyor and senior civil technicians — with individual experience ranging from 7 to 34 years.',
  members: [
    { name: 'Eng. Florence Msambila', profession: 'Civil/Structural Engineer', countries: 'Tanzania · Botswana · South Africa', years: 31 },
    { name: 'Eng. Robert D. Lubuva', profession: 'Civil/Structural Engineer', countries: 'Tanzania', years: 24 },
    { name: 'Eng. Mbaraka M. Shaffi', profession: 'Civil/Structural Engineer', countries: 'Tanzania · Botswana · South Africa', years: 34 },
    { name: 'Eng. Arnold G. Rutaindurwa', profession: 'Structural Engineer',       countries: 'Tanzania', years: 17 },
    { name: 'Eng. Suleiman Hanti', profession: 'Civil/Structural Engineer', countries: 'Tanzania', years: 17 },
    { name: 'Ezekiel Mulinda', profession: 'Civil Engineer',            countries: 'Tanzania', years: 27 }
  ],
  note: 'No staff photographs exist in the company profile, and none have been invented. The roster below is set typographically.',
  more: '…and eight more: five engineers, a quantity surveyor and two senior civil technicians.'
}

/* ---------------------------------------------------------------- CTA */
export const splitCta = [
  {
    eyebrow: 'Get in touch',
    title: 'Have a project?',
    button: { label: 'Request a proposal', href: '#contact' },
    /* was the Luika stilling basin — swapped once a near-identical frame of the same
       structure became hero slide 1, so the two would not read as a duplicate */
    image: '/img/project-mnekezi-box-culvert.jpg',
    w: 1571, h: 1178,
    alt: 'A reinforced concrete box culvert under construction on a gravel road diversion, with formwork in place and an excavator working alongside',
    focus: '50% 45%',
    crop: true
  },
  {
    eyebrow: 'Clients & partners',
    title: 'Who do we work for?',
    note: 'TRA · TIPER · MSD · TARURA · Shanta · Buckreef',
    button: { label: 'See our clients', href: '#clients' },
    image: '/img/project-tobacco-plant-morogoro.jpg',
    w: 1015, h: 768,
    alt: 'A steel portal-frame building under erection, with a mobile crane lifting a rafter into place and workers on ladders securing steelwork',
    focus: '50% 45%'
  }
]

/* ---------------------------------------------------------------- footer */
export const footer = {
  blurb: 'A multidisciplinary consulting engineering firm registered with the Engineers Registration Board as a Local Engineering Consulting Firm. Wholly Tanzanian-owned. Member, ACET.',
  columns: [
    {
      heading: 'Office',
      type: 'address',
      lines: company.address
    },
    {
      heading: 'Contact',
      type: 'links',
      links: [
        { label: company.email, href: `mailto:${company.email}`, icon: 'mail' },
        { label: company.phone, href: `tel:${company.phoneHref}`, strong: true, icon: 'phone' },
        { label: company.web, href: company.webHref, icon: 'globe' }
      ]
    },
    {
      heading: 'Follow',
      type: 'links',
      /* PLACEHOLDER LINKS. The client has not supplied handles yet, and none appear
         anywhere in the company profile, so every href below is '#'. Replace each
         one with the real profile URL before launch — do not guess them. */
      links: [
        { label: 'LinkedIn', href: '#', icon: 'linkedin' },
        { label: 'Instagram', href: '#', icon: 'instagram' },
        { label: 'Facebook', href: '#', icon: 'facebook' },
        { label: 'X', href: '#', icon: 'x' }
      ]
    }
  ],
  copyright: 'Teknicon Ltd © 2026. All rights reserved.',
  registrations: 'ERB LCF 122 · ACET 061 · TIN 108-536-756'
}
