
import { supabase } from './index';

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

/**
 * Securely store sensitive user profile data
 * @param userId User ID
 * @param resumeData Resume data to encrypt
 * @param contactDetails Contact details to encrypt
 * @returns Promise resolving to success status
 */
export async function storeEncryptedProfileData(
  userId: string,
  resumeData?: string,
  contactDetails?: string
): Promise<boolean> {
  try {
    // Test encryption service before attempting to encrypt data
    const encryptionTest = await testEncryptionService();
    if (!encryptionTest.success) {
      console.error('Encryption service check failed:', encryptionTest.message);
      return false;
    }
    
    const updates: Record<string, any> = {};
    
    if (resumeData) {
      const encryptedResume = await encryptData(resumeData);
      if (encryptedResume) {
        updates.resume_data_encrypted = encryptedResume;
      } else {
        console.error('Failed to encrypt resume data');
        return false;
      }
    }
    
    if (contactDetails) {
      const encryptedContact = await encryptData(contactDetails);
      if (encryptedContact) {
        updates.contact_details_encrypted = encryptedContact;
      } else {
        console.error('Failed to encrypt contact details');
        return false;
      }
    }
    
    if (Object.keys(updates).length === 0) {
      return false;
    }
    
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
      
    if (error) {
      console.error('Error storing encrypted data:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Unexpected error storing encrypted data:', err);
    return false;
  }
}

/**
 * Retrieve and decrypt sensitive user profile data
 * @param userId User ID
 * @returns Promise resolving to decrypted data or null
 */
export async function getDecryptedProfileData(
  userId: string
): Promise<{ resumeData: string | null, contactDetails: string | null } | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('resume_data_encrypted, contact_details_encrypted')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error('Error retrieving encrypted data:', error);
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    const resumeData = data.resume_data_encrypted 
      ? await decryptData(data.resume_data_encrypted)
      : null;
      
    const contactDetails = data.contact_details_encrypted
      ? await decryptData(data.contact_details_encrypted)
      : null;
      
    return { resumeData, contactDetails };
  } catch (err) {
    console.error('Unexpected error retrieving encrypted data:', err);
    return null;
  }
}
