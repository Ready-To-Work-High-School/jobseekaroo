
import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/supabase/email';

export const signIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
};

export const signUp = async (
  email: string, 
  password: string,
  firstName: string,
  lastName: string
) => {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });
  
  if (error) throw error;
  
  // If email confirmation is required, send a welcome email
  if (data?.user && !data.user.confirmed_at) {
    try {
      await sendEmail({
        to: email,
        subject: 'Welcome to Career Platform - Please Confirm Your Email',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to Career Platform, ${firstName}!</h2>
            <p>Thank you for signing up. To complete your registration, please confirm your email address.</p>
            <p>A confirmation email has been sent to you by our system. Please click the link in that email to verify your account.</p>
            <p>If you don't see the email, please check your spam folder.</p>
            <p>Thank you,<br/>The Career Platform Team</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // We don't throw here as the signup was successful
    }
  }
};

export const signInWithApple = async (): Promise<void> => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
  });
  
  if (error) throw error;
};

export const signInWithGoogle = async (): Promise<void> => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  
  if (error) throw error;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
