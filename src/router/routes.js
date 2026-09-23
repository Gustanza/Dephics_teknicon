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
 * Service and project detail routes are added in phases 2 and 3; their slugs are fixed
 * now so nothing has to be redirected later.
 */

const SITE = 'https://www.teknicon.co.tz'
const SUFFIX = 'Teknicon Ltd'
const DEFAULT_OG = '/img/hero-tsf-embankment-luika.jpg'

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
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue'),
    meta: { title: `Page not found — ${SUFFIX}`, noindex: true }
  }
]

/** Absolute URL for a route path — used for canonical and og:url. */
export const absolute = (path) => `${SITE}${path === '/' ? '/' : path.replace(/\/$/, '')}`

export { SITE }
