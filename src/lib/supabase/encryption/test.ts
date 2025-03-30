
import { supabase } from '../index';

/**
 * Tests whether the encryption service is properly configured
 * @returns Promise resolving to the test result with success status and message
 */
export async function testEncryptionService(): Promise<{ success: boolean; message: string }> {
  try {
    console.log('Testing encryption service...');
    
    // Setup timeout to prevent hanging request
    const timeoutPromise = new Promise<{ success: boolean; message: string }>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out after 10 seconds'));
      }, 10000);
    });
    
    // API call promise
    const apiCallPromise = new Promise<{ success: boolean; message: string }>(async (resolve) => {
      try {
        const { data, error } = await supabase.functions.invoke(
          'secure-encrypt/test',
          {
            method: 'GET'
          }
        );
        
        if (error) {
          console.error('Error testing encryption service:', error);
          resolve({ 
            success: false, 
            message: `Error testing encryption service: ${error.message}` 
          });
          return;
        }
        
        console.log('Encryption service test result:', data);
        resolve(data || { success: false, message: 'No response from encryption service test' });
      } catch (err) {
        console.error('Exception during encryption test:', err);
        resolve({
          success: false,
          message: `Unexpected error: ${err instanceof Error ? err.message : String(err)}`
        });
      }
    });
    
    // Race between timeout and API call
    return Promise.race([apiCallPromise, timeoutPromise]);
  } catch (err) {
    console.error('Unexpected error testing encryption service:', err);
    return { 
      success: false, 
      message: `Unexpected error: ${err instanceof Error ? err.message : String(err)}` 
    };
  }
}

/**
 * Validates if the current encryption key is secure enough
 * @returns Promise resolving to the validation result
 */
export async function validateEncryptionKey(): Promise<{ isValid: boolean; issues: string[] }> {
  try {
    const testResult = await testEncryptionService();
    
    if (!testResult.success) {
      return {
        isValid: false,
        issues: [testResult.message]
      };
    }
    
    return {
      isValid: true,
      issues: []
    };
  } catch (error) {
    return {
      isValid: false,
      issues: [`Failed to validate encryption key: ${error instanceof Error ? error.message : String(error)}`]
    };
  }
}
