/**
 * Route table for the Teknicon site.
 *
 * The client rejected anchor-based navigation (IA feedback C1), so every primary nav
 * item is a real page, prerendered to static HTML by vite-ssg at build time.
 *
 * `meta` here is the single source of per-route <head> content. SiteHead.vue reads it,
 * so titles, descriptions, canonicals and OG tags live in one table rather than being
 * scattered through the page components.
 *
 * Detail routes (/services/:slug, /projects/:slug) take their head from the data via
 * `meta.head(params)`; vite.config.js enumerates every slug so each is prerendered.
 */
import { filled, legal } from '../data/content.js'
import { projectBySlug, projectName, serviceBySlug } from '../data/lookup.js'

const SITE = 'https://www.teknicon.co.tz'
const SUFFIX = 'Teknicon Ltd'
const DEFAULT_OG = '/img/hero-tsf-embankment-luika.jpg'
const NOT_FOUND = { title: `Page not found — ${SUFFIX}`, noindex: true }

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
    meta: {
      title: 'Teknicon Ltd — Consulting Engineers and Project Managers, Dar es Salaam',
      description:
        'Tanzanian consulting engineers and project managers. Structural and bridge engineering, civil infrastructure, dams and tailings storage facilities, and construction supervision. Registered with the Engineers Registration Board since 2009.',
      image: DEFAULT_OG
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue'),
    meta: {
      title: `About Us — ${SUFFIX}`,
      description:
        'A multidisciplinary consulting engineering firm established in June 2009, wholly Tanzanian-owned and registered with the Engineers Registration Board as a Local Engineering Consulting Firm.',
      image: '/img/project-kibongoto-laboratory.jpg'
    }
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('../pages/ServicesPage.vue'),
    meta: {
      title: `Services — ${SUFFIX}`,
      description:
        'Engineering design and consultancy, structural and bridge engineering, civil engineering and infrastructure, water, dams and mining infrastructure, and project management and construction supervision.',
      image: DEFAULT_OG
    }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../pages/ProjectsPage.vue'),
    meta: {
      title: `Projects — ${SUFFIX}`,
      description:
        'Selected buildings, transport and urban infrastructure, and water, dams and tailings storage facilities delivered across Tanzania, Rwanda, Uganda and Zanzibar.',
      image: '/img/project-tra-ita-hotel.jpg'
    }
  },
  {
    path: '/sectors',
    name: 'sectors',
    component: () => import('../pages/SectorsPage.vue'),
    meta: {
      title: `Sectors — ${SUFFIX}`,
      description:
        'The sectors Teknicon serves: buildings and commercial, government and public infrastructure, health and education, industrial and logistics, transport, water and irrigation, and mining.',
      image: DEFAULT_OG
    }
  },
  {
    path: '/insights',
    name: 'insights',
    component: () => import('../pages/InsightsPage.vue'),
    meta: {
      title: `Insights & Resources — ${SUFFIX}`,
      description:
        'Professional and regulatory resources relevant to consulting engineering in Tanzania — ERB, IET, OSHA, TANROADS, TARURA, TBS and FIDIC.',
      image: DEFAULT_OG
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../pages/ContactPage.vue'),
    meta: {
      title: `Contact Us — ${SUFFIX}`,
      description:
        'Natai Plaza, Mikocheni Light Industrial Area, Dar es Salaam. Telephone +255 22 2700403, email info@teknicon.co.tz.',
      image: DEFAULT_OG
    }
  },
  {
    path: '/services/:slug',
    name: 'service',
    component: () => import('../pages/ServicePage.vue'),
    meta: {
      head: ({ slug }) => {
        const s = serviceBySlug[slug]
        if (!s) return null
        return {
          title: `${s.title} — ${SUFFIX}`,
          description: s.overview[0],
          image: s.image
        }
      }
    }
  },
  {
    path: '/projects/:slug',
    name: 'project',
    component: () => import('../pages/ProjectPage.vue'),
    meta: {
      head: ({ slug }) => {
        const p = projectBySlug[slug]
        if (!p) return null
        const facts = [p.client, p.scope, ...p.facts].filter(filled).join('. ')
        return {
          title: `${projectName(p)} — ${SUFFIX}`,
          description: `${projectName(p)}. ${facts}.`,
          image: p.image ? p.image.src : DEFAULT_OG
        }
      }
    }
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../pages/LegalPage.vue'),
    props: { doc: 'privacy' },
    meta: {
      title: `Privacy Policy — ${SUFFIX}`,
      description: legal.privacy.lede,
      image: DEFAULT_OG,
      // not indexed until the client supplies the actual policy text
      noindex: !filled(legal.privacy.body)
    }
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../pages/LegalPage.vue'),
    props: { doc: 'terms' },
    meta: {
      title: `Terms of Use — ${SUFFIX}`,
      description: legal.terms.lede,
      image: DEFAULT_OG,
      noindex: !filled(legal.terms.body)
    }
  },
  /*
    P1-12. vite-ssg cannot prerender the catch-all below (it has no concrete path), so
    static hosts had no 404.html to serve. This named copy of the same page is
    prerendered to dist/404.html; Netlify, Cloudflare Pages, GitHub Pages and Apache
    (ErrorDocument 404 /404.html) all pick that file up. On the client, an unknown URL
    still resolves to the catch-all, which renders the same component, so hydration
    matches.
  */
  {
    path: '/404',
    name: 'not-found-static',
    component: () => import('../pages/NotFoundPage.vue'),
    meta: NOT_FOUND
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue'),
    meta: NOT_FOUND
  }
]

/** Head fields for a route: the static `meta`, or `meta.head(params)` on detail routes. */
export function headFor (route) {
  const m = route.meta || {}
  if (typeof m.head !== 'function') return m
  return m.head(route.params || {}) || NOT_FOUND
}

/** Absolute URL for a route path — used for canonical and og:url. */
export const absolute = (path) => `${SITE}${path === '/' ? '/' : path.replace(/\/$/, '')}`

export { SITE }
