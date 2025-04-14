
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useConsentFlow } from './hooks/useConsentFlow';
import IntroductionStep from './steps/IntroductionStep';
import ParentEmailStep from './steps/ParentEmailStep';
import VerificationStep from './steps/VerificationStep';
import CompleteStep from './steps/CompleteStep';
import CoppaInformationDialog from './CoppaInformationDialog';
import SupportFooter from './SupportFooter';

interface ParentalConsentFlowProps {
  initialUserData?: any;
}

const ParentalConsentFlow: React.FC<ParentalConsentFlowProps> = ({ initialUserData }) => {
  const isMobile = useIsMobile();
  const {
    step,
    setStep,
    parentEmail,
    isLoading,
    parentName,
    showHelp,
    setShowHelp,
    handleSendVerification,
    handleVerify,
    user
  } = useConsentFlow(initialUserData);
  
  return (
    <div className={`max-w-md mx-auto bg-white p-6 ${isMobile ? 'rounded-none' : 'rounded-lg shadow-md'}`}>
      {step === 'introduction' && (
        <IntroductionStep 
          onContinue={() => setStep('parentEmail')}
          onLearnMore={() => setShowHelp(true)}
        />
      )}
      
      {step === 'parentEmail' && (
        <ParentEmailStep 
          onSubmit={handleSendVerification}
          onBack={() => setStep('introduction')}
          isLoading={isLoading}
        />
      )}
      
      {step === 'verification' && (
        <VerificationStep 
          onSubmit={handleVerify}
          onBack={() => setStep('parentEmail')}
          onResend={handleSendVerification}
          isLoading={isLoading}
          parentEmail={parentEmail}
          parentName={parentName}
        />
      )}
      
      {step === 'complete' && (
        <CompleteStep userEmail={user?.email} />
      )}
      
      <SupportFooter />
      
      <CoppaInformationDialog 
        open={showHelp} 
        onOpenChange={setShowHelp} 
      />
    </div>
  );
};

export default ParentalConsentFlow;
