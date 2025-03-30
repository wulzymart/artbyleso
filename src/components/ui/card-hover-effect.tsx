'use client'
import { cn } from '@/utilities/ui'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    bgUrl: string
    link: string
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-8 py-10 w-full', className)}>
      {items.map((item, idx) => {
        const { bgUrl } = item
        return (
          <Link
            href={item?.link}
            key={item?.link}
            className="relative group  block p-2 h-full w-full md:w-fit"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full  md:w-md bg-amber-900 dark:bg-amber-200/[0.8] block  rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card
              className={`h-[600px] flex items-center justify-center w-full md:w-md`}
              style={{ backgroundImage: `url('${bgUrl}')`, backgroundSize: 'cover' }}
            >
              <CardTitle>{item.title}</CardTitle>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

export const Card = ({
  className,
  children,
  style,
}: {
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
}) => {
  return (
    <div
      style={style}
      className={cn(
        'rounded-2xl h-full w-full p-4 overflow-hidden border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 hover:scale-101 hover:rotate-3 transition-all duration-300 ease-in-out',
        className,
      )}
    >
      <div className="relative z-50 bg-black/40 hover:bg-amber-100/20 hover:bg-blend-color-dodge hover:rounded-2xl">
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
export const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <h4 className={cn('text-zinc-100 font-bold tracking-wide mt-4 text-2xl', className)}>
      {children}
    </h4>
  )
}
