import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getPayloadClient = () => getPayload({ config })

const published = { published: { equals: true } }

/** Semua data landing page dalam satu panggilan (di-cache per request). */
export const getHomeData = cache(async () => {
  const payload = await getPayloadClient()

  const [settings, services, portfolio, programs, tools, testimonials, faqs] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 0 }),
    payload.find({ collection: 'services', where: published, sort: 'order', limit: 50, depth: 0 }),
    payload.find({ collection: 'portfolio', where: published, sort: 'order', limit: 50, depth: 1 }),
    payload.find({ collection: 'programs', where: published, sort: 'order', limit: 20, depth: 0 }),
    payload.find({ collection: 'tools', where: published, sort: 'order', limit: 20, depth: 0 }),
    payload.find({ collection: 'testimonials', where: published, sort: 'order', limit: 30, depth: 1 }),
    payload.find({ collection: 'faqs', where: published, sort: 'order', limit: 50, depth: 0 }),
  ])

  return {
    settings,
    services: services.docs,
    portfolio: portfolio.docs,
    programs: programs.docs,
    tools: tools.docs,
    testimonials: testimonials.docs,
    faqs: faqs.docs,
  }
})

export type HomeData = Awaited<ReturnType<typeof getHomeData>>

export const getSettings = cache(async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 0 })
})

export const getTools = cache(async () => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'tools', where: published, sort: 'order', limit: 20, depth: 0 })
  return res.docs
})
