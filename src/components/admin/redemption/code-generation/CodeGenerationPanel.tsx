
import React from 'react';
import RedemptionCodeGenerators from '../RedemptionCodeGenerators';

interface CodeGenerationPanelProps {
  onGenerateCode: () => Promise<void>;
  onBulkGenerate: (amount: number) => Promise<void>;
  onAutomatedGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string) => Promise<void>;
  isGenerating: boolean;
  codeType: 'student' | 'employer';
  setCodeType: (type: 'student' | 'employer') => void;
  expireDays: number;
  setExpireDays: (days: number) => void;
}

const CodeGenerationPanel: React.FC<CodeGenerationPanelProps> = ({
  onGenerateCode,
  onBulkGenerate,
  onAutomatedGeneration,
  isGenerating,
  codeType,
  setCodeType,
  expireDays,
  setExpireDays
}) => {
  return (
    <RedemptionCodeGenerators
      onGenerateCode={onGenerateCode}
      onBulkGenerate={onBulkGenerate}
      onAutomatedGeneration={onAutomatedGeneration}
      isGenerating={isGenerating}
      codeType={codeType}
      setCodeType={setCodeType}
      expireDays={expireDays}
      setExpireDays={setExpireDays}
    />
  );
};

export default CodeGenerationPanel;
