import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Media } from '@/components/Media'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import Artworks from '@/components/works/artworks_list'
type Args = {
  params: Promise<{}>
  searchParams: Promise<{ page?: string }>
}
export default async function ArtworksPage({ params, searchParams }: Args) {
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
    limit: 10,
    page: currentPage ? Number(currentPage) : 1,
  })
  const pageUrl = '/artworks'
  return (
    <div className="min-h-screen bg-radial from-gray-500 to-amber-800 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Artworks</h1>
        <Artworks artworks={artworks} />
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
