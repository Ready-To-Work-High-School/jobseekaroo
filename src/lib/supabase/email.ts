
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
    // First, trigger Supabase's password reset functionality
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;

    // Also send a custom email notification via our function
    await sendEmail({
      to: email,
      subject: 'Password Reset Requested',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset</h2>
          <p>We've received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
          <p>A password reset link has been sent to you by our system. Please check your inbox for an email from Supabase.</p>
          <p>The link will expire in 24 hours.</p>
          <p>Thank you,<br/>The Career Platform Team</p>
        </div>
      `,
      text: `
        Password Reset
        
        We've received a request to reset your password. If you didn't make this request, you can safely ignore this email.
        
        A password reset link has been sent to you by our system. Please check your inbox for an email from Supabase.
        
        The link will expire in 24 hours.
        
        Thank you,
        The Career Platform Team
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error in password reset:', error);
    throw error;
  }
}
