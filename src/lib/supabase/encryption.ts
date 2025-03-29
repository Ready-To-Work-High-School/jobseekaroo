
import { supabase } from './index';

/**
 * Encrypts sensitive data on the server-side using pgcrypto
 * @param data The data to encrypt
 * @returns Promise resolving to the encrypted data or null if encryption failed
 */
export async function encryptData(data: string): Promise<string | null> {
  try {
    const { data: encryptedData, error } = await supabase.rpc('encrypt_data', {
      data
    });
    
    if (error) {
      console.error('Encryption error:', error);
      return null;
    }
    
    return encryptedData;
  } catch (err) {
    console.error('Unexpected encryption error:', err);
    return null;
  }
}

/**
 * Decrypts sensitive data on the server-side using pgcrypto
 * @param encryptedData The encrypted data to decrypt
 * @returns Promise resolving to the decrypted data or null if decryption failed
 */
export async function decryptData(encryptedData: string): Promise<string | null> {
  try {
    const { data: decryptedData, error } = await supabase.rpc('decrypt_data', {
      encrypted_data: encryptedData
    });
    
    if (error) {
      console.error('Decryption error:', error);
      return null;
    }
    
    return decryptedData;
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
    const updates: any = {};
    
    if (resumeData) {
      const encryptedResume = await encryptData(resumeData);
      if (encryptedResume) {
        updates.encrypted_resume_data = encryptedResume;
      }
    }
    
    if (contactDetails) {
      const encryptedContact = await encryptData(contactDetails);
      if (encryptedContact) {
        updates.encrypted_contact_details = encryptedContact;
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
      .select('encrypted_resume_data, encrypted_contact_details')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error('Error retrieving encrypted data:', error);
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    const resumeData = data.encrypted_resume_data 
      ? await decryptData(data.encrypted_resume_data)
      : null;
      
    const contactDetails = data.encrypted_contact_details
      ? await decryptData(data.encrypted_contact_details)
      : null;
      
    return { resumeData, contactDetails };
  } catch (err) {
    console.error('Unexpected error retrieving encrypted data:', err);
    return null;
  }
}
