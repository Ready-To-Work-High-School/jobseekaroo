
/**
 * Comprehensive sanitization utilities to prevent XSS attacks
 */

/**
 * Sanitizes text input to prevent XSS attacks
 * Handles various attack vectors including:
 * - Script tags
 * - Event handlers (onerror, onload, etc.)
 * - JavaScript URIs
 * - Other potentially dangerous HTML
 */
export const sanitizeHtml = (input: string | null | undefined): string => {
  if (input == null) return '';
  
  // Convert the input to a string if it's not already
  const str = String(input);
  
  return str
    // Replace < and > with HTML entities
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Replace quotes to prevent attribute breaking
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    // Replace parentheses to prevent JavaScript execution
    .replace(/\(/g, '&#40;')
    .replace(/\)/g, '&#41;')
    // Replace equals sign to prevent attribute assignment
    .replace(/=/g, '&#61;')
    // Replace backticks to prevent template literals
    .replace(/`/g, '&#96;');
};

/**
 * Escapes HTML entities for safely inserting content as text
 * This is a simplified version of sanitizeHtml for cases where
 * only < and > need to be escaped
 */
export const escapeHtml = (input: string | null | undefined): string => {
  if (input == null) return '';
  
  return String(input)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

/**
 * Sanitizes an object's string properties recursively
 * Fixed to properly handle TypeScript generics
 */
export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Create a new object of the same type to hold sanitized values
  const result = {} as Record<string, any>;

  Object.keys(obj).forEach(key => {
    const value = obj[key];
    
    if (typeof value === 'string') {
      result[key] = sanitizeHtml(value);
    } else if (Array.isArray(value)) {
      result[key] = value.map(item => 
        typeof item === 'object' && item !== null ? sanitizeObject(item) : 
        typeof item === 'string' ? sanitizeHtml(item) : item
      );
    } else if (typeof value === 'object' && value !== null) {
      result[key] = sanitizeObject(value);
    } else {
      result[key] = value;
    }
  });

  return result as T;
};

/**
 * Creates a safe HTML attribute value
 */
export const safeAttr = (value: string): string => {
  return value.replace(/[^\w\s-]/gi, '');
};

/**
 * Tests if a string contains potential XSS vectors
 */
export const containsXssVector = (input: string): boolean => {
  if (!input) return false;
  
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // script tags
    /javascript:/gi, // javascript: URLs
    /\bon\w+\s*=/gi, // event handlers
    /<iframe/gi, // iframes
    /<embed/gi, // embed tags
    /<object/gi, // object tags
    /expression\s*\(/gi, // CSS expressions
    /url\s*\(/gi, // CSS url function
    /data:/gi, // data: URLs
    /vbscript:/gi, // vbscript: URLs
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(input));
};
