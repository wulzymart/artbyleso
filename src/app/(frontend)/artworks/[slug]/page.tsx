// page.tsx - Server Component
import React from 'react'
import ImageGallery from './product_gallery'
import ActionComponent from './action_component'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import { ParallaxSection } from '@/components/ui/parallax-section'
import { motion } from 'framer-motion'

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
            {description ? (
              <RichText data={description} />
            ) : (
              'A unique piece of art that tells a story'
            )}
          </p>
        </div>
      </ParallaxSection>

      {/* Artwork Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-amber-100/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery Section */}
            <div className="lg:w-1/2 p-6">
              <div>
                <ImageGallery images={imgs} title={title} />
              </div>
            </div>

            {/* Product Info Section */}
            <div className="lg:w-1/2 p-8 bg-black/40">
              <div className="h-full flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

                <div className="mb-6">
                  <div className="flex flex-col mb-2">
                    <p className="text-xl font-semibold text-amber-200">
                      ₦{(price || 0).toFixed(2)}
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full w-fit text-xs font-medium ${(inventory || 0) > 3 ? 'bg-green-500 text-white' : (inventory || 0) > 0 ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}
                    >
                      {(inventory || 0) > 3
                        ? 'In Stock'
                        : (inventory || 0) > 0
                          ? `Only ${inventory || 0} left`
                          : 'Sold Out'}
                    </span>
                  </div>
                </div>

                <div className="mb-8 flex-grow">
                  <h3 className="text-xl font-medium text-white mb-3">About this Artwork</h3>
                  <div className="text-gray-300 prose prose-invert">
                    <RichText data={description} />
                  </div>
                </div>

                {/* Quantity Selector and Add to Cart */}
                <div className="mt-auto">
                  <ActionComponent artwork={artwork} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtworkProductPage
