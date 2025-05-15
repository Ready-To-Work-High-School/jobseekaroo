
/**
 * Security utilities for XSS prevention, CSP management, and URL sanitization
 */
import { sanitizeHtml, sanitizeObject } from './sanitization';

/**
 * Ensures a URL uses HTTPS instead of HTTP when in production environments
 * This prevents mixed content warnings and improves security
 */
export const ensureHttps = (url: string): string => {
  if (!url) return '';
  
  // Skip for development environments, localhost, or relative URLs
  if (
    process.env.NODE_ENV !== 'production' ||
    url.startsWith('/') ||
    url.startsWith('#') ||
    url.includes('localhost') ||
    url.includes('127.0.0.1')
  ) {
    return url;
  }
  
  // Replace http:// with https://
  return url.replace(/^http:\/\//i, 'https://');
};

/**
 * Validates that a URL is safe to use (not javascript:, data:, etc)
 */
export const isSafeUrl = (url: string): boolean => {
  if (!url) return false;
  
  // Allow relative URLs
  if (url.startsWith('/') || url.startsWith('#')) return true;
  
  try {
    const parsedUrl = new URL(url);
    
    // Only allow http and https protocols
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch (e) {
    // If URL parsing fails, consider it unsafe
    return false;
  }
};

/**
 * Setup Content-Security-Policy meta tag in the document head
 * This provides an extra layer of XSS protection for browsers
 */
export const setupCSP = (): void => {
  // Only run in browser environment
  if (typeof document === 'undefined') return;
  
  // Check if we already added the CSP
  if (document.querySelector('meta[http-equiv="Content-Security-Policy"]')) return;
  
  const cspMeta = document.createElement('meta');
  cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
  
  // Define CSP for different environments
  const isProd = process.env.NODE_ENV === 'production';
  
  // Basic CSP that prevents common XSS vectors
  const cspContent = 
    `default-src 'self'; ` + 
    `connect-src 'self' ${isProd ? 'https://*.supabase.co' : 'http://localhost:* ws://localhost:* https://*.supabase.co'} https://jobseekaroo.onrender.com; ` + 
    `script-src 'self' ${isProd ? '' : "'unsafe-eval'"} 'unsafe-inline'; ` +
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; ` + 
    `img-src 'self' data: https: blob:; ` + 
    `font-src 'self' https://fonts.gstatic.com; ` + 
    `object-src 'none'; ` + 
    `base-uri 'self'; ` + 
    `form-action 'self' https:; ` + // Ensure forms can only be submitted to same origin or HTTPS URIs
    (isProd ? `upgrade-insecure-requests; ` : ''); // Force HTTP to HTTPS in production
  
  cspMeta.setAttribute('content', cspContent);
  document.head.appendChild(cspMeta);
};

/**
 * Sanitize form input values to prevent XSS attacks
 */
export const sanitizeFormData = <T extends Record<string, any>>(formData: T): T => {
  return sanitizeObject(formData);
};

/**
 * Makes sure all links in the app use HTTPS instead of HTTP when in production
 */
export const secureDomLinks = (): void => {
  if (typeof document === 'undefined' || process.env.NODE_ENV !== 'production') return;
  
  // Fix existing links
  const updateLinks = () => {
    document.querySelectorAll('a[href^="http:"]').forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        link.setAttribute('href', ensureHttps(href));
      }
    });
    
    // Fix form actions
    document.querySelectorAll('form[action^="http:"]').forEach(form => {
      const action = form.getAttribute('action');
      if (action) {
        form.setAttribute('action', ensureHttps(action));
      }
    });
  };
  
  // Update links initially
  updateLinks();
  
  // Setup observer to update links dynamically added to the DOM
  const observer = new MutationObserver(() => {
    updateLinks();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};
