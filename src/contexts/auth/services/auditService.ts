
import { supabase } from '@/lib/supabase';

/**
 * Enhanced audit service for security logging
 */

/**
 * Log an authentication event to the audit log
 * @param action The action being performed (e.g., 'user_login', 'user_signup')
 * @param metadata Additional data to log
 */
export const logAuthEvent = async (action: string, metadata: Record<string, any> = {}): Promise<void> => {
  try {
    await supabase.functions.invoke('audit-log', {
      body: { 
        action, 
        metadata: { 
          ...metadata,
          timestamp: new Date().toISOString() 
        }
      }
    });
  } catch (error) {
    console.error(`Error logging ${action} event:`, error);
    // Non-blocking error
  }
};

/**
 * Log a security-relevant event
 * @param action The security action being performed
 * @param userId Optional user ID associated with the action
 * @param details Additional security details to log
 */
export const logSecurityEvent = async (
  action: string, 
  userId?: string,
  details: Record<string, any> = {}
): Promise<void> => {
  try {
    const metadata = {
      ...details,
      browser: getBrowserInfo(),
      device: getDeviceInfo(),
      timestamp: new Date().toISOString()
    };
    
    await supabase.functions.invoke('audit-log', {
      body: { 
        action: `security_${action}`, 
        user_id: userId,
        metadata
      }
    });
  } catch (error) {
    console.error(`Error logging security event ${action}:`, error);
    // Non-blocking error
  }
};

/**
 * Log a file access event
 * @param fileType Type of file being accessed
 * @param fileId ID or path of the file
 * @param accessType Type of access (view, download, etc)
 * @param userId User performing the access
 */
export const logFileAccess = async (
  fileType: string,
  fileId: string,
  accessType: 'view' | 'download' | 'generate_url',
  userId?: string
): Promise<void> => {
  try {
    await supabase.functions.invoke('audit-log', {
      body: { 
        action: 'file_access', 
        user_id: userId,
        metadata: { 
          file_type: fileType,
          file_id: fileId,
          access_type: accessType,
          timestamp: new Date().toISOString() 
        }
      }
    });
  } catch (error) {
    console.error(`Error logging file access event:`, error);
    // Non-blocking error
  }
};

/**
 * Log a job posting event for audit purposes
 * @param action The action performed on the job posting
 * @param jobId ID of the job posting
 * @param userId User who performed the action
 * @param details Additional details about the action
 */
export const logJobPostingEvent = async (
  action: 'create' | 'update' | 'delete' | 'verify' | 'report',
  jobId: string,
  userId: string,
  details: Record<string, any> = {}
): Promise<void> => {
  try {
    await supabase.functions.invoke('audit-log', {
      body: { 
        action: `job_posting_${action}`, 
        user_id: userId,
        metadata: { 
          job_id: jobId,
          ...details,
          timestamp: new Date().toISOString() 
        }
      }
    });
  } catch (error) {
    console.error(`Error logging job posting event:`, error);
    // Non-blocking error
  }
};

/**
 * Log a profile privacy change
 * @param userId User ID
 * @param privacySettings Updated privacy settings
 */
export const logPrivacyChange = async (
  userId: string,
  privacySettings: Record<string, any>
): Promise<void> => {
  try {
    await supabase.functions.invoke('audit-log', {
      body: { 
        action: 'privacy_settings_update', 
        user_id: userId,
        metadata: { 
          ...privacySettings,
          timestamp: new Date().toISOString() 
        }
      }
    });
  } catch (error) {
    console.error(`Error logging privacy change:`, error);
    // Non-blocking error
  }
};

// Helper functions for collecting environment info
function getBrowserInfo(): string {
  try {
    return navigator.userAgent;
  } catch (e) {
    return 'unknown';
  }
}

function getDeviceInfo(): string {
  try {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile ? 'mobile' : 'desktop';
  } catch (e) {
    return 'unknown';
  }
}
