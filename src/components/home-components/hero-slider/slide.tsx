import React from 'react'
import { SliderItem } from './slider-data'
import Link from 'next/link'
import { Button } from '../../ui/button'

export const Slide = ({ info, bgImage, title, buttonTitle, link }: SliderItem) => {
  return (
    <div>
      <div
        className="w-full h-[450px] md:h-[500px] lg:h-screen overflow-hidden relative bg-cover"
        style={{ backgroundImage: 'url(' + bgImage + ')' }}
      >
        <div className="bg-black/70 w-full absolute h-full"></div>
        <div className="w-full h-full absolute flex flex-col justify-end p-8 md:px-28 pb-20">
          <div className="flex flex-col gap-10">
            <h3 className="text-white uppercase tracking-wider text-[25px] md:text-4xl font-black">
              {title}
            </h3>
            <p className="w-full md:w-3/4 lg:w-2/3 text-gray-100 md:text-xl leading-6 md:leading-8">
              {info}
            </p>
            <Link href={link}>
              <Button
                variant="outline"
                size="lg"
                className="py-8 min-w-[150px] px-4 rounded-lg text-lg font-bold border-2 border-solid border-[var(--accent)] bg-transparent text-[var(--accent)] hover:text-white hover:bg-amber-500 cursor-pointer"
              >
                {buttonTitle}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
