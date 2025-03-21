import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import ArtworksListParallax from '@/components/works/artworks-list-parallax'
import { ParallaxSection } from '@/components/ui/parallax-section'

type Args = {
  params: Promise<{
    slug: string[]
  }>
}
export default async function CollectionPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const {
    docs: [collection],
  } = await payload.find({
    collection: 'collections',
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      artworks: true,
      title: true,
      featuredImage: true,
      description: true,
    },
  })
  if (!collection) throw notFound()

  const { title, description, artworks } = collection
  const getWorks = () =>
    artworks?.docs
      ?.map((work) => {
        if (typeof work === 'string') throw new Error('Invalid artwork')
        return work
      })
      .map(async (work) => ({
        ...work,
        images: await Promise.all(
          work.images?.map(async (image) => {
            const img = await payload.findByID({
              collection: 'media',
              id: image.image as string,
            })

            return { ...image, image: img }
          }),
        ).then((values) => values),
      }))
  const worksPromise = await getWorks()
  const works = await Promise.all(worksPromise!.map((p) => p.then((v) => v)))

  // Get the featured image for the collection header
  const featuredImage =
    typeof collection.featuredImage === 'string' ? null : collection.featuredImage

  return (
    <main className="min-h-screen text-gray-600">
      {/* Collection Hero with Parallax */}
      <ParallaxSection
        bgImage={featuredImage?.url || '/art1.jpg'}
        speed={0.3}
        overlay={true}
        overlayColor="#000"
        overlayOpacity={0.6}
        className="min-h-[60vh] flex items-center"
        contentClassName="container mx-auto px-4 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{title}</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">{description}</p>
        </div>
      </ParallaxSection>

      {/* Collection Artworks */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Artworks in this Collection</h2>

        {works && works.length > 0 ? (
          <ArtworksListParallax artworks={works} />
        ) : (
          <div className="w-full h-96 flex items-center justify-center bg-black/20 rounded-lg">
            <p className="text-xl text-gray-300">No artworks available in this collection yet</p>
          </div>
        )}
      </div>
    </main>
  )
}
