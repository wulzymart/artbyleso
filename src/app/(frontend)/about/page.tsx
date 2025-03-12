import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-radial from-gray-500 to-amber-800 text-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <Image
          src="/leso.jpg"
          alt="Artist banner"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <h1 className="text-6xl md:text-7xl font-bold text-center px-4 tracking-tight drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
              Oluwatosin Ayeleso
            </span>
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-amber-500/30 flex-shrink-0">
              <Image
                src="/leso1.jpg"
                alt="Artist portrait"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-amber-400">Who I Am</h2>
              <p className="text-xl leading-relaxed mb-4">
                I am <span className="font-semibold text-amber-300">Oluwatosin Ayeleso</span>, a
                multilateral contemporary artist from Nigeria, known for my vibrant & bold styles.
              </p>
            </div>
          </div>

          <div className="space-y-8 prose prose-lg prose-invert max-w-none">
            <div className="bg-black/20 p-6 rounded-lg border-l-4 border-amber-500">
              <p className="text-lg leading-relaxed italic">
                "My art is inspired by the economy effect and influence on people, my everyday life
                & African culture. I believe that creativity is a gift given to us by God, which in
                return must be nurtured and practised."
              </p>
            </div>

            <p className="text-lg">
              With the stroke of my brushes & my ability to work with different mediums such as
              paints & mix media, I have found an avenue to express myself freely and let my
              imagination take the lead. My art is an expression of my own world; I get inspirations
              from colour details, shapes, and patterns and infuse these into my subjects.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <div className="bg-black/30 p-6 rounded-lg hover:bg-black/40 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-amber-400 mb-3">Inspiration</h3>
                <p>
                  I draw inspiration from the rich tapestry of African culture, everyday life
                  experiences, and the economic influences on people.
                </p>
              </div>
              <div className="bg-black/30 p-6 rounded-lg hover:bg-black/40 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-amber-400 mb-3">Technique</h3>
                <p>
                  Working with various mediums including paints and mixed media, I create vibrant
                  pieces that tell compelling stories.
                </p>
              </div>
              <div className="bg-black/30 p-6 rounded-lg hover:bg-black/40 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-amber-400 mb-3">Vision</h3>
                <p>
                  Through my art, I hope to share a journey of self-exploration, progression &
                  acceptance with everyone who experiences my work.
                </p>
              </div>
            </div>

            <p className="text-lg">
              I encourage everyone to recognize the beauty around us & the richness in our culture,
              as a way to develop proficiency in art. My work invites viewers to explore the vibrant
              expressions of life through my unique perspective.
            </p>

            <div className="mt-12 text-center">
              <p className="text-2xl font-light italic text-amber-300">
                "Through my art, I hope to share with you a journey of self-exploration, progression
                & acceptance."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
