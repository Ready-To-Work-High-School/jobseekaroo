
import { supabase } from '../index';

/**
 * Mark a redemption code as used
 */
export async function useRedemptionCode(
  codeId: string,
  userId: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('redemption_codes' as any)
      .update({
        used: true,
        used_by: userId,
        used_at: new Date().toISOString(),
      })
      .eq('id', codeId);

    return !error;
  } catch (error) {
    console.error('Error using redemption code:', error);
    return false;
  }
}
