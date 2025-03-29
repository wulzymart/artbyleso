import { getPayload } from 'payload'
import { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import config from '@payload-config'
import CollectionCardParallax from '@/components/works/collection-card-parallax'
import { ParallaxSection } from '@/components/ui/parallax-section'

export const metadata: Metadata = {
  title: 'Art Collections | Leso Originals',
  description:
    'Explore our curated collections of unique artworks that showcase African culture and heritage. Browse themed art collections by Oluwatosin Ayeleso.',
  openGraph: mergeOpenGraph({
    title: 'Art Collections | Leso Originals',
    description:
      'Explore our curated collections of unique artworks that showcase African culture and heritage.',
    images: [
      {
        url: '/art1.jpg',
        width: 1200,
        height: 630,
        alt: 'Leso Originals Art Collections',
      },
    ],
  }),
}

export default async function CollectionsPage() {
  const payload = await getPayload({ config })
  const { docs: collections } = await payload.find({
    collection: 'collections',
    sort: '-createdAt',
  })

  return (
    <div className="min-h-screen text-gray-700">
      {/* Hero Section with Parallax */}
      <ParallaxSection
        bgImage="/art1.jpg"
        speed={0.3}
        overlay={true}
        overlayColor="#000"
        overlayOpacity={0.7}
        className="min-h-[70vh] flex items-center"
        contentClassName="container mx-auto px-4 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Art Collections</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Explore our curated collections of unique artworks that showcase African culture and
            heritage
          </p>
        </div>
      </ParallaxSection>

      {/* Collections Grid */}
      <div className="container mx-auto px-4 py-20">
        {collections.map((collection, i) => (
          <CollectionCardParallax key={i} collection={collection} />
        ))}
      </div>
    </div>
  )
}
