import { Collection, Media } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React from 'react'
import { Media as MediaComponent } from '../Media'
import { Button } from '../ui/button'
import Link from 'next/link'

const CollectionImage = ({ bgImage }: { bgImage: Media }) => {
  return (
    <div className="max-w-sm w-full group/card">
      <div
        className={cn(
          ' cursor-pointer h-[500px] overflow-hidden relative card rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4',
          'bg-cover',
        )}
      >
        <MediaComponent resource={bgImage} fill />
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60 z-50"></div>
      </div>
    </div>
  )
}
const CollectionCard = ({ collection }: { collection: Collection }) => {
  const { featuredImage, description, title } = collection
  if (typeof featuredImage === 'string') throw new Error('Invalid image type')
  return (
    <div className="w-sm flex flex-col items-center justify-center gap-4">
      <CollectionImage bgImage={featuredImage} />
      <h4>{title}</h4>
      <small></small>
      <Link href={`/collections/${collection.slug}`}>
        <Button>Shop Now</Button>
      </Link>
    </div>
  )
}
export default CollectionCard
