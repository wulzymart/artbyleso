// page.tsx - Server Component
import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { getPayload } from 'payload'
import config from '@payload-config'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ParallaxSection } from '@/components/ui/parallax-section'
import { Media } from '@/components/Media'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const payload = await getPayload({ config })
  const { slug } = await params

  const {
    docs: [portfolio],
  } = await payload.find({
    collection: 'portfolios',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!portfolio) return {}

  return {
    title: `${portfolio.title} | Leso Originals Portfolio`,
    description: portfolio.description,
  }
}

export default async function PortfolioPage({ params }: Props) {
  const payload = await getPayload({ config })
  const { slug } = await params

  const {
    docs: [portfolio],
  } = await payload.find({
    collection: 'portfolios',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2, // To get nested media objects
  })

  if (!portfolio) return notFound()

  // Get the first image for the hero background if available
  const heroImage =
    portfolio.images && portfolio.images.length > 0
      ? typeof portfolio.images[0]?.image === 'object' && portfolio.images[0].image.url
        ? portfolio.images[0].image.url
        : '/art2.jpg' // Fallback image
      : '/art2.jpg' // Fallback image

  return (
    <div className="min-h-screen text-gray-600">
      {/* Portfolio Hero with Parallax */}
      <ParallaxSection
        speed={0.2}
        overlay={true}
        overlayColor="#000"
        overlayOpacity={0.7}
        className="min-h-[60vh] flex items-center"
        contentClassName="container mx-auto px-4 py-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{portfolio.title}</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">{portfolio.description}</p>
        </div>
      </ParallaxSection>

      {/* Portfolio Gallery */}

      <div className="container mx-auto px-4 py-16">
        <Carousel>
          <CarouselContent>
            {portfolio.images.map((image, i) => (
              <CarouselItem key={i}>
                <div className="w-sm md:w-3xl  mx-auto h-[800px]">
                  <div className="w-full h-[90%] relative">
                    <Media resource={image.image} fill />
                  </div>
                  <p className="mt-5 justify-center">{image.caption}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="mb-8">
          <Link
            href="/portfolios"
            className="text-primary hover:text-primary-dark transition-colors inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Portfolios
          </Link>
        </div>
      </div>
    </div>
  )
}
