
import { testEncryptionService } from './test';
import { encryptData, decryptData } from './core';
import { supabase } from '../index';

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
