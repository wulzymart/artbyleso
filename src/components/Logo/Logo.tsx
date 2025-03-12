import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  height?: number
  width?: number
  src: string
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    width,
    height,
    src,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Leso originals"
      width={width || 193}
      height={height || 34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx(`max-w-[9.375rem] w-full h-[${height || 34}px]`, className)}
      src={src}
    />
  )
}
