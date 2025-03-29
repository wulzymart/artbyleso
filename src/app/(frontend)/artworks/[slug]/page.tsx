// page.tsx - Server Component
import React from 'react'

import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { ParallaxSection } from '@/components/ui/parallax-section'
import ArtworkProduct from './product_component'

type Args = {
  params: Promise<{
    slug: string[]
  }>
}

const ArtworkProductPage: React.FC<Args> = async ({ params }) => {
  const payload = await getPayload({ config })
  const { slug } = await params
  const {
    docs: [artwork],
  } = await payload.find({
    collection: 'artworks',
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  if (!artwork) throw notFound()
  const {
    mainImage,
    additionalImages,
    description,
    title,
    originalPrice,
    discountedPrice,
    inStock,
  } = artwork
  const imgs = [mainImage, ...(additionalImages || [])].map((img) => {
    if (!img || !(typeof img === 'object')) throw new Error('Invalid image')
    return img
  })

  // Get the first image for the hero background
  const heroImage = imgs.length > 0 ? imgs[0]!.url : '/art2.jpg'

  return (
    <div className="min-h-screen text-gray-600">
      {/* Artwork Hero with Parallax */}
      <ParallaxSection
        bgImage={heroImage!}
        speed={0.2}
        overlay={true}
        overlayColor="#000"
        overlayOpacity={0.7}
        className="min-h-[60vh] flex items-center"
        contentClassName="container mx-auto px-4 py-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{title}</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            {description ? <p>{description}</p> : 'A unique piece of art that tells a story'}
          </p>
        </div>
      </ParallaxSection>

      {/* Artwork Content */}
      <ArtworkProduct artwork={artwork} />
    </div>
  )
}

export default ArtworkProductPage
