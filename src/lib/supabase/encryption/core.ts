
import { supabase } from '../index';

/**
 * Encrypts sensitive data using Supabase Edge Function with input validation
 * @param data The data to encrypt
 * @returns Promise resolving to the encrypted data or null if encryption failed
 */
export async function encryptData(data: string): Promise<string | null> {
  try {
    // Input validation
    if (!data) {
      console.error('Empty data provided for encryption');
      return null;
    }
    
    if (typeof data !== 'string') {
      console.error('Invalid data type for encryption, expected string');
      return null;
    }
    
    // Size validation
    if (data.length > 10000) {
      console.error('Data too large for encryption (>10KB)');
      return null;
    }
    
    // Sanitize the data before encryption
    const sanitizedData = data
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');
    
    // Check if we already have this data encrypted in our lookup table with timeout
    const lookupPromise = new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => reject(new Error('Database lookup timed out')), 5000);
      try {
        const { data: existingData, error: lookupError } = await supabase
          .from('_encrypted_data')
          .select('encrypted_value')
          .eq('original_value', sanitizedData)
          .maybeSingle();
        
        clearTimeout(timeoutId);
        resolve({ existingData, lookupError });
      } catch (err) {
        clearTimeout(timeoutId);
        reject(err);
      }
    });
    
    const { existingData, lookupError } = await lookupPromise as any;
    
    if (lookupError) {
      console.error('Error looking up encrypted data:', lookupError);
      return null;
    }
    
    // If we already have this data encrypted, return the existing value
    if (existingData?.encrypted_value) {
      return existingData.encrypted_value;
    }
    
    // Call the Edge Function with timeout to perform actual encryption
    const functionPromise = new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => reject(new Error('Encryption function timed out')), 10000);
      try {
        const result = await supabase.functions.invoke(
          'secure-encrypt',
          {
            body: { action: 'encrypt', data: sanitizedData }
          }
        );
        clearTimeout(timeoutId);
        resolve(result);
      } catch (err) {
        clearTimeout(timeoutId);
        reject(err);
      }
    });
    
    const { data: functionData, error: functionError } = await functionPromise as any;
    
    if (functionError) {
      console.error('Error calling encryption function:', functionError);
      return null;
    }
    
    if (!functionData?.encryptedData) {
      console.error('No encrypted data returned from function');
      return null;
    }
    
    const encryptedValue = functionData.encryptedData;
    
    // Store the mapping between original and encrypted values
    const { error: insertError } = await supabase
      .from('_encrypted_data')
      .insert({
        original_value: sanitizedData,
        encrypted_value: encryptedValue
      });
    
    if (insertError) {
      console.error('Error storing encrypted data:', insertError);
      // Return the encrypted value even if storing in lookup fails
    }
    
    return encryptedValue;
  } catch (err) {
    console.error('Unexpected encryption error:', err);
    return null;
  }
}

/**
 * Decrypts sensitive data using Supabase Edge Function
 * @param encryptedData The encrypted data to decrypt
 * @returns Promise resolving to the decrypted data or null if decryption failed
 */
export async function decryptData(encryptedData: string): Promise<string | null> {
  try {
    // Input validation
    if (!encryptedData) {
      console.error('Empty encrypted data provided for decryption');
      return null;
    }
    
    if (typeof encryptedData !== 'string') {
      console.error('Invalid encrypted data type, expected string');
      return null;
    }
    
    // First try looking up the original value in our mapping table with timeout
    const lookupPromise = new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => reject(new Error('Database lookup timed out')), 5000);
      try {
        const result = await supabase
          .from('_encrypted_data')
          .select('original_value')
          .eq('encrypted_value', encryptedData)
          .maybeSingle();
        clearTimeout(timeoutId);
        resolve(result);
      } catch (err) {
        clearTimeout(timeoutId);
        reject(err);
      }
    });
    
    const { data: lookupData, error: lookupError } = await lookupPromise as any;
    
    if (lookupError) {
      console.error('Error looking up decrypted data:', lookupError);
      return null;
    }
    
    // If found in the lookup table, return it
    if (lookupData?.original_value) {
      return lookupData.original_value;
    }
    
    // If not found in the lookup table, try to decrypt using the Edge Function with timeout
    const functionPromise = new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => reject(new Error('Decryption function timed out')), 10000);
      try {
        const result = await supabase.functions.invoke(
          'secure-encrypt',
          {
            body: { action: 'decrypt', data: encryptedData }
          }
        );
        clearTimeout(timeoutId);
        resolve(result);
      } catch (err) {
        clearTimeout(timeoutId);
        reject(err);
      }
    });
    
    const { data: functionData, error: functionError } = await functionPromise as any;
    
    if (functionError) {
      console.error('Error calling decryption function:', functionError);
      return null;
    }
    
    if (!functionData.decryptedData && functionData.decryptedData !== '') {
      console.error('No decrypted data returned from function');
      return null;
    }
    
    return functionData.decryptedData;
  } catch (err) {
    console.error('Unexpected decryption error:', err);
    return null;
  }
}
