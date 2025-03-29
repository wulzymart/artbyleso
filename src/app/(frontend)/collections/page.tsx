import { getPayload } from 'payload'
import config from '@payload-config'
import CollectionCardParallax from '@/components/works/collection-card-parallax'
import { ParallaxSection } from '@/components/ui/parallax-section'

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
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-x-12 md:gap-y-16">
          {collections.map((collection) => (
            <CollectionCardParallax key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </div>
  )
}
