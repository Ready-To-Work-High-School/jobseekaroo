
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
 * Check if the response is JSON
 */
function isJsonResponse(response: Response): boolean {
  const contentType = response.headers.get('content-type');
  return contentType !== null && contentType.includes('application/json');
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
      if (!isJsonResponse(response)) {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text.substring(0, 100) + '...');
        return { 
          error: `Server error: ${response.status} ${response.statusText}`
        };
      }
      
      throw new Error(`API error: ${response.statusText}`);
    }
    
    if (!isJsonResponse(response)) {
      const text = await response.text();
      console.error('Unexpected content type:', response.headers.get('content-type'));
      console.error('Response text:', text.substring(0, 100) + '...');
      return {
        error: 'Server returned invalid response format'
      };
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
      // Check content type for more helpful error messages
      if (!isJsonResponse(response)) {
        const responseText = await response.text();
        console.error('Server returned non-JSON response:', responseText.substring(0, 100) + '...');
        return { 
          error: `Request failed with status ${response.status}. Please try again.`
        };
      }
      
      // Try to get the error message from the response
      const errorData = await response.json();
      return { error: errorData.error || 'Request failed' };
    }
    
    if (!isJsonResponse(response)) {
      const text = await response.text();
      console.error('Unexpected content type:', response.headers.get('content-type'));
      console.error('Response text:', text.substring(0, 100) + '...');
      return {
        error: 'Server returned invalid response format'
      };
    }
    
    try {
      const data = await response.json();
      return { data };
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      return {
        error: 'The server response could not be parsed. Please try again later.'
      };
    }
  } catch (error) {
    console.error('API post error:', error);
    
    // Check if this is a JSON parsing error
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      return {
        error: 'The server response could not be parsed. Please try again later.'
      };
    }
    
    return { 
      error: 'An error occurred while communicating with the server. Please try again.'
    };
  }
}
