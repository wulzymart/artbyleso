import { HoverEffect } from '../ui/card-hover-effect'

export function Features() {
  return (
    <div className="mx-auto md:px-8 bg-radial from-gray-300 to-amber-100">
      <HoverEffect items={projects} />
    </div>
  )
}
export const projects = [
  {
    title: 'Become a Collector',
    bgUrl: '/art1.jpg',
    link: '/collections',
  },
  {
    title: 'Buy Artworks',
    bgUrl: '/art2.jpg',
    link: '/artworks',
  },
  {
    title: 'View Portfolio',
    bgUrl: '/art3.png',
    link: '/portfolio',
  },
  {
    title: 'Events',
    bgUrl: '/event.jpg',
    link: '/events',
  },
  {
    title: 'Partner with me',
    bgUrl: '/leso1.jpg',
    link: '/contact',
  },
]
