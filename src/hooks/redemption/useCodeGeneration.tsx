
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { RedemptionCode } from '@/types/redemption';
import { generateRedemptionCode, sendRedemptionCodeEmail } from '@/lib/supabase/redemption';
import { School } from '@/types/school';

export function useCodeGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateCode = async (codeType: 'student' | 'employer', school: School, expireDays: number) => {
    setIsGenerating(true);
    try {
      const newCode = await generateRedemptionCode(codeType, school, expireDays);
      
      if (newCode) {
        toast({
          title: 'Success',
          description: `New ${codeType} code generated: ${newCode.code}`,
        });
        return newCode;
      } else {
        toast({
          title: 'Error',
          description: 'Failed to generate redemption code',
          variant: 'destructive',
        });
        return null;
      }
    } catch (error) {
      console.error('Error generating redemption code:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBulkGenerate = async (amount: number, codeType: 'student' | 'employer', school: School, expireDays: number) => {
    setIsGenerating(true);
    
    try {
      const newCodes: RedemptionCode[] = [];
      
      for (let i = 0; i < amount; i++) {
        const code = await generateRedemptionCode(codeType, school, expireDays);
        if (code) newCodes.push(code);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      if (newCodes.length > 0) {
        toast({
          title: 'Success',
          description: `Generated ${newCodes.length} new redemption codes`,
        });
        return newCodes;
      } else {
        toast({
          title: 'Error',
          description: 'Failed to generate redemption codes',
          variant: 'destructive',
        });
        return [];
      }
    } catch (error) {
      console.error('Error generating redemption codes:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during bulk generation',
        variant: 'destructive',
      });
      return [];
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAutomatedCodeGeneration = async (
    userType: string, 
    amount: number, 
    expiresInDays: number,
    emailDomain: string,
    school: School
  ) => {
    setIsGenerating(true);
    
    try {
      const newCodes: RedemptionCode[] = [];
      const validType = userType === 'student' || userType === 'employer' ? 
        userType : 'student';
      
      for (let i = 0; i < amount; i++) {
        const code = await generateRedemptionCode(validType as 'student' | 'employer', school, expiresInDays);
        if (code) newCodes.push(code);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      if (newCodes.length === 0) {
        throw new Error('Failed to generate any redemption codes');
      }
      
      const emailSubject = `${userType.charAt(0).toUpperCase() + userType.slice(1)} Access Codes`;
      const emailMessage = `
        Here are your requested access codes for ${userType} users:
        
        These codes can be distributed to users with @${emailDomain} email addresses.
        
        Users can redeem these codes at the following URL: ${window.location.origin}/redemption-code
        
        These codes will expire in ${expiresInDays} days.
      `;
      
      const sendResult = await sendRedemptionCodeEmail({
        to: `admin@${emailDomain}`,
        subject: emailSubject,
        message: emailMessage,
        codes: newCodes
      });
      
      if (!sendResult) {
        throw new Error('Generated codes but failed to send email');
      }
      
      toast({
        title: 'Success',
        description: `Generated and emailed ${newCodes.length} ${userType} codes to admin@${emailDomain}`,
      });
      
      return newCodes;
    } catch (error) {
      console.error('Error in automated code generation:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate or distribute codes',
        variant: 'destructive',
      });
      return [];
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    handleGenerateCode,
    handleBulkGenerate,
    handleAutomatedCodeGeneration
  };
}
