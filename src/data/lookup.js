/**
 * Joins between the content tables: projects ↔ services ↔ sectors, by slug.
 *
 * content.js holds the data and nothing else; the relationships and the derived lists
 * (filter options, related projects, route paths) are worked out here so every page
 * computes them the same way.
 */
import { filled, insightsResources, projectCategories, projectList, sectors, services, shown } from './content.js'

const index = (list) => Object.fromEntries(list.map((item) => [item.slug, item]))

export const projectBySlug = index(projectList)
export const serviceBySlug = index(services.items)
export const sectorBySlug = index(sectors.items)
export const categoryBySlug = index(projectCategories)

export const projectPath = (slug) => `/projects/${slug}`
export const servicePath = (slug) => `/services/${slug}`
export const sectorPath = (slug) => `/sectors#${slug}`

/* Every slug referenced from one table must exist in the other. A typo here would
   otherwise render as a silently missing card, so fail loudly — at build time, since
   vite-ssg imports this module while prerendering. */
const dangling = []
for (const s of services.items) {
  for (const p of s.projects) if (!projectBySlug[p]) dangling.push(`service ${s.slug} -> project ${p}`)
  for (const x of s.sectors) if (!sectorBySlug[x]) dangling.push(`service ${s.slug} -> sector ${x}`)
}
for (const x of sectors.items) {
  for (const p of x.evidence) if (!projectBySlug[p]) dangling.push(`sector ${x.slug} -> project ${p}`)
}
for (const p of projectList) {
  for (const s of p.services) if (!serviceBySlug[s]) dangling.push(`project ${p.slug} -> service ${s}`)
  for (const x of p.sectors) if (!sectorBySlug[x]) dangling.push(`project ${p.slug} -> sector ${x}`)
  if (!categoryBySlug[p.category]) dangling.push(`project ${p.slug} -> category ${p.category}`)
}
if (dangling.length) throw new Error(`content.js has dangling slugs:\n  ${dangling.join('\n  ')}`)

/** "Title, Place" when the place is known; the title alone otherwise. */
export const projectName = (p) => (filled(p.place) ? `${p.title}, ${p.place}` : p.title)

/** The one-line summary under a project card: client, then the profile's short facts. */
export const projectLine = (p) =>
  [p.client, ...(p.facts || [])].filter(filled).join(' · ')

/** A service's related projects, split into photographed cards (max 3) and the rest. */
export function relatedProjects (slugs, cards = 3) {
  const list = slugs.map((s) => projectBySlug[s])
  const withImage = list.filter((p) => p.image).slice(0, cards)
  return { cards: withImage, rest: list.filter((p) => !withImage.includes(p)) }
}

/**
 * The projects most like this one. Ranked by what a visitor means by "similar": the
 * same project type first (a bridge next to bridges, not a workshop that happens to
 * share a sector), then how closely the services match, then the sectors. Overlap is
 * shared ÷ combined (Jaccard), not a raw count — a count favoured whichever project
 * listed the most services, so bus terminals outranked bridges on a bridge page.
 * Photographed projects lead within equal scores; ties keep register order.
 */
export function projectsLike (project, limit = 3) {
  const overlap = (a, b) => {
    const union = new Set([...a, ...b]).size
    return union ? a.filter((x) => b.includes(x)).length / union : 0
  }
  return projectList
    .filter((p) => p.slug !== project.slug)
    .map((p, i) => ({
      p,
      i,
      score: (p.category === project.category ? 100 : 0)
        + 10 * overlap(p.services, project.services)
        + overlap(p.sectors, project.sectors)
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || Number(!!b.p.image) - Number(!!a.p.image) || a.i - b.i)
    .slice(0, limit)
    .map((r) => r.p)
}

/**
 * A featured project counts as a case study only once it has its narrative. The IA's
 * case study is "challenge, scope, solution, project facts, images and outcome";
 * until the client supplies the three narrative parts, calling the page a case study
 * would promise depth it does not have, so it is labelled a featured project instead.
 */
export const hasCaseStudy = (project) =>
  !!project.caseStudy &&
  ['challenge', 'solution', 'outcome'].some((k) => shown(project.caseStudy[k]))

export const projectsInSector = (slug) => projectList.filter((p) => p.sectors.includes(slug))

/** Filter options, each listing only values at least one project actually has. */
const sortBy = (key) => (a, b) => a[key].localeCompare(b[key])
export const filterOptions = {
  category: projectCategories.map((c) => ({ value: c.slug, label: c.name })),
  sector: sectors.items.map((s) => ({ value: s.slug, label: s.name })),
  service: services.items.map((s) => ({ value: s.slug, label: s.title })),
  area: [...new Set(projectList.map((p) => p.area).filter(filled))]
    .map((a) => ({ value: a, label: a }))
    .sort(sortBy('label')),
  status: [...new Set(projectList.map((p) => p.status).filter(filled))]
    .map((s) => ({ value: s, label: s }))
    .sort(sortBy('label'))
}

/* Insights 2 — articles and vacancies. Items marked `sample: true` exist only while
   insightsResources.showSamples is on; switching it off removes them (and their
   article pages) everywhere at once. */
const showable = (item) => insightsResources.showSamples || !item.sample
export const posts = insightsResources.news.posts.filter(showable)
export const vacancies = insightsResources.careers.vacancies.filter(showable)
export const postBySlug = index(posts)
export const postPath = (slug) => `/insights/resources/${slug}`

/** Every prerenderable path — read by vite.config.js (includedRoutes) and tools/audit.mjs. */
export const staticPaths = [
  '/', '/about', '/services', '/projects', '/sectors', '/insights', '/insights/resources', '/contact',
  '/privacy', '/terms', '/404',
  ...services.items.map((s) => servicePath(s.slug)),
  ...projectList.map((p) => projectPath(p.slug)),
  ...posts.map((p) => postPath(p.slug))
]
