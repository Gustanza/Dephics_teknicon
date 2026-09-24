/**
 * TEKNICON LTD — all page content.
 *
 * Every fact here traces to docs/BRIEF.md; every image, alt text and caption to
 * docs/image-manifest.json. Nothing in this file may be invented. Templates
 * iterate over these objects — no prose is hardcoded in components.
 *
 * Anything the client still has to supply is marked TBC / tbc('what is needed') —
 * see src/data/tbc.js. `npm run placeholders` lists every one still outstanding.
 */
import { TBC, tbc } from './tbc.js'
export { SHOW_PLACEHOLDERS, isTbc, filled, shown } from './tbc.js'

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

/* Primary navigation. Real routes, not in-page anchors — the client rejected
   anchor navigation (IA feedback C1). Order follows the proposed IA exactly. */
export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Sectors', to: '/sectors' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact Us', to: '/contact' }
]

/* The primary call to action, per client comment C2: they asked for "Contact us"
   rather than "Request a Consultation". Contextual CTAs keep their own wording. */
export const primaryCta = { label: 'Contact us', to: '/contact' }

/* ------------------------------------------------------------------ hero */
/* Each slide's photograph is the subject its headline names. Natural pixel
   dimensions come from docs/image-manifest.json. */
export const heroSlides = [
  {
    image: '/img/project-tiper-hardstand.jpg',
    w: 1646, h: 602,
    alt: 'A concrete boom pump arcing across a clear blue sky to place concrete for a rigid pavement slab inside a fuel depot, with a mixer truck, a team of workers in high-visibility vests and rows of bulk storage tanks behind',
    focus: '50% 55%',
    eyebrow: 'Consulting engineers and project managers',
    title: ['Engineering that holds', 'Tanzania together'],
    lede: 'Structural, civil and project management consultancy — from feasibility study to defects liability. Established June 2009 and registered with the Engineers Registration Board.',
    cta: { label: 'Explore our work', to: '/projects' },
    cta2: { label: 'Contact us', to: '/contact' }
  },
  {
    image: '/img/hero-tsf-embankment-luika.jpg',
    w: 1467, h: 964,
    alt: 'A yellow vibrating roller compacting the crest of a rockfill tailings embankment under a deep blue sky at a gold mine site',
    focus: '50% 45%',
    eyebrow: 'Tailings storage facilities & water',
    title: ['Dams and tailings', 'built to be audited'],
    lede: 'Design, design review and construction supervision of TSFs, clear-water dams and reservoirs for Shanta, Buckreef, Matongo and Anglo de Beers.',
    cta: { label: 'See the portfolio', to: '/projects' }
  },
  {
    image: '/img/project-tra-ita-hotel.jpg',
    w: 1367, h: 771,
    /* The frame is an architectural RENDERING (image-manifest.json), not a photograph of a
       finished building — this alt used to say "a completed … block", which the source
       does not support. */
    alt: 'Architectural rendering of a seven-storey accommodation block with a green and white facade and deep balconies, framed by palm trees',
    focus: '50% 45%',
    eyebrow: 'Buildings, bridges & infrastructure',
    title: ['From a 40m span', 'to a 7-storey block'],
    lede: 'Zimbili and Ulongoni bridges for the Dar es Salaam Metropolitan Development Project. The TZS 15.94 billion (VAT incl.) TRA ITA building at Mikocheni. Storage warehouses for MSD at Keko and Mbeya.',
    cta: { label: 'See the portfolio', to: '/projects' }
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
  departmentsLink: { label: 'What each department does', to: '/services' },
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
/*
  The IA's five services (ROADMAP §7 Q5 — answered "five"). A service is what a client
  hires Teknicon to do; the three departments on /about are how the firm is organised.

  Sources, per field:
    scope        — the IA document's own bullet list for that service, verbatim
    overview     — restates BRIEF §3 / §4 and the profile's mining & water framing (§5.1);
                   no claim appears here that is not in those sections
    deliverables — only outputs the profile itself names (calculations, drawings, tender
                   documents, ESIA, progress reports, payment certificate reviews…).
                   The client should still read these once: ROADMAP P2-4.
    projects     — slugs into projectList below; the first three with a photograph are
                   shown as cards, the rest as a list
    sectors      — slugs into sectors.items

  `home` — the three cards on the Home page: one row, then "All services" (client
  request, 2026-09-23). Swap slugs here to change which three.
*/
export const services = {
  eyebrow: 'What we do',
  title: ['From feasibility study', 'to defects liability'],
  lede: 'TEKNICON delivers multidisciplinary consulting engineering and project management services across the entire project lifecycle — feasibility study, concept and detailed design, tender documentation, construction supervision, contract administration and project close-out.',
  cardLink: 'View Capability',
  /* the first three of the IA's Home "service highlights" */
  home: ['structural-bridge-engineering', 'civil-engineering-infrastructure', 'water-dams-mining-infrastructure'],
  items: [
    {
      slug: 'engineering-design-consultancy',
      n: '01',
      tag: 'Design',
      title: 'Engineering Design & Consultancy',
      body: 'Feasibility studies, design and tender documents.',
      overview: [
        'The front end of a commission: establishing whether and how a project can be built, then designing it to the point where it can be priced and tendered. TEKNICON carries assignments from feasibility study through concept, preliminary and detailed design to the preparation of tender documents.',
        'Design calculations and drawings are technically reviewed before issue, and structural, civil, architectural, mechanical, electrical and quantity surveying inputs are coordinated so the design goes out as one consistent set.'
      ],
      scope: [
        'Feasibility studies',
        'Concept, preliminary and detailed design',
        'Technical assessments and rehabilitation advice',
        'Tender documentation and design coordination'
      ],
      deliverables: [
        'Feasibility studies',
        'Environmental and Social Impact Assessment (ESIA)',
        'Concept, preliminary and detailed designs',
        'Design calculations and drawings, reviewed before issue',
        'Tender documents',
        'Rehabilitation advice and remedial works proposals'
      ],
      sectors: ['government', 'transport', 'health-education', 'buildings'],
      projects: ['wenda-mgama-road', 'binguni-hospital-zanzibar', 'zimbili-bridge', 'rau-bridge-moshi', 'matomondo-mlale-road', 'mtili-ifwagi-mkuta-road', 'uganda-high-commission-dodoma'],
      image: '/img/site-survey-team.jpg',
      w: 1070, h: 775,
      alt: 'Two engineers in yellow high-visibility vests, one printed Teknicon Ltd, taking notes on a clipboard during a route survey in open bush country',
      crop: true
    },
    {
      slug: 'structural-bridge-engineering',
      n: '02',
      tag: 'Structural',
      title: 'Structural & Bridge Engineering',
      body: 'Buildings, special structures and bridges.',
      overview: [
        'Design and supervision of buildings and special structures under varied site conditions. The firm’s experience runs from raft foundations and reinforced concrete frames to structural steelwork, prefabricated warehouse systems and bridge structures.',
        'Work covers industrial, commercial, institutional and residential buildings — warehouses, administration blocks, terminals, hospitals and specialised facilities — along with communication masts and special structures, and structural integrity assessments and rehabilitation advice for existing buildings.'
      ],
      scope: [
        'Buildings and special structures',
        'Reinforced concrete, steel, masonry and timber structures',
        'Foundations and structural detailing',
        'Bridge feasibility, design and supervision',
        'Structural integrity assessments and remedial works'
      ],
      deliverables: [
        'Structural calculations',
        'General arrangement drawings and reinforcement detailing',
        'Foundation design, including raft foundations and pile options',
        'Bridge feasibility studies, alignment options and detailed design',
        'Construction-stage inspections, RFI responses and shop drawing review',
        'Structural assessments and remedial works proposals'
      ],
      sectors: ['buildings', 'government', 'health-education', 'industrial', 'transport'],
      projects: ['tra-ita-hotel-mikocheni', 'ulongoni-bridge', 'msd-warehouse-keko', 'zimbili-bridge', 'furahisha-pedestrian-flyover', 'rau-bridge-moshi', 'lafarge-bulk-loading-mbeya', 'tra-regional-office-tanga'],
      image: '/img/project-tobacco-plant-morogoro.jpg',
      w: 1015, h: 768,
      alt: 'A steel portal-frame building under erection, with a mobile crane lifting a rafter into place and workers on ladders securing steelwork',
      crop: false
    },
    {
      slug: 'civil-engineering-infrastructure',
      n: '03',
      tag: 'Civil',
      title: 'Civil Engineering & Infrastructure',
      body: 'Roads, pavements, drainage and water supply.',
      overview: [
        'Civil engineering for developments and the infrastructure around them: site grading, earthworks and pavement design for roads, yards and parking areas, including rigid pavement works; storm water drainage and flood protection; water supply, sewer reticulation and sanitation.',
        'It includes the external works for buildings, warehouses, terminals and industrial plants, and the coordination of the topographical surveys and geotechnical investigations the design depends on — carried through to civil works supervision and quality control during construction.'
      ],
      scope: [
        'Roads, pavements, hardstands and external works',
        'Drainage, flood protection and river protection',
        'Water supply, sanitation and wastewater',
        'Pipelines, pump stations and reservoirs',
        'Survey and geotechnical investigation coordination'
      ],
      deliverables: [
        'Site grading, earthworks and pavement designs, including rigid pavements',
        'Storm water drainage and flood protection designs',
        'Hydrology studies and river protection works',
        'Water supply, sewer reticulation and sanitation designs',
        'Coordinated topographical survey and geotechnical investigation',
        'Civil works supervision and quality control'
      ],
      sectors: ['transport', 'government', 'industrial', 'water-agriculture', 'mining'],
      projects: ['tiper-gantry-hardstand', 'mnekezi-lwamgasa-road-diversion', 'ifakara-water-supply-irrigation', 'wenda-mgama-road', 'mtili-ifwagi-mkuta-road', 'matomondo-mlale-road', 'mnekezi-helipad'],
      image: '/img/project-kilombero-pump-station.jpg',
      w: 1600, h: 1200,
      alt: 'A pump station under construction beside an open water channel, with a bank of six pumps and galvanised suction pipes feeding a common delivery manifold, and workers commissioning the units',
      crop: false
    },
    {
      slug: 'water-dams-mining-infrastructure',
      n: '04',
      tag: 'Water & Mining',
      title: 'Water, Dams & Mining Infrastructure',
      body: 'Dams, reservoirs, irrigation and TSFs.',
      overview: [
        'A large share of TEKNICON’s work is in the mining and water sectors: tailings storage facilities (TSF) and their auxiliary infrastructure, water dams, irrigation, and the training of water courses — covering design, design review, construction supervision and structural audits.',
        'Clients include Shanta Mining Company, Buckreef Gold Company, Matongo Gold Mine, Anglo de Beers Tanzania and Kilombero Plantation, on assignments ranging from individual TSF phases to a 350 ML masonry water dam.'
      ],
      scope: [
        'Water dams, weirs and reservoirs',
        'Irrigation infrastructure',
        'Tailings Storage Facilities (TSF)',
        'Watercourse training and associated infrastructure',
        'Design review, structural audits and construction supervision'
      ],
      deliverables: [
        'Designs for TSFs, water dams, weirs and reservoirs',
        'Design reviews of TSF phases',
        'Structural audits',
        'Hydrology studies, drainage designs and river protection works',
        'Construction supervision of TSF, dam and irrigation works'
      ],
      sectors: ['mining', 'water-agriculture'],
      projects: ['new-luika-tsf2', 'new-luika-350ml-masonry-dam', 'river-nyamazovu-training', 'mnekezi-tsf2', 'mwaoga-tsf1', 'ikungi-tsf1', 'matongo-tsf1', 'new-luika-150ml-reservoir'],
      image: '/img/project-tsf-liner-mwaoga.jpg',
      w: 1521, h: 1140,
      alt: 'A wide tailings storage facility basin fully lined with geomembrane, with three workers kneeling on the liner in the middle distance and forested hills on the horizon',
      crop: true
    },
    {
      slug: 'project-management-construction-supervision',
      n: '05',
      tag: 'Project Management',
      title: 'Project Management & Construction Supervision',
      body: 'Contracts, supervision and close-out.',
      overview: [
        'Management of a project from appraisal to handover: planning, monitoring and coordination, administration of the construction contract, and coordination of multidisciplinary design teams and stakeholders.',
        'On site, TEKNICON runs construction supervision, site meetings and progress reporting, reviews contractor submissions and interim payment certificates, and carries the project through final inspections, practical completion and the Defects Liability Period.'
      ],
      scope: [
        'Project planning, appraisal and implementation support',
        'Contract administration',
        'Tender evaluation and reporting',
        'Site supervision, quality control and progress reporting',
        'Payment certification, completion and defects-liability support'
      ],
      deliverables: [
        'Tender evaluation reports',
        'Site meetings and progress reports',
        'Review of contractor submissions',
        'Review of interim payment certificates',
        'Final inspections and practical completion support',
        'Defects monitoring through the Defects Liability Period'
      ],
      sectors: ['government', 'buildings', 'health-education', 'industrial', 'mining'],
      projects: ['tra-ita-hotel-mikocheni', 'mnekezi-tsf2', 'kibongoto-hospital-laboratory', 'zmt-workshop-hardstand', 'msd-warehouse-mbeya', 'new-mpanda-bus-terminal', 'storage-warehouse-kigali'],
      image: '/img/site-supervision-crew.jpg',
      w: 808, h: 611,
      alt: 'A crew of about a dozen workers in hard hats and high-visibility vests unrolling a large roll of black geomembrane liner across a prepared earthworks platform',
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
/*
  The full project register — every project named in BRIEF §5, with the scope wording
  of BRIEF §5.1. Each one gets its own page at /projects/<slug>.

  Fields:
    title, place    — as the profile names them. `area` is the coarser value the
                      location filter groups by; it is never more specific than the source.
    category        — one of projectCategories (the IA's three project groups)
    client          — as named; TBC where the profile does not say
    scope           — BRIEF §5.1, verbatim in substance; TBC where "not stated"
    facts           — short figures the profile gives (span, length, storeys)
    value           — contract value "if publishable" (IA). Only TRA ITA's is in the
                      source. Set to null to leave a project's value off for good.
    year, status    — in NEITHER source for any project. Client input.
    services        — slugs into services.items, following the scope: a commission that
                      includes design gets the design service, one with supervision gets
                      project management, and so on. Empty where scope is not stated.
    sectors         — slugs into sectors.items
    image           — only where docs/image-manifest.json ties a photograph to THIS
                      project. A project with no photograph of its own gets none: using
                      another project's image is exactly the defect REVIEW-1 caught.
    gallery         — further photographs of this project (the IA asks for a gallery on
                      every project page). Fill with [{ src, w, h, alt, caption }], and
                      add each file to docs/image-manifest.json first. Set to null to
                      leave a project without one.
    caseStudy       — the IA's "fuller page for priority projects". The narrative does not
                      exist in any source (ROADMAP P3-4) — client interviews needed.
*/
const SV = {
  design: 'engineering-design-consultancy',
  structural: 'structural-bridge-engineering',
  civil: 'civil-engineering-infrastructure',
  water: 'water-dams-mining-infrastructure',
  pm: 'project-management-construction-supervision'
}

export const projectCategories = [
  { slug: 'buildings', name: 'Buildings & Facilities', blurb: 'Commercial, industrial, residential, health, warehouse and institutional developments.' },
  { slug: 'transport', name: 'Transport & Urban Infrastructure', blurb: 'Bridges, roads, terminals, hardstands, pedestrian infrastructure and related works.' },
  { slug: 'water', name: 'Water, Dams & Tailings Storage Facilities', blurb: 'Reservoirs, dams, irrigation, TSFs, river works and mining infrastructure.' }
]

/* The case-study narrative, one per featured project. Each field is a paragraph. */
const caseStudyTbc = () => ({
  challenge: tbc('Case study — the challenge: what made this project difficult or distinctive (client interview)'),
  solution: tbc('Case study — the solution: what Teknicon designed or did about it (client interview)'),
  outcome: tbc('Case study — the outcome: what was delivered, and any measurable result (client interview)')
})

export const projectList = [
  /* ================================================== Buildings & Facilities */
  {
    slug: 'tra-ita-hotel-mikocheni',
    title: 'TRA ITA Hotel Accommodation',
    place: 'Mikocheni, Dar es Salaam', area: 'Dar es Salaam',
    category: 'buildings',
    client: 'Tanzania Revenue Authority (TRA)',
    scope: 'Design and construction supervision',
    facts: ['7-storey building'],
    value: 'TZS 15.94 billion (VAT incl.)',
    year: TBC, status: TBC,
    gallery: null,
    services: [SV.design, SV.structural, SV.pm],
    sectors: ['buildings', 'government'],
    image: {
      src: '/img/projects/tra-ita-hotel-mikocheni.jpg', w: 1600, h: 899,
      alt: 'Architectural rendering of a seven-storey accommodation block with a green and white facade, red accent fins and deep balconies, framed by palm trees',
      caption: 'Architectural rendering, TRA ITA Hotel Accommodation, Mikocheni'
    },
    caseStudy: caseStudyTbc()
  },
  {
    slug: 'tra-regional-office-tanga',
    title: 'Rehabilitation of TRA Regional Office',
    place: 'Tanga', area: 'Tanga',
    category: 'buildings',
    client: 'Tanzania Revenue Authority (TRA)',
    scope: 'Design and construction supervision of the rehabilitation',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    image: {
      src: '/img/projects/tra-regional-office-tanga.jpg', w: 1562, h: 942,
      alt: 'Architectural rendering of a four-storey office building with a bright yellow projecting facade panel, glazed upper floors and cars parked at the entrance',
      caption: 'Architectural rendering of the rehabilitated TRA Regional Office, Tanga'
    },
    services: [SV.design, SV.structural, SV.pm],
    sectors: ['government', 'buildings']
  },
  {
    slug: 'uganda-high-commission-dodoma',
    title: 'Uganda High Commission',
    place: 'Dodoma', area: 'Dodoma',
    category: 'buildings',
    client: 'Government of Uganda',
    scope: 'Design',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    image: {
      src: '/img/projects/uganda-high-commission-dodoma.jpg', w: 1600, h: 852,
      alt: 'Architectural rendering of a curved, glass-fronted chancery building with flags at the entrance, behind a decorative fence and a landscaped street with cars and a cyclist',
      caption: 'Architectural rendering, Uganda High Commission, Dodoma'
    },
    services: [SV.design, SV.structural],
    sectors: ['government', 'buildings']
  },
  {
    slug: 'binguni-hospital-zanzibar',
    /* the profile's list calls it "Referral and Teaching College Hospital"; the
       rendering itself is labelled Binguni, which is how the site has always named it */
    title: 'Binguni Referral and Teaching Hospital',
    place: 'Binguni, Zanzibar', area: 'Zanzibar',   /* PDF p17 */
    category: 'buildings',
    client: 'Government of Zanzibar, Ministry of Health',
    scope: 'Design',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    services: [SV.design, SV.structural],
    sectors: ['health-education', 'government'],
    image: {
      src: '/img/projects/binguni-hospital-zanzibar.jpg', w: 1600, h: 953,
      alt: 'Aerial masterplan rendering of a hospital campus, with a large main block surrounded by ancillary buildings, roads, parking and landscaped lawns',
      caption: 'Masterplan rendering, Binguni Referral and Teaching Hospital'
    }
  },
  {
    slug: 'kibongoto-hospital-laboratory',
    title: 'Kibong’oto Hospital New Laboratory',
    place: 'Kilimanjaro Region', area: 'Kilimanjaro',   /* PDF p18 */
    category: 'buildings',
    client: 'Government of Tanzania, Ministry of Health',
    scope: 'Design and construction supervision',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    services: [SV.design, SV.structural, SV.pm],
    sectors: ['health-education', 'government'],
    image: {
      src: '/img/projects/kibongoto-hospital-laboratory.jpg', w: 1600, h: 1038,
      alt: 'A completed four-storey laboratory building in white render with dark glazing and an orange feature panel, fronted by a paved forecourt and a circular lawn with a young tree',
      caption: 'The completed laboratory, Kibong’oto Hospital'
    }
  },
  {
    slug: 'zmt-workshop-hardstand',
    title: 'ZMT Workshop, Service Building and Container Hardstand',
    place: 'Zanzibar', area: 'Zanzibar',
    category: 'buildings',
    client: 'Zanzibar Multipurpose Terminal (ZMT)',
    scope: 'Design and construction supervision',
    facts: ['Workshop, service building and hardstand for container storage'],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    services: [SV.design, SV.structural, SV.civil, SV.pm],
    sectors: ['industrial', 'transport'],
    image: {
      src: '/img/projects/zmt-workshop-hardstand.jpg', w: 1600, h: 943,
      alt: 'Drone view of a container storage yard with rows of stacked shipping containers on a paved hardstand, alongside red-roofed workshop and service buildings',
      caption: 'Container storage hardstand, workshop and service buildings, Zanzibar Multipurpose Terminal'
    }
  },
  {
    slug: 'tobacco-processing-plant-morogoro',
    title: 'Tobacco Processing Plant Expansion',
    place: 'Morogoro', area: 'Morogoro',
    category: 'buildings',
    client: 'Tanzania Tobacco Processors Ltd',
    scope: 'Design and construction supervision of the expansion',   /* PDF p18 */
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    services: [SV.design, SV.structural, SV.pm],
    sectors: ['industrial'],
    image: {
      src: '/img/projects/tobacco-processing-plant-morogoro.jpg', w: 1600, h: 943,
      alt: 'A steel portal-frame building under erection, with a mobile crane lifting a rafter into place and workers on scaffolding securing the steelwork',
      caption: 'Structural steelwork erection for the plant expansion, Morogoro'
    }
  },
  {
    slug: 'royal-soap-industrial-building',
    title: 'Royal Soap Industrial Building',
    place: 'Ubungo, Dar es Salaam', area: 'Dar es Salaam',
    category: 'buildings',
    client: 'METL',   /* PDF p20 */
    scope: 'Design and construction supervision',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    image: {
      src: '/img/projects/royal-soap-industrial-building.jpg', w: 884, h: 1147,
      alt: 'A multi-storey industrial building clad in blue panels beside a tall cylindrical tower with a red-roofed top, with workers and timber crates at its base',
      caption: 'Royal Soap Industrial Building, Ubungo'
    },
    services: [SV.design, SV.structural, SV.pm],
    sectors: ['industrial', 'buildings']
  },
  {
    slug: 'oysterbay-residential-apartments',
    title: 'Residential Apartments',
    place: 'Oysterbay, Dar es Salaam', area: 'Dar es Salaam',
    category: 'buildings',
    client: TBC,
    scope: 'Design and construction supervision',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    image: {
      src: '/img/projects/oysterbay-residential-apartments.jpg', w: 904, h: 1126,
      alt: 'Two architectural renderings of modern flat-roofed white residential buildings: an aerial view of a terraced block with rooftop terraces and gardens, and a two-storey house with a lawn and a pool',
      caption: 'Architectural renderings, Residential Apartments, Oysterbay'
    },
    services: [SV.design, SV.structural, SV.pm],
    sectors: ['buildings']
  },
  {
    slug: 'msd-warehouse-keko',
    title: 'MSD Storage Warehouse',
    place: 'Keko, Dar es Salaam', area: 'Dar es Salaam',
    category: 'buildings',
    client: 'Tanzania Medical Store Department (MSD)',
    funder: 'USAID',
    scope: 'Design and construction supervision',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    services: [SV.design, SV.structural, SV.pm],
    sectors: ['health-education', 'industrial'],
    image: {
      src: '/img/projects/msd-warehouse-keko.jpg', w: 1428, h: 842,
      alt: 'A completed white medical storage warehouse with MSD branding, with MSD delivery trucks at the loading bays and a paved yard in the foreground',
      caption: 'The completed MSD Storage Warehouse, Keko'
    }
  },
  {
    slug: 'msd-warehouse-mbeya',
    title: 'MSD Storage Warehouse',
    place: 'Mbeya', area: 'Mbeya',
    category: 'buildings',
    client: 'Tanzania Medical Store Department (MSD)',
    funder: 'USAID and the Global Fund',   /* PDF p23 */
    scope: 'Design and construction supervision',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    image: {
      src: '/img/projects/msd-warehouse-mbeya.jpg', w: 1406, h: 872,
      alt: 'A completed white storage warehouse with MSD branding and numbered loading bays, fronted by a wide block-paved yard',
      caption: 'The completed MSD Storage Warehouse, Mbeya'
    },
    services: [SV.design, SV.structural, SV.pm],
    sectors: ['health-education', 'industrial']
  },
  {
    slug: 'storage-warehouse-kigali',
    title: 'Storage Warehouse',
    place: 'Kigali, Rwanda', area: 'Rwanda',
    category: 'buildings',
    client: 'Ministry of Health, Kigali, Rwanda',
    funder: 'USAID and the Global Fund',
    scope: 'Design and construction supervision',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    image: {
      src: '/img/projects/storage-warehouse-kigali.jpg', w: 1600, h: 943,
      alt: 'A long white warehouse signed MPPD Warehouse Kigali, with canopied loading doors and a concrete yard lined with yellow and black bollards',
      caption: 'The completed Medical Storage Warehouse, Kigali'
    },
    services: [SV.design, SV.structural, SV.pm],
    sectors: ['health-education', 'industrial']
  },
  {
    slug: 'lafarge-bulk-loading-mbeya',
    title: 'Bulk Cement Loading System, Lafarge Cement Factory',
    place: 'Mbeya', area: 'Mbeya',
    category: 'buildings',
    client: TBC,
    scope: 'Design and construction supervision',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    image: {
      src: '/img/projects/lafarge-bulk-loading-mbeya.jpg', w: 1600, h: 947,
      alt: 'A tall concrete loading tower beside a steel gantry and conveyor bridge at a cement factory, with workers in high-visibility vests at the base',
      caption: 'The bulk cement loading system, Lafarge Cement Factory, Mbeya'
    },
    services: [SV.design, SV.structural, SV.pm],
    sectors: ['industrial']
  },
  {
    slug: 'gsm-steelwork-coca-cola-road',
    title: '55 m Span Steelwork Structure',
    place: 'Coca-Cola Road, Dar es Salaam', area: 'Dar es Salaam',
    category: 'buildings',
    client: 'GSM Ltd',
    scope: 'Design and construction supervision',   /* PDF p22 */
    facts: ['55 m span'],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    image: {
      src: '/img/projects/gsm-steelwork-coca-cola-road.jpg', w: 1600, h: 964,
      alt: 'The interior of a long-span steel-framed warehouse with roof lights, stacked cartons and a worker in a hard hat and high-visibility vest in the foreground',
      caption: 'Inside the 55 m span steelwork structure, Coca-Cola Road'
    },
    services: [SV.design, SV.structural, SV.pm],
    sectors: ['industrial']
  },

  /* ========================================= Transport & Urban Infrastructure */
  {
    slug: 'new-nanyumbu-bus-terminal',
    title: 'New Nanyumbu Bus Terminal',
    place: 'Nanyumbu', area: 'Nanyumbu',
    category: 'transport',
    client: 'Nanyumbu Town Municipal Council',
    scope: 'Design and construction supervision',   /* PDF p24 */
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    image: {
      src: '/img/projects/new-nanyumbu-bus-terminal.jpg', w: 1600, h: 828,
      alt: 'Aerial rendering of a bus terminal with blue-roofed terminal buildings, marked bus bays, parking and a landscaped forecourt beside a main road',
      caption: 'Aerial rendering, New Nanyumbu Bus Terminal'
    },
    services: [SV.design, SV.structural, SV.civil, SV.pm],
    sectors: ['transport', 'government']
  },
  {
    slug: 'zimbili-bridge',
    title: 'Zimbili Bridge',
    place: 'Dar es Salaam', area: 'Dar es Salaam',
    category: 'transport',
    client: 'Ilala Municipal Council',
    programme: 'Dar es Salaam Metropolitan Development Project (DMDP)',
    scope: 'Feasibility study, design and construction supervision',
    facts: ['40 m span'],
    value: TBC, year: TBC, status: TBC,
    gallery: [
      { src: '/img/projects/zimbili-bridge-1.jpg', w: 1266, h: 740,
        alt: 'Engineers and site staff in hard hats and high-visibility vests standing on a reinforcement mat, reviewing a set of construction drawings together',
        caption: 'Reviewing the drawings on the deck reinforcement' }
    ],
    services: [SV.design, SV.structural, SV.pm],
    sectors: ['transport', 'government'],
    image: {
      src: '/img/projects/zimbili-bridge.jpg', w: 1293, h: 756,
      alt: 'A bridge under construction over a river bed, with formwork and reinforcement on the deck, workers along the top and a wheel loader working in the foreground',
      caption: 'Zimbili Bridge under construction'
    },
    caseStudy: caseStudyTbc()
  },
  {
    slug: 'ulongoni-bridge',
    title: 'Ulongoni Bridge',
    place: 'Dar es Salaam', area: 'Dar es Salaam',
    category: 'transport',
    client: 'Ilala Municipal Council',
    programme: 'Dar es Salaam Metropolitan Development Project (DMDP)',
    scope: 'Feasibility study, design and construction supervision',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    services: [SV.design, SV.structural, SV.pm],
    sectors: ['transport', 'government'],
    image: {
      src: '/img/projects/ulongoni-bridge.jpg', w: 1600, h: 828,
      alt: 'A reinforced concrete bridge under construction across a sandy river channel, with a concrete apron, workers on the deck, a roller and a loader, and a densely built hillside settlement behind',
      caption: 'Ulongoni Bridge under construction'
    }
  },
  {
    slug: 'tiper-gantry-hardstand',
    title: 'TIPER Gantry Production Centre Hardstand',
    place: 'TIPER yards, Dar es Salaam', area: 'Dar es Salaam',   /* PDF p24 */
    category: 'transport',
    client: 'Tanzania International Petroleum Reserves (TIPER)',
    scope: 'Feasibility study, detailed design and construction supervision',
    facts: ['Rigid pavement hardstand for heavy-duty fuel truck parking'],
    /* the Word profile read "covering a total area of xxxx"; the designed PDF drops the
       clause entirely, so no area is claimed. Add `area_m2: '… m²'` if the client has it. */
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    services: [SV.design, SV.civil, SV.pm],
    sectors: ['industrial', 'transport'],
    image: {
      src: '/img/project-tiper-hardstand.jpg', w: 1646, h: 602,
      alt: 'A concrete boom pump placing concrete for a rigid pavement slab inside a fuel depot, with a mixer truck, a team of workers in high-visibility vests and rows of bulk storage tanks behind',
      caption: 'Placing the rigid pavement hardstand'
    }
  },
  {
    slug: 'rau-bridge-moshi',
    title: 'Rau Bridge',
    place: 'Rau Madukani – Mamboleo – Materuni Road, Moshi', area: 'Moshi',
    category: 'transport',
    client: 'TARURA',
    scope: 'Feasibility study, detailed engineering design and preparation of tender documents',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    image: {
      src: '/img/projects/rau-bridge-moshi.jpg', w: 1600, h: 824,
      alt: 'A completed road bridge with concrete parapets and steel guardrails carrying a sealed road through dense green vegetation, overlaid with the words Daraja la Rau',
      caption: 'Rau Bridge, Moshi'
    },
    services: [SV.design, SV.structural],
    sectors: ['transport']
  },
  {
    slug: 'new-mpanda-bus-terminal',
    title: 'New Mpanda Bus Terminal',
    place: 'Mpanda', area: 'Mpanda',
    category: 'transport',
    client: 'Mpanda Town Municipal Council',
    scope: 'Design and construction supervision',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    image: {
      src: '/img/projects/new-mpanda-bus-terminal.jpg', w: 1600, h: 827,
      alt: 'Architectural rendering of a bus terminal forecourt with coaches parked in bays, passengers walking across block paving and the terminal building behind',
      caption: 'Architectural rendering, New Mpanda Bus Terminal'
    },
    services: [SV.design, SV.structural, SV.civil, SV.pm],
    sectors: ['transport', 'government']
  },
  {
    slug: 'wenda-mgama-road',
    title: 'Wenda–Mgama Road Upgrading',
    place: 'Iringa District, Ihemi Cluster', area: 'Iringa',
    category: 'transport',
    client: 'TARURA',
    scope: 'Feasibility study, detailed engineering design and preparation of tender documents, for upgrading to an appropriate sealing standard',
    facts: ['19 km'],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    services: [SV.design, SV.civil],
    sectors: ['transport'],
    image: {
      src: '/img/projects/wenda-mgama-road.jpg', w: 1600, h: 813,
      alt: 'Two engineers in yellow high-visibility vests, one printed Teknicon Ltd, taking notes on a clipboard during a route survey in open bush country',
      caption: 'Route survey during the feasibility study'
    }
  },
  {
    slug: 'mtili-ifwagi-mkuta-road',
    title: 'Mtili–Ifwagi–Mkuta Road Upgrading',
    place: 'Mufindi District, Ihemi Cluster', area: 'Mufindi',
    category: 'transport',
    client: 'TARURA',
    scope: 'Feasibility study, detailed engineering design and preparation of tender documents, for upgrading to an appropriate sealing standard',
    facts: ['14 km'],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    services: [SV.design, SV.civil],
    sectors: ['transport']
  },
  {
    slug: 'furahisha-pedestrian-flyover',
    title: 'Furahisha Pedestrian Flyover Composite Bridge',
    place: 'Mwanza Region', area: 'Mwanza',
    category: 'transport',
    client: TBC,
    partner: 'Advanced Engineering Solutions Ltd',
    scope: 'Design and construction supervision, including the additional lane from Furahisha to Ghana',
    facts: ['0.723 km'],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    image: {
      src: '/img/projects/furahisha-pedestrian-flyover.jpg', w: 1600, h: 952,
      alt: 'Rendering of a white cable-stayed pedestrian flyover with a curved blue deck and stair access, spanning a road with buses passing beneath',
      caption: 'Rendering, Furahisha Pedestrian Flyover Composite Bridge'
    },
    services: [SV.design, SV.structural, SV.pm],
    sectors: ['transport']
  },
  {
    slug: 'matomondo-mlale-road',
    title: 'Matomondo–Mlale Road Upgrading',
    place: 'Songea District', area: 'Songea',
    category: 'transport',
    client: TBC,
    partner: 'Advanced Engineering Solutions Ltd',
    scope: 'Feasibility study, Environmental and Social Impact Assessment (ESIA), detailed engineering design and preparation of tender documents, for upgrading to bitumen standard',
    facts: ['23 km'],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    image: {
      src: '/img/projects/matomondo-mlale-road.jpg', w: 1424, h: 704,
      alt: 'A wide unsealed gravel road running straight between roadside trees and vegetation under an overcast sky',
      caption: 'The Matomondo–Mlale road before upgrading'
    },
    services: [SV.design, SV.civil],
    sectors: ['transport']
  },
  {
    slug: 'mnekezi-lwamgasa-road-diversion',
    title: 'Mnekezi–Lwamgasa Gravel Road Diversion',
    place: 'Katoro–Lwamgasa road, Geita Region', area: 'Geita',
    category: 'transport',
    client: 'TARURA / Buckreef Gold Company',
    scope: 'Design and construction supervision, including a box culvert and several pipe culverts',
    facts: ['8.6 km'],
    value: TBC, year: TBC, status: TBC,
    gallery: [
      { src: '/img/projects/mnekezi-lwamgasa-road-diversion-1.jpg', w: 1330, h: 884,
        alt: 'A freshly graded gravel road junction with earthworks and excavated soil, a small site office and a green direction sign at the roadside',
        caption: 'Earthworks at the junction of the diversion' }
    ],
    services: [SV.design, SV.civil, SV.pm],
    sectors: ['transport', 'mining'],
    image: {
      src: '/img/project-mnekezi-box-culvert.jpg', w: 1571, h: 1178, crop: true,
      alt: 'A completed three-cell reinforced concrete box culvert carrying a gravel road with steel guardrails over a stream',
      caption: 'Box culvert on the Mnekezi–Lwamgasa diversion'
    }
  },
  {
    slug: 'mnekezi-helipad',
    title: 'Helicopter Pad',
    place: 'Mnekezi Village, Geita Region', area: 'Geita',
    category: 'transport',
    client: 'Buckreef Gold Company',
    scope: 'Design and construction supervision',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: null,
    image: {
      src: '/img/projects/mnekezi-helipad.jpg', w: 1600, h: 1003,
      alt: 'A concrete helicopter landing pad marked with a white H inside a yellow circle, with a gravel road behind',
      caption: 'The completed helicopter pad, Mnekezi Village'
    },
    services: [SV.design, SV.civil, SV.pm],
    sectors: ['mining', 'transport']
  },

  /* =============================== Water, Dams & Tailings Storage Facilities */
  {
    slug: 'new-luika-150ml-reservoir',
    title: '150 ML Water Reservoir',
    place: 'New Luika Gold Mine, Songwe Region', area: 'Songwe',
    category: 'water',
    client: 'Shanta Mining Company Ltd',
    scope: 'Design and construction supervision',
    facts: ['150 ML'],
    value: TBC, year: TBC, status: TBC,
    gallery: [
      { src: '/img/projects/new-luika-150ml-reservoir-1.jpg', w: 1600, h: 860,
        alt: 'The crest of an earth embankment under construction, with a rockfill slope on one side and a compacted access track along the top',
        caption: 'The reservoir embankment under construction' }
    ],
    image: {
      src: '/img/projects/new-luika-150ml-reservoir.jpg', w: 1600, h: 813,
      alt: 'A reservoir impounding water at the foot of a forested hill, seen from the crest of its embankment',
      caption: 'The 150 ML water reservoir, New Luika Gold Mine'
    },
    services: [SV.design, SV.water, SV.pm],
    sectors: ['water-agriculture', 'mining']
  },
  {
    slug: 'new-luika-350ml-masonry-dam',
    title: '350 ML Masonry Water Dam',
    place: 'New Luika Gold Mine, Songwe Region', area: 'Songwe',
    category: 'water',
    client: 'Shanta Mining Company Ltd',
    scope: 'Design and construction supervision',
    facts: ['350 ML', 'Across the Luika River'],
    value: TBC, year: TBC, status: TBC,
    gallery: [
      { src: '/img/projects/new-luika-350ml-masonry-dam-1.jpg', w: 1600, h: 975,
        alt: 'A reinforced concrete outlet structure housing two steel sluice gates with chain hoists, set into a masonry wall, with workers in orange overalls and hard hats',
        caption: 'The outlet gate structure' }
    ],
    services: [SV.design, SV.water, SV.pm],
    sectors: ['water-agriculture', 'mining'],
    image: {
      src: '/img/projects/new-luika-350ml-masonry-dam.jpg', w: 1600, h: 984,
      alt: 'A masonry water dam under construction, with a large crew in orange overalls working along the sloping masonry face, a concrete outlet structure and the impounded water beyond',
      caption: 'The masonry dam under construction across the Luika River'
    }
  },
  {
    slug: 'new-luika-tsf2',
    title: 'TSF2, Phases 1 to 3B',
    place: 'New Luika Gold Mine, Songwe Region', area: 'Songwe',
    category: 'water',
    client: 'Shanta Mining Company Ltd',
    scope: 'Design review and construction supervision of Phases 1, 2A and 2B; design and construction supervision of Phase 3; construction supervision of Phase 3B',
    facts: ['Five phases: 1, 2A, 2B, 3 and 3B'],
    value: TBC, year: TBC, status: TBC,
    gallery: [
      { src: '/img/projects/new-luika-tsf2-1.jpg', w: 1558, h: 932,
        alt: 'Aerial view of a lined tailings storage facility with a rockfill perimeter embankment, tailings and ponded water in the basin, set among forested hills',
        caption: 'TSF2 Phase 3 from the air' },
      { src: '/img/projects/new-luika-tsf2-2.jpg', w: 1600, h: 778,
        alt: 'A wide basin being shaped by earthmoving machinery at the foot of a forested mountain',
        caption: 'Basin earthworks, TSF2 Phase 1' },
      { src: '/img/projects/new-luika-tsf2-3.jpg', w: 1600, h: 778,
        alt: 'A geomembrane-lined embankment slope running along the edge of a prepared basin under a cloudy sky, with a mountain behind',
        caption: 'Lined basin, TSF2 Phase 1' },
      { src: '/img/projects/new-luika-tsf2-4.jpg', w: 1600, h: 926,
        alt: 'Rolled and overlapped geomembrane sheets lining a long embankment slope, with a drainage pipe running along the seam',
        caption: 'Geomembrane lining, TSF2 Phase 2B' },
      { src: '/img/projects/new-luika-tsf2-5.jpg', w: 1546, h: 1014,
        alt: 'A tailings basin filled with pale grey tailings, bounded by a geomembrane-lined embankment slope',
        caption: 'Tailings deposition, TSF2 Phase 2B' },
      { src: '/img/projects/new-luika-tsf2-6.jpg', w: 1600, h: 981,
        alt: 'A geomembrane-lined tailings cell with a pipeline along the embankment crest and an excavator and a vehicle working beyond',
        caption: 'Construction supervision, TSF2 Phase 3B' }
    ],
    services: [SV.design, SV.water, SV.pm],
    sectors: ['mining'],
    image: {
      src: '/img/hero-tsf-embankment-luika.jpg', w: 1467, h: 964,
      alt: 'A yellow vibrating roller compacting the crest of a rockfill tailings embankment under a deep blue sky at a gold mine site',
      caption: 'Embankment construction, TSF2 Phase 3'
    },
    caseStudy: caseStudyTbc()
  },
  {
    slug: 'new-luika-energy-dissipater',
    title: 'Energy Dissipater, TSF2 Supernatant Water',
    place: 'New Luika Gold Mine, Songwe Region', area: 'Songwe',
    category: 'water',
    client: 'Shanta Mining Company Ltd',
    scope: 'Design and construction supervision',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: [
      { src: '/img/projects/new-luika-energy-dissipater-1.jpg', w: 1600, h: 984,
        alt: 'A green water-filled concrete stilling basin with gabion retaining walls and a pipe outfall, below a rockfill embankment under a blue sky',
        caption: 'The stilling basin and gabion walls' }
    ],
    services: [SV.design, SV.water, SV.pm],
    sectors: ['mining', 'water-agriculture'],
    image: {
      src: '/img/projects/new-luika-energy-dissipater.jpg', w: 1600, h: 930,
      alt: 'A concrete-lined stilling basin filled with water, fed by a pipe outfall discharging through a gabion retaining wall, with a rockfill embankment behind',
      caption: 'The energy dissipater in operation'
    }
  },
  {
    slug: 'mnekezi-tsf2',
    title: 'TSF2, Cells 1 and 2',
    place: 'Mnekezi, Geita Region', area: 'Geita',
    category: 'water',
    client: 'Buckreef Gold Company Ltd',
    scope: 'Design and construction supervision of Cell 1, Cell 2 and Cell 2 Phase 2',
    facts: ['Cell 1, Cell 2 and Cell 2 Phase 2'],
    value: TBC, year: TBC, status: TBC,
    gallery: [
      { src: '/img/projects/mnekezi-tsf2-1.jpg', w: 1600, h: 894,
        alt: 'A wide compacted earth access road curving around the edge of a geomembrane-lined cell',
        caption: 'Perimeter access road and lined cell, TSF2 Cell 1' },
      { src: '/img/projects/mnekezi-tsf2-2.jpg', w: 1444, h: 860,
        alt: 'A single-drum roller compacting a prepared earth platform beside a partly lined cell',
        caption: 'Compaction, TSF2 Cell 2' },
      { src: '/img/projects/mnekezi-tsf2-3.jpg', w: 1322, h: 828,
        alt: 'Workers laying a drainage pipe in a gravel-filled trench between geotextile-covered slopes inside a lined cell',
        caption: 'Underdrain installation, TSF2 Cell 2' },
      { src: '/img/projects/mnekezi-tsf2-4.jpg', w: 1316, h: 894,
        alt: 'A rockfill embankment beside a geomembrane-lined slope, with a backhoe loader working on the crest',
        caption: 'Embankment and liner, TSF2 Cell 2 Phase 2' },
      { src: '/img/projects/mnekezi-tsf2-5.jpg', w: 1460, h: 876,
        alt: 'A geomembrane-lined tailings cell with deposited tailings in the basin and a pipeline along the crest',
        caption: 'The lined cell, TSF2 Cell 2 Phase 2' }
    ],
    services: [SV.design, SV.water, SV.pm],
    sectors: ['mining'],
    image: {
      src: '/img/projects/mnekezi-tsf2.jpg', w: 1526, h: 958,
      alt: 'A crew of about a dozen workers in hard hats and high-visibility vests unrolling a large roll of black geomembrane liner across a prepared earthworks platform',
      caption: 'Geomembrane liner installation, TSF2 Cell 1'
    }
  },
  {
    slug: 'ikungi-tsf1',
    title: 'TSF1',
    place: 'Ikungi, Singida Region', area: 'Singida',
    category: 'water',
    client: 'Shanta Mining Company Ltd',
    scope: 'Design and construction supervision of Phase 1; construction supervision of Phase 2',
    facts: ['Phases 1 and 2'],
    value: TBC, year: TBC, status: TBC,
    gallery: [
      { src: '/img/projects/ikungi-tsf1-1.jpg', w: 1600, h: 1004,
        alt: 'Reinforcement cages and a vertical pipe riser set in a deep excavated trench',
        caption: 'Reinforced concrete works, TSF1 Phase 1' },
      { src: '/img/projects/ikungi-tsf1-2.jpg', w: 1320, h: 758,
        alt: 'A rockfill embankment under construction with a pipeline laid along it and haul trucks working in the distance',
        caption: 'Embankment construction, TSF1 Phase 2' },
      { src: '/img/projects/ikungi-tsf1-3.jpg', w: 1460, h: 872,
        alt: 'An articulated dump truck carrying rock across a flat earth platform under a clear blue sky',
        caption: 'Haulage, TSF1 Phase 2' }
    ],
    image: {
      src: '/img/projects/ikungi-tsf1.jpg', w: 1600, h: 1020,
      alt: 'Aerial view of a tailings storage facility under construction, with an orange earth basin inside a grey perimeter embankment and haul roads',
      caption: 'TSF1 Phase 1 from the air'
    },
    services: [SV.design, SV.water, SV.pm],
    sectors: ['mining']
  },
  {
    slug: 'matongo-tsf1',
    title: 'TSF1 Phase 1',
    place: 'Matongo, Tarime District', area: 'Tarime',
    category: 'water',
    client: 'Matongo Gold Mine Ltd',
    scope: 'Design and construction supervision',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: [
      { src: '/img/projects/matongo-tsf1-1.jpg', w: 1444, h: 882,
        alt: 'A loaded orange dump truck crossing a prepared earth platform, with hills and rooftops beyond',
        caption: 'Haulage during the earthworks' }
    ],
    image: {
      src: '/img/projects/matongo-tsf1.jpg', w: 1070, h: 728,
      alt: 'A wide area of earthworks under way, with a dump truck in the middle distance and green hills on the horizon',
      caption: 'Earthworks, TSF1 Phase 1, Matongo'
    },
    services: [SV.design, SV.water, SV.pm],
    sectors: ['mining']
  },
  {
    slug: 'mwaoga-tsf1',
    title: 'TSF1',
    place: 'Mwaoga Village, Chunya District, Mbeya Region', area: 'Mbeya',
    category: 'water',
    client: 'Anglo de Beers Tanzania Ltd',
    scope: 'Design review and construction supervision',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: [
      { src: '/img/projects/mwaoga-tsf1-1.jpg', w: 1274, h: 980,
        alt: 'A red pump and valve assembly connected to black pipework, mounted on timber on a geomembrane-lined basin floor',
        caption: 'Pumping equipment on the lined basin' }
    ],
    services: [SV.water, SV.pm],
    sectors: ['mining'],
    image: {
      src: '/img/project-tsf-liner-mwaoga.jpg', w: 1521, h: 1140, crop: true,
      alt: 'A wide tailings storage facility basin fully lined with geomembrane, with three workers kneeling on the liner in the middle distance and forested hills on the horizon',
      caption: 'Geomembrane lining, TSF1 at Mwaoga Village'
    }
  },
  {
    slug: 'river-nyamazovu-training',
    title: 'Relocation and Training of River Nyamazovu',
    place: 'Mnekezi, Geita Region', area: 'Geita',
    category: 'water',
    client: 'Buckreef Gold Company Ltd',
    scope: 'Design and construction supervision',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: [
      { src: '/img/projects/river-nyamazovu-training-1.jpg', w: 1476, h: 828,
        alt: 'A freshly excavated river channel with steep earth banks and muddy water running along its bed',
        caption: 'Excavating the new river channel' },
      { src: '/img/projects/river-nyamazovu-training-2.jpg', w: 1476, h: 828,
        alt: 'Water flowing past a stone-filled gabion retaining wall and rock-armoured bank',
        caption: 'Gabion revetment along the trained channel' }
    ],
    services: [SV.design, SV.water, SV.civil, SV.pm],
    sectors: ['mining', 'water-agriculture'],
    image: {
      src: '/img/project-nyamazovu-river-training.jpg', w: 1509, h: 904,
      alt: 'A trained river channel carrying water between two banks faced with stone-filled gabion revetment, under an overcast sky in open bush country',
      caption: 'The relocated and trained river channel'
    }
  },
  {
    slug: 'ifakara-water-supply-irrigation',
    title: 'Water Supply & Irrigation Scheme',
    place: 'Ifakara, Kilombero District, Morogoro Region', area: 'Morogoro',
    category: 'water',
    client: 'Kilombero Plantation Ltd',
    scope: 'Design and supervision of construction, including auxiliary structures',
    facts: [],
    value: TBC, year: TBC, status: TBC,
    gallery: [
      { src: '/img/projects/ifakara-water-supply-irrigation-1.jpg', w: 887, h: 564,
        alt: 'A long straight irrigation canal lined with black geomembrane and filled with water, between cultivated fields',
        caption: 'A geomembrane-lined irrigation canal' },
      { src: '/img/projects/ifakara-water-supply-irrigation-2.jpg', w: 887, h: 564,
        alt: 'A concrete-lined canal with a steel footbridge in the foreground, running towards a green-roofed pump house on open plains',
        caption: 'Concrete-lined canal and pump house' }
    ],
    services: [SV.design, SV.water, SV.civil, SV.pm],
    sectors: ['water-agriculture'],
    image: {
      src: '/img/project-kilombero-pump-station.jpg', w: 1600, h: 1200,
      alt: 'A pump station under construction beside an open water channel, with a bank of six pumps and galvanised suction pipes feeding a common delivery manifold, and workers commissioning the units',
      caption: 'Pump station, Water Supply and Irrigation Scheme'
    }
  }
]

/* Section copy for the projects index and the Home teaser. `featured` is the order the
   photographed projects appear in on Home (the first six) — unchanged from Phase 1. */
export const projects = {
  eyebrow: 'Selected work',
  title: ['Projects on the ground'],
  footnote: 'Over forty named projects, for clients across Tanzania, Rwanda, Uganda and Zanzibar.',
  featured: [
    'tra-ita-hotel-mikocheni',
    'binguni-hospital-zanzibar',
    'msd-warehouse-keko',
    'zimbili-bridge',
    'tiper-gantry-hardstand',
    'mnekezi-lwamgasa-road-diversion',
    'new-luika-350ml-masonry-dam',
    'mwaoga-tsf1',
    'mnekezi-tsf2'
  ],
  caseStudies: {
    eyebrow: 'Featured case studies',
    title: ['Three projects,', 'in more depth']
  },
  register: {
    eyebrow: 'All projects',
    title: ['The full register'],
    lede: 'Every project named in the company profile. Filter by type, sector, service or location.',
    empty: 'No project matches all of those filters.'
  },
  /* notes for bare TBC fields on a project page, which carry no note of their own */
  tbcNotes: {
    year: 'Year of completion (or start, if ongoing)',
    status: 'Completed or ongoing',
    value: 'Project value, if the client permits publishing it — otherwise set to null',
    gallery: 'Further photographs of this project, with captions',
    client: 'Client name, if the client permits publishing it'
  },
  /* labels for the fact rows on a project page — a key with no label is not shown */
  labels: {
    client: 'Client',
    place: 'Location',
    year: 'Year',
    status: 'Status',
    scope: 'Services delivered',
    value: 'Project value',
    funder: 'Funded by',
    programme: 'Programme',
    partner: 'In association with',
    area_m2: 'Area'
  }
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
    /* real routes: the old '#contact' / '#clients' anchors predate routing, and
       '#clients' did not exist on most of the pages this panel appears on */
    button: { label: 'Request a proposal', to: '/contact' },
    /* was the Luika stilling basin — swapped once a near-identical frame of the same
       structure became hero slide 1, so the two would not read as a duplicate */
    image: '/img/project-mnekezi-box-culvert.jpg',
    w: 1571, h: 1178,
    alt: 'A reinforced concrete box culvert under construction on a gravel road diversion, with formwork in place and an excavator working alongside',
    focus: '50% 45%',
    crop: true
  },
  {
    /* not 'Clients & partners' — that is the Clients section's own eyebrow, and the
       two appear on the same page, which read as a duplicated heading */
    eyebrow: 'Our clients',
    title: 'Who do we work for?',
    note: 'TRA · TIPER · MSD · TARURA · Shanta · Buckreef',
    button: { label: 'See our clients', to: '/projects#clients' },
    image: '/img/project-tobacco-plant-morogoro.jpg',
    w: 1015, h: 768,
    alt: 'A steel portal-frame building under erection, with a mobile crane lifting a rafter into place and workers on ladders securing steelwork',
    focus: '50% 45%'
  }
]

/* ------------------------------------------------------- consult CTA */
/* The IA's "consultation call-to-action" that closes every service page. The button
   is the standard primary CTA (client comment C2: "Contact us"). */
export const consultCta = {
  eyebrow: 'Start a conversation',
  title: 'Have a project that needs this?',
  lede: 'Talk to a registered consulting engineer about scope, programme and fees.',
  secondary: { label: 'See the projects', to: '/projects' }
}

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
        /* our own domain: an internal route, not an external link */
        { label: company.web, to: '/', icon: 'globe' }
      ]
    },
    {
      heading: 'Follow',
      type: 'links',
      /* ROADMAP P0-2. The client has not supplied handles yet, and none appear anywhere
         in the company profile. Replace each TBC with the full profile URL — do not
         guess them. A handle left as TBC (or set to null) is simply not shown; the
         whole Follow block appears once at least one is real. */
      links: [
        { label: 'LinkedIn', href: tbc('LinkedIn company page URL'), icon: 'linkedin' },
        { label: 'Instagram', href: tbc('Instagram profile URL'), icon: 'instagram' },
        { label: 'Facebook', href: tbc('Facebook page URL'), icon: 'facebook' },
        { label: 'X', href: tbc('X (Twitter) profile URL'), icon: 'x' }
      ]
    }
  ],
  copyright: 'Teknicon Ltd © 2026. All rights reserved.',
  registrations: 'ERB LCF 122 · ACET 061 · TIN 108-536-756'
}

/* ------------------------------------------------------------ home intro */
/* IA section 1: "Brief introduction to Teknicon with a linked button to About us Page".
   A condensed version of the opening of profile p.4 — the full text lives on /about. */
export const homeIntro = {
  eyebrow: 'Who we are',
  title: ['A Tanzanian consulting practice,', 'registered and independent'],
  body: 'TEKNICON LTD is a multidisciplinary local consultancy firm, established in June 2009 and registered with the Engineers Registration Board as a Local Engineering Consulting Firm. Wholly owned by Tanzanian nationals and a member of the Association of Consulting Engineers Tanzania.',
  cta: { label: 'Find out more about Teknicon', to: '/about' }
}

/* --------------------------------------------------- organisation chart */
/*
  Client comment C3: staff are shown as POSITIONS, not named individuals. The 14 named
  personnel in BRIEF section 6 are internal reference only and must not be published.

  Recovered from the company profile PDF page 14, which holds the chart as live text
  plus 98 vector shapes (the .emf in the Word file is unreadable).

  NOTE FOR THE CLI–T: their chart shows four engineering clusters but only three HOD
  labels — the topmost cluster has no HOD box. Only the three labelled departments are
  reproduced here. See docs/ROADMAP.md section 7, Q6.
*/
export const orgChart = {
  eyebrow: 'Leadership & our team',
  title: ['Structured by discipline,', 'led by registered engineers'],
  lede: 'Teknicon is organised by position rather than by individual. Each technical department is led by a Head of Department and staffed by senior engineers, junior engineers and technicians.',
  root: 'Board of Directors',
  chief: 'Managing Director and CEO',
  directorates: [
    {
      title: 'Director of Technical Services',
      departments: [
        { title: 'HOD Structural and Bridges Eng.', staff: ['Senior Engineers', 'Junior Engineers', 'Technicians'] },
        { title: 'HOD Dams and Water Infrastructures', staff: ['Senior Engineers', 'Junior Engineers', 'Technicians'] },
        { title: 'HOD Civil & Highway Eng.', staff: ['Senior Engineers', 'Junior Engineers', 'Technicians'] }
      ]
    },
    {
      title: 'Director of Admin and Finance',
      roles: ['HR & Admin Manager', 'Accountant', 'Legal Officer (Company Secretary)', 'IT & Systems Administrator']
    }
  ],
  note: 'Individual staff names, qualifications and years of service are provided on request and in tender submissions.'
}

/* --------------------------------------------------------------- licences */
/* BRIEF section 7, verbatim. Every number is a statutory or professional registration. */
export const licences = {
  eyebrow: 'Licences & memberships',
  title: ['Registered, and', 'continuously compliant'],
  lede: 'TEKNICON maintains full, up-to-date statutory and professional registrations for consulting engineering in Tanzania.',
  items: [
    { name: 'Certificate of Incorporation (BRELA)', ref: '71672' },
    { name: 'VAT Registration (TRA)', ref: 'VRN 40-004932-P' },
    { name: 'Taxpayer Identification Number (TRA)', ref: 'TIN 108-536-756' },
    { name: 'Business Licence', ref: 'BL01396912025-2600017652', expires: '19 November 2026' },
    { name: 'Tax Clearance Certificate', ref: '131-0261-6147', expires: '31 December 2026' },
    { name: 'Engineers Registration Board (ERB)', ref: 'LCF 122 / Reg. No. 0122' },
    { name: 'ERB Annual Practising Licence 2026', ref: 'ERBT01341', expires: '31 December 2026' },
    { name: 'Association of Consulting Engineers Tanzania (ACET)', ref: '061' },
    { name: 'Occupational Safety and Health Authority (OSHA)', ref: '313-102-022' },
    { name: 'National Social Security Fund (NSSF)', ref: '1026954' }
  ],
  download: {
    label: 'Download the company profile',
    href: '/downloads/teknicon-company-profile.pdf',
    meta: 'PDF · 50 pages · 6.8 MB'
  }
}

/* ---------------------------------------------------------------- sectors */
/*
  The seven sectors are the client's own list, from the proposed IA section 5. A sector
  is who Teknicon serves; a service is what it does.

  One page for launch (ROADMAP §7 Q3). `slug` is the anchor on /sectors today
  (/sectors#mining) and is reserved as the page slug if a sector ever gets its own page.

  `evidence` is three project slugs from projectList — the sector's case is made by work
  already delivered, and each line links to that project's page.

  `description` (ROADMAP P4-2): "sector" is not a concept in the profile, so these are
  written ONLY from the projects, clients and scopes in BRIEF §5 — each sentence is a
  summary of named work, with no positioning claim the source does not make. The client
  may still want to reword them.
*/

export const sectors = {
  eyebrow: 'Sectors',
  title: ['Who we build for'],
  lede: 'A sector is who or what the work serves. Every sector below is evidenced by named projects already delivered.',
  allLink: 'All projects in this sector',
  items: [
    {
      n: '01', slug: 'buildings',
      name: 'Buildings, Commercial & Residential',
      description: 'Design and construction supervision of commercial, residential and industrial buildings — from the seven-storey TRA ITA Hotel Accommodation at Mikocheni to residential apartments at Oysterbay and the Royal Soap industrial building at Ubungo, Dar es Salaam.',
      evidence: ['tra-ita-hotel-mikocheni', 'oysterbay-residential-apartments', 'royal-soap-industrial-building']
    },
    {
      n: '02', slug: 'government',
      name: 'Government & Public Infrastructure',
      description: 'Buildings and public facilities for national and local government: the Uganda High Commission in Dodoma, the rehabilitation of the TRA Regional Office in Tanga, and new bus terminals for the Nanyumbu and Mpanda councils.',
      evidence: ['uganda-high-commission-dodoma', 'new-mpanda-bus-terminal', 'tra-regional-office-tanga']
    },
    {
      n: '03', slug: 'health-education',
      name: 'Health & Education Facilities',
      description: 'Hospitals, laboratories and medical storage: the Referral and Teaching College Hospital at Binguni for Zanzibar’s Ministry of Health, the new laboratory at Kibong’oto Hospital, and donor-funded medical storage warehouses at Keko, Mbeya and Kigali.',
      evidence: ['binguni-hospital-zanzibar', 'kibongoto-hospital-laboratory', 'msd-warehouse-keko']
    },
    {
      n: '04', slug: 'industrial',
      name: 'Industrial, Manufacturing & Logistics',
      description: 'Industrial buildings, plant and storage: the expansion of the Tanzania Tobacco Processors plant in Morogoro, the bulk cement loading system at Lafarge’s Mbeya factory, a 55 m span steelwork structure for GSM, and the workshop and container hardstand at the Zanzibar Multipurpose Terminal.',
      evidence: ['tobacco-processing-plant-morogoro', 'lafarge-bulk-loading-mbeya', 'gsm-steelwork-coca-cola-road']
    },
    {
      n: '05', slug: 'transport',
      name: 'Transport & Urban Development',
      description: 'Bridges, roads and terminals, from feasibility study to construction supervision: Zimbili and Ulongoni bridges for the Dar es Salaam Metropolitan Development Project, Rau Bridge and road upgrading for TARURA, and the Furahisha pedestrian flyover in Mwanza.',
      evidence: ['zimbili-bridge', 'furahisha-pedestrian-flyover', 'wenda-mgama-road']
    },
    {
      n: '06', slug: 'water-agriculture',
      name: 'Water, Agriculture & Irrigation',
      description: 'Water storage and irrigation: the Water Supply and Irrigation Scheme for Kilombero Plantation at Ifakara, and a 350 ML masonry dam across the Luika River and a 150 ML reservoir at New Luika Gold Mine.',
      evidence: ['ifakara-water-supply-irrigation', 'new-luika-350ml-masonry-dam', 'new-luika-150ml-reservoir']
    },
    {
      n: '07', slug: 'mining',
      name: 'Mining & Extractives',
      description: 'Tailings storage facilities and the infrastructure around them — designs, design reviews, construction supervision and structural audits for Shanta Mining, Buckreef Gold, Matongo Gold Mine and Anglo de Beers Tanzania, alongside river training, a road diversion and a helipad at Mnekezi.',
      evidence: ['new-luika-tsf2', 'mnekezi-tsf2', 'mwaoga-tsf1']
    }
  ]
}

/* --------------------------------------------------------------- insights */
/*
  Client comment C4: Insights launches as curated professional and regulatory links
  rather than as a news feed.

  Every URL below returned HTTP 200 on 2026-09-22 except the one marked `unverified`,
  which could not be reached from the build environment and needs a manual check.

  The IA's three later sub-sections (P6):
    downloads — has real content already (the company profile), so it ships now
    news      — TBC until there is something to publish. Fill with an array:
                  [{ date: '2026-10-01', title: '…', summary: '…', href: '…' (optional) }]
    careers   — TBC likewise. Fill with an array:
                  [{ title: '…', location: '…', closing: '…', summary: '…', apply: 'mailto:…' }]
                or set to [] to say "no current openings" explicitly.
  The IA says Insights "should not be added as an empty menu item": with placeholders
  switched off, an unfilled news or careers block does not render at all.
*/
export const insights = {
  eyebrow: 'Insights & resources',
  title: ['The bodies we answer to,', 'and work alongside'],
  lede: 'Consulting engineering in Tanzania is a regulated profession. These are the authorities, professional bodies and standards that govern the work Teknicon does.',
  groups: [
    {
      heading: 'Regulators & professional bodies',
      links: [
        { name: 'Engineers Registration Board (ERB)', href: 'https://www.erb.go.tz/', note: 'Registers engineers and consulting firms. Teknicon is LCF 122.' },
        { name: 'Institution of Engineers Tanzania (IET)', href: 'https://iet.or.tz/', note: 'The national professional institution for engineers.', unverified: true },
        { name: 'Occupational Safety and Health Authority (OSHA)', href: 'https://www.osha.go.tz/', note: 'Workplace safety and health regulation. Teknicon is 313-102-022.' }
      ]
    },
    {
      heading: 'Client authorities',
      links: [
        { name: 'TANROADS', href: 'https://www.tanroads.go.tz/', note: 'Tanzania National Roads Agency.' },
        { name: 'TARURA', href: 'https://tarura.go.tz/', note: 'Tanzania Rural and Urban Roads Agency — client on several road and bridge assignments.' }
      ]
    },
    {
      heading: 'Standards & contract practice',
      links: [
        { name: 'Tanzania Bureau of Standards (TBS)', href: 'https://www.tbs.go.tz/', note: 'National standards and conformity assessment.' },
        { name: 'FIDIC', href: 'https://www.fidic.org/', note: 'International Federation of Consulting Engineers — the contract forms used across the sector.' }
      ]
    }
  ],
  downloads: {
    heading: 'Publications & downloads',
    items: [
      {
        title: 'Company profile',
        note: 'Background, services, selected projects, licences and registrations.',
        href: '/downloads/teknicon-company-profile.pdf',
        meta: 'PDF · 50 pages · 6.8 MB'
      }
    ],
    more: tbc('Further downloads — a capability statement, brochures or technical papers, if the client has any to publish')
  },
  news: {
    heading: 'News & updates',
    items: tbc('News items — date, headline and a short summary for each (project milestones, awards, appointments)')
  },
  careers: {
    heading: 'Careers',
    items: tbc('Current openings, or confirmation there are none — plus how to apply (which mailbox, what to send)'),
    none: 'There are no open positions at the moment.'
  }
}

/* ---------------------------------------------------------- contact page */
export const contactPage = {
  eyebrow: 'Contact us',
  title: ['Talk to a registered', 'consulting engineer'],
  lede: 'For proposals, tender enquiries and technical questions. We respond to every enquiry received during working hours.',
  hours: [
    { days: 'Monday to Friday', time: '08:00 – 17:00 EAT' },
    { days: 'Saturday, Sunday and public holidays', time: 'Closed' }
  ],
  /* Google Maps embed for the registered office. Coordinates are not published in the
     company profile, so this searches the address rather than pinning a lat/long. */
  mapQuery: 'Natai Plaza, Coca Cola Road, Mikocheni Light Industrial Area, Dar es Salaam, Tanzania',
  form: {
    heading: 'Send an enquiry',
    /*
      P5-1 / ROADMAP §7 Q4. Where the form posts to. Until this is a real URL the form
      sends nothing and tells the visitor to email instead — it never fakes a send.

      Any endpoint that accepts a normal form POST and answers 2xx works. With Formspree
      it is 'https://formspree.io/f/<your-id>'. The request is sent with
      `Accept: application/json`, which Formspree, Getform and Basin all honour.
      (Netlify Forms works differently — it needs `data-netlify` on the <form> at build
      time; ask before choosing it.)
    */
    endpoint: tbc('Form endpoint URL (ROADMAP Q4) — e.g. https://formspree.io/f/xxxxxxx'),
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'organisation', label: 'Organisation', type: 'text', required: false },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: false },
      { name: 'subject', label: 'Subject', type: 'text', required: false },
      { name: 'message', label: 'Enquiry', type: 'textarea', required: true }
    ],
    submit: 'Send enquiry',
    sending: 'Sending…',
    sent: 'Thank you — your enquiry has been sent. We will reply by email.',
    failed: 'Your enquiry could not be sent. Please try again, or email us directly at',
    offline: 'This form is not connected yet, so nothing has been sent. Please email',
    offlineAfter: 'directly and include the details above.'
  }
}

/* -------------------------------------------------------------- legal */
/*
  P5-5 / P5-6. DRAFTED 2026-09-23 at the client's request, so that no placeholder shows.
  The privacy text states only what this website actually does (below); the terms are
  standard for an informational company site. Neither has had legal review — the client
  should have both approved, and change `updated` when they do. ROADMAP §5a.

  `body` is filled as an array of sections:
      body: [
        { heading: 'Who we are', paragraphs: ['…', '…'] },
        { heading: 'What we collect', paragraphs: ['…'] }
      ]
  `updated` is the date the policy took effect, e.g. '1 October 2026'.

  Notes for whoever drafts the privacy policy — what this website actually does today:
    · the enquiry form collects name, organisation, email, phone, subject and message,
      and posts them to the endpoint in contactPage.form.endpoint (a third party, e.g.
      Formspree, once chosen)
    · the contact page embeds Google Maps, which loads from Google's servers
    · the DM Sans typeface is loaded from Google Fonts
    · the site itself sets no cookies and runs no analytics
*/
export const legal = {
  privacy: {
    path: '/privacy',
    label: 'Privacy Policy',
    title: ['Privacy Policy'],
    lede: 'How Teknicon handles personal information submitted through this website.',
    updated: '23 September 2026',
    body: [
      { heading: 'Who we are', paragraphs: [
        'This website is published by TEKNICON LTD, Natai Plaza, 4th Floor, Suite No. RT 01B, Coca Cola Road, Plot 17, Mikocheni Light Industrial Area, Dar es Salaam, Tanzania. TEKNICON LTD is responsible for personal information collected through it.'
      ] },
      { heading: 'What we collect', paragraphs: [
        'We collect only what you choose to give us: when you send an enquiry through the contact form, your name, organisation, email address, telephone number, subject and message; and when you email us, the contents of that email.',
        'We do not ask for sensitive personal information, and there is no account or login on this website.'
      ] },
      { heading: 'How we use it', paragraphs: [
        'We use your details to reply to your enquiry and, where you ask us to, to prepare a proposal or discuss a project. We do not sell your information, and we do not add you to marketing mailing lists.'
      ] },
      { heading: 'Services that handle it', paragraphs: [
        'Enquiries sent through the contact form are delivered to our mailbox by a third-party form-handling service.',
        'The contact page shows a Google Maps map of our office, and the website loads its typeface from Google Fonts. When these load, Google receives your IP address and basic browser information, which it handles under its own privacy policy.'
      ] },
      { heading: 'Cookies', paragraphs: [
        'This website does not set cookies of its own and does not use analytics or advertising trackers. Google Maps may set cookies when the map on the contact page loads.'
      ] },
      { heading: 'How long we keep it', paragraphs: [
        'We keep enquiry correspondence for as long as it is needed to deal with the enquiry and any work that follows from it, and longer only where the law requires us to.'
      ] },
      { heading: 'Your choices', paragraphs: [
        'You can ask us to show you the personal information we hold about you, to correct it, or to delete it, by emailing info@teknicon.co.tz.'
      ] },
      { heading: 'Changes to this policy', paragraphs: [
        'If we change this policy, the updated version will be published on this page with a new date.'
      ] }
    ]
  },
  terms: {
    path: '/terms',
    label: 'Terms of Use',
    title: ['Terms of Use'],
    lede: 'The terms on which this website and its content are provided.',
    updated: '23 September 2026',
    body: [
      { heading: 'About this website', paragraphs: [
        'This website is published by TEKNICON LTD to provide general information about the company, its services and the projects it has worked on. By using it you accept these terms.'
      ] },
      { heading: 'Not professional advice', paragraphs: [
        'The content of this website is general information. It is not engineering, design or other professional advice for any particular project, and should not be relied on as such. Advice is given only under a formal engagement with TEKNICON LTD.'
      ] },
      { heading: 'Accuracy', paragraphs: [
        'We aim to keep the information on this website accurate and up to date, but we do not guarantee that it is complete or current. Project descriptions summarise commissions; they are not a full statement of scope.'
      ] },
      { heading: 'Copyright', paragraphs: [
        'The text, photographs, drawings, renderings and logo on this website belong to TEKNICON LTD or are published with the permission of its clients. They may not be copied or reused without written permission.'
      ] },
      { heading: 'Links to other websites', paragraphs: [
        'This website links to the websites of regulators, professional bodies and other organisations. We are not responsible for their content or for how they handle your information.'
      ] },
      { heading: 'Liability', paragraphs: [
        'To the extent permitted by law, TEKNICON LTD is not liable for any loss arising from the use of this website or reliance on its content.'
      ] },
      { heading: 'Governing law', paragraphs: [
        'These terms are governed by the laws of the United Republic of Tanzania.'
      ] }
    ]
  },
  updatedLabel: 'Last updated',
  contactLabel: 'Questions about this page:'
}
