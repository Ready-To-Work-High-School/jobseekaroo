
/**
 * Constants used across privacy compliance modules
 */

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
