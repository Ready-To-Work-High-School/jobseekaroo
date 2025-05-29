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

  if (typeof window !== 'undefined') {
    // Use DOMPurify in browser environments for comprehensive sanitization
    return DOMPurify.sanitize(String(input), {
      USE_PROFILES: { html: true },
      FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'object', 'embed', 'link'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout', 'onfocus', 'onblur', 'href', 'src']
    });
  }

  // Server-side or fallback sanitization
  const str = String(input);
  if (isEmail) {
    // For emails, strip all HTML and validate later
    return str.replace(/<[^>]*>/g, ''); // Remove tags entirely
  }

  // Enhanced encoding of special characters
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#x60;')
    .replace(/\(/g, '&#40;')
    .replace(/\)/g, '&#41;')
    .replace(/=/g, '&#61;');
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
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
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
  // Ensure only alphanumeric, underscore, hyphen, and space characters are allowed
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
    /\bon\w+\s*=/gi, // event handlers (captures onload, onerror, etc)
    /<i?frame/gi, // Catches iframe and frame
    /<(?:embed|object|svg)\b/gi, // Object, embed and svg tags
    /expression\s*\(/gi, // CSS expressions
    /data:\s*(?:text\/html|application\/x)/gi, // Refined data: URLs
    /vbscript:/gi, // vbscript: URLs
    /<img[^>]*\s+on\w+\s*=/gi, // Image with event handlers
    /<[^>]*\s+src\s*=\s*['"]?(?:javascript:|data:image\/[^;]*;base64)/gi, // Dangerous src attributes
    /url\s*\(\s*['"]?\s*(?:javascript:|data:text)/gi, // CSS url() with JavaScript or data
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
 * URL parameter sanitization
 */
export const sanitizeUrlParam = (param: string): string => {
  if (!param) return '';
  
  // Remove potentially dangerous characters from URL parameters
  return encodeURIComponent(String(param)
    .replace(/[<>'"()\[\]\\\/]/g, '')
    .trim());
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

/**
 * Validates if a URL is safe to navigate to
 * @param url The URL to validate
 * @returns Boolean indicating if the URL is safe
 */
export const validateUrl = (url: string): boolean => {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    
    // List of allowed domains and protocols
    const allowedDomains = [
      'jobseekaroo.com',
      'jobseekers4hs.org',
      'jobseeker4hs.org',
      'localhost',
      '127.0.0.1',
      // Add other trusted domains here
    ];
    
    const allowedProtocols = ['https:', 'http:'];
    
    // Check protocol
    if (!allowedProtocols.includes(urlObj.protocol)) {
      console.warn(`Blocked navigation to URL with unsafe protocol: ${urlObj.protocol}`);
      return false;
    }
    
    // Check domain
    const isAllowedDomain = allowedDomains.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    );
    
    if (!isAllowedDomain) {
      console.warn(`Blocked navigation to untrusted domain: ${urlObj.hostname}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error validating URL:', error);
    return false;
  }
};
