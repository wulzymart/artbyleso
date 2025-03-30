import React from 'react'
import Link from 'next/link'
import { Portfolio } from '@/payload-types'
import { Media } from '../Media'

interface PortfoliosListParallaxProps {
  portfolios: Portfolio[]
}

const PortfoliosListParallax: React.FC<PortfoliosListParallaxProps> = ({ portfolios }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {portfolios.map((portfolio) => {
        // Get the first image as the thumbnail if available
        const thumbnailImage =
          portfolio.images && portfolio.images.length > 0
            ? typeof portfolio.images[0]?.image === 'object' && portfolio.images[0].image
              ? portfolio.images[0].image
              : '/art2.jpg' // Fallback image
            : '/art2.jpg' // Fallback image

        return (
          <Link
            href={`/portfolio/${portfolio.slug}`}
            key={portfolio.id}
            className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
          >
            <div className="relative h-96 w-full overflow-hidden">
              <Media
                resource={thumbnailImage}
                alt={portfolio.title}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>
            <div className="p-6 bg-white flex-grow">
              <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-primary transition-colors">
                {portfolio.title}
              </h3>
              <p className="text-gray-600 line-clamp-3">{portfolio.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(portfolio.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="text-primary font-medium group-hover:underline">
                  View Portfolio
                </span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default PortfoliosListParallax
