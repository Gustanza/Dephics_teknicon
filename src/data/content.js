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
    'P.O. Box 31653'
  ]
}

export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#quality' },
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
    image: '/img/project-zmt-terminal.jpg',
    w: 1057, h: 664,
    /* the lowest-resolution source in the hero set and the LCP frame: the Ken
       Burns amplitude is capped so peak demand stays under 2x. See Hero.vue. */
    quietZoom: true,
    alt: 'Drone view of a container storage yard with rows of stacked shipping containers on a paved hardstand, alongside red-roofed workshop and service buildings',
    focus: '50% 50%',
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
    image: '/img/hero-ulongoni-bridge.jpg',
    w: 1080, h: 810,
    alt: 'A reinforced concrete bridge deck under construction across a sandy river channel, with a concrete apron, workers in high-visibility vests, a wheel loader and an excavator, and a densely built hillside settlement behind',
    focus: '50% 55%',
    eyebrow: 'Buildings, bridges & infrastructure',
    title: ['From a 40m span', 'to a 7-storey block'],
    lede: 'Zimbili and Ulongoni bridges for the Dar es Salaam Metropolitan Development Project. The TZS 15.94 billion (VAT incl.) TRA ITA building at Mikocheni. Storage warehouses for MSD at Keko and Mbeya.',
    cta: { label: 'See the portfolio', href: '#projects' }
  }
]

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
      link: 'View capability',
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
      link: 'View capability',
      href: '#projects',
      image: '/img/project-kilombero-pump-station.jpg',
      w: 1600, h: 1200,
      alt: 'A pump station under construction beside an open water channel, with a bank of six pumps and galvanised suction pipes feeding a common delivery manifold, and workers commissioning the units',
      crop: false
    },
    {
      tag: 'Project management',
      title: 'Project Management and Supervision',
      body: 'Contracts, supervision and close-out.',
      link: 'View capability',
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
    { name: 'Eng. Florence Msambila',      initials: 'FM', profession: 'Civil/Structural Engineer', countries: 'Tanzania · Botswana · South Africa', years: 31 },
    { name: 'Eng. Robert D. Lubuva',       initials: 'RL', profession: 'Civil/Structural Engineer', countries: 'Tanzania', years: 24 },
    { name: 'Eng. Mbaraka M. Shaffi',      initials: 'MS', profession: 'Civil/Structural Engineer', countries: 'Tanzania · Botswana · South Africa', years: 34 },
    { name: 'Eng. Arnold G. Rutaindurwa',  initials: 'AR', profession: 'Structural Engineer',       countries: 'Tanzania', years: 17 },
    { name: 'Eng. Suleiman Hanti',         initials: 'SH', profession: 'Civil/Structural Engineer', countries: 'Tanzania', years: 17 },
    { name: 'Ezekiel Mulinda',             initials: 'EM', profession: 'Civil Engineer',            countries: 'Tanzania', years: 27 }
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
    image: '/img/project-energy-dissipater-luika.jpg',
    w: 1525, h: 1147,
    alt: 'A concrete-lined stilling basin filled with water, fed by a pipe outfall discharging through a gabion retaining wall, with a rockfill embankment and a mountain behind',
    focus: '35% 40%',
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
        { label: company.email, href: `mailto:${company.email}` },
        { label: company.phone, href: `tel:${company.phoneHref}`, strong: true },
        { label: company.web, href: company.webHref }
      ]
    },
    {
      heading: 'Departments',
      type: 'list',
      lines: [
        'Structural and Bridge Engineering',
        'Civil Engineering',
        'Project Management'
      ]
    }
  ],
  copyright: 'Teknicon Ltd © 2026. All rights reserved.',
  registrations: 'ERB LCF 122 · ACET 061 · TIN 108-536-756'
}

export const marquee = [
  'Engineering excellence',
  'Structural',
  'Civil',
  'Project management',
  'Since 2009'
]
