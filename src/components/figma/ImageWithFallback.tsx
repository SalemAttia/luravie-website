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

  // Static imports (StaticImageData) are bundled locally and don't need loading/retry logic
  const isStatic = typeof src === 'object' && src !== null && 'src' in src

  const srcUrl = isStatic ? (src as any).src : (src as string);

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
        setDidError(false)
        setIsLoading(true)
      }, RETRY_DELAY)
    } else {
      setIsLoading(false)
      setDidError(true)
    }
  }, [])

  // Static images (logo, local assets) — render plain img, no loading skeleton
  if (isStatic) {
    return (
      <img
        src={srcUrl}
        alt={alt}
        className={className}
        style={style}
        {...rest}
      />
    )
  }

  // Remote images — show loading skeleton + retry logic
  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={srcUrl} />
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className ?? ''}`} style={style}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
        </div>
      )}
      <img
        key={`${srcUrl}-${retryCount.current}`}
        src={srcUrl}
        alt={alt}
        className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ objectFit: 'inherit' }}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    </div>
  )
}
