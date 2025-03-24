
import { supabase } from '../index';
import { SendRedemptionEmailParams } from './types';

/**
 * Send redemption code(s) via email
 */
export async function sendRedemptionCodeEmail({
  to,
  subject,
  message,
  codes
}: SendRedemptionEmailParams): Promise<boolean> {
  try {
    // Call the edge function to send email
    const { error } = await supabase.functions.invoke('send-redemption-code', {
      body: {
        to,
        subject,
        message,
        codes: codes.map(code => ({
          id: code.id,
          code: code.code,
          type: code.type,
          expiresAt: code.expiresAt
        }))
      }
    });

    if (error) {
      console.error('Error sending redemption code email:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending redemption code email:', error);
    return false;
  }
}
