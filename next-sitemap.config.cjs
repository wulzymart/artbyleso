const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://lesooriginals.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/artworks-sitemap.xml',
    '/collections-sitemap.xml',
    '/pages-sitemap.xml',
    '/*',
    '/artworks/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/account/*', '/api/*', '/orders/*'],
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/artworks-sitemap.xml`,
      `${SITE_URL}/collections-sitemap.xml`,
    ],
  },
}
