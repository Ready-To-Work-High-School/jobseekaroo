
import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholderSrc?: string;
  onLoad?: () => void;
  priority?: boolean; // Add priority flag for critical images
  webpSrc?: string; // Add support for WebP format
  avifSrc?: string; // Add support for AVIF format
}

const LazyImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E",
  onLoad,
  priority = false,
  webpSrc,
  avifSrc,
}: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(priority ? src : placeholderSrc);
  const [imageLoaded, setImageLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    let observer: IntersectionObserver;
    let isUnmounted = false;

    // If priority is true, load immediately
    if (priority) {
      setImageSrc(src);
      return;
    }

    if (imageRef.current && src) {
      try {
        if ('loading' in HTMLImageElement.prototype) {
          // Browser supports loading="lazy"
          setImageSrc(src);
        } else {
          // Use IntersectionObserver as fallback
          observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !isUnmounted) {
                setImageSrc(src);
                observer?.unobserve(entry.target);
              }
            });
          }, {
            rootMargin: '200px 0px', // Start loading when image is 200px from viewport
          });
          
          observer.observe(imageRef.current);
        }
      } catch (error) {
        console.error("LazyImage intersection observer error:", error);
        // Fallback to immediate loading if error
        setImageSrc(src);
      }
    }
    
    return () => {
      isUnmounted = true;
      if (observer && imageRef.current) {
        try {
          observer.unobserve(imageRef.current);
        } catch (error) {
          console.error("Error unobserving image:", error);
        }
      }
    };
  }, [src, priority]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setHasError(false);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    setHasError(true);
    console.warn(`Failed to load image: ${src}`);
    // Fallback to placeholder if there's an error
    if (imageSrc !== placeholderSrc) {
      setImageSrc(placeholderSrc);
    }
  };

  // Common image attributes for optimal caching and performance
  const imageAttributes = {
    ref: imageRef,
    alt: alt,
    className: `${className} ${!imageLoaded && !hasError ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'} ${priority ? 'lcp-critical' : ''} cacheable`,
    width: width,
    height: height,
    loading: priority ? "eager" as const : "lazy" as const,
    fetchPriority: priority ? "high" as const : "auto" as const,
    decoding: priority ? "sync" as const : "async" as const,
    onLoad: handleImageLoad,
    onError: handleImageError,
    // Add Cache-Control hints via data attributes (for documentation, not functional)
    'data-cache-control': 'max-age=31536000, immutable'
  };

  // If we have modern format sources, use picture element
  if (avifSrc || webpSrc) {
    return (
      <picture>
        {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          src={hasError ? placeholderSrc : imageSrc}
          {...imageAttributes}
        />
      </picture>
    );
  }

  // Fall back to standard img if no modern formats provided
  return (
    <img
      src={hasError ? placeholderSrc : imageSrc}
      {...imageAttributes}
    />
  );
};

export default LazyImage;
