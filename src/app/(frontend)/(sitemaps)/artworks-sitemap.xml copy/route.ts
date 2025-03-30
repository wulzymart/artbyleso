import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getCollectionsMap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://lesooriginals.com.ng'

    const results = await payload.find({
      collection: 'collections',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,

      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((collection) => Boolean(collection?.slug))
          .map((collection) => ({
            loc: `${SITE_URL}/collecctions/${collection?.slug}`,
            lastmod: collection.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['collections-sitemap'],
  {
    tags: ['collections-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getCollectionsMap()

  return getServerSideSitemap(sitemap)
}
