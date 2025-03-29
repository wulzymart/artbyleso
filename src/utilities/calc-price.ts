import { Artwork } from '@/payload-types'
import { number } from 'zod'

export const calculateDiscount = (price: number, discountedPrice?: number | null) => {
  if (price && discountedPrice) {
    return Math.round(((price - discountedPrice) / price) * 100)
  }
  return 0
}

export const getCurrentPrice = (
  artwork: Artwork,
  isPrintVersion = false,
  salePercentage?: number,
) => {
  if (isPrintVersion && artwork.printVersion) {
    const originalPrice = artwork.printVersion.price!
    return {
      originalPrice: artwork.printVersion.price!,
      discountedPrice: salePercentage
        ? originalPrice - (salePercentage / 100) * originalPrice
        : artwork.printVersion.discountedPrice,
      discount: calculateDiscount(
        artwork.printVersion.price || 0,
        artwork.printVersion.discountedPrice,
      ),
    }
  }
  const originalPrice = artwork.originalPrice
  return {
    originalPrice: artwork.originalPrice,
    discountedPrice: salePercentage
      ? originalPrice - (salePercentage / 100) * originalPrice
      : artwork.discountedPrice,
    discount: calculateDiscount(artwork.originalPrice, artwork.discountedPrice),
  }
}
