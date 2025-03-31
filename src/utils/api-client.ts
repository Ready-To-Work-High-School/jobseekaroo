
/**
 * Simple API client for making requests to the server
 */

import { sanitizeObject, generateCspNonce } from './sanitization';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Store the CSP nonce in a private scope
let _cspNonce: string | null = null;

/**
 * Get the current CSP nonce or generate a new one
 */
export function getCspNonce(): string {
  if (!_cspNonce) {
    _cspNonce = generateCspNonce();
  }
  return _cspNonce;
}

/**
 * Reset the CSP nonce (useful for session changes)
 */
export function resetCspNonce(): string {
  _cspNonce = generateCspNonce();
  return _cspNonce;
}

/**
 * Make a GET request to the API
 */
export async function fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    // Sanitize endpoint to prevent path traversal
    const sanitizedEndpoint = endpoint.replace(/\.\./g, '').replace(/[^a-zA-Z0-9-_/]/g, '');
    
    const response = await fetch(`/api/${sanitizedEndpoint}`);
    
    if (!response.ok) {
      // Check content type to provide more helpful error messages
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        console.error('Server returned HTML instead of JSON. Possible server error.');
        return { 
          error: `Server error: ${response.status} ${response.statusText}`
        };
      }
      
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API fetch error:', error);
    
    // Generic error message for security - don't expose internals
    return { 
      error: 'An error occurred while communicating with the server. Please try again.'
    };
  }
}

/**
 * Make a POST request to the API
 */
export async function postApi<T, D>(endpoint: string, body: D): Promise<ApiResponse<T>> {
  try {
    // Sanitize endpoint to prevent path traversal
    const sanitizedEndpoint = endpoint.replace(/\.\./g, '').replace(/[^a-zA-Z0-9-_/]/g, '');
    
    // Enhanced sanitization using the comprehensive sanitizer
    const sanitizedBody = sanitizeObject(body);
    
    const response = await fetch(`/api/${sanitizedEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSP-Nonce': getCspNonce(), // Add CSP nonce to requests
      },
      body: JSON.stringify(sanitizedBody),
    });
    
    if (!response.ok) {
      // Check content type to provide more helpful error messages
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        console.error('Server returned HTML instead of JSON. Possible server error.');
        return { 
          error: `Request failed. Please try again.`
        };
      }
      
      // Try to get the error message from the response
      let errorData;
      try {
        // Check if there's a response body
        const text = await response.text();
        if (text) {
          try {
            // Try to parse as JSON
            errorData = JSON.parse(text);
          } catch (e) {
            // Don't expose raw error messages to client
            errorData = { error: 'Invalid input format' };
          }
        } else {
          errorData = { error: 'Request failed' };
        }
      } catch (e) {
        errorData = { error: 'Request failed' };
      }
      
      return { error: 'Invalid request. Please check your input and try again.' };
    }
    
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API post error:', error);
    return { 
      error: 'An error occurred while communicating with the server. Please try again.'
    };
  }
}
