
import { supabase } from '../index';

/**
 * Encrypts sensitive data using Supabase Edge Function
 * @param data The data to encrypt
 * @returns Promise resolving to the encrypted data or null if encryption failed
 */
export async function encryptData(data: string): Promise<string | null> {
  try {
    // Check if we already have this data encrypted in our lookup table
    const { data: existingData, error: lookupError } = await supabase
      .from('_encrypted_data')
      .select('encrypted_value')
      .eq('original_value', data)
      .maybeSingle();
    
    if (lookupError) {
      console.error('Error looking up encrypted data:', lookupError);
      return null;
    }
    
    // If we already have this data encrypted, return the existing value
    if (existingData?.encrypted_value) {
      return existingData.encrypted_value;
    }
    
    // Call the Edge Function to perform actual encryption
    const { data: functionData, error: functionError } = await supabase.functions.invoke(
      'secure-encrypt',
      {
        body: { action: 'encrypt', data }
      }
    );
    
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
    const { data: insertedData, error: insertError } = await supabase
      .from('_encrypted_data')
      .insert({
        original_value: data,
        encrypted_value: encryptedValue
      })
      .select('encrypted_value')
      .single();
    
    if (insertError) {
      console.error('Error storing encrypted data:', insertError);
      return null;
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
    // First try looking up the original value in our mapping table
    const { data: lookupData, error: lookupError } = await supabase
      .from('_encrypted_data')
      .select('original_value')
      .eq('encrypted_value', encryptedData)
      .maybeSingle();
    
    if (lookupError) {
      console.error('Error looking up decrypted data:', lookupError);
      return null;
    }
    
    // If found in the lookup table, return it
    if (lookupData?.original_value) {
      return lookupData.original_value;
    }
    
    // If not found in the lookup table, try to decrypt using the Edge Function
    const { data: functionData, error: functionError } = await supabase.functions.invoke(
      'secure-encrypt',
      {
        body: { action: 'decrypt', data: encryptedData }
      }
    );
    
    if (functionError) {
      console.error('Error calling decryption function:', functionError);
      return null;
    }
    
    return functionData.decryptedData || null;
  } catch (err) {
    console.error('Unexpected decryption error:', err);
    return null;
  }
}
