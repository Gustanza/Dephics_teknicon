/**
 * Joins between the content tables: projects ↔ services ↔ sectors, by slug.
 *
 * content.js holds the data and nothing else; the relationships and the derived lists
 * (filter options, related projects, route paths) are worked out here so every page
 * computes them the same way.
 */
import { filled, projectCategories, projectList, sectors, services } from './content.js'

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

/** Other projects sharing a sector with this one, photographed first. */
export function projectsLike (project, limit = 3) {
  const others = projectList.filter(
    (p) => p.slug !== project.slug && p.sectors.some((s) => project.sectors.includes(s))
  )
  return [...others.filter((p) => p.image), ...others.filter((p) => !p.image)].slice(0, limit)
}

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

/** Every prerenderable path — read by vite.config.js (includedRoutes) and tools/audit.mjs. */
export const staticPaths = [
  '/', '/about', '/services', '/projects', '/sectors', '/insights', '/contact',
  '/privacy', '/terms', '/404',
  ...services.items.map((s) => servicePath(s.slug)),
  ...projectList.map((p) => projectPath(p.slug))
]
