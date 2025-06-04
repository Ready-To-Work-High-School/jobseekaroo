

export const sanitizeUrlParam = (input: string): string => {
  return encodeURIComponent(input.trim());
};

export const sanitizeHtml = (input: string, isEmail?: boolean): string => {
  // Basic HTML sanitization - in production, use a library like DOMPurify
  let sanitized = input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
    
  // Additional email-specific sanitization if needed
  if (isEmail) {
    sanitized = sanitized.replace(/[<>'"()\\\/]/g, '');
  }
  
  return sanitized;
};

export const escapeHtml = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Checks for XSS vectors in input
 * @param input - The input string to check
 * @returns True if XSS vectors are detected
 */
export const containsXssVector = (input: string): boolean => {
  if (!input) return false;
  
  const dangerPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /\bon\w+\s*=/gi,
    /<i?frame/gi,
    /<(?:embed|object|svg)\b/gi,
    /expression\s*\(/gi,
    /data:\s*(?:text\/html|application\/x)/gi,
    /vbscript:/gi,
    /<img[^>]*\s+on\w+\s*=/gi,
  ];
  
  return dangerPatterns.some(pattern => pattern.test(input));
};

/**
 * Sanitizes an object recursively
 * @param obj - The object to sanitize
 * @returns The sanitized object
 */
export const sanitizeObject = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'string') {
    return sanitizeHtml(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  if (typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  }
  
  return obj;
};

/**
 * Generates a CSP nonce for security
 * @returns A random nonce string
 */
export const generateCspNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

