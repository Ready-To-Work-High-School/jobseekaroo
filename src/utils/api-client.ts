
/**
 * Simple API client for making requests to the server
 */

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

/**
 * Make a GET request to the API
 */
export async function fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`/api/${endpoint}`);
    
    if (!response.ok) {
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
    const response = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
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
