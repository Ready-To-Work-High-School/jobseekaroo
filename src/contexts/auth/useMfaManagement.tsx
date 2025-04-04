
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  checkMfaEnabled, 
  enrollMfa as enrollMfaService, 
  verifyMfa as verifyMfaService,
  unenrollMfa as unenrollMfaService 
} from '@/lib/supabase/oauth';

export function useMfaManagement(user: any) {
  // MFA state
  const [isMfaEnabled, setIsMfaEnabled] = useState(false);
  const [isMfaLoading, setIsMfaLoading] = useState(false);
  const [mfaFactors, setMfaFactors] = useState<Array<{id: string; type: string; friendly_name?: string}>>([]);
  
  // Check MFA status
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
        setIsMfaEnabled(false);
        setMfaFactors([]);
        return;
      }
      
      // Check if there are any verified factors
      const verifiedFactors = data.totp.filter(factor => factor.status === 'verified');
      setIsMfaEnabled(verifiedFactors.length > 0);
      
      // Map the factor data to our expected format
      const mappedFactors = data.totp.map(factor => ({
        id: factor.id,
        type: 'totp',
        friendly_name: factor.friendly_name
      }));
      
      setMfaFactors(mappedFactors);
    } catch (err) {
      console.error('Unexpected error fetching MFA status:', err);
      setIsMfaEnabled(false);
      setMfaFactors([]);
    } finally {
      setIsMfaLoading(false);
    }
  };

  // MFA enrollment handler
  const handleEnrollMfa = async () => {
    try {
      const result = await enrollMfaService();
      if (!result) return null;
      
      await refreshMfaStatus();
      return { qrCode: result.enrollUrl };
    } catch (err) {
      console.error('Error enrolling in MFA:', err);
      return null;
    }
  };

  // MFA verification handler
  const handleVerifyMfa = async (code: string, factorId: string) => {
    try {
      const verified = await verifyMfaService(code, factorId);
      if (verified) {
        await refreshMfaStatus();
      }
      return verified;
    } catch (err) {
      console.error('Error verifying MFA:', err);
      return false;
    }
  };

  // MFA unenrollment handler
  const handleUnenrollMfa = async (factorId: string) => {
    try {
      const success = await unenrollMfaService(factorId);
      if (success) {
        await refreshMfaStatus();
      }
      return success;
    } catch (err) {
      console.error('Error unenrolling from MFA:', err);
      return false;
    }
  };

  return {
    isMfaEnabled,
    isMfaLoading,
    mfaFactors,
    refreshMfaStatus,
    enrollMfa: handleEnrollMfa,
    verifyMfa: handleVerifyMfa,
    unenrollMfa: handleUnenrollMfa
  };
}
