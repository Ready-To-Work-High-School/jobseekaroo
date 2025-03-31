/**
 * Comprehensive sanitization utilities to prevent XSS attacks
 */
import DOMPurify from 'dompurify';

/**
 * Sanitizes text input to prevent XSS attacks
 * Handles various attack vectors including:
 * - Script tags
 * - Event handlers (onerror, onload, etc.)
 * - JavaScript URIs
 * - Other potentially dangerous HTML
 * 
 * @param input The string to sanitize
 * @param isEmail Optional flag to indicate email-specific sanitization
 */
export const sanitizeHtml = (input: string | null | undefined, isEmail = false): string => {
  if (input == null) return '';
  
  // Use DOMPurify for client-side sanitization
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(String(input), {
      USE_PROFILES: { html: true },
      FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'object', 'embed', 'link'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout', 'onfocus', 'onblur', 'href']
    });
  }
  
  // Special handling for emails
  const str = String(input);
  if (isEmail) {
    // For emails, strip all HTML and validate later
    return str.replace(/<[^>]*>/g, ''); // Remove tags entirely
  }
  
  // Fallback to basic sanitization for SSR contexts
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

/**
 * Generates a random CSP nonce
 */
export const generateCspNonce = (): string => {
  // Create a random nonce using crypto API if available
  if (typeof window !== 'undefined' && window.crypto) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }
  
  // Fallback for non-browser environments
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Secure SQL sanitization for values to be used in queries
 * This is a last-resort function - always use parameterized queries instead
 */
export const sanitizeSqlValue = (value: string): string => {
  if (typeof value !== 'string') return '';
  
  // Replace quotes and other SQL injection vectors
  return value
    .replace(/'/g, "''") // Escape single quotes
    .replace(/\\/g, "\\\\") // Escape backslashes
    .replace(/\0/g, "") // Remove null bytes
    .replace(/\x1a/g, ""); // Remove ASCII 26 (Substitute) character
};
