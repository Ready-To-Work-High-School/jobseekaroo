
/**
 * Utility to preload critical assets
 */

/**
 * Preload an image
 * @param src The source URL of the image to preload
 * @returns A promise that resolves when the image is loaded
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Preload multiple images
 * @param srcs Array of image URLs to preload
 * @returns A promise that resolves when all images are loaded
 */
export const preloadImages = (srcs: string[]): Promise<void[]> => {
  return Promise.all(srcs.map(preloadImage));
};

/**
 * Preload critical assets for the application
 * Call this function early in the application lifecycle
 */
export const preloadCriticalAssets = async (): Promise<void> => {
  // Preload the most important images
  const criticalImages = [
    "/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png", // Logo
    // Add other critical images here
  ];
  
  try {
    await preloadImages(criticalImages);
    console.log('Critical images preloaded successfully');
  } catch (error) {
    console.error('Error preloading critical images:', error);
  }
};
