
import { supabase } from '@/integrations/supabase/client';

interface NotificationRequest {
  recipientEmail: string;
  subject: string;
  message: string;
}

export async function sendEmailNotification(recipientEmail: string, subject: string, message: string) {
  try {
    const { data, error } = await supabase.functions.invoke('send-notification', {
      body: { recipientEmail, subject, message } as NotificationRequest
    });

    if (error) {
      console.error('Error invoking send-notification function:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send notification:', error);
    return { success: false, error };
  }
}
