import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-amber-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8 text-center">Who I am </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <p className="text-lg leading-relaxed">
              I am Oluwatosin Ayeleso, a multilateral contemporary artist from Nigeria.
            </p>
            <p className="text-lg leading-relaxed">
              I am known for my vibrant & bold styles. My art is inspired by the economy effect and
              influence on people, my everyday life & African culture. I believe that creativity is
              a gift given to us by God, which in return must be nurtured and practised. With the
              stroke of my brushes & my ability to work with different mediums such as paints & mix
              media, I have found an avenue to express myself freely and let my imagination take the
              lead. My art is an expression of my own world; I also get inspirations from colour
              details, shapes, or patterns and infuses these into my subjects. She encourages us to
              recognise the beauty around us & the richness in our culture, as a way to develop
              proficiency in the art. Through her art, she hopes to share with you a journey of
              self- exploration, progression & acceptance.
            </p>
            <p className="text-lg leading-relaxed">
              I believe that creativity is a gift given to us by God, which in return must be
              nurtured and practised. With the stroke of my brushes & my ability to work with
              different mediums such as paints & mix media, I have found an avenue to express myself
              freely and let my imagination take the lead. My art is an expression of my own world.
              I also get inspirations from colour details, shapes, or patterns and infuses these
              into my subjects. She encourages us to recognise the beauty around us & the richness
              in our culture, as a way to develop proficiency in the art. Through her art, she hopes
              to share with you a journey of self- exploration, progression & acceptance.
            </p>
            <p className="text-lg leading-relaxed">
              I encourages everyone to recognise the beauty around us & the richness in our culture,
              as a way to develop proficiency in the art. Through her art, she hopes to share with
              you a journey of self- exploration, progression & acceptance.
            </p>
            <p className="text-lg leading-relaxed">
              Through my art, I hope to share with you a journey of self- exploration,
              progression & acceptance.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative w-96 h-96 rounded-full overflow-hidden shadow-2xl">
              <Image
                src="/leso1.jpg"
                alt="Artist portrait"
                width={384}
                height={384}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
