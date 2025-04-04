import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getArtworksMap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://lesooriginals.com.ng'

    const results = await payload.find({
      collection: 'artworks',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((artwork) => Boolean(artwork?.slug))
          .map((artwork) => ({
            loc: `${SITE_URL}/artworks/${artwork?.slug}`,
            lastmod: artwork.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['artworks-sitemap'],
  {
    tags: ['artworks-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getArtworksMap()

  return getServerSideSitemap(sitemap)
}
