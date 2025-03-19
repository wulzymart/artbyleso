import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import CollectionCard from '@/components/works/collection_card'

export default async function CollectionsPage() {
  const payload = await getPayload({ config })
  const { docs: collections } = await payload.find({ collection: 'collections' })

  return (
    <div className="min-h-screen bg-radial from-gray-500 to-amber-800 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Art Collections</h1>
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-x-24 md:gap-y-24">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </div>
  )
}
