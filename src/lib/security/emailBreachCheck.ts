
import { supabase } from '@/lib/supabase';

export interface EmailBreachResult {
  isBreached: boolean;
  breachCount: number;
  breaches?: string[];
  message: string;
}

export const checkEmailBreach = async (email: string): Promise<EmailBreachResult> => {
  try {
    console.log('Checking email breach status for:', email);
    
    const { data, error } = await supabase.functions.invoke('check-email-breach', {
      body: { email }
    });

    if (error) {
      console.error('Error calling breach check function:', error);
      return {
        isBreached: false,
        breachCount: 0,
        message: 'Security check failed'
      };
    }

    return data as EmailBreachResult;
  } catch (error) {
    console.error('Error in checkEmailBreach:', error);
    return {
      isBreached: false,
      breachCount: 0,
      message: 'Security check failed'
    };
  }
};
