
import React from 'react';
import RedemptionCodeGenerators from '../RedemptionCodeGenerators';
import { School } from '@/types/school';

interface CodeGenerationPanelProps {
  school: School;
  onGenerateCode: (school: School) => Promise<void>;
  onBulkGenerate: (amount: number, school: School) => Promise<void>;
  onAutomatedGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string, school: School) => Promise<void>;
  isGenerating: boolean;
  codeType: 'student' | 'employer';
  setCodeType: (type: 'student' | 'employer') => void;
  expireDays: number;
  setExpireDays: (days: number) => void;
}

const CodeGenerationPanel: React.FC<CodeGenerationPanelProps> = ({
  school,
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
      school={school}
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
