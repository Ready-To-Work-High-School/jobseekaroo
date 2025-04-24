
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export function useMfaManagement(user: any) {
  const [isMfaEnabled, setIsMfaEnabled] = useState(false);
  const [isMfaLoading, setIsMfaLoading] = useState(false);
  const [mfaFactors, setMfaFactors] = useState<Array<{id: string; type: string; friendly_name?: string}>>([]);
  
  const refreshMfaStatus = async () => {
    if (!user) {
      setIsMfaEnabled(false);
      setMfaFactors([]);
      return;
    }
    
    setIsMfaLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      
      if (error) {
        console.error('Error fetching MFA factors:', error);
        toast.error('Failed to retrieve MFA status');
        return;
      }
      
      const verifiedFactors = data.totp.filter(factor => factor.status === 'verified');
      setIsMfaEnabled(verifiedFactors.length > 0);
      
      const mappedFactors = data.totp.map(factor => ({
        id: factor.id,
        type: 'totp',
        friendly_name: factor.friendly_name
      }));
      
      setMfaFactors(mappedFactors);
    } catch (err) {
      console.error('Unexpected error fetching MFA status:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setIsMfaLoading(false);
    }
  };

  const enrollMfa = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: `MFA-${new Date().toISOString()}`
      });
      
      if (error) {
        toast.error('Failed to enroll in MFA');
        return null;
      }
      
      await refreshMfaStatus();
      return { 
        qrCode: data.totp.qr_code, 
        secret: data.totp.secret,
        uri: data.totp.uri 
      };
    } catch (err) {
      console.error('Error enrolling in MFA:', err);
      toast.error('An error occurred while setting up MFA');
      return null;
    }
  };

  const verifyMfa = async (code: string, factorId: string) => {
    try {
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId
      });
      
      if (challengeError) {
        toast.error('Failed to initiate MFA challenge');
        return false;
      }
      
      const { error } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code
      });
      
      if (error) {
        toast.error('Invalid MFA code');
        return false;
      }
      
      await refreshMfaStatus();
      toast.success('MFA successfully verified');
      return true;
    } catch (err) {
      console.error('Error verifying MFA:', err);
      toast.error('An error occurred during MFA verification');
      return false;
    }
  };

  const unenrollMfa = async (factorId: string) => {
    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId });
      
      if (error) {
        toast.error('Failed to unenroll from MFA');
        return false;
      }
      
      await refreshMfaStatus();
      toast.success('MFA successfully disabled');
      return true;
    } catch (err) {
      console.error('Error unenrolling from MFA:', err);
      toast.error('An error occurred while disabling MFA');
      return false;
    }
  };

  return {
    isMfaEnabled,
    isMfaLoading,
    mfaFactors,
    refreshMfaStatus,
    enrollMfa,
    verifyMfa,
    unenrollMfa
  };
}
