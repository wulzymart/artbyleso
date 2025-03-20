'use client'

import React, { useRef, useEffect, useState, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/utilities/ui'

interface ParallaxSectionProps {
  children: ReactNode
  bgImage?: string
  bgColor?: string
  speed?: number
  className?: string
  contentClassName?: string
  overlay?: boolean
  overlayColor?: string
  overlayOpacity?: number
  direction?: 'up' | 'down'
}

export function ParallaxSection({
  children,
  bgImage,
  bgColor = 'transparent',
  speed = 0.5,
  className,
  contentClassName,
  overlay = false,
  overlayColor = 'black',
  overlayOpacity = 0.5,
  direction = 'up',
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)

  const { scrollY } = useScroll()

  // Calculate the parallax effect based on scroll position
  const y = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    direction === 'up' ? [speed * 100, -speed * 100] : [-speed * 100, speed * 100],
  )

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const updatePosition = () => {
      const { top } = element.getBoundingClientRect()
      setElementTop(top + window.scrollY)
      setClientHeight(window.innerHeight)
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('resize', updatePosition)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn('relative overflow-hidden', className)}
      style={{ backgroundColor: bgColor }}
    >
      {bgImage && (
        <motion.div
          className="absolute inset-0 w-full h-full bg-cover bg-center -z-10"
          style={{
            backgroundImage: `url(${bgImage})`,
            y,
          }}
        />
      )}

      {overlay && (
        <div
          className="absolute inset-0 w-full h-full -z-5"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          }}
        />
      )}

      <div className={cn('relative z-10', contentClassName)}>{children}</div>
    </section>
  )
}
