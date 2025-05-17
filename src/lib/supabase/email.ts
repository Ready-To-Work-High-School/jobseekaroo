
import { supabase } from './index';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export async function sendEmail(params: SendEmailParams) {
  const { data, error } = await supabase.functions.invoke('send-email', {
    body: params,
  });

  if (error) {
    console.error('Error sending email:', error);
    throw error;
  }

  return data;
}

export async function sendPasswordResetEmail(email: string) {
  try {
    // Get the current origin for the redirect URL to work in any environment
    const origin = window.location.origin;
    
    // Ensure the redirect URL is properly formed with absolute path
    const redirectTo = `${origin}/reset-password`;
    
    console.log('Using redirect URL:', redirectTo);
    
    // Use Supabase's built-in password reset functionality
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo,
    });

    if (error) throw error;
    
    console.log('Password reset email requested successfully via Supabase auth');
    return { success: true };
  } catch (error) {
    console.error('Error in password reset:', error);
    throw error;
  }
}
