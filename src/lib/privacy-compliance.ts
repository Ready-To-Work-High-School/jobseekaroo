/**
 * Utility functions for ensuring compliance with privacy regulations
 * including FERPA, GDPR, CCPA, and other applicable laws
 */

import { toast } from '@/hooks/use-toast';
import { encryptData, decryptData } from './encryption';

// Names of common storage keys used in the app
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  LOCATION_DATA: 'location_data',
  SAVED_SEARCHES: 'saved_searches',
  SESSION_DATA: 'session_data',
};

// Types of sensitive data subject to special handling
export enum SensitiveDataType {
  PERSONAL_IDENTIFIABLE_INFO = 'pii',
  EDUCATIONAL_RECORDS = 'educational_records',
  LOCATION_DATA = 'location_data',
  FINANCIAL_INFO = 'financial_info',
  HEALTH_INFO = 'health_info',
}

/**
 * Get privacy consent status for a specific data type
 */
export function getConsentStatus(dataType: SensitiveDataType): boolean {
  try {
    const consents = JSON.parse(localStorage.getItem('privacy_consents') || '{}');
    return !!consents[dataType];
  } catch {
    return false;
  }
}

/**
 * Record user consent for collecting/processing specific data types
 */
export function recordConsent(dataType: SensitiveDataType, hasConsented: boolean): void {
  try {
    const consents = JSON.parse(localStorage.getItem('privacy_consents') || '{}');
    consents[dataType] = hasConsented;
    localStorage.setItem('privacy_consents', JSON.stringify(consents));
    
    // Also record timestamp of consent for audit purposes
    const consentLogs = JSON.parse(localStorage.getItem('consent_logs') || '[]');
    consentLogs.push({
      dataType,
      consented: hasConsented,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('consent_logs', JSON.stringify(consentLogs));
  } catch (error) {
    console.error('Error recording consent:', error);
  }
}

/**
 * Request consent from user for a specific data type with explanation
 */
export function requestConsent(
  dataType: SensitiveDataType, 
  purpose: string,
  onConsent: () => void,
  onDecline: () => void
): void {
  let title = 'Permission Required';
  let description = '';
  
  // Customize message based on data type
  switch (dataType) {
    case SensitiveDataType.LOCATION_DATA:
      title = 'Location Data Permission';
      description = `We need your location to ${purpose}. This data is encrypted and protected.`;
      break;
    case SensitiveDataType.EDUCATIONAL_RECORDS:
      title = 'Educational Records Permission';
      description = `In compliance with FERPA, we need your consent to ${purpose}.`;
      break;
    case SensitiveDataType.PERSONAL_IDENTIFIABLE_INFO:
      title = 'Personal Information Permission';
      description = `We need to process your personal information to ${purpose}.`;
      break;
    default:
      description = `We need your permission to ${purpose}.`;
  }
  
  // Show toast with consent buttons
  toast({
    title,
    description,
    action: {
      component: {
        type: 'custom',
        render: () => ({
          type: 'div',
          props: {
            className: "flex gap-2 mt-2",
            children: [
              {
                type: 'button',
                props: {
                  onClick: () => {
                    recordConsent(dataType, true);
                    onConsent();
                  },
                  className: "bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded",
                  children: "Allow"
                }
              },
              {
                type: 'button',
                props: {
                  onClick: () => {
                    recordConsent(dataType, false);
                    onDecline();
                  },
                  className: "bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded",
                  children: "Decline"
                }
              }
            ]
          }
        })
      }
    },
    duration: 10000, // 10 seconds
  });
}

/**
 * Sanitize data by removing or masking sensitive information
 */
export function sanitizeData(data: any, type: SensitiveDataType): any {
  if (!data) return data;
  
  // Create a deep copy to avoid modifying the original
  const result = JSON.parse(JSON.stringify(data));
  
  if (type === SensitiveDataType.PERSONAL_IDENTIFIABLE_INFO) {
    // Mask email addresses
    if (typeof result === 'string' && result.includes('@')) {
      const parts = result.split('@');
      if (parts[0].length > 2) {
        return `${parts[0].substring(0, 2)}***@${parts[1]}`;
      }
    }
    
    // Sanitize objects recursively
    if (typeof result === 'object') {
      for (const key in result) {
        // Sanitize specific fields based on common PII field names
        if (['ssn', 'socialSecurityNumber', 'taxId'].includes(key)) {
          result[key] = '***-**-****';
        } else if (['phoneNumber', 'phone', 'mobile'].includes(key) && result[key]) {
          // Keep only last 4 digits of phone numbers
          const digits = String(result[key]).replace(/\D/g, '');
          if (digits.length >= 4) {
            result[key] = `***-***-${digits.substring(digits.length - 4)}`;
          }
        }
      }
    }
  }
  
  return result;
}

/**
 * Securely process and store sensitive educational records in compliance with FERPA
 */
export async function processEducationalRecord(
  data: any, 
  encryptionKey: string
): Promise<string> {
  try {
    // Add data processing timestamp
    const processedData = {
      ...data,
      processed_at: new Date().toISOString(),
      ferpa_compliant: true
    };
    
    // Encrypt the data
    return await encryptData(JSON.stringify(processedData), encryptionKey);
  } catch (error) {
    console.error('Error processing educational record:', error);
    throw new Error('Failed to process educational record securely');
  }
}

/**
 * Log data access for audit and compliance purposes
 */
export function logDataAccess(
  dataType: SensitiveDataType,
  purpose: string,
  userRole: string
): void {
  try {
    const accessLogs = JSON.parse(localStorage.getItem('data_access_logs') || '[]');
    accessLogs.push({
      dataType,
      purpose,
      userRole,
      timestamp: new Date().toISOString()
    });
    
    // Keep only the last 100 logs to prevent local storage overflow
    if (accessLogs.length > 100) {
      accessLogs.shift();
    }
    
    localStorage.setItem('data_access_logs', JSON.stringify(accessLogs));
  } catch (error) {
    console.error('Error logging data access:', error);
  }
}

/**
 * Check if current user role has permission to access specific data type
 */
export function hasAccessPermission(dataType: SensitiveDataType, userRole: string): boolean {
  // Define role-based access control for different data types
  const accessMatrix: Record<SensitiveDataType, string[]> = {
    [SensitiveDataType.EDUCATIONAL_RECORDS]: ['admin', 'teacher', 'school_official'],
    [SensitiveDataType.PERSONAL_IDENTIFIABLE_INFO]: ['admin'],
    [SensitiveDataType.LOCATION_DATA]: ['admin', 'employer'],
    [SensitiveDataType.FINANCIAL_INFO]: ['admin'],
    [SensitiveDataType.HEALTH_INFO]: ['admin'],
  };
  
  return accessMatrix[dataType]?.includes(userRole) || false;
}
