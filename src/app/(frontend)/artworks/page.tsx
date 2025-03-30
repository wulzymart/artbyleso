import { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { getPayload } from 'payload'
import config from '@payload-config'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import ArtworksListParallax from '@/components/works/artworks-list-parallax'
import { ParallaxSection } from '@/components/ui/parallax-section'

export const metadata: Metadata = {
  title: 'Artworks | Leso Originals',
  description:
    'Browse our collection of unique contemporary artworks by Oluwatosin Ayeleso. Discover vibrant paintings and mixed media art inspired by African culture.',
  openGraph: mergeOpenGraph({
    title: 'Artworks | Leso Originals',
    description: 'Browse our collection of unique contemporary artworks by Oluwatosin Ayeleso.',
    images: [
      {
        url: '/art1.jpg',
        width: 1200,
        height: 630,
        alt: 'Leso Originals Artworks',
      },
    ],
  }),
}
type Args = {
  searchParams: Promise<{ page?: string }>
}
export default async function ArtworksPage({ searchParams }: Args) {
  const payload = await getPayload({ config })
  const { page: currentPage } = await searchParams
  const {
    docs: artworks,
    totalPages,
    page,
  } = await payload.find({
    collection: 'artworks',
    where: {
      _status: {
        equals: 'published',
      },
    },
    pagination: true,
    sort: '-createdAt',
    limit: 10,
    page: currentPage ? Number(currentPage) : 1,
  })
  const pageUrl = '/artworks'
  return (
    <div className="min-h-screen text-gray-700">
      {/* Hero Section with Parallax */}
      <ParallaxSection
        bgImage="/art2.jpg"
        speed={0.3}
        overlay={true}
        overlayColor="#000"
        overlayOpacity={0.7}
        className="min-h-[60vh] flex items-center"
        contentClassName="container mx-auto px-4 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Artworks Gallery</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Discover unique pieces that capture the essence of African culture and contemporary art
          </p>
        </div>
      </ParallaxSection>

      {/* Artworks Grid */}
      <div className="container mx-auto px-4 py-20">
        <ArtworksListParallax artworks={artworks} />
        <div className="mt-10">
          {page && (
            <Pagination>
              <PaginationContent>
                {page && page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={`${pageUrl}?page=${page - 1}`} />
                  </PaginationItem>
                )}
                {page && page > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationLink href={`${pageUrl}?page=${1}`}>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  </>
                )}
                {page > 1 && (
                  <PaginationItem>
                    <PaginationLink href={`${pageUrl}?page=${page - 1}`}>{page - 1}</PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink href={`${pageUrl}?page=${page}`} isActive>
                    {page}
                  </PaginationLink>
                </PaginationItem>
                {page < totalPages && (
                  <PaginationItem>
                    <PaginationLink href={`${pageUrl}?page=${page + 1}`}>{page + 1}</PaginationLink>
                  </PaginationItem>
                )}
                {page < totalPages - 2 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href={`${pageUrl}?page=${totalPages}`}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`${pageUrl}?page=${page + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  )
}
