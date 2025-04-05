
import { useState, useCallback, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { ParentFormValues, VerificationFormValues } from '../schemas';

export type ConsentStep = 'introduction' | 'parentEmail' | 'verification' | 'complete';

export const useConsentFlow = () => {
  const [step, setStep] = useState<ConsentStep>('introduction');
  const [parentEmail, setParentEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parentName, setParentName] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const { toast } = useToast();
  const { user, userProfile, updateProfile } = useAuth();

  // Check if consent is already verified when component mounts
  useEffect(() => {
    if (userProfile?.preferences?.parentalConsentVerified) {
      setStep('complete');
    }
  }, [userProfile]);
  
  const handleSendVerification = useCallback(async (values: ParentFormValues) => {
    setIsLoading(true);
    
    try {
      // Store values for later use
      setParentName(values.parentName);
      setParentEmail(values.parentEmail);
      
      // Here we would integrate with the backend to send a verification email
      // For now, we'll simulate a successful send
      
      toast({
        title: "Verification Email Sent",
        description: `A verification code has been sent to ${values.parentEmail}`
      });
      setStep('verification');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
  const handleVerify = useCallback(async (values: VerificationFormValues) => {
    setIsLoading(true);
    
    try {
      // Here we would integrate with the backend to verify the code
      // For now, we'll simulate success with any code entry
      setVerificationCode(values.code);
      
      toast({
        title: "Verification Successful",
        description: "Parental consent has been verified"
      });
      setStep('complete');
      
      if (user && updateProfile) {
        // Store the consent status in the user profile preferences object
        const updatedPreferences = {
          ...(userProfile?.preferences || {}),
          parentalConsentVerified: true,
          parentalConsentDate: new Date().toISOString(),
          parentEmail,
          parentName
        };
        
        // Update the user profile with the new preferences
        await updateProfile({
          preferences: updatedPreferences
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "The code entered is invalid. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, user, updateProfile, userProfile, parentEmail, parentName]);
  
  const toggleHelpDialog = useCallback(() => {
    setShowHelp(prev => !prev);
  }, []);

  return {
    step,
    setStep,
    parentEmail,
    verificationCode,
    isLoading,
    parentName,
    showHelp,
    setShowHelp,
    toggleHelpDialog,
    handleSendVerification,
    handleVerify,
    user
  };
};
