
import { supabase } from '../index';
import { User } from '@supabase/supabase-js';
import { RedemptionCode } from '@/types/redemption';

export async function redeemCode(
  code: RedemptionCode, 
  user: User
): Promise<{ success: boolean; message: string; updatedUserType?: string }> {
  try {
    // Check if the code is valid
    if (!code || !code.id) {
      return { 
        success: false, 
        message: 'Invalid redemption code' 
      };
    }
    
    // Check if the user exists
    if (!user || !user.id) {
      return { 
        success: false, 
        message: 'User not authenticated' 
      };
    }
    
    // Mark the code as used
    const { error: updateError } = await supabase
      .from('redemption_codes')
      .update({
        used: true,
        used_by: user.id,
        used_at: new Date().toISOString()
      })
      .eq('id', code.id);
    
    if (updateError) {
      console.error('Error updating redemption code:', updateError);
      return { 
        success: false, 
        message: 'Failed to redeem code' 
      };
    }
    
    // Determine the user type based on the code type
    // Special handling for admin codes
    const userType = code.type === 'admin' ? 'admin' : code.type;
    
    // Update the user's profile with the redeemed information
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        user_type: userType,
        redeemed_code: code.code,
        redeemed_at: new Date().toISOString()
      })
      .eq('id', user.id);
    
    if (profileError) {
      console.error('Error updating user profile:', profileError);
      return { 
        success: false, 
        message: 'Failed to update user profile' 
      };
    }
    
    return { 
      success: true, 
      message: `Successfully redeemed ${code.type} code`,
      updatedUserType: userType
    };
  } catch (error) {
    console.error('Error redeeming code:', error);
    return { 
      success: false, 
      message: 'An unexpected error occurred' 
    };
  }
}
