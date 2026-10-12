/*
 * Builds docs/Teknicon-Architecture-Checklist.docx — every point of the client's
 * "Proposed Teknicon Website Information Architecture" PDF, as given, with DONE /
 * NOT DONE (and why) and any later WhatsApp / client update.
 *
 * The `docx` package is deliberately NOT a project dependency. To rebuild:
 *   npm install --prefix /tmp/docxlib docx
 *   NODE_PATH=/tmp/docxlib/node_modules node tools/make-checklist.cjs docs/Teknicon-Architecture-Checklist.docx
 *
 * Keep this file in step with docs/ROADMAP.md (Rounds D–G, questions Q6–Q12).
 */
const fs = require('fs')
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle,
  Footer, PageNumber, LevelFormat
} = require('docx')

const NAVY = '2C3792'
const GREEN = '1E7B34'
const RED = 'C0392B'
const GREY = '555555'
const FONT = 'Arial'

/* D(): DONE · N(): NOT DONE — reason · u: later update (WhatsApp or client request) */
const D = (note) => ({ s: 'DONE', r: note })
const N = (reason) => ({ s: 'NOT DONE', r: reason })

/* Every `t` is the text of the architecture PDF, as given. lvl 0 = bullet, 1 = sub-bullet;
   note: true = a line that is not a bullet in the PDF (or an added note). */
const sections = [
  {
    h: 'Recommended primary navigation',
    items: [
      { t: 'Home | About Us | Services | Projects | Sectors | Insights | Contact Us', ...D('Same menu, same order, on every page.') }
    ]
  },
  {
    h: '1. Home',
    purpose: 'Purpose: Quickly establish credibility, expertise and a path to enquiry.',
    items: [
      { t: 'Slideshow 1 Text: “We are Consulting Engineers and Project Managers”', ...D() },
      { lvl: 1, t: 'Supporting message: We do multidisciplinary engineering, design, construction supervision and project management.', ...D() },
      { lvl: 1, t: 'Calls to action (Two Buttons): Explore Our Services and Request a Consultation', ...D('Both buttons are on slide 1: “Explore Our Services” and “Contact Us”.'),
        u: 'WhatsApp: “we would prefer ‘Contact us’” instead of “Request a Consultation” — applied everywhere (as “Contact Us”) on the site, including this button.' },
      { t: 'Slideshow (2 to 3/4 max) Texts/Captions and photos: “Teknicon to provide…”', ...D('3 slides in total. Captions for slides 2 and 3 written from the company profile — please approve the wording.') },
      { t: 'Brief introduction to Teknicon with a linked button to “About us Page “or Foreword from CEO with a linked button to “Find Out More About Teknicon”', ...D('The introduction option, with the “Find out more about Teknicon” button. (A CEO foreword was not supplied.)') },
      { t: 'Service highlights', ...D() },
      { lvl: 1, t: 'Structural & Bridge Engineering', ...D() },
      { lvl: 1, t: 'Civil Engineering & Infrastructure', ...D() },
      { lvl: 1, t: 'Water, Dams & Tailings Storage Facilities', ...D() },
      { lvl: 1, t: 'Project Management & Construction Supervision', ...N('Not on the home page — the home page shows one row of three cards. It is one click away under “All services”.'),
        u: 'Client request (23 Sep): show one row of three service cards on the home page. Please confirm: three cards, or all four as in this PDF?' },
      { t: 'Featured projects', ...D() },
      { t: 'Sectors served', ...D() },
      { t: 'Why work with Teknicon / key differentiators', ...D() },
      { lvl: 1, t: 'Tanzanian-owned local consultancy', ...D() },
      { lvl: 1, t: 'ERB-registered consulting firm', ...D() },
      { lvl: 1, t: 'Established since 2009', ...D('Written as “Established in 2009”.') },
      { lvl: 1, t: 'Design-to-construction support', ...D() },
      { t: 'Client and partner logos', ...N('Partly. 11 client logos are shown. Logos for TRA, TIPER, MSD, TARURA, the ministries, the Judiciary and UDSM were not supplied — they are named in text instead.') },
      { t: 'Contact / enquiry strip', ...D() }
    ]
  },
  {
    h: '2. About Us',
    purpose: 'Purpose: Build trust before a prospective client explores services or makes contact.',
    items: [
      { t: 'Company Overview', ...D() },
      { lvl: 1, t: 'Background, establishment, ownership, office location and professional positioning', ...D() },
      { t: 'Vision, Mission & Values', ...N('Partly. The Vision is shown. The company profile has no Mission and no Values — please send them.') },
      { lvl: 1, t: 'Vision statement, quality-driven approach and core principles', ...D('Shown as the Vision, “Our objective” and four “Core principles”, all in the company profile’s own words.') },
      { t: 'Leadership & Our Team', ...D('Shown as the organisation chart (positions only).'),
        u: 'WhatsApp: “that is where the organisation chart comes into play since we will not be disclosing the staff team as individuals rather as positions.” — applied.' },
      { lvl: 1, t: 'Board/management and key technical personnel', ...D('As positions on the organisation chart, per the WhatsApp update. No names are published.') },
      { lvl: 1, t: 'Short biographies, qualifications, disciplines and experience', ...D('For the team as a whole (disciplines, core strengths, 7–34 years’ experience) — not per person, per the WhatsApp update.') },
      { t: 'Quality, HSE & Compliance', ...N('Partly. Quality and compliance are covered. There is no HSE policy in the company profile — please send one.') },
      { lvl: 1, t: 'Quality assurance approach, design reviews, site inspections, coordination and compliance procedures', ...D() },
      { t: 'Organisation Structure', ...D() },
      { lvl: 1, t: 'Simplified, web-friendly organisation chart', ...D('One question: the chart in the profile shows four engineering groups but only three Heads of Department. Please confirm.') },
      { t: 'Licences & Professional Memberships', ...D() },
      { lvl: 1, t: 'ERB, ACET, BRELA, OSHA and other relevant registrations', ...D('All 10 registrations, by name. Registration numbers and expiry dates are not published on the site (kept private).') },
      { t: 'Download Company Profile', ...D() },
      { lvl: 1, t: 'Current PDF profile and any capability statement', ...D('Company profile PDF. (No capability statement was supplied.)') }
    ]
  },
  {
    h: '3. Services',
    purpose: 'Purpose: This should be the main capability menu, structured around what a client is hiring Teknicon to do.',
    items: [
      { t: 'Engineering Design & Consultancy', ...D() },
      { lvl: 1, t: 'Feasibility studies', ...D() },
      { lvl: 1, t: 'Concept, preliminary and detailed design', ...D() },
      { lvl: 1, t: 'Technical assessments and rehabilitation advice', ...D() },
      { lvl: 1, t: 'Tender documentation and design coordination', ...D() },
      { t: 'Structural & Bridge Engineering', ...D() },
      { lvl: 1, t: 'Buildings and special structures', ...D() },
      { lvl: 1, t: 'Reinforced concrete, steel, masonry and timber structures', ...D() },
      { lvl: 1, t: 'Foundations and structural detailing', ...D() },
      { lvl: 1, t: 'Bridge feasibility, design and supervision', ...D() },
      { lvl: 1, t: 'Structural integrity assessments and remedial works', ...D() },
      { t: 'Civil Engineering & Infrastructure', ...D() },
      { lvl: 1, t: 'Roads, pavements, hardstands and external works', ...D() },
      { lvl: 1, t: 'Drainage, flood protection and river protection', ...D() },
      { lvl: 1, t: 'Water supply, sanitation and wastewater', ...D() },
      { lvl: 1, t: 'Pipelines, pump stations and reservoirs', ...D() },
      { lvl: 1, t: 'Survey and geotechnical investigation coordination', ...D() },
      { t: 'Water, Dams & Mining Infrastructure', ...D('Named “Water, Dams & Tailings Storage Facilities” — the name this PDF uses on the Home and Projects pages — so the service has one name everywhere.') },
      { lvl: 1, t: 'Water dams, weirs and reservoirs', ...D() },
      { lvl: 1, t: 'Irrigation infrastructure', ...D() },
      { lvl: 1, t: 'Tailings Storage Facilities (TSF)', ...D() },
      { lvl: 1, t: 'Watercourse training and associated infrastructure', ...D() },
      { lvl: 1, t: 'Design review, structural audits and construction supervision', ...D() },
      { t: 'Project Management & Construction Supervision', ...D() },
      { lvl: 1, t: 'Project planning, appraisal and implementation support', ...D() },
      { lvl: 1, t: 'Contract administration', ...D() },
      { lvl: 1, t: 'Tender evaluation and reporting', ...D() },
      { lvl: 1, t: 'Site supervision, quality control and progress reporting', ...D() },
      { lvl: 1, t: 'Payment certification, completion and defects-liability support', ...D() },
      { note: true, t: 'Each service page should follow one consistent format: overview, scope of work, typical deliverables, relevant sectors, selected related projects and a consultation call-to-action.', ...D('All five service pages follow this format, in this order.'),
        u: 'WhatsApp: the consultation button reads “Contact Us” instead of “Request a Consultation” — applied.' }
    ]
  },
  {
    h: '4. Projects',
    purpose: 'Purpose: Demonstrate proven experience rather than simply listing past work.',
    items: [
      { t: 'All Projects', ...D('36 projects from the company profile.'),
        u: 'WhatsApp: “when selecting projects to add to the webiste for starters adopt the ones you see fit from the company profile” — applied.' },
      { lvl: 1, t: 'Filter by sector, service, location and project status where possible', ...N('Partly. Sector, service and location filters work. Project status (completed / ongoing) is not in the company profile — please send it.') },
      { t: 'Buildings & Facilities', ...D('14 projects.') },
      { lvl: 1, t: 'Commercial, industrial, residential, health, warehouse and institutional developments', ...D() },
      { t: 'Transport & Urban Infrastructure', ...D('12 projects.') },
      { lvl: 1, t: 'Bridges, roads, terminals, hardstands, pedestrian infrastructure and related works', ...D() },
      { t: 'Water, Dams & Tailings Storage Facilities', ...D('10 projects.') },
      { lvl: 1, t: 'Reservoirs, dams, irrigation, TSFs, river works and mining infrastructure', ...D() },
      { t: 'Featured Project Case Studies', ...N('Partly. Three priority projects are featured. Their stories are not in the company profile — see the next point.') },
      { lvl: 1, t: 'A fuller page for priority projects, with challenge, scope, solution, project facts, images and outcome', ...N('Scope, facts and images are there. The challenge, solution and outcome need a short conversation with Teknicon.') },
      { note: true, t: 'Each project page should include: client (where permission allows), location, year, services delivered, project value if publishable, gallery and related services.', ...N('Partly. Done on all 36: location, services delivered, related services. Client: 32 of 36 (4 not named in the profile; permission to name clients not yet confirmed). Year: none in the profile. Value: 1 of 36 (only TRA ITA’s is in the profile). Gallery: 12 of 36.') }
    ]
  },
  {
    h: '5. Sectors',
    purpose: 'Purpose: Helps clients immediately recognise Teknicon’s relevance to their industry. This is different from Services: a service is what Teknicon does; a sector is who or what it serves.',
    items: [
      { t: 'Buildings, Commercial & Residential', ...D() },
      { t: 'Government & Public Infrastructure', ...D() },
      { t: 'Health & Education Facilities', ...D() },
      { t: 'Industrial, Manufacturing & Logistics', ...D() },
      { t: 'Transport & Urban Development', ...D() },
      { t: 'Water, Agriculture & Irrigation', ...D() },
      { t: 'Mining & Extractives', ...D() }
    ]
  },
  {
    h: '6. Insights',
    purpose: 'Purpose: Positions Teknicon as a credible technical authority and gives the site fresh content for search visibility.',
    items: [
      { note: true, t: 'Note: Insights now has two versions for you to compare. Hover “Insights” in the menu → “Insights 1” is the page as amended on WhatsApp (the professional links); “Insights 2” is this document’s version (the three points below). Please tell us which to keep.', ...D('Both pages are on the preview site.') },
      { t: 'News & Updates', ...D('On “Insights 2”, as a blog: four SAMPLE articles, each with its own page (New Luika TSF2, the Zimbili and Ulongoni bridges, how a design is reviewed, 2026 registrations). The facts come from your company profile; the dates are samples. Each is marked “Sample” — please send your own articles to replace them.') },
      { t: 'Publications / Downloads', ...D('The company profile PDF — on both Insights pages.') },
      { t: 'Career', ...D('On “Insights 2”: three SAMPLE job vacancies in your real departments (Structural and Bridges; Dams and Water; Civil and Highway), each with requirements, closing date and an “Apply” link to info@teknicon.co.tz. Marked “Sample” — please send your real openings and confirm where applications should go.') },
      { note: true, t: 'This section can be launched later if ongoing content publishing is not yet planned. It should not be added as an empty menu item.', ...D('Neither Insights page is empty.'),
        u: 'WhatsApp: “We can add links from ERB, IET, OSHA Tanzania, TANROADS, TARURA, FIDIC, TBS” — all seven added, on “Insights 1”.' },
      { note: true, t: '(WhatsApp, Josephat:) “Noted, but mara nyingi kwenye websites ‘insight’ menu huwa ni more of Media & Resources and Industry Trends / News …”', ...N('The message was cut off — please send the full message. (“Insights 2” moves in this direction: news, publications and careers.)') }
    ]
  },
  {
    h: '7. Contact Us',
    items: [
      { t: 'Office address, telephone/mobile, email and social media links', ...N('Partly. Address, office telephone and email are there. No mobile number and no social media accounts were supplied.') },
      { t: 'Google map – office location', ...D() },
      { t: 'Enquiry form', ...N('Partly. The form is built, but it is not yet connected to an inbox, so for now it asks visitors to email. We need to choose where enquiries go.') },
      { lvl: 1, t: 'Name, organisation, email, phone, enquiry or comment and e.t.c', ...D('All of these, plus “Subject”.') },
      { t: 'Working hours and social links', ...N('Working hours and social media accounts are not in the company profile — please send them.') }
    ]
  },
  {
    h: 'Footer structure',
    items: [
      { t: 'About Teknicon: short profile and company profile download', ...D() },
      { t: 'Services: Main Teknicon capability areas', ...D() },
      { t: 'Quick Links: About Us, Projects, Sectors, Contact', ...N('Removed on purpose: every one of these links is already in the top menu, which stays on screen.') },
      { t: 'Professional Credentials: selected registration and membership logos or accreditations and so forth', ...N('Removed on purpose: registration details are treated as private company information. The memberships are still named on the About page.') },
      { t: 'Contact Details: address, phone, email and social media links', ...N('Partly. Address, phone and email are there. No social media accounts were supplied.') },
      { t: 'Legal: Privacy Policy, Terms of Use, Copyright', ...D('Privacy Policy and Terms of Use are drafted and should be checked by Teknicon (ideally with legal advice).') }
    ]
  }
]

const needs = [
  'Home page: three service cards (23 Sep request) or all four (this PDF)?',
  'Approval of the wording on hero slides 2 and 3.',
  'Logos (and permission to use them) for public-sector clients: TRA, TIPER, MSD, TARURA, ministries, Judiciary, UDSM.',
  'Mission statement and Values.',
  'HSE (health, safety and environment) policy or statement.',
  'Organisation chart: is there a fourth Head of Department?',
  'For each project: the year, the status, and whether the contract value can be published.',
  'Permission to name clients on project pages, and the client for 4 projects.',
  'The challenge, solution and outcome for the three featured projects.',
  'The original, full-size files of your project photographs (the ones we have came out of the compressed profile PDF and look soft on large screens), or a drone shoot. Until then, hero slide 1 uses a licensed stock photograph.',
  'Office working hours, a mobile number and social media accounts.',
  'Insights: keep version 1 (links), version 2 (news · publications · career), or both? If version 2: your own articles and real job openings to replace the samples, where job applications should go, and the full text of Josephat’s message.',
  'Where the enquiry form should send messages (e.g. an email inbox via Formspree).',
  'A check of the drafted Privacy Policy and Terms of Use.'
]

/* ------------------------------------------------------------ rendering */
const run = (text, o = {}) => new TextRun({ text, font: FONT, ...o })

function itemParas (it) {
  const out = []
  const indent = it.lvl === 1 ? 1 : 0
  if (it.note) {
    out.push(new Paragraph({ spacing: { before: 160, after: 40 }, children: [run(it.t, { italics: true, size: 21 })] }))
  } else {
    out.push(new Paragraph({
      numbering: { reference: 'ia', level: indent },
      spacing: { before: indent ? 60 : 160, after: 30 },
      children: [run(it.t, { size: 21, bold: !indent })]
    }))
  }
  const left = it.note ? 0 : (indent ? 1440 : 720)
  const status = [run(it.s, { bold: true, color: it.s === 'DONE' ? GREEN : RED, size: 20 })]
  if (it.r) status.push(run(' — ' + it.r, { size: 20, color: GREY }))
  out.push(new Paragraph({ indent: { left }, spacing: { after: it.u ? 20 : 40 }, children: status }))
  if (it.u) {
    out.push(new Paragraph({
      indent: { left },
      spacing: { after: 40 },
      children: [run('Later update: ', { bold: true, color: NAVY, size: 20 }), run(it.u, { size: 20, color: NAVY })]
    }))
  }
  return out
}

const all = sections.flatMap((s) => s.items)
const done = all.filter((i) => i.s === 'DONE').length
const notDone = all.filter((i) => i.s === 'NOT DONE').length

const children = [
  new Paragraph({ heading: HeadingLevel.TITLE, children: [run('Teknicon Website — Architecture Checklist', { bold: true, size: 40, color: NAVY })] }),
  new Paragraph({ spacing: { after: 80 }, children: [run('Every point from “Proposed Teknicon Website Information Architecture”, as it was given, with where the website stands today.', { size: 21, color: GREY })] }),
  new Paragraph({ spacing: { after: 80 }, children: [run('Status as of 29 September 2026.', { size: 21, color: GREY })] }),
  new Paragraph({
    spacing: { before: 120, after: 60 },
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC', space: 8 }, bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC', space: 8 } },
    children: [
      run('How to read this:  ', { bold: true, size: 20 }),
      run('DONE', { bold: true, color: GREEN, size: 20 }), run(' = on the website.   ', { size: 20 }),
      run('NOT DONE', { bold: true, color: RED, size: 20 }), run(' = missing or only partly done, with the reason.   ', { size: 20 }),
      run('Later update', { bold: true, color: NAVY, size: 20 }), run(' = changed afterwards by a WhatsApp comment or client request.', { size: 20 })
    ]
  }),
  new Paragraph({
    spacing: { before: 60, after: 200 },
    children: [
      run(`Summary: ${all.length} points — `, { bold: true, size: 21 }),
      run(`${done} DONE`, { bold: true, color: GREEN, size: 21 }),
      run(', ', { size: 21 }),
      run(`${notDone} NOT DONE`, { bold: true, color: RED, size: 21 }),
      run(' (almost all waiting on information only Teknicon can supply).', { size: 21 })
    ]
  })
]

for (const s of sections) {
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 80 }, children: [run(s.h, { bold: true, size: 30, color: NAVY })] }))
  if (s.purpose) children.push(new Paragraph({ spacing: { after: 60 }, children: [run(s.purpose, { italics: true, size: 20, color: GREY })] }))
  for (const it of s.items) children.push(...itemParas(it))
}

children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 80 }, children: [run('What we still need from Teknicon', { bold: true, size: 30, color: NAVY })] }))
for (const n of needs) {
  children.push(new Paragraph({ numbering: { reference: 'needs', level: 0 }, spacing: { after: 60 }, children: [run(n, { size: 21 })] }))
}

const doc = new Document({
  creator: 'Dephics',
  title: 'Teknicon Website — Architecture Checklist',
  styles: { default: { document: { run: { font: FONT, size: 21 } } } },
  numbering: {
    config: [
      {
        reference: 'ia',
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.BULLET, text: '◦', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1440, hanging: 360 } } } }
        ]
      },
      {
        reference: 'needs',
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1200, bottom: 1200, left: 1200, right: 1200 } } },
    footers: {
      default: new Footer({
        children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run('Teknicon website — architecture checklist · page ', { size: 16, color: GREY }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: GREY })] })]
      })
    },
    children
  }]
})

const out = process.argv[2] || 'docs/Teknicon-Architecture-Checklist.docx'
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(out, buf); console.log('wrote', out, `— ${all.length} points: ${done} done, ${notDone} not done`) })
