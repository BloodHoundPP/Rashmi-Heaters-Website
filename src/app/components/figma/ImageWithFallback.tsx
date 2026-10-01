import React, { useState, useEffect } from 'react'
import defaultCategoryImage from '../../../imports/Customized_heater.png'
import { autoTrimImageUrl } from '../../lib/imageTrim'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  autoTrim?: boolean;
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const [trimmedSrc, setTrimmedSrc] = useState<string | null>(null)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, loading = "lazy", decoding = "async", autoTrim = true, ...rest } = props
  const baseSrc = didError ? defaultCategoryImage : (src && typeof src === 'string' && src.trim() ? src : defaultCategoryImage)

  useEffect(() => {
    setDidError(false)
    if (!autoTrim || !src || typeof src !== 'string' || src.startsWith('data:') || src.includes('.svg')) {
      setTrimmedSrc(null)
      return
    }

    let isMounted = true
    autoTrimImageUrl(src).then((trimmed) => {
      if (isMounted && trimmed && trimmed !== src) {
        setTrimmedSrc(trimmed)
      }
    }).catch(() => {})

    return () => {
      isMounted = false
    }
  }, [src, autoTrim])

  const resolvedSrc = trimmedSrc || baseSrc

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={resolvedSrc} alt={alt ?? 'Fallback image'} loading={loading} decoding={decoding} {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={resolvedSrc} alt={alt} className={className} style={style} loading={loading} decoding={decoding} {...rest} onError={handleError} />
  )
}
