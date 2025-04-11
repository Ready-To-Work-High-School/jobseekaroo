
/**
 * Shared sanitization utilities for Supabase Edge Functions
 * Ported from the frontend sanitization utilities
 */

// Enhanced sanitization to strip HTML tags and suspicious patterns
export const sanitizeInput = (input: string | null | undefined): string => {
  if (input == null) return '';
  
  const str = String(input);
  
  return str
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: URLs
    .replace(/&#/gi, '') // Remove HTML entities
    .replace(/\\x[0-9A-Fa-f]{2}/gi, '') // Remove hex escapes
    .replace(/\\u[0-9A-Fa-f]{4}/gi, ''); // Remove unicode escapes
};

// Check for potentially malicious patterns
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

// Email validation function
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// URL parameter sanitization
export const sanitizeUrlParam = (param: string): string => {
  if (!param) return '';
  return encodeURIComponent(String(param).replace(/[<>'"()\\\/]/g, '').trim());
};

// Convert special characters for HTML output
export const escapeHtml = (input: string): string => {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;');
};

// Sanitize SQL parameters (though parameterized queries are preferred)
export const sanitizeSql = (input: string): string => {
  return String(input)
    .replace(/'/g, "''")
    .replace(/\\/g, "\\\\")
    .replace(/\0/g, "")
    .replace(/\x1a/g, "");
};
