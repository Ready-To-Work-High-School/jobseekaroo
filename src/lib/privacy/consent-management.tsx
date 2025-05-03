
/**
 * Functions for managing user privacy consents
 */

import { toast } from '@/hooks/use-toast';
import { SensitiveDataType } from './constants';
import * as React from 'react';
import { Button } from '@/components/ui/button';

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
  
  // Using toast with JSX content correctly typed
  toast({
    title,
    description,
    action: (
      <div className="flex gap-2 mt-2">
        <Button 
          onClick={() => {
            recordConsent(dataType, true);
            onConsent();
          }}
          variant="default"
          size="sm"
        >
          Allow
        </Button>
        <Button 
          onClick={() => {
            recordConsent(dataType, false);
            onDecline();
          }}
          variant="secondary"
          size="sm"
        >
          Decline
        </Button>
      </div>
    ),
    duration: 10000, // 10 seconds
  });
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
