
/**
 * Utility functions for optimizing images
 */

/**
 * Create responsive image URLs with width-based variants
 * @param baseUrl The original image URL
 * @param widths Array of widths to generate images for
 * @returns Object containing URLs for each width variant
 */
export const generateResponsiveImageSources = (
  baseUrl: string,
  widths: number[] = [320, 640, 960, 1280, 1920]
): {
  srcset: string;
  sources: string[];
} => {
  // Extract file name and extension
  const lastDotIndex = baseUrl.lastIndexOf('.');
  if (lastDotIndex === -1) {
    // No extension found
    return { srcset: baseUrl, sources: [baseUrl] };
  }

  const fileName = baseUrl.substring(0, lastDotIndex);
  const fileExt = baseUrl.substring(lastDotIndex);

  // Generate sources for each width
  const sources = widths.map(w => `${fileName}-${w}w${fileExt} ${w}w`);
  
  // Join into srcset format
  const srcset = sources.join(', ');

  return { srcset, sources };
};

/**
 * Determine appropriate image sizes attribute based on element placement and importance
 * @param placement Where the image appears in the layout
 * @returns Appropriate sizes attribute string
 */
export const getImageSizes = (
  placement: 'hero' | 'card' | 'logo' | 'thumbnail' | 'gallery' | 'badge' = 'card'
): string => {
  switch (placement) {
    case 'hero':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1280px';
    case 'logo':
      return '(max-width: 640px) 112px, 128px';
    case 'badge':
      return '(max-width: 640px) 80px, (max-width: 1024px) 120px, 180px';
    case 'thumbnail':
      return '(max-width: 640px) 150px, (max-width: 1024px) 200px, 320px';
    case 'gallery':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'card':
    default:
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px';
  }
};

/**
 * Get the appropriate native dimensions for common image types
 * @param type The type of image
 * @returns Object with width and height
 */
export const getImageDimensions = (
  type: 'logo' | 'badge' | 'banner' | 'thumbnail' | 'avatar' = 'thumbnail'
): { width: number; height: number } => {
  switch (type) {
    case 'logo':
      return { width: 128, height: 128 };
    case 'badge':
      return { width: 180, height: 180 };
    case 'banner':
      return { width: 1280, height: 400 };
    case 'avatar':
      return { width: 80, height: 80 };
    case 'thumbnail':
    default:
      return { width: 320, height: 240 };
  }
};
