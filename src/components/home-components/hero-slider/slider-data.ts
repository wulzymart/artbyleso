export type SliderItem = {
  title: string
  bgImage: string
  info: string
  buttonTitle: string
  link: string
}

export const sliderData: SliderItem[] = [
  {
    title: 'Shop From Beautful Collections',
    bgImage: '/hero1.jpg',
    info: 'Explore the best collections of artworks and shop them online',
    buttonTitle: 'Shop Now',
    link: '/collections',
  },
  {
    title: 'View my works',
    bgImage: '/hero2.jpg',
    info: 'Check out my portfolio and get to know my works',
    buttonTitle: 'View Portfolio',
    link: '/portfolio',
  },
]
