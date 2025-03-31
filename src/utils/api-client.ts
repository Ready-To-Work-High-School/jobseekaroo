
/**
 * Simple API client for making requests to the server
 */

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

/**
 * Sanitize input to prevent XSS attacks
 */
function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    // Basic sanitization for strings
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  } else if (Array.isArray(input)) {
    // Sanitize each item in array
    return input.map(item => sanitizeInput(item));
  } else if (input !== null && typeof input === 'object') {
    // Sanitize each property in object
    const sanitized: Record<string, any> = {};
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        sanitized[key] = sanitizeInput(input[key]);
      }
    }
    return sanitized;
  }
  // Return primitives and null/undefined as is
  return input;
}

/**
 * Make a GET request to the API
 */
export async function fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`/api/${endpoint}`);
    
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
    return { 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Make a POST request to the API
 */
export async function postApi<T, D>(endpoint: string, body: D): Promise<ApiResponse<T>> {
  try {
    // Sanitize the request body to prevent XSS attacks
    const sanitizedBody = sanitizeInput(body);
    
    const response = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedBody),
    });
    
    if (!response.ok) {
      // Check content type to provide more helpful error messages
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        console.error('Server returned HTML instead of JSON. Possible server error.');
        return { 
          error: `Server error: ${response.status} ${response.statusText}`
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
            // If it's not valid JSON, use the text
            errorData = { error: text || `API error: ${response.statusText}` };
          }
        } else {
          errorData = { error: `API error: ${response.statusText}` };
        }
      } catch (e) {
        errorData = { error: `API error: ${response.statusText}` };
      }
      
      return { error: errorData.error || `API error: ${response.statusText}` };
    }
    
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API post error:', error);
    return { 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
