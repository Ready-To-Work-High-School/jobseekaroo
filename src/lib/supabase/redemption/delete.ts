
import { supabase } from '../index';

/**
 * Delete a single redemption code
 */
export async function deleteRedemptionCode(codeId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .rpc('delete_redemption_code', { code_id: codeId });

    if (error) {
      console.error('Error deleting redemption code:', error);
      return false;
    }

    return data === true;
  } catch (error) {
    console.error('Error deleting redemption code:', error);
    return false;
  }
}

/**
 * Delete multiple redemption codes
 */
export async function deleteRedemptionCodes(codeIds: string[]): Promise<number> {
  try {
    const { data, error } = await supabase
      .rpc('delete_redemption_codes', { code_ids: codeIds });

    if (error) {
      console.error('Error deleting redemption codes:', error);
      return 0;
    }

    return data || 0;
  } catch (error) {
    console.error('Error deleting redemption codes:', error);
    return 0;
  }
}
