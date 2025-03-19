import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Artworks from '@/components/works/artworks_list'
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

  return (
    <main className="min-h-screen bg-radial from-gray-500 to-amber-800 text-white py-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">{title}</h1>
        <p className="text-lg mb-8  text-center">{description}</p>
        {works && works.length > 0 ? (
          <Artworks artworks={works} />
        ) : (
          <div className="w-full h-96 flex items-center justify-center">
            No artworks available in this collection yet
          </div>
        )}
      </div>
    </main>
  )
}
