
import { supabase } from '../index';

/**
 * Tests whether the encryption service is properly configured
 * @returns Promise resolving to the test result with success status and message
 */
export async function testEncryptionService(): Promise<{ success: boolean; message: string }> {
  try {
    const { data, error } = await supabase.functions.invoke(
      'secure-encrypt/test',
      {
        method: 'GET'
      }
    );
    
    if (error) {
      console.error('Error testing encryption service:', error);
      return { 
        success: false, 
        message: `Error testing encryption service: ${error.message}` 
      };
    }
    
    return data;
  } catch (err) {
    console.error('Unexpected error testing encryption service:', err);
    return { 
      success: false, 
      message: `Unexpected error: ${err instanceof Error ? err.message : String(err)}` 
    };
  }
}
