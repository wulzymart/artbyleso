import React from 'react'
import { Metadata } from 'next'
import PortfoliosListParallax from '@/components/works/portfolios-list-parallax'
import { Pagination } from '@/components/Pagination'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const metadata: Metadata = {
  title: 'Portfolios | Leso Originals',
  description: 'Browse our portfolio collection showcasing our best works',
}

export default async function PortfoliosPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>
}) {
  const page =
    typeof (await searchParams).page === 'string' ? parseInt((await searchParams).page) : 1
  const limit = 10 // 10 portfolios per page as required
  const payload = await getPayload({ config })
  const portfoliosQuery = await payload.find({
    collection: 'portfolios',
    limit,
    page,
    sort: '-createdAt',
    depth: 4,
  })

  const { docs: portfolios, totalPages } = portfoliosQuery

  return (
    <div className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Our Portfolios</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our diverse collection of portfolios showcasing our creative works and projects
        </p>
      </div>

      {portfolios.length > 0 ? (
        <>
          <PortfoliosListParallax portfolios={portfolios} />

          <div className="mt-12">
            <Pagination totalPages={totalPages} page={page} url="/portfolios" />
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-gray-600">No portfolios found</h2>
          <p className="mt-2 text-gray-500">Check back soon for new portfolio additions</p>
        </div>
      )}
    </div>
  )
}
