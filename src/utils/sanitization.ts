
/**
 * Sanitizes a string for use as a URL parameter
 * @param input - The input string to sanitize
 * @returns The sanitized string safe for URL parameters
 */
export const sanitizeUrlParam = (input: string): string => {
  return encodeURIComponent(input.trim());
};

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param input - The HTML content to sanitize
 * @returns The sanitized HTML content
 */
export const sanitizeHtml = (input: string): string => {
  // Basic HTML sanitization - in production, use a library like DOMPurify
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};
