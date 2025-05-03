
/**
 * Functions for role-based access control
 */

import { SensitiveDataType } from './constants';

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
