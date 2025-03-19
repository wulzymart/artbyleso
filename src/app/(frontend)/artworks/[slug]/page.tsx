// page.tsx - Server Component
import React from 'react'
import ImageGallery from './product_gallery'
import ActionComponent from './action_component'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'

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
  const { images, description, title, price = 0, quantity: inventory = 0 } = artwork
  const imgs = images.map((image) => {
    if (!image.image || typeof image.image === 'string') throw notFound()
    return image.image
  })

  return (
    <div className="px-4  bg-radial from-gray-500 to-amber-800 text-white py-20">
      <div className="w-[70vw] mx-auto flex flex-col md:flex-row gap-8">
        {/* Image Gallery Section */}
        <div className="md:w-1/2">
          <ImageGallery images={imgs} title={title} />
        </div>

        {/* Product Info Section */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{title}</h1>

          <div className="mt-4">
            <p className="text-2xl font-semibold">₦{(price || 0).toFixed(2)}</p>
            <p
              className={`mt-2 text-sm ${(inventory || 0) > 3 ? 'text-green-600' : (inventory || 0) > 0 ? 'text-yellow-600' : 'text-red-600'}`}
            >
              {(inventory || 0) > 3
                ? 'In Stock'
                : (inventory || 0) > 0
                  ? `Only ${inventory || 0} left in stock - order soon`
                  : 'Currently unavailable'}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium">Description</h2>
            <RichText className="mt-2" data={description} />
          </div>

          {/* Quantity Selector - only show if artwork is available */}
          <ActionComponent artwork={artwork} />
        </div>
      </div>
    </div>
  )
}

export default ArtworkProductPage
