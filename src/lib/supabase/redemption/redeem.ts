
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
    
    // Double-check that the code is not already used - additional safety check
    const { data: codeData, error: codeError } = await supabase
      .from('redemption_codes')
      .select('*')
      .eq('id', code.id)
      .single();
      
    if (codeError || !codeData) {
      console.error('Error fetching redemption code:', codeError);
      return { 
        success: false, 
        message: 'Invalid redemption code' 
      };
    }
    
    if (codeData.used) {
      return { 
        success: false, 
        message: 'This redemption code has already been used' 
      };
    }
    
    // Check for expiration
    if (codeData.expires_at && new Date(codeData.expires_at) < new Date()) {
      return { 
        success: false, 
        message: 'This redemption code has expired' 
      };
    }
    
    // Check if user already has a profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('user_type, redeemed_code')
      .eq('id', user.id)
      .single();
      
    if (profileError) {
      console.error('Error fetching user profile:', profileError);
      return { 
        success: false, 
        message: 'Failed to retrieve user profile' 
      };
    }
    
    // If user has already redeemed a code of the same type, prevent duplicate redemption
    if (profileData.redeemed_code) {
      return { 
        success: false, 
        message: 'You have already redeemed a code' 
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
    const { error: profileError2 } = await supabase
      .from('profiles')
      .update({
        user_type: userType,
        redeemed_code: code.code,
        redeemed_at: new Date().toISOString()
      })
      .eq('id', user.id);
    
    if (profileError2) {
      console.error('Error updating user profile:', profileError2);
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
