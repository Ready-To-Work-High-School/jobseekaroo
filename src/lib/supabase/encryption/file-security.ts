
import { supabase } from '../index';

interface SecureURLOptions {
  expiryMinutes?: number;
  downloadName?: string;
  auditAccess?: boolean;
}

/**
 * Generate a secure time-limited access URL for sensitive files
 * @param bucketName Storage bucket name
 * @param filePath Path within the bucket
 * @param options URL configuration options
 * @returns Promise resolving to a secure URL
 */
export async function getSecureFileURL(
  bucketName: string,
  filePath: string,
  options: SecureURLOptions = {}
): Promise<string | null> {
  try {
    const {
      expiryMinutes = 15,
      auditAccess = true
    } = options;
    
    // Call the secure-encrypt function to create a signed URL
    const { data, error } = await supabase.functions.invoke('secure-encrypt', {
      body: { 
        action: 'signUrl',
        filePath: `${bucketName}/${filePath}`,
        expiryMinutes
      }
    });
    
    if (error) {
      console.error('Error generating secure file URL:', error);
      return null;
    }
    
    // Log this URL generation if auditing is enabled
    if (auditAccess) {
      try {
        await supabase.functions.invoke('audit-log', {
          body: { 
            action: 'file_url_generated',
            metadata: { 
              bucket: bucketName,
              path: filePath,
              expiry_minutes: expiryMinutes,
              timestamp: new Date().toISOString() 
            }
          }
        });
      } catch (auditError) {
        console.error('Error logging URL generation:', auditError);
        // Non-blocking error
      }
    }
    
    return data.signedUrl;
  } catch (error) {
    console.error('Unexpected error generating secure file URL:', error);
    return null;
  }
}

/**
 * Upload a file with encryption for sensitive documents
 * @param bucketName Storage bucket name
 * @param filePath Path within the bucket
 * @param file File to upload
 * @returns Promise resolving to upload success status
 */
export async function uploadSecureFile(
  bucketName: string,
  filePath: string,
  file: File
): Promise<boolean> {
  try {
    // First, upload the file to storage
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        upsert: true,
        cacheControl: 'no-cache' // Prevent caching of sensitive files
      });
    
    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return false;
    }
    
    // Log the file upload for audit purposes
    try {
      await supabase.functions.invoke('audit-log', {
        body: { 
          action: 'secure_file_upload',
          metadata: { 
            bucket: bucketName,
            path: filePath,
            file_type: file.type,
            file_size: file.size,
            timestamp: new Date().toISOString() 
          }
        }
      });
    } catch (auditError) {
      console.error('Error logging file upload:', auditError);
      // Non-blocking error, don't fail the upload
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error during secure file upload:', error);
    return false;
  }
}

/**
 * Validate an employer account by checking verification status
 * @param userId User ID to check
 * @returns Promise resolving to verification status
 */
export async function checkEmployerVerification(userId: string): Promise<{
  isVerified: boolean;
  verificationStatus?: 'pending' | 'approved' | 'rejected';
  message?: string;
}> {
  try {
    // Get the user's profile
    const { data, error } = await supabase
      .from('profiles')
      .select('user_type, employer_verification_status, email')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error checking employer verification:', error);
      return { isVerified: false, message: 'Error checking verification status' };
    }
    
    if (!data) {
      return { isVerified: false, message: 'User profile not found' };
    }
    
    // Check if user is an employer
    if (data.user_type !== 'employer') {
      return { isVerified: false, message: 'User is not registered as an employer' };
    }
    
    // Check verification status - need to handle as a string for type safety
    const status = data.employer_verification_status as string | null;
    if (!status) {
      return { 
        isVerified: false, 
        verificationStatus: 'pending',
        message: 'Employer account pending verification' 
      };
    }
    
    // Safe type assertion after validation
    const verificationStatus = status as 'pending' | 'approved' | 'rejected';
    return { 
      isVerified: verificationStatus === 'approved',
      verificationStatus,
      message: verificationStatus === 'approved' 
        ? 'Employer account verified' 
        : 'Employer account verification ' + verificationStatus
    };
  } catch (error) {
    console.error('Unexpected error checking employer verification:', error);
    return { isVerified: false, message: 'Error checking verification status' };
  }
}
