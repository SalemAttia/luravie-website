import React, { useState, useCallback, useRef, useEffect } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

const MAX_RETRIES = 2
const RETRY_DELAY = 1500

interface ImageWithFallbackProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: any;
  eager?: boolean;
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const { src, alt, style, className, eager, ...rest } = props

  // Handle Next.js StaticImageData
  const srcUrl = typeof src === 'object' && src !== null && 'src' in src
    ? (src as any).src
    : (src as string);

  const [isLoading, setIsLoading] = useState(true)
  const [didError, setDidError] = useState(false)
  const retryCount = useRef(0)
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Reset state when src changes
  useEffect(() => {
    setIsLoading(true)
    setDidError(false)
    retryCount.current = 0
    if (retryTimer.current) {
      clearTimeout(retryTimer.current)
      retryTimer.current = null
    }
  }, [srcUrl])

  useEffect(() => {
    return () => {
      if (retryTimer.current) clearTimeout(retryTimer.current)
    }
  }, [])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    setDidError(false)
  }, [])

  const handleError = useCallback(() => {
    if (retryCount.current < MAX_RETRIES) {
      retryCount.current += 1
      retryTimer.current = setTimeout(() => {
        // Force re-render by toggling error state
        setDidError(false)
        setIsLoading(true)
      }, RETRY_DELAY)
    } else {
      setIsLoading(false)
      setDidError(true)
    }
  }, [])

  if (didError) {
    return (
      <img
        src={ERROR_IMG_SRC}
        alt="Error loading image"
        className={className}
        style={style}
        data-original-url={srcUrl}
        {...rest}
      />
    )
  }

  return (
    <img
      key={`${srcUrl}-${retryCount.current}`}
      src={srcUrl}
      alt={alt}
      className={`${className ?? ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      style={style}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      onLoad={handleLoad}
      onError={handleError}
      {...rest}
    />
  )
}
