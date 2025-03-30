
import { supabase } from '@/lib/supabase';

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
