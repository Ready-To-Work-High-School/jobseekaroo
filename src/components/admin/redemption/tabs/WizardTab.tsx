
import React from 'react';
import CodeGenerationWizard from '../wizard/CodeGenerationWizard';

interface WizardTabProps {
  isGenerating: boolean;
  onGenerate: (params: {
    codeType: 'student' | 'employer';
    amount: number;
    expiresInDays: number;
    emailDomain: string;
    sendEmail: boolean;
  }) => Promise<void>;
}

const WizardTab: React.FC<WizardTabProps> = ({
  isGenerating,
  onGenerate
}) => {
  return (
    <CodeGenerationWizard 
      onGenerate={onGenerate}
      isGenerating={isGenerating}
    />
  );
};

export default WizardTab;
