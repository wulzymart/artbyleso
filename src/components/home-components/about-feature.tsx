import Image from 'next/image'
import React from 'react'

const AboutFeature = () => {
  return (
    <section className="container mx-auto py-20 md:flex md:justify-center md:space-x-8 space-y-8">
      <div className="md:w-1/2 flex items-center justify-center">
        <p className="mt-4 text-xl w-1/2 mx-auto">
          Hi, my name is John Doe and I am a visual artist based in New York City. I have been
          working as a professional artist for over 20 years and have had my work shown in numerous
          exhibitions around the world.
        </p>
      </div>
      <div className="md:w-1/3 h-[650px] sm:h-[800px] md:h-[500px] lg:h-[650px] xl:h-[700px] p-10 rounded-3xl relative hover:scale-110 md:rotate-6 transition-all duration-300">
        <Image
          fill
          alt="leso arts Tosin Leso"
          className="rounded-3xl shadow-lg border-8 border-solid border-accent"
          src="/leso.jpg"
        />
      </div>
    </section>
  )
}

export default AboutFeature
