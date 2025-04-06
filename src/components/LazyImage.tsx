
import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholderSrc?: string;
  onLoad?: () => void;
  priority?: boolean; // Add priority prop for critical images
}

const LazyImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E",
  onLoad,
  priority = false, // Default to false
}: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(priority ? src : placeholderSrc);
  const [imageLoaded, setImageLoaded] = useState(priority);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    // If image is priority, load it immediately
    if (priority) {
      setImageSrc(src);
      return;
    }

    let observer: IntersectionObserver;
    let isUnmounted = false;

    if (imageRef.current && src) {
      if ('loading' in HTMLImageElement.prototype) {
        // Browser supports loading="lazy"
        setImageSrc(src);
      } else {
        // Use IntersectionObserver as fallback
        observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !isUnmounted) {
              setImageSrc(src);
              observer.unobserve(entry.target);
            }
          });
        }, {
          rootMargin: '200px 0px', // Start loading when image is 200px from viewport
        });
        
        observer.observe(imageRef.current);
      }
    }
    
    return () => {
      isUnmounted = true;
      if (observer && imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [src, priority]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${!imageLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      onLoad={handleImageLoad}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
};

export default LazyImage;
