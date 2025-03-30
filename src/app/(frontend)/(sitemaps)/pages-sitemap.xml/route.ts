import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://lesooriginals.com.ng'

    const dateFallback = new Date().toISOString()

    const defaultSitemap = [
      {
        loc: `${SITE_URL}/artworks`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/collections`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/about`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/contact`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/portfolio`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/shipping-policy`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/privacy-policy`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/terms-and-conditions`,
        lastmod: dateFallback,
      },
    ]

    return [...defaultSitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
